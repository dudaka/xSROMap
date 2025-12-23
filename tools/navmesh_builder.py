#!/usr/bin/env python3
"""
NavMesh Builder - Builds collision data from Silkroad files.

This script reads navmesh data from a data folder structure (extracted from PK2)
and exports collision data in JSON format.

Expected folder structure:
    data_folder/
    ├── navmesh/           # Contains NVM files, mapinfo.mfo, object.ifo
    │   ├── mapinfo.mfo
    │   ├── object.ifo
    │   └── nv_*.nvm
    ├── Prim/              # Contains BMS collision mesh files
    │   └── Mesh/
    │       └── **/*.bms
    └── Res/               # Contains BSR resource files
        └── **/*.bsr

Usage:
    python navmesh_builder.py <data_folder> [options]

Options:
    --output, -o    Output file path (default: navmesh.json)
    --region, -r    Process specific region ID (hex or decimal)
    --all           Process all active regions
    --verbose, -v   Verbose output

Examples:
    # Build collision for single region (hex or decimal)
    python navmesh_builder.py ./output -r 3a44
    python navmesh_builder.py ./output -r 0x3a44
    python navmesh_builder.py ./output -r 14916

    # Build collision for multiple regions
    python navmesh_builder.py ./output -r 3a44 3a45 3a46
    python navmesh_builder.py ./output -r 14916 14917 14918

    # Build collision for all regions
    python navmesh_builder.py ./output --all

    # Output to specific file
    python navmesh_builder.py ./output --all -o world.json
"""

import sys
import json
import math
import argparse
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from pathlib import Path

# Import from silkroad_parser
from silkroad_parser import (
    MapInfo, NavMeshTerrain, ObjectIndex, Mesh, Resource,
    NavEdgeFlag
)


# =============================================================================
# CONSTANTS
# =============================================================================

REGION_SIZE = 1920  # World units per region


# =============================================================================
# DATA STRUCTURES
# =============================================================================

@dataclass
class Point:
    """2D point for collision detection."""
    x: int
    y: int


@dataclass
class Line:
    """Line segment for collision detection."""
    source: Point
    destination: Point


@dataclass
class CollisionData:
    """Collision data for a single region."""
    region_id: int
    terrain_edges: List[Line] = field(default_factory=list)
    object_edges: List[Line] = field(default_factory=list)


# =============================================================================
# COORDINATE TRANSFORMATION
# =============================================================================

def rotate_vector(point_x: float, point_y: float, center_x: float, center_y: float, angle_degrees: float) -> Tuple[float, float]:
    """
    Rotate a point around a center point.

    This matches the C# MeshPoint.RotateVector implementation.
    """
    angle_radians = angle_degrees * (math.pi / 180.0)
    cos_theta = math.cos(angle_radians)
    sin_theta = math.sin(angle_radians)

    # Apply rotation formula
    new_x = cos_theta * (point_x - center_x) - sin_theta * (point_y - center_y) + center_x
    new_y = sin_theta * (point_x - center_x) + cos_theta * (point_y - center_y) + center_y

    return new_x, new_y


def get_prefab_position(mesh_point_x: float, mesh_point_z: float,
                        obj_position_x: float, obj_position_z: float,
                        angle_degrees: float) -> Tuple[float, float]:
    """
    Transform mesh point from local space to world space.

    This matches the C# MeshPoint.GetPrefabPosition implementation.
    The mesh point position uses X and Z (Y is height, ignored for 2D collision).
    """
    # Start with local position
    world_x = mesh_point_x + obj_position_x
    world_y = mesh_point_z + obj_position_z

    # Apply rotation around object center
    rotated_x, rotated_y = rotate_vector(
        world_x, world_y,
        obj_position_x, obj_position_z,
        angle_degrees
    )

    return rotated_x, rotated_y


# =============================================================================
# NAVMESH BUILDER
# =============================================================================

class NavMeshBuilder:
    """Builds collision data from Silkroad navmesh files."""

    def __init__(self, data_folder: str, verbose: bool = False):
        self.data_folder = Path(data_folder)
        self.verbose = verbose

        # Auto-detect subfolder structure
        self.navmesh_folder = self._find_navmesh_folder()
        self.prim_folder = self._find_prim_folder()
        self.res_folder = self._find_res_folder()

        # Caches
        self.mapinfo: Optional[MapInfo] = None
        self.object_index: Optional[ObjectIndex] = None
        self.resource_cache: Dict[int, Resource] = {}
        self.mesh_cache: Dict[str, Mesh] = {}

        # Results
        self.collision_data: Dict[int, CollisionData] = {}

    def _find_navmesh_folder(self) -> Path:
        """Find the folder containing NVM files."""
        # Check if navmesh subfolder exists
        navmesh_path = self.data_folder / "navmesh"
        if navmesh_path.exists():
            return navmesh_path
        # Otherwise assume data_folder contains NVM files directly
        return self.data_folder

    def _find_prim_folder(self) -> Optional[Path]:
        """Find the folder containing BMS files."""
        # Check Prim/Mesh structure (from data.pk2)
        prim_mesh_path = self.data_folder / "Prim" / "Mesh"
        if prim_mesh_path.exists():
            return prim_mesh_path
        # Check Prim directly
        prim_path = self.data_folder / "Prim"
        if prim_path.exists():
            return prim_path
        return None

    def _find_res_folder(self) -> Optional[Path]:
        """Find the folder containing BSR files."""
        res_path = self.data_folder / "Res"
        if res_path.exists():
            return res_path
        return None

    def log(self, msg: str):
        if self.verbose:
            print(msg)

    def load_mapinfo(self) -> List[int]:
        """Load mapinfo.mfo and return list of active region IDs."""
        mfo_path = self.navmesh_folder / "mapinfo.mfo"
        if not mfo_path.exists():
            raise FileNotFoundError(f"mapinfo.mfo not found in {self.navmesh_folder}")

        self.mapinfo = MapInfo.from_file(str(mfo_path))
        regions = self.mapinfo.get_active_region_ids()
        self.log(f"Loaded mapinfo.mfo: {len(regions)} active regions")
        return regions

    def load_object_index(self) -> Dict[int, str]:
        """Load object.ifo for object ID to path mapping."""
        ifo_path = self.navmesh_folder / "object.ifo"
        if not ifo_path.exists():
            self.log("object.ifo not found, skipping object collision")
            return {}

        self.object_index = ObjectIndex.from_file(str(ifo_path))
        self.log(f"Loaded object.ifo: {len(self.object_index.entries)} objects")
        return self.object_index.entries

    def _find_bsr_file(self, resource_path: str) -> Optional[Path]:
        """Find a BSR file by its path from object.ifo."""
        if not self.res_folder:
            return None

        # Resource path format: "res\bldg\china\...\file.bsr"
        # Normalize path separators
        normalized_path = resource_path.replace('\\', '/').lower()
        filename = Path(normalized_path).name

        # Search in Res folder recursively
        for bsr_file in self.res_folder.rglob("*.bsr"):
            if bsr_file.name.lower() == filename:
                return bsr_file

        return None

    def _find_bms_file(self, mesh_path: str) -> Optional[Path]:
        """Find a BMS file by its mesh path from BSR."""
        if not self.prim_folder:
            return None

        # Mesh path format: "prim\mesh\...\file.bms"
        # Normalize path separators
        normalized_path = mesh_path.replace('\\', '/').lower()
        filename = Path(normalized_path).name

        # Search in Prim folder recursively
        for bms_file in self.prim_folder.rglob("*.bms"):
            if bms_file.name.lower() == filename:
                return bms_file

        return None

    def _load_resource(self, object_id: int) -> Optional[Resource]:
        """Load a resource (BSR) file for an object ID."""
        if object_id in self.resource_cache:
            return self.resource_cache[object_id]

        if not self.object_index or object_id not in self.object_index.entries:
            return None

        resource_path = self.object_index.entries[object_id]
        bsr_file = self._find_bsr_file(resource_path)

        if not bsr_file:
            self.resource_cache[object_id] = None
            return None

        try:
            resource = Resource.from_file(str(bsr_file))
            self.resource_cache[object_id] = resource
            return resource
        except Exception as e:
            self.log(f"    Error loading BSR {bsr_file}: {e}")
            self.resource_cache[object_id] = None
            return None

    def _load_mesh(self, mesh_path: str) -> Optional[Mesh]:
        """Load a mesh (BMS) file."""
        if mesh_path in self.mesh_cache:
            return self.mesh_cache[mesh_path]

        bms_file = self._find_bms_file(mesh_path)

        if not bms_file:
            self.mesh_cache[mesh_path] = None
            return None

        try:
            mesh = Mesh.from_file(str(bms_file))
            self.mesh_cache[mesh_path] = mesh
            return mesh
        except Exception as e:
            self.log(f"    Error loading BMS {bms_file}: {e}")
            self.mesh_cache[mesh_path] = None
            return None

    def _extract_terrain_collision(self, terrain: NavMeshTerrain) -> List[Line]:
        """
        Extract terrain collision edges from internal edges.

        Only edges that touch region boundaries (HasNeighbourCell) are collision edges.
        This matches the C# CollisionExporter implementation.
        """
        edges = []

        for edge in terrain.internal_edges:
            # Only include edges at region boundary
            if edge.has_neighbour_cell:
                edges.append(Line(
                    source=Point(
                        x=int(edge.min.x),
                        y=int(REGION_SIZE - edge.min.y)  # Y-axis inverted
                    ),
                    destination=Point(
                        x=int(edge.max.x),
                        y=int(REGION_SIZE - edge.max.y)
                    )
                ))

        return edges

    def _extract_object_collision(self, terrain: NavMeshTerrain) -> List[Line]:
        """
        Extract object collision edges from mesh outlines.

        This matches the C# CollisionExporter implementation.
        """
        edges = []

        for nav_inst in terrain.objects:
            # Load resource for this object
            resource = self._load_resource(nav_inst.id)
            if not resource or not resource.mesh_path:
                continue

            # Load mesh for this resource
            mesh = self._load_mesh(resource.mesh_path)
            if not mesh or not mesh.points or not mesh.outlines:
                continue

            # Convert angle from radians to degrees (NavMeshInst stores radians)
            # But the C# code uses entry.Angle.Degrees - which is already in degrees
            # Looking at the C# code: AngleSingle.Degrees is a property that converts
            # The NavMeshInst.Angle is stored as radians, so we need to convert
            angle_degrees = math.degrees(nav_inst.angle)

            # Process each outline
            for outline in mesh.outlines:
                # Skip bridge elements (walkable underneath)
                if outline.flag == NavEdgeFlag.BRIDGE:
                    continue

                # Get mesh points
                point_a = mesh.points[outline.point_index_a]
                point_b = mesh.points[outline.point_index_b]

                # Transform to world space
                world_a = get_prefab_position(
                    point_a.position.x, point_a.position.z,
                    nav_inst.position.x, nav_inst.position.z,
                    angle_degrees
                )
                world_b = get_prefab_position(
                    point_b.position.x, point_b.position.z,
                    nav_inst.position.x, nav_inst.position.z,
                    angle_degrees
                )

                edges.append(Line(
                    source=Point(
                        x=int(world_a[0]),
                        y=int(REGION_SIZE - world_a[1])  # Y-axis inverted
                    ),
                    destination=Point(
                        x=int(world_b[0]),
                        y=int(REGION_SIZE - world_b[1])
                    )
                ))

        return edges

    def build_region(self, region_id: int) -> Optional[CollisionData]:
        """Build collision data for a single region."""
        x_sector = region_id & 0xFF
        y_sector = (region_id >> 8) & 0xFF

        # NVM filename format: nv_XXYY.nvm (where XX=y, YY=x in hex)
        nvm_name = f"nv_{y_sector:02x}{x_sector:02x}.nvm"
        nvm_path = self.navmesh_folder / nvm_name

        if not nvm_path.exists():
            self.log(f"  NVM not found: {nvm_name}")
            return None

        try:
            terrain = NavMeshTerrain.from_file(str(nvm_path))
        except Exception as e:
            self.log(f"  Error loading {nvm_name}: {e}")
            return None

        collision = CollisionData(region_id=region_id)

        # Extract terrain collision
        collision.terrain_edges = self._extract_terrain_collision(terrain)

        # Extract object collision
        collision.object_edges = self._extract_object_collision(terrain)

        self.log(f"  Loaded {nvm_name}: {len(collision.terrain_edges)} terrain edges, "
                f"{len(collision.object_edges)} object edges")

        self.collision_data[region_id] = collision
        return collision

    def build_all(self):
        """Build collision data for all active regions."""
        regions = self.load_mapinfo()
        self.load_object_index()

        print(f"Building collision data for {len(regions)} regions...")
        print(f"  Navmesh folder: {self.navmesh_folder}")
        print(f"  Prim folder: {self.prim_folder or 'Not found'}")
        print(f"  Res folder: {self.res_folder or 'Not found'}")

        for i, region_id in enumerate(regions):
            if (i + 1) % 100 == 0:
                print(f"  Progress: {i + 1}/{len(regions)}")
            self.build_region(region_id)

        print(f"Done! Loaded {len(self.collision_data)} regions")

    def save(self, output_path: str):
        """Save collision data in JSON format."""
        output_path = Path(output_path)

        # Ensure .json extension
        if output_path.suffix.lower() != '.json':
            output_path = output_path.with_suffix('.json')

        # Ensure output directory exists
        output_path.parent.mkdir(parents=True, exist_ok=True)

        print(f"Saving to {output_path}...")

        data = {
            "region_count": len(self.collision_data),
            "regions": {}
        }

        for region_id, collision in self.collision_data.items():
            data["regions"][f"0x{region_id:04x}"] = {
                "region_id": region_id,
                "x_sector": region_id & 0xFF,
                "y_sector": (region_id >> 8) & 0xFF,
                "terrain_edges": [
                    {
                        "source": {"x": e.source.x, "y": e.source.y},
                        "destination": {"x": e.destination.x, "y": e.destination.y}
                    }
                    for e in collision.terrain_edges
                ],
                "object_edges": [
                    {
                        "source": {"x": e.source.x, "y": e.source.y},
                        "destination": {"x": e.destination.x, "y": e.destination.y}
                    }
                    for e in collision.object_edges
                ]
            }

        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)

        json_size = output_path.stat().st_size / 1024 / 1024
        print(f"Saved! {output_path} ({json_size:.2f} MB)")


# =============================================================================
# CLI
# =============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Build collision data from Silkroad navmesh files",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument("data_folder", help="Folder containing navmesh/Prim/Res subfolders")
    parser.add_argument("-o", "--output", default="navmesh.json", help="Output file (default: navmesh.json)")
    parser.add_argument("-r", "--region", nargs='+', help="Process specific region(s) (hex: 3a44, 0x3a44 or decimal: 14916)")
    parser.add_argument("--all", action="store_true", help="Process all active regions")
    parser.add_argument("-v", "--verbose", action="store_true", help="Verbose output")

    args = parser.parse_args()

    if not args.region and not args.all:
        print("Error: Specify --region or --all")
        parser.print_help()
        sys.exit(1)

    builder = NavMeshBuilder(args.data_folder, verbose=args.verbose)

    def parse_region_id(region_str: str) -> int:
        """Parse region ID from string (supports hex and decimal)."""
        region_str = region_str.strip()
        if region_str.lower().startswith('0x'):
            # Explicit hex format (0x3a44)
            return int(region_str, 16)
        elif any(c in region_str.lower() for c in 'abcdef'):
            # Contains hex characters, treat as hex (3a44)
            return int(region_str, 16)
        else:
            # Pure numeric, treat as decimal (14916)
            return int(region_str)

    if args.all:
        builder.build_all()
    else:
        # Parse region IDs (supports both hex and decimal)
        region_ids = [parse_region_id(r) for r in args.region]

        builder.load_object_index()
        print(f"Building collision data for {len(region_ids)} region(s)...")
        print(f"  Navmesh folder: {builder.navmesh_folder}")
        print(f"  Prim folder: {builder.prim_folder or 'Not found'}")
        print(f"  Res folder: {builder.res_folder or 'Not found'}")

        for region_id in region_ids:
            print(f"  Processing region 0x{region_id:04x} ({region_id})...")
            builder.build_region(region_id)

    # Save JSON output
    builder.save(args.output)


if __name__ == "__main__":
    main()
