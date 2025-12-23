#!/usr/bin/env python3
"""
Silkroad Online File Parser

Parses .nvm, .bms, .bsr, .mfo, .ifo, .ddj files from Silkroad Online.

Usage:
    from silkroad_parser import NavMeshTerrain, MapInfo, ObjectIndex, Mesh, Resource

    terrain = NavMeshTerrain.from_file("nv_5971.nvm")
    map_info = MapInfo.from_file("mapinfo.mfo")
    obj_index = ObjectIndex.from_file("object.ifo")
    resource = Resource.from_file("building.bsr")
"""

import struct
import json
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Tuple, BinaryIO
from enum import IntEnum, IntFlag
from pathlib import Path


# =============================================================================
# CONSTANTS
# =============================================================================

JOYMAX_ENCODING = 'cp949'  # Korean encoding


# =============================================================================
# ENUMERATIONS
# =============================================================================

class NavEdgeFlag(IntFlag):
    """Navigation edge flags"""
    SWAP_SPACE = 0
    BIT0 = 1
    BIT1 = 2
    INLINE = 4
    SWAP_MESH = 8
    BRIDGE = 16
    BIT5 = 32
    BIT6 = 64
    SIEGE = 128


class NavEdgeDirection(IntEnum):
    """Navigation edge direction"""
    NORTH = 0
    EAST = 1
    SOUTH = 2
    WEST = 3
    NONE = 255


class NavMeshInstType(IntEnum):
    """NavMesh instance type"""
    STATIC = -1
    SKINNED = 0


class ResourceType(IntEnum):
    """Resource types"""
    CHARACTER = 0x20000
    NPC = 0x20001
    BUILDING = 0x20002
    ARTIFACT = 0x20003
    NATURE = 0x20004
    OTHER = 0x20005
    ITEM = 0x20006
    COMPOUND_SHORT = 0x10000
    COMPOUND_LONG = 0x30000


# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

def read_joymax_string(f: BinaryIO) -> str:
    """Read length-prefixed CP-949 string"""
    length = struct.unpack('<I', f.read(4))[0]
    if length == 0:
        return ""
    data = f.read(length)
    try:
        return data.decode(JOYMAX_ENCODING).rstrip('\x00')
    except:
        return data.decode('latin-1', errors='ignore').rstrip('\x00')


def read_vector2(f: BinaryIO) -> Tuple[float, float]:
    """Read 2D vector"""
    return struct.unpack('<2f', f.read(8))


def read_vector3(f: BinaryIO) -> Tuple[float, float, float]:
    """Read 3D vector"""
    return struct.unpack('<3f', f.read(12))


def region_id_to_sectors(region_id: int) -> Tuple[int, int]:
    """Convert region ID to (x_sector, y_sector)"""
    return region_id & 0xFF, (region_id >> 8) & 0xFF


def sectors_to_region_id(x_sector: int, y_sector: int) -> int:
    """Convert sectors to region ID"""
    return (y_sector << 8) | x_sector


def reverse_bits(byte: int) -> int:
    """Reverse bits in a byte"""
    result = 0
    for i in range(8):
        if byte & (1 << i):
            result |= 1 << (7 - i)
    return result


# =============================================================================
# DATA CLASSES
# =============================================================================

@dataclass
class Vector2:
    x: float
    y: float


@dataclass
class Vector3:
    x: float
    y: float
    z: float


@dataclass
class Rectangle:
    x_min: float
    y_min: float
    x_max: float
    y_max: float


@dataclass
class BoundingBox:
    min: Vector3
    max: Vector3


# =============================================================================
# NVM - NAVMESH TERRAIN
# =============================================================================

@dataclass
class NavMeshInstMount:
    """Object mount point"""
    short0: int
    short1: int
    short2: int

    @classmethod
    def from_stream(cls, f: BinaryIO) -> 'NavMeshInstMount':
        return cls(*struct.unpack('<3h', f.read(6)))


@dataclass
class NavMeshInst:
    """Object instance in navmesh"""
    id: int
    position: Vector3
    type: int  # 0=Skinned, 1=Static (stored as ushort)
    angle: float  # radians (AngleSingle is a float)
    unique_id: int
    byte0: int
    byte1: int
    is_large: bool
    is_structure: bool
    region_id: int
    mounts: List[NavMeshInstMount] = field(default_factory=list)

    @classmethod
    def from_stream(cls, f: BinaryIO) -> 'NavMeshInst':
        obj_id = struct.unpack('<i', f.read(4))[0]
        pos = Vector3(*read_vector3(f))
        obj_type = struct.unpack('<H', f.read(2))[0]  # uint16
        angle = struct.unpack('<f', f.read(4))[0]  # AngleSingle is a float (4 bytes)
        unique_id = struct.unpack('<H', f.read(2))[0]
        byte0, byte1 = struct.unpack('<2B', f.read(2))
        is_large = struct.unpack('<B', f.read(1))[0] != 0
        is_structure = struct.unpack('<B', f.read(1))[0] != 0
        region_id = struct.unpack('<H', f.read(2))[0]
        mount_count = struct.unpack('<h', f.read(2))[0]  # int16
        mounts = [NavMeshInstMount.from_stream(f) for _ in range(mount_count)]

        return cls(
            id=obj_id, position=pos, type=obj_type, angle=angle,
            unique_id=unique_id, byte0=byte0, byte1=byte1,
            is_large=is_large, is_structure=is_structure,
            region_id=region_id, mounts=mounts
        )


@dataclass
class NavCellQuad:
    """Quad cell"""
    rectangle: Rectangle
    instances: List[int] = field(default_factory=list)

    @classmethod
    def from_stream(cls, f: BinaryIO) -> 'NavCellQuad':
        rect = Rectangle(*struct.unpack('<4f', f.read(16)))
        count = struct.unpack('<B', f.read(1))[0]  # byte, not ushort
        instances = list(struct.unpack(f'<{count}H', f.read(count * 2))) if count else []
        return cls(rectangle=rect, instances=instances)


@dataclass
class NavEdgeInternal:
    """Internal edge"""
    min: Vector2
    max: Vector2
    flag: int
    direction_source: int
    direction_destination: int
    cell_source: int
    cell_destination: int

    @property
    def has_neighbour_cell(self) -> bool:
        return self.cell_source == 0xFFFF or self.cell_destination == 0xFFFF

    @classmethod
    def from_stream(cls, f: BinaryIO) -> 'NavEdgeInternal':
        min_v = Vector2(*read_vector2(f))
        max_v = Vector2(*read_vector2(f))
        flag, dir_src, dir_dst = struct.unpack('<3B', f.read(3))
        # No padding byte here
        cell_src, cell_dst = struct.unpack('<2H', f.read(4))
        return cls(min=min_v, max=max_v, flag=flag,
                   direction_source=dir_src, direction_destination=dir_dst,
                   cell_source=cell_src, cell_destination=cell_dst)


@dataclass
class NavEdgeGlobal:
    """Global edge (crosses regions)"""
    min: Vector2
    max: Vector2
    flag: int
    direction_source: int
    direction_destination: int
    cell_source: int
    cell_destination: int
    region_source: int
    region_destination: int

    @property
    def has_neighbour_cell(self) -> bool:
        return self.cell_source == 0xFFFF or self.cell_destination == 0xFFFF

    @property
    def has_neighbour_region(self) -> bool:
        return self.region_source == 0xFFFF or self.region_destination == 0xFFFF

    @classmethod
    def from_stream(cls, f: BinaryIO) -> 'NavEdgeGlobal':
        min_v = Vector2(*read_vector2(f))
        max_v = Vector2(*read_vector2(f))
        flag, dir_src, dir_dst = struct.unpack('<3B', f.read(3))
        # No padding byte here
        cell_src, cell_dst = struct.unpack('<2H', f.read(4))
        region_src, region_dst = struct.unpack('<2H', f.read(4))
        return cls(min=min_v, max=max_v, flag=flag,
                   direction_source=dir_src, direction_destination=dir_dst,
                   cell_source=cell_src, cell_destination=cell_dst,
                   region_source=region_src, region_destination=region_dst)


@dataclass
class NavMeshTerrain:
    """NVM file - Navigation mesh terrain"""
    signature: str = ""
    objects: List[NavMeshInst] = field(default_factory=list)
    cells: List[NavCellQuad] = field(default_factory=list)
    global_edges: List[NavEdgeGlobal] = field(default_factory=list)
    internal_edges: List[NavEdgeInternal] = field(default_factory=list)

    @classmethod
    def from_file(cls, filepath: str) -> 'NavMeshTerrain':
        with open(filepath, 'rb') as f:
            return cls.from_stream(f)

    @classmethod
    def from_bytes(cls, data: bytes) -> 'NavMeshTerrain':
        import io
        return cls.from_stream(io.BytesIO(data))

    @classmethod
    def from_stream(cls, f: BinaryIO) -> 'NavMeshTerrain':
        terrain = cls()

        # Signature
        terrain.signature = f.read(12).decode('ascii').rstrip('\x00')
        if terrain.signature != "JMXVNVM 1000":
            raise ValueError(f"Invalid NVM signature: {terrain.signature}")

        # Objects
        count = struct.unpack('<h', f.read(2))[0]
        terrain.objects = [NavMeshInst.from_stream(f) for _ in range(count)]

        # Cells
        count = struct.unpack('<i', f.read(4))[0]
        f.read(4)  # padding
        terrain.cells = [NavCellQuad.from_stream(f) for _ in range(count)]

        # Global edges
        count = struct.unpack('<i', f.read(4))[0]
        terrain.global_edges = [NavEdgeGlobal.from_stream(f) for _ in range(count)]

        # Internal edges
        count = struct.unpack('<i', f.read(4))[0]
        terrain.internal_edges = [NavEdgeInternal.from_stream(f) for _ in range(count)]

        return terrain

    def to_dict(self) -> dict:
        return {
            'signature': self.signature,
            'objects': [asdict(o) for o in self.objects],
            'cells': [asdict(c) for c in self.cells],
            'global_edges': [asdict(e) for e in self.global_edges],
            'internal_edges': [asdict(e) for e in self.internal_edges]
        }


# =============================================================================
# BMS - MESH COLLISION
# =============================================================================

@dataclass
class MeshPoint:
    """Collision mesh point"""
    position: Vector3
    flag: int


@dataclass
class MeshOutline:
    """Collision mesh edge"""
    point_index_a: int
    point_index_b: int
    neighbour_a: int
    neighbour_b: int
    flag: int


@dataclass
class Mesh:
    """BMS file - Collision mesh

    File structure:
        - Header: "JMXVBMS 0110" (12 bytes)
        - Pointers: vertex, skin, face, cloth, clothedge, bbox, gate, navmesh, unk, unk, unk, navflag
        - Data sections at pointer offsets
    """
    signature: str = ""
    filename: str = ""
    bounding_box: Optional[BoundingBox] = None
    nav_flag: int = 0
    points: List[MeshPoint] = field(default_factory=list)
    outlines: List[MeshOutline] = field(default_factory=list)

    @classmethod
    def from_file(cls, filepath: str) -> 'Mesh':
        with open(filepath, 'rb') as f:
            mesh = cls.from_stream(f)
            mesh.filename = filepath
            return mesh

    @classmethod
    def from_bytes(cls, data: bytes) -> 'Mesh':
        import io
        return cls.from_stream(io.BytesIO(data))

    @classmethod
    def from_stream(cls, f: BinaryIO) -> 'Mesh':
        mesh = cls()

        # Signature (12 bytes)
        mesh.signature = f.read(12).decode('ascii').rstrip('\x00')
        if mesh.signature != "JMXVBMS 0110":
            raise ValueError(f"Invalid BMS signature: {mesh.signature}")

        # Read pointers (12 x uint32)
        f.read(4)  # vertex_ptr
        f.read(4)  # skin_ptr
        f.read(4)  # face_ptr
        f.read(4)  # cloth_ptr
        f.read(4)  # clothedge_ptr
        bbox_ptr = struct.unpack('<I', f.read(4))[0]
        f.read(4)  # gate_ptr
        navmesh_ptr = struct.unpack('<I', f.read(4))[0]
        f.read(4)  # unk_ptr1
        f.read(4)  # unk_ptr2
        f.read(4)  # unk_data
        mesh.nav_flag = struct.unpack('<I', f.read(4))[0]

        # Read bounding box
        if bbox_ptr > 0:
            f.seek(bbox_ptr)
            min_v = Vector3(*read_vector3(f))
            max_v = Vector3(*read_vector3(f))
            mesh.bounding_box = BoundingBox(min=min_v, max=max_v)

        # Read navmesh collision data
        if navmesh_ptr == 0:
            return mesh  # No collision data

        f.seek(navmesh_ptr)

        # Read points
        points_count = struct.unpack('<I', f.read(4))[0]
        for _ in range(points_count):
            pos = Vector3(*read_vector3(f))
            flag = struct.unpack('<B', f.read(1))[0]
            mesh.points.append(MeshPoint(position=pos, flag=flag))

        # Read grounds (skip)
        grounds_count = struct.unpack('<I', f.read(4))[0]
        for _ in range(grounds_count):
            f.read(8)  # 4 x uint16 (triangle indices)
            if (mesh.nav_flag & 2) == 2:
                f.read(1)  # extra byte

        # Read outlines
        outlines_count = struct.unpack('<I', f.read(4))[0]
        for _ in range(outlines_count):
            idx_a = struct.unpack('<H', f.read(2))[0]
            idx_b = struct.unpack('<H', f.read(2))[0]
            neighbour_a = struct.unpack('<H', f.read(2))[0]
            neighbour_b = struct.unpack('<H', f.read(2))[0]
            flag = struct.unpack('<B', f.read(1))[0]

            if (mesh.nav_flag & 1) == 1:
                f.read(1)  # extra byte

            mesh.outlines.append(MeshOutline(
                point_index_a=idx_a,
                point_index_b=idx_b,
                neighbour_a=neighbour_a,
                neighbour_b=neighbour_b,
                flag=flag
            ))

        return mesh

    def to_dict(self) -> dict:
        return {
            'signature': self.signature,
            'filename': self.filename,
            'nav_flag': self.nav_flag,
            'bounding_box': asdict(self.bounding_box) if self.bounding_box else None,
            'points': [asdict(p) for p in self.points],
            'outlines': [asdict(o) for o in self.outlines]
        }


# =============================================================================
# RES - RESOURCE
# =============================================================================

@dataclass
class Resource:
    """RES file - Resource definition"""
    signature: str = ""
    type: int = 0
    name: str = ""
    mesh_path: str = ""

    @classmethod
    def from_file(cls, filepath: str) -> 'Resource':
        with open(filepath, 'rb') as f:
            return cls.from_stream(f)

    @classmethod
    def from_bytes(cls, data: bytes) -> 'Resource':
        import io
        return cls.from_stream(io.BytesIO(data))

    @classmethod
    def from_stream(cls, f: BinaryIO) -> 'Resource':
        res = cls()

        # Signature
        res.signature = f.read(12).decode('ascii').rstrip('\x00')
        if not res.signature.startswith("JMXVRES"):
            raise ValueError(f"Invalid RES signature: {res.signature}")

        # Read pointers (8 x uint32)
        f.read(4)  # Material pointer
        f.read(4)  # Mesh pointer
        f.read(4)  # Skeleton pointer
        f.read(4)  # Animation pointer
        f.read(4)  # Mesh group pointer
        f.read(4)  # Animation group pointer
        f.read(4)  # Sound effect pointer
        bounding_box_ptr = struct.unpack('<I', f.read(4))[0]  # BoundingBox pointer

        # Skip flags (20 bytes)
        f.read(20)

        # Type
        res.type = struct.unpack('<I', f.read(4))[0]

        # Name
        res.name = read_joymax_string(f)

        # Mesh path - seek to bounding box pointer position
        # Only for certain resource types (Building, Artifact, Nature, CompoundObject)
        if bounding_box_ptr > 0 and res.type in (0x20002, 0x20003, 0x20004, 0x10000, 0x30000):
            f.seek(bounding_box_ptr)
            res.mesh_path = read_joymax_string(f)

        return res

    def to_dict(self) -> dict:
        return asdict(self)


# =============================================================================
# MFO - MAP INFO
# =============================================================================

@dataclass
class MapInfo:
    """MFO file - Map information"""
    signature: str = ""
    name: str = ""
    active_regions: List[bool] = field(default_factory=list)

    # Constants
    REGIONS_X = 256
    REGIONS_Y = 256
    REGIONS_TOTAL = REGIONS_X * REGIONS_Y  # 65536
    REGIONS_BUFFER_SIZE = REGIONS_TOTAL // 8  # 8192 bytes

    @classmethod
    def from_file(cls, filepath: str) -> 'MapInfo':
        with open(filepath, 'rb') as f:
            return cls.from_stream(f)

    @classmethod
    def from_bytes(cls, data: bytes) -> 'MapInfo':
        import io
        return cls.from_stream(io.BytesIO(data))

    @classmethod
    def from_stream(cls, f: BinaryIO) -> 'MapInfo':
        info = cls()

        # Signature (12 bytes)
        info.signature = f.read(12).decode('ascii').rstrip('\x00')
        if info.signature != "JMXVMFO 1000":
            raise ValueError(f"Invalid MFO signature: {info.signature}")

        # Name (12 bytes) - skip
        info.name = f.read(12).decode('ascii', errors='ignore').rstrip('\x00')

        # Region bitmap (8192 bytes = 65536 bits = 256x256 regions)
        bitmap = f.read(cls.REGIONS_BUFFER_SIZE)
        info.active_regions = []
        for byte in bitmap:
            reversed_byte = reverse_bits(byte)
            for i in range(8):
                info.active_regions.append(bool(reversed_byte & (1 << i)))

        return info

    def is_region_active(self, region_id: int) -> bool:
        if 0 <= region_id < len(self.active_regions):
            return self.active_regions[region_id]
        return False

    def get_active_region_ids(self) -> List[int]:
        return [i for i, active in enumerate(self.active_regions) if active]

    def to_dict(self) -> dict:
        return {
            'signature': self.signature,
            'active_region_count': len(self.get_active_region_ids()),
            'active_regions': self.get_active_region_ids()
        }


# =============================================================================
# IFO - OBJECT INDEX (TEXT FORMAT)
# =============================================================================

@dataclass
class ObjectIndex:
    """IFO file - Object index (text-based format)

    Format:
        Line 1: JMXVOBJI1000
        Line 2: count
        Lines 3+: XXXXX ............. "path/to/resource"
                  (ID at pos 0-4, path at pos 18+, quoted)
    """
    signature: str = ""
    entries: Dict[int, str] = field(default_factory=dict)

    @classmethod
    def from_file(cls, filepath: str) -> 'ObjectIndex':
        with open(filepath, 'r', encoding='ascii', errors='ignore') as f:
            return cls.from_text_stream(f)

    @classmethod
    def from_bytes(cls, data: bytes) -> 'ObjectIndex':
        import io
        text = data.decode('ascii', errors='ignore')
        return cls.from_text_stream(io.StringIO(text))

    @classmethod
    def from_text_stream(cls, f) -> 'ObjectIndex':
        index = cls()

        # Signature (line 1)
        index.signature = f.readline().strip()
        if index.signature != "JMXVOBJI1000":
            raise ValueError(f"Invalid IFO signature: {index.signature}")

        # Entry count (line 2)
        count = int(f.readline().strip())

        # Read remaining content
        content = f.read()
        lines = content.split('\n')

        # Parse entries
        for i in range(min(count, len(lines))):
            line = lines[i]
            if len(line) < 19:
                continue
            try:
                obj_id = int(line[0:5].strip())
                # Path starts at position 18, strip quotes
                path = line[18:].strip().strip('"')
                index.entries[obj_id] = path
            except (ValueError, IndexError):
                continue

        return index

    def get_resource_path(self, object_id: int) -> Optional[str]:
        return self.entries.get(object_id)

    def to_dict(self) -> dict:
        return {
            'signature': self.signature,
            'entry_count': len(self.entries),
            'entries': {str(k): v for k, v in self.entries.items()}
        }


# =============================================================================
# OBJECTSTRING.IFO - Object string names
# =============================================================================

@dataclass
class ObjectStringIndex:
    """objectstring.ifo - Named object references

    Format:
        Line 1: JMXVOBJI1000
        Line 2: count
        Lines 3+: 0xHHHHHHHH 0xHHHHHHHH N M 0xHH... 0xHH... 0xHH... 0xHH... "NAME"
    """
    signature: str = ""
    entries: Dict[str, dict] = field(default_factory=dict)

    @classmethod
    def from_file(cls, filepath: str) -> 'ObjectStringIndex':
        with open(filepath, 'r', encoding='ascii', errors='ignore') as f:
            return cls.from_text_stream(f)

    @classmethod
    def from_text_stream(cls, f) -> 'ObjectStringIndex':
        index = cls()

        index.signature = f.readline().strip()
        if index.signature != "JMXVOBJI1000":
            raise ValueError(f"Invalid signature: {index.signature}")

        count = int(f.readline().strip())

        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                # Extract the name (quoted string at end)
                if '"' in line:
                    name_start = line.rfind('"', 0, line.rfind('"'))
                    name = line[name_start:].strip('"')
                    parts = line[:name_start].split()
                    if len(parts) >= 2:
                        index.entries[name] = {
                            'id1': parts[0],
                            'id2': parts[1],
                            'raw': line
                        }
            except:
                continue

        return index

    def to_dict(self) -> dict:
        return {
            'signature': self.signature,
            'entry_count': len(self.entries),
            'entries': self.entries
        }


# =============================================================================
# TILE2D.IFO - 2D Tile textures
# =============================================================================

@dataclass
class Tile2DIndex:
    """tile2d.ifo - 2D tile texture index

    Format:
        Line 1: JMXV2DTI1001
        Line 2: count
        Lines 3+: NNNNN 0xHHHHHHHH "category" "filename.ddj"
    """
    signature: str = ""
    entries: List[dict] = field(default_factory=list)

    @classmethod
    def from_file(cls, filepath: str) -> 'Tile2DIndex':
        with open(filepath, 'r', encoding='ascii', errors='ignore') as f:
            return cls.from_text_stream(f)

    @classmethod
    def from_text_stream(cls, f) -> 'Tile2DIndex':
        index = cls()

        index.signature = f.readline().strip()
        if index.signature != "JMXV2DTI1001":
            raise ValueError(f"Invalid signature: {index.signature}")

        count = int(f.readline().strip())

        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                # Parse: NNNNN 0xHHHHHHHH "category" "filename"
                parts = line.split('"')
                if len(parts) >= 4:
                    prefix = parts[0].split()
                    index.entries.append({
                        'id': int(prefix[0]) if prefix else 0,
                        'flags': prefix[1] if len(prefix) > 1 else "0x0",
                        'category': parts[1],
                        'filename': parts[3]
                    })
            except:
                continue

        return index

    def to_dict(self) -> dict:
        return {
            'signature': self.signature,
            'entry_count': len(self.entries),
            'entries': self.entries
        }


# =============================================================================
# DDJ - IMAGE
# =============================================================================

def convert_ddj_to_dds(ddj_data: bytes) -> bytes:
    """Strip 20-byte DDJ header to get DDS data"""
    if len(ddj_data) <= 20:
        raise ValueError("DDJ data too short")
    return ddj_data[20:]


def parse_ddj(filepath: str) -> bytes:
    """Parse DDJ file and return DDS data"""
    with open(filepath, 'rb') as f:
        return convert_ddj_to_dds(f.read())


# =============================================================================
# MAIN - CLI USAGE
# =============================================================================

if __name__ == "__main__":
    import sys

    def print_json(data: dict):
        print(json.dumps(data, indent=2, default=str))

    # Parse arguments
    args = sys.argv[1:]
    png_mode = False
    filepath = None

    for arg in args:
        if arg == '--png':
            png_mode = True
        elif not arg.startswith('-'):
            filepath = arg

    if not filepath:
        print("Silkroad File Parser")
        print("=" * 40)
        print("\nUsage:")
        print("  python silkroad_parser.py <file> [options]")
        print("\nOptions:")
        print("  --png   Convert DDJ directly to PNG (requires Pillow)")
        print("\nSupported formats:")
        print("  .nvm  - NavMesh terrain")
        print("  .bms  - Mesh collision")
        print("  .bsr  - Resource definition (game files)")
        print("  .mfo  - Map info")
        print("  .ifo  - Object index")
        print("  .ddj  - Image (converts to .dds, or .png with --png)")
        sys.exit(0)
    ext = Path(filepath).suffix.lower()

    try:
        if ext == '.nvm':
            data = NavMeshTerrain.from_file(filepath)
            print(f"NVM: {filepath}")
            print(f"  Objects: {len(data.objects)}")
            print(f"  Cells: {len(data.cells)}")
            print(f"  Global Edges: {len(data.global_edges)}")
            print(f"  Internal Edges: {len(data.internal_edges)}")

            # Save JSON
            out = filepath.replace('.nvm', '.json')
            with open(out, 'w') as f:
                json.dump(data.to_dict(), f, indent=2, default=str)
            print(f"  Saved: {out}")

        elif ext == '.bms':
            data = Mesh.from_file(filepath)
            print(f"BMS: {filepath}")
            print(f"  Filename: {data.filename}")
            print(f"  Points: {len(data.points)}")
            print(f"  Outlines: {len(data.outlines)}")

            out = filepath.replace('.bms', '.json')
            with open(out, 'w') as f:
                json.dump(data.to_dict(), f, indent=2, default=str)
            print(f"  Saved: {out}")

        elif ext in ('.res', '.bsr'):
            data = Resource.from_file(filepath)
            print(f"{'BSR' if ext == '.bsr' else 'RES'}: {filepath}")
            print(f"  Type: {data.type:#x}")
            print(f"  Name: {data.name}")
            print(f"  Mesh: {data.mesh_path}")

            out = filepath.replace(ext, '.json')
            with open(out, 'w') as f:
                json.dump(data.to_dict(), f, indent=2)
            print(f"  Saved: {out}")

        elif ext == '.mfo':
            data = MapInfo.from_file(filepath)
            print(f"MFO: {filepath}")
            active = data.get_active_region_ids()
            print(f"  Active Regions: {len(active)}")
            print(f"  First 10: {active[:10]}")

            out = filepath.replace('.mfo', '.json')
            with open(out, 'w') as f:
                json.dump(data.to_dict(), f, indent=2)
            print(f"  Saved: {out}")

        elif ext == '.ifo':
            # Detect IFO subtype by reading first line
            with open(filepath, 'r', encoding='ascii', errors='ignore') as f:
                sig = f.readline().strip()

            if sig == "JMXVOBJI1000":
                # Check if it's objectstring or regular object.ifo
                with open(filepath, 'r', encoding='ascii', errors='ignore') as f:
                    f.readline()  # skip sig
                    f.readline()  # skip count
                    sample = f.readline()

                if sample.startswith('0x'):
                    # objectstring.ifo format
                    data = ObjectStringIndex.from_file(filepath)
                    print(f"IFO (ObjectString): {filepath}")
                    print(f"  Entries: {len(data.entries)}")
                    for i, (k, v) in enumerate(list(data.entries.items())[:5]):
                        print(f"    {k}")
                    if len(data.entries) > 5:
                        print(f"    ... and {len(data.entries) - 5} more")
                else:
                    # object.ifo format
                    data = ObjectIndex.from_file(filepath)
                    print(f"IFO (ObjectIndex): {filepath}")
                    print(f"  Entries: {len(data.entries)}")
                    for i, (k, v) in enumerate(list(data.entries.items())[:5]):
                        print(f"    {k}: {v}")
                    if len(data.entries) > 5:
                        print(f"    ... and {len(data.entries) - 5} more")

            elif sig == "JMXV2DTI1001":
                data = Tile2DIndex.from_file(filepath)
                print(f"IFO (Tile2D): {filepath}")
                print(f"  Entries: {len(data.entries)}")
                for entry in data.entries[:5]:
                    print(f"    {entry['id']}: {entry['category']}/{entry['filename']}")
                if len(data.entries) > 5:
                    print(f"    ... and {len(data.entries) - 5} more")

            else:
                print(f"Unknown IFO format: {sig}")
                sys.exit(1)

            out = filepath.replace('.ifo', '.json')
            with open(out, 'w') as f:
                json.dump(data.to_dict(), f, indent=2)
            print(f"  Saved: {out}")

        elif ext == '.ddj':
            dds_data = parse_ddj(filepath)
            print(f"DDJ: {filepath}")
            print(f"  Size: {len(dds_data)} bytes")

            if png_mode:
                # Convert directly to PNG
                try:
                    from PIL import Image
                    import io
                    img = Image.open(io.BytesIO(dds_data))
                    out = filepath.replace('.ddj', '.png')
                    img.save(out)
                    print(f"  Format: {img.size[0]}x{img.size[1]} {img.mode}")
                    print(f"  Saved: {out}")
                except ImportError:
                    print("  Error: Pillow not installed. Run: pip install Pillow")
            else:
                # Save as DDS
                out = filepath.replace('.ddj', '.dds')
                with open(out, 'wb') as f:
                    f.write(dds_data)
                print(f"  Saved: {out}")

        else:
            print(f"Unknown format: {ext}")

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
