#!/usr/bin/env python3
"""
xSROMap Data Parser - Python Version
Parses Silkroad Online game data files to generate JavaScript files
containing NPC and teleport information for a web-based map application.

Uses pandas DataFrames for TSV file handling and data transformation.
"""

import pandas as pd
from dataclasses import dataclass, field


# Configuration
LANGUAGE_INDEX = 9  # English language column index


@dataclass
class Destination:
    """Teleport destination data."""
    name: str = ""
    region: str = ""
    x: str = ""
    y: str = ""
    z: str = ""


@dataclass
class Teleport:
    """Teleport data with links to destinations."""
    id: int = 0
    source_id: int = 0
    name: str = ""
    server_name: str = ""
    region: str = ""
    x: str = ""
    y: str = ""
    z: str = ""
    links: list = field(default_factory=list)


@dataclass
class Model:
    """Character/NPC model data."""
    id: int = 0
    server_name: str = ""
    name: str = ""
    tid2: int = 0
    tid3: int = 0
    tid4: int = 0
    region: str = ""
    x: str = ""
    y: str = ""
    z: str = ""
    links: list = field(default_factory=list)

    def __lt__(self, other):
        """For sorting by name (case-insensitive)."""
        return self.name.lower() < other.name.lower()


class XSROMapParser:
    """Main parser class for xSROMap data."""

    def __init__(self, data_dir: str = "."):
        self.data_dir = data_dir
        self.name_references: dict[str, str] = {}
        self.models: dict[int, Model] = {}
        self.teleport_data: dict[str, pd.Series] = {}
        self.teleport_buildings: dict[str, pd.Series] = {}
        self.region_references: dict[str, str] = {}
        self.teleports_links: dict[int, Teleport] = {}
        self.store_links: dict[int, Teleport] = {}
        self.model_npcs: list[Model] = []

    def _read_tsv(self, filename: str, has_header: bool = False) -> pd.DataFrame:
        """Read a TSV file with UTF-16 encoding."""
        filepath = f"{self.data_dir}/{filename}"
        encodings = ['utf-16', 'utf-16-le', 'utf-8']

        for encoding in encodings:
            try:
                df = pd.read_csv(
                    filepath,
                    sep='\t',
                    encoding=encoding,
                    header=0 if has_header else None,
                    dtype=str,
                    keep_default_na=False,
                    quoting=3,  # QUOTE_NONE - disable quoting
                    on_bad_lines='skip'  # Skip malformed lines
                )
                return df
            except (UnicodeDecodeError, UnicodeError):
                continue
            except Exception:
                # Try next encoding
                continue

        raise ValueError(f"Could not read file {filename} with any supported encoding")

    def load_name_references(self) -> None:
        """Load name references from text data files."""
        print("Loading name references..")
        files = ["textdata_equip&skill_all.txt", "textdata_object_all.txt"]

        for filename in files:
            df = self._read_tsv(filename)

            # Filter enabled records (first column == "1")
            enabled_df = df[df.iloc[:, 0] == "1"]

            for _, row in enabled_df.iterrows():
                if len(row) > LANGUAGE_INDEX and row.iloc[LANGUAGE_INDEX] != "0":
                    # Check if data[1] is numeric (iSRO format)
                    try:
                        int(row.iloc[1])
                        # iSRO format: key = data[2]
                        self.name_references[row.iloc[2]] = row.iloc[LANGUAGE_INDEX]
                    except ValueError:
                        # Standard format: key = data[1]
                        self.name_references[row.iloc[1]] = row.iloc[LANGUAGE_INDEX]

    def _get_name_reference(self, server_name: str) -> str:
        """Get name from references or return empty string."""
        return self.name_references.get(server_name, "")

    def load_models(self) -> None:
        """Load character/model data."""
        print("Loading models..")
        df = self._read_tsv("characterdata_all.txt")

        # Filter enabled records
        enabled_df = df[df.iloc[:, 0] == "1"]

        for _, row in enabled_df.iterrows():
            name = ""
            if row.iloc[5] != "xxx":
                name = self._get_name_reference(row.iloc[5])

            model = Model(
                id=int(row.iloc[1]),
                server_name=row.iloc[2],
                name=name,
                tid2=int(row.iloc[10]),
                tid3=int(row.iloc[11]),
                tid4=int(row.iloc[12])
            )
            self.models[model.id] = model

    def generate_npcs(self) -> None:
        """Generate NPCs.js file from NPC position data."""
        print("Generating NPC's..")
        df = self._read_tsv("npcpos.txt")

        for _, row in df.iterrows():
            model_id = int(row.iloc[0])
            if model_id not in self.models:
                continue

            m = self.models[model_id]

            # Filter: NPC (tid2=2) and Guide (tid3=2)
            if m.tid2 == 2 and m.tid3 == 2 and m.name != "":
                model = Model(
                    id=m.id,
                    server_name=m.server_name,
                    name=m.name,
                    tid2=m.tid2,
                    tid3=m.tid3,
                    tid4=m.tid4,
                    region=row.iloc[1],
                    x=row.iloc[2],
                    z=row.iloc[3],
                    y=row.iloc[4]
                )
                self.model_npcs.append(model)

        # Sort by name
        self.model_npcs.sort()

        # Generate JavaScript output
        output_parts = []
        for m in self.model_npcs:
            escaped_name = m.name.replace("'", r"\'")
            output_parts.append(
                f"{{'name':'{escaped_name}','region':{m.region},'x':{m.x},'z':{m.z},'y':{m.y}}}"
            )

        file_output = "var NPCs=[" + ",".join(output_parts) + "];"

        with open(f"{self.data_dir}/NPCs.js", "w", encoding="utf-8") as f:
            f.write(file_output)

        print("NPCs.js generated successfully!")

    def load_teleport_data(self) -> None:
        """Load teleport data and building information."""
        print("Loading TeleportData..")

        # Load teleportdata.txt
        df = self._read_tsv("teleportdata.txt")
        enabled_df = df[df.iloc[:, 0] == "1"]
        for _, row in enabled_df.iterrows():
            self.teleport_data[row.iloc[1]] = row

        # Load teleportbuilding.txt
        df = self._read_tsv("teleportbuilding.txt")
        enabled_df = df[df.iloc[:, 0] == "1"]
        for _, row in enabled_df.iterrows():
            self.teleport_buildings[row.iloc[1]] = row

    def load_regions(self) -> None:
        """Load zone name references."""
        print("Loading zonename references..")
        df = self._read_tsv("textzonename_all.txt")

        enabled_df = df[df.iloc[:, 0] == "1"]
        for _, row in enabled_df.iterrows():
            if len(row) > LANGUAGE_INDEX and row.iloc[LANGUAGE_INDEX] != "0":
                self.region_references[row.iloc[1]] = row.iloc[LANGUAGE_INDEX]

    def _get_region_reference(self, server_name: str) -> str:
        """Get region name from references or return empty string."""
        return self.region_references.get(server_name, "")

    def _create_destination(self, dest_data: pd.Series) -> Destination:
        """Create a destination from teleport data."""
        dest = Destination()

        # Get destination name
        dest_id = int(dest_data.iloc[3])
        if dest_id in self.models:
            dest.name = self.models[dest_id].name
        else:
            dest.name = self._get_name_reference(dest_data.iloc[4])

        if dest.name == "":
            dest.name = dest_data.iloc[2]

        dest.region = dest_data.iloc[5]
        dest.x = dest_data.iloc[6]
        dest.z = dest_data.iloc[7]
        dest.y = dest_data.iloc[8]

        return dest

    def load_teleport_links(self) -> None:
        """Load teleport link data."""
        print("Creating Teleport Links..")
        df = self._read_tsv("teleportlink.txt")

        enabled_df = df[df.iloc[:, 0] == "1"]
        for _, row in enabled_df.iterrows():
            source_id = int(row.iloc[1])
            dest_key = row.iloc[2]

            if source_id in self.teleports_links:
                # Already exists, add link only
                tp = self.teleports_links[source_id]
                if dest_key in self.teleport_data:
                    dest = self._create_destination(self.teleport_data[dest_key])
                    tp.links.append(dest)
                continue

            # Create new teleport entry
            source_key = row.iloc[1]
            if source_key not in self.teleport_data:
                continue

            source_data = self.teleport_data[source_key]
            tp = Teleport()
            tp.id = int(source_data.iloc[3])
            tp.source_id = source_id
            self.teleports_links[source_id] = tp
            self.store_links[tp.id] = tp

            # Extract name
            if tp.id in self.models:
                tp.name = self.models[tp.id].name
            else:
                tp.name = self._get_name_reference(source_data.iloc[4])

            if tp.name == "":
                tp.name = source_data.iloc[2]

            tp.server_name = source_data.iloc[2]
            tp.region = source_data.iloc[5]
            tp.x = source_data.iloc[6]
            tp.z = source_data.iloc[7]
            tp.y = source_data.iloc[8]

            # Add destination link
            if dest_key in self.teleport_data:
                dest = self._create_destination(self.teleport_data[dest_key])
                tp.links.append(dest)

    def _format_destinations(self, links: list[Destination]) -> str:
        """Format destination links as JavaScript array content."""
        if not links:
            return ""

        parts = []
        for d in links:
            escaped_name = d.name.replace("'", r"\'")
            parts.append(
                f"{{'name':'{escaped_name}','region':{d.region},'x':{d.x},'z':{d.z},'y':{d.y}}}"
            )
        return ",".join(parts)

    def generate_teleport_links(self) -> None:
        """Generate TPs.js and NPCsLinked.js files."""
        print("Generating Teleports..")

        # Track which teleports are used
        used_source_ids = set()
        used_store_ids = set()

        # Build TPs.js from teleport buildings
        tp_parts = []
        for key, data in self.teleport_buildings.items():
            building_id = int(key)
            if building_id in self.store_links:
                tp = self.store_links[building_id]
                teleport_type = data.iloc[12]

                # Format destinations
                fo_destinations = self._format_destinations(tp.links)

                # Update name from building data
                tp.name = self._get_name_reference(data.iloc[5])
                if tp.name == "":
                    tp.name = tp.server_name

                escaped_name = tp.name.replace("'", r"\'")
                tp_parts.append(
                    f"{{'name':'{escaped_name}','region':{data.iloc[41]},'x':{data.iloc[43]},"
                    f"'z':{data.iloc[44]},'y':{data.iloc[45]},'type':{teleport_type},"
                    f"'teleport':[{fo_destinations}]}}"
                )

                used_source_ids.add(tp.source_id)
                used_store_ids.add(building_id)

        # Build NPCsLinked.js
        npc_parts = []
        for m in self.model_npcs:
            npc_fo_destinations = ""
            if m.id in self.store_links:
                tp = self.store_links[m.id]
                npc_fo_destinations = self._format_destinations(tp.links)
                used_source_ids.add(tp.source_id)

            escaped_name = m.name.replace("'", r"\'")
            npc_parts.append(
                f"{{'name':'{escaped_name}','region':{m.region},'x':{m.x},'z':{m.z},'y':{m.y},"
                f"'teleport':[{npc_fo_destinations}]}}"
            )

        # Write NPCsLinked.js
        npc_output = "var NPCs=[" + ",".join(npc_parts) + "];"
        with open(f"{self.data_dir}/NPCsLinked.js", "w", encoding="utf-8") as f:
            f.write(npc_output)

        # Add remaining teleports (not in buildings)
        for source_id, tp in self.teleports_links.items():
            if source_id not in used_source_ids:
                fo_destinations = self._format_destinations(tp.links)
                escaped_name = tp.name.replace("'", r"\'")
                tp_parts.append(
                    f"{{'name':'{escaped_name}','region':{tp.region},'x':{tp.x},'z':{tp.z},"
                    f"'y':{tp.y},'type':5,'teleport':[{fo_destinations}]}}"
                )

        # Write TPs.js
        tp_output = "var TPs=[" + ",".join(tp_parts) + "];"
        with open(f"{self.data_dir}/TPs.js", "w", encoding="utf-8") as f:
            f.write(tp_output)

        print("TPs.js & NPCsLinked.js generated successfully!")

    def run(self) -> None:
        """Run the complete parsing workflow."""
        self.load_name_references()
        self.load_models()
        self.generate_npcs()
        self.load_teleport_data()
        self.load_regions()
        self.load_teleport_links()
        self.generate_teleport_links()


def main():
    """Main entry point."""
    import argparse

    parser = argparse.ArgumentParser(
        description="xSROMap Data Parser - Parse Silkroad Online data files"
    )
    parser.add_argument(
        "--data-dir",
        default=".",
        help="Directory containing the data files (default: current directory)"
    )
    args = parser.parse_args()

    xsro_parser = XSROMapParser(data_dir=args.data_dir)
    xsro_parser.run()


if __name__ == "__main__":
    main()
