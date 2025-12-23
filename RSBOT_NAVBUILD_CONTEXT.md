# RSBot NavBuilder - Technical Context Document

> This document provides comprehensive technical documentation for developers and AI coding agents working with the RSBot NavBuilder codebase. It covers the navigation mesh system, collision system, coordinate system, and PK2 file handling.

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture and Directory Structure](#2-architecture-and-directory-structure)
3. [Navigation Mesh System](#3-navigation-mesh-system)
4. [Collision System](#4-collision-system)
5. [Coordinate System](#5-coordinate-system)
6. [PK2 File Handling](#6-pk2-file-handling)
7. [Data Conversion and Export](#7-data-conversion-and-export)
8. [File Format Specifications](#8-file-format-specifications)
9. [Key Classes Reference](#9-key-classes-reference)
10. [Known Limitations](#10-known-limitations)

---

## 1. Project Overview

**Purpose:** Windows Forms (.NET Framework 4.7.2) application for generating navigation collision data from Silkroad Online client files.

**Primary Function:** Extract navmesh and collision data from PK2 archives, process it, and export to a binary format (`.wg` + `.idx`) for use by bot navigation systems.

**Key Dependencies:**
- `RoadShark.Pk2` - PK2 archive reading/parsing with Blowfish encryption support
- `SharpDX` - DirectX graphics and math libraries (Vector2, Vector3, BoundingBox, etc.)
- `System.Windows.Forms` - UI framework

---

## 2. Architecture and Directory Structure

```
/NavBuilder/
├── Program.cs                 # Entry point (STA Thread, launches Window form)
├── Globals.cs                 # Global state holder (CurrentProject)
├── Window.cs                  # Main UI/Form window
├── ExportWindow.cs            # Export dialog/window
├── NewProjectWindow.cs        # New project creation dialog
├── NewRegionForm.cs           # Region form dialog
├── App.config                 # Application configuration
│
├── Core/                      # Core business logic
│   ├── Project.cs             # Project management (name, path, output file)
│   ├── Config.cs              # Configuration file handler (key-value pairs)
│   ├── FileEvents.cs          # Event system for file loading reporting
│   ├── BinaryReaderExtensions.cs
│   ├── ByteExtensions.cs      # Bit manipulation utilities
│   ├── Pk2Extensions.cs       # PK2 file extensions
│   │
│   ├── Collision/             # Collision detection system
│   │   ├── CollisionDetector.cs
│   │   └── LineIntersection.cs
│   │
│   ├── Export/                # Export functionality
│   │   ├── CollisionExporter.cs  # Exports collision data to .wg/.idx
│   │   └── CollisionLoader.cs    # Loads exported collision data
│   │
│   ├── Mesh/                  # Mesh/object management
│   │   ├── Mesh.cs
│   │   ├── MeshOutline.cs
│   │   └── MeshPoint.cs
│   │
│   ├── Navmesh/               # Navigation mesh structures and loading
│   │   ├── NavMeshManager.cs     # Cache manager for navmesh files
│   │   ├── IO/
│   │   │   └── NavMeshReader.cs  # Binary reader for navmesh files
│   │   └── Struct/               # Data structures
│   │       ├── NavMesh.cs        # Abstract base class
│   │       ├── NavMeshTerrain.cs # Main terrain implementation
│   │       ├── NavMeshInst.cs    # Object instances
│   │       ├── NavMeshInstMount.cs
│   │       ├── NavCell.cs        # Abstract cell
│   │       ├── NavCellTri.cs     # Triangle cell
│   │       ├── NavCellQuad.cs    # Quad cell
│   │       ├── NavEdge.cs        # Abstract edge
│   │       ├── NavEdgeInternal.cs
│   │       ├── NavEdgeGlobal.cs
│   │       ├── NavVertex.cs
│   │       ├── NavFlag.cs        # Enumerations
│   │       ├── NavEdgeFlag.cs
│   │       └── NavEdgeDirection.cs
│   │
│   ├── Map/                   # Region and map information
│   │   ├── MapInfo.cs
│   │   ├── ObjectInfo.cs
│   │   └── Region.cs
│   │
│   └── GraphicsUtilities/     # Line geometry utilities
│       └── Line.cs
│
├── Client/                    # PK2 file access layer
│   ├── Pk2Controller.cs       # PK2 archive management
│   └── DDSImage.cs            # DDS image format conversion
│
└── UI/                        # User interface components
    ├── MapCanvas.cs           # SharpDX rendering surface
    ├── PathBrowser.cs         # File browser dialog
    ├── ListView.cs            # Custom list view
    └── NativeMethods.cs       # Win32 interop
```

### Class Relationship Diagram

```
PROJECT HIERARCHY:

Window (UI)
  │
  ├─── Globals.CurrentProject
  │    └── Project
  │        └── Config
  │
  └─── MapCanvas (Rendering)
       │
       ├── NavMeshManager (Static Cache)
       │   └── NavMeshTerrain
       │       ├── List<NavMeshInst> Objects
       │       │   └── Resource → Mesh
       │       │       ├── List<MeshOutline> Outlines
       │       │       └── List<MeshPoint> Points
       │       ├── List<NavCellQuad> Cells
       │       ├── List<NavEdgeGlobal> GlobalEdges
       │       └── List<NavEdgeInternal> InternalEdges
       │
       ├── Pk2Controller (Static)
       │   ├── PK2Archive Media  (media.pk2)
       │   ├── PK2Archive Data   (data.pk2)
       │   └── PK2Archive Map    (map.pk2)
       │
       └── CollisionExporter
           └── CollisionDetector
               └── LineIntersection
```

---

## 3. Navigation Mesh System

### 3.1 Overview

The navigation mesh system is **hierarchical and block-based**, dividing the game world into regions, blocks, and cells for efficient pathfinding and collision detection.

### 3.2 Key Constants

From `NavMeshTerrain.cs`:

| Constant | Value | Description |
|----------|-------|-------------|
| `BlocksX` | 6 | Blocks per region (X-axis) |
| `BlocksZ` | 6 | Blocks per region (Z-axis) |
| `CellsX` | 96 | Cells per region (X-axis) |
| `CellsZ` | 96 | Cells per region (Z-axis) |
| `VerticiesX` | 97 | Vertices per region (X-axis) |
| `VerticiesZ` | 97 | Vertices per region (Z-axis) |

**Total per region:**
- 36 blocks (6×6)
- 9,216 cells (96×96)
- 9,409 vertices (97×97)

### 3.3 Core Data Structures

#### NavMeshTerrain

Main terrain navigation mesh implementation. Loads from `.nvm` files.

```csharp
public class NavMeshTerrain : NavMesh {
    public List<NavMeshInst> Objects;      // Placed object instances
    public List<NavCellQuad> Cells;        // Terrain cells
    public List<NavEdgeGlobal> GlobalEdges;     // Region boundary edges
    public List<NavEdgeInternal> InternalEdges; // Internal cell edges
}
```

**Loading Process:**
1. Validate signature: `"JMXVNVM 1000"`
2. Read object count (int16) and load NavMeshInst list
3. Read cell count (int32) + padding, load NavCellQuad list
4. Read global edge count (int32), load NavEdgeGlobal list
5. Read internal edge count (int32), load NavEdgeInternal list

#### NavMeshInst (Object Instance)

Represents a 3D object placed on the navmesh:

```csharp
public class NavMeshInst : INavData {
    public int Id;                    // Resource identifier
    public Vector3 Position;          // XYZ world coordinates
    public NavMeshInstType Type;      // Static (-1) or Skinned (0)
    public AngleSingle Angle;         // Rotation in degrees
    public ushort UniqueId;           // Instance-specific ID
    public byte Byte0, Byte1;         // Unknown flag data
    public bool IsLarge;              // Exceeds region bounds
    public bool IsStructure;          // Requires objectstring.ifo entry
    public ushort RegionId;           // Parent region
    public List<NavMeshInstMount> Mounts;  // Sub-component mounts
    public Resource Resource;         // Associated mesh/collision data (lazy-loaded)
}
```

#### NavCellQuad (Quad Cell)

Rectangular cell representation:

```csharp
public class NavCellQuad : NavCell, INavData {
    public RectangleF Rectangle;      // xMin, yMin, xMax, yMax bounds
    public List<ushort> Instances;    // Object instance indices within quad
}
```

#### NavEdge Classes

**NavEdge (Abstract Base):**
```csharp
public abstract class NavEdge : INavData {
    public Vector2 Min, Max;              // Edge boundaries in 2D space
    public NavEdgeFlag Flag;              // Movement/transition flags
    public NavEdgeDirection DirectionSource;
    public NavEdgeDirection DirectionDestination;
}
```

**NavEdgeInternal:**
```csharp
public class NavEdgeInternal : NavEdge {
    public ushort CellSource, CellDestination;
    public bool HasNeighbourCell;  // True if either cell index is ushort.MaxValue
}
```

**NavEdgeGlobal:**
```csharp
public class NavEdgeGlobal : NavEdgeInternal {
    public ushort RegionSource, RegionDestination;
    public bool HasNeighbourRegion;  // True if either is ushort.MaxValue
}
```

### 3.4 Enumerations

#### NavFlag
```csharp
[Flags]
public enum NavFlag {
    None = 0,
    Edge = 1,
    Cell = 2,
    Event = 4
}
```

#### NavEdgeFlag
```csharp
[Flags]
public enum NavEdgeFlag {
    SwapSpace = 0,   // Terrain↔Object transition
    Bit0 = 1,        // Block Vertex2Vertex
    Bit1 = 2,        // Block Cell2Cell
    Inline = 4,      // IsInline flag
    SwapMesh = 8,    // Mesh transition
    Bridge = 16,     // Passable when walking underneath
    Bit5 = 32,
    Bit6 = 64,
    Siege = 128      // Fortress-related
}
```

#### NavEdgeDirection
```csharp
public enum NavEdgeDirection : byte {
    North = 0,
    East = 1,
    South = 2,
    West = 3,
    X = 255  // None/undefined
}
```

### 3.5 NavMeshManager

Static cache manager for navmesh files:

```csharp
public static class NavMeshManager {
    private static Dictionary<string, NavMeshTerrain> _cache;

    public static NavMeshTerrain LoadNavmesh(string filename) {
        if (!_cache.ContainsKey(filename)) {
            _cache[filename] = new NavMeshTerrain();
            _cache[filename].Load(filename);
        }
        return _cache[filename];
    }
}
```

---

## 4. Collision System

### 4.1 Overview

The collision system uses **2D line-segment intersection detection** for collision checking on a projected 2D plane.

### 4.2 Line Structure

```csharp
public struct Line {
    public Point Source;       // Start point (X, Y as integers)
    public Point Destination;  // End point (X, Y as integers)
}
```

### 4.3 LineIntersection Algorithm

Location: `/Core/Collision/LineIntersection.cs`

**Algorithm:** Parametric line equation solving

```csharp
public static Point FindIntersection(Line lineA, Line lineB, double tolerance = 1)
```

**Mathematical Basis:**
- Represents each line as: `-m*x + y = c` (slope-intercept form)
- Solves the system of equations for intersection point
- Handles special cases:
  - Vertical lines (infinite slope)
  - Horizontal lines (zero slope)
  - Parallel lines (no intersection)

**Process:**
1. Calculate slope (m) and y-intercept (c) for both lines
2. Solve for intersection point (x, y)
3. Verify solution satisfies both original equations (within tolerance)
4. Validate intersection point falls within both line segments (not just the extended lines)
5. Return intersection Point or `default(Point)` if no intersection

### 4.4 CollisionDetector

Location: `/Core/Collision/CollisionDetector.cs`

```csharp
public static class CollisionDetector {
    public static Point HasCollisionBetween(
        Point source,
        Point destination,
        List<Line> obstacles)
    {
        var movementLine = new Line { Source = source, Destination = destination };

        foreach (var obstacle in obstacles) {
            var intersection = LineIntersection.FindIntersection(movementLine, obstacle);
            if (intersection != default(Point)) {
                return intersection;  // First collision found
            }
        }

        return default(Point);  // No collision
    }
}
```

### 4.5 Coordinate Inversion

During collision data export, Y-coordinates are **inverted**:

```csharp
new Point(x, 1920 - y)  // 1920 is the max Y coordinate for a region
```

This converts from navmesh space to collision detection space.

---

## 5. Coordinate System

### 5.1 3D World Coordinates

Uses SharpDX `Vector3`:
- **X-axis:** East-West (increases toward East)
- **Y-axis:** Vertical/Height (increases upward)
- **Z-axis:** North-South (increases toward North)

### 5.2 Region/Sector Coordinates

The world is divided into a 256×256 grid of regions:

```csharp
// Region ID calculation (from Region.cs)
byte XSector = regionId.Byte[0];  // Low byte
byte YSector = regionId.Byte[1];  // High byte
ushort regionId = BitConverter.ToUInt16(new[] { xSector, ySector }, 0);
```

**Example:** Region ID `0x61A9` = X sector 0xA9 (169), Y sector 0x61 (97)

### 5.3 2D Projection Coordinates

Used in collision detection:
- `Point` struct with integer X, Y values
- Y is inverted: `collisionY = 1920 - navmeshY`
- Coordinate range per region: 0-1920 (for standard 96×20 cell grid)

### 5.4 Rectangle Coordinates

For navmesh cells (`RectangleF`):
- Format: `(xMin, yMin, xMax, yMax)`
- Represents quad cell boundaries in terrain space

### 5.5 Coordinate Transformations

#### Prefab to World Space

From `MeshPoint.cs`:

```csharp
public Vector2 GetPrefabPosition(NavMeshInst entry) {
    // Extract XZ plane (2D projection)
    var vector2 = new Vector2(Position.X, Position.Z);

    // Translate to world position
    vector2.X += entry.Position.X;
    vector2.Y += entry.Position.Z;

    // Apply rotation around object center
    return RotateVector(vector2, center, entry.Angle.Degrees);
}
```

#### Rotation Formula

```
x' = cos(θ) × (x - cx) - sin(θ) × (y - cy) + cx
y' = sin(θ) × (x - cx) + cos(θ) × (y - cy) + cy
```

Where (cx, cy) is the rotation center and θ is the angle in radians.

---

## 6. PK2 File Handling

### 6.1 Overview

PK2 is a compressed archive format used by Silkroad Online with **Blowfish encryption**.

### 6.2 Pk2Controller

Location: `/Client/Pk2Controller.cs`

Static manager for three PK2 archives:

```csharp
public static class Pk2Controller {
    public static PK2Archive Media;  // media.pk2 - textures, images (DDJ files)
    public static PK2Archive Data;   // data.pk2 - game data (resources, objects, maps)
    public static PK2Archive Map;    // map.pk2 - additional map data

    public static void LoadMediaArchive(string path);
    public static void LoadDataArchive(string path);
    public static void LoadMapArchive(string path);
}
```

### 6.3 File Access Pattern

```csharp
// Check if file exists
if (Pk2Controller.Data.FileExists(fileName)) {
    // Get PK2File object
    var pk2File = Pk2Controller.Data.GetFile(fileName);

    // Option 1: Read as stream
    using (var stream = pk2File.GetStream()) {
        // Process stream...
    }

    // Option 2: Get complete file bytes
    byte[] data = pk2File.GetData();
}
```

### 6.4 File Types in PK2 Archives

| Extension | Format Signature | Description | Location |
|-----------|-----------------|-------------|----------|
| `.nvm` | `JMXVNVM 1000` | Navigation mesh terrain | `nv_{regionId:x4}.nvm` |
| `.bms` | `JMXVBMS 0110` | Collision mesh/outlines | Via resource reference |
| `.bsr` | `JMXVRES 0109` | Resource definitions | `object.ifo` index |
| `.mfo` | `JMXVMFO 1000` | Map info (region bitmap) | `mapinfo.mfo` |
| `.ifo` | `JMXVOBJI1000` | Object index | `object.ifo` |
| `.ddj` | DDS + 20-byte header | Textures | media.pk2 |

### 6.5 String Encoding

Joymax uses **CP-949 (Korean)** encoding for strings:

```csharp
// Length-prefixed string reading
string ReadJoymaxString() {
    var byteCount = reader.ReadInt32();
    return Encoding.GetEncoding(949).GetString(reader.ReadBytes(byteCount));
}
```

### 6.6 DDJ to Bitmap Conversion

```csharp
// From Pk2Extensions.cs
public static Image ToImage(this PK2File file) {
    var ddjBuffer = file.GetData();

    // Strip first 20 bytes (DDJ header)
    var ddsBuffer = new byte[ddjBuffer.Length - 20];
    Array.ConstrainedCopy(ddjBuffer, 20, ddsBuffer, 0, ddsBuffer.Length);

    return DDSImage.ToBitmap(ddsBuffer);
}
```

**Supported DDS formats:** DXT1, DXT2, DXT3, DXT4, DXT5, A1R5G5B5, A4R4G4B4, A8B8G8R8, A8R8G8B8, R5G6B5, R8G8B8

---

## 7. Data Conversion and Export

### 7.1 Export Pipeline Overview

```
PK2 Archives
    │
    ▼
┌──────────────────┐
│  NavMeshManager  │ ◄── Loads & caches .nvm files
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ NavMeshTerrain   │ ◄── Contains objects, cells, edges
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│CollisionExporter │ ◄── Extracts edges, transforms coordinates
└────────┬─────────┘
         │
         ▼
    .wg + .idx files
```

### 7.2 CollisionExporter

Location: `/Core/Export/CollisionExporter.cs`

**Export Process:**

```csharp
public void ExportFiles(string[] files) {
    foreach (var file in files) {
        // 1. Extract region ID from filename (e.g., "nv_61a9.nvm" → 0x61A9)
        var regionId = int.Parse(
            Path.GetFileNameWithoutExtension(file).Split('_')[1],
            NumberStyles.HexNumber);

        // 2. Record file offset in index
        _indexWriter.Write(regionId);
        _indexWriter.Write(_writer.BaseStream.Position);

        // 3. Write region ID to output
        _writer.Write(regionId);

        // 4. Load navmesh terrain
        var navmeshTerrain = NavMeshManager.LoadNavmesh(file);

        // 5. Extract and write terrain collision edges
        var terrainEdges = ExtractTerrainEdges(navmeshTerrain);
        WriteEdges(terrainEdges);

        // 6. Extract and write object collision edges
        var objectEdges = ExtractObjectEdges(navmeshTerrain);
        WriteEdges(objectEdges);
    }
}
```

**Terrain Edge Extraction:**

```csharp
private List<Line> ExtractTerrainEdges(NavMeshTerrain terrain) {
    var edges = new List<Line>();

    foreach (var edge in terrain.GetInternalEdges()) {
        // Only include edges that touch region boundary
        if (edge.HasNeighbourCell) {
            edges.Add(new Line {
                Source = new Point(
                    (int)edge.Min.X,
                    (int)(1920 - edge.Min.Y)  // Invert Y
                ),
                Destination = new Point(
                    (int)edge.Max.X,
                    (int)(1920 - edge.Max.Y)
                )
            });
        }
    }

    return edges;
}
```

**Object Edge Extraction:**

```csharp
private List<Line> ExtractObjectEdges(NavMeshTerrain terrain) {
    var edges = new List<Line>();

    foreach (var navInst in terrain.GetObjects()) {
        if (navInst.Resource?.Mesh?.Outlines == null) continue;

        foreach (var outline in navInst.Resource.Mesh.Outlines) {
            // Skip bridge elements (walkable underneath)
            if (outline.Flag == NavEdgeFlag.Bridge) continue;

            // Transform mesh points to world coordinates
            var pointA = navInst.Resource.Mesh.Points[outline.PointIndexA]
                .GetPrefabPosition(navInst);
            var pointB = navInst.Resource.Mesh.Points[outline.PointIndexB]
                .GetPrefabPosition(navInst);

            edges.Add(new Line {
                Source = new Point((int)pointA.X, (int)(1920 - pointA.Y)),
                Destination = new Point((int)pointB.X, (int)(1920 - pointB.Y))
            });
        }
    }

    return edges;
}
```

### 7.3 CollisionLoader

Location: `/Core/Export/CollisionLoader.cs`

Reads exported collision data back:

```csharp
public class CollisionLoader {
    private Dictionary<int, long> Index;  // regionId → file offset
    private string _mapFilePath;

    public CollisionLoader(string mapFilePath, string indexFilePath) {
        _mapFilePath = mapFilePath;
        ReadIndex(indexFilePath);
    }

    public List<Line> GetCollisions(int regionId) {
        if (!Index.ContainsKey(regionId))
            return new List<Line>();

        var collisions = new List<Line>();
        using (var reader = new BinaryReader(File.OpenRead(_mapFilePath))) {
            reader.BaseStream.Position = Index[regionId];

            // Validate region ID
            var internalRegionId = reader.ReadInt32();
            if (internalRegionId != regionId)
                return collisions;

            // Read terrain edges
            var terrainEdgeCount = reader.ReadInt32();
            for (int i = 0; i < terrainEdgeCount; i++) {
                collisions.Add(ReadLine(reader));
            }

            // Read object edges
            var objectEdgeCount = reader.ReadInt32();
            for (int i = 0; i < objectEdgeCount; i++) {
                collisions.Add(ReadLine(reader));
            }
        }
        return collisions;
    }
}
```

---

## 8. File Format Specifications

### 8.1 Navigation Mesh File (.nvm)

**Signature:** `JMXVNVM 1000` (12 bytes)

**Structure:**
```
[Header: 12 bytes]
    Signature: "JMXVNVM 1000"

[Objects Section]
    ObjectCount: int16
    For each object:
        NavMeshInst data (variable size)

[Cells Section]
    CellCount: int32
    Padding: int32
    For each cell:
        NavCellQuad data

[Global Edges Section]
    GlobalEdgeCount: int32
    For each edge:
        NavEdgeGlobal data

[Internal Edges Section]
    InternalEdgeCount: int32
    For each edge:
        NavEdgeInternal data
```

### 8.2 Exported Collision File (.wg)

**Structure per region:**
```
[Region ID: int32]

[Terrain Edges Section]
    EdgeCount: int32
    For each edge:
        SourceX: int32
        SourceY: int32
        DestX: int32
        DestY: int32

[Object Edges Section]
    EdgeCount: int32
    For each edge:
        SourceX: int32
        SourceY: int32
        DestX: int32
        DestY: int32
```

### 8.3 Index File (.idx)

**Structure:**
```
For each region:
    RegionId: int32
    FileOffset: int64
```

### 8.4 Map Info File (.mfo)

**Signature:** `JMXVMFO 1000` (12 bytes)

**Structure:**
```
[Header: 12 bytes]
    Signature: "JMXVMFO 1000"

[Region Bitmap: 1024 bytes]
    256×256 bits = 65,536 bits = 8,192 bytes...
    (Note: actual implementation uses 1024 bytes with bit reversal)
    Each bit indicates if region is active/valid
```

**Bit Reversal:**
```csharp
// Each byte has its bits reversed using lookup table
for (int i = 0; i < 1024; i++)
    buffer[i] = buffer[i].ReverseWithLookupTable();
var regions = new BitArray(buffer);
```

### 8.5 Resource File (.bsr)

**Signature:** `JMXVRES 0109` (12 bytes)

**Structure:**
```
[Header: 12 bytes]
    Signature: "JMXVRES 0109"

[Pointer Section: 32 bytes]
    8 × uint32 pointers

[Flags Section: 20 bytes]
    Unknown flags

[Resource Info]
    Type: uint32 (ResourceType enum)
    Name: Joymax string (length-prefixed, CP-949)

[Resource Data]
    MeshPath, BoundingBox, OrientedBoundingBox, etc.
```

---

## 9. Key Classes Reference

### NavMeshReader

Custom BinaryReader with specialized methods:

| Method | Description |
|--------|-------------|
| `ReadJoymaxString()` | Read length-prefixed CP-949 string |
| `ReadStruct<T>()` | Read binary struct via Marshal |
| `ReadRectangleF()` | Read 4 floats as RectangleF |
| `ReadAngle()` | Read AngleSingle struct |
| `ReadVector2()` | Read SharpDX Vector2 |
| `ReadVector3()` | Read SharpDX Vector3 |
| `ReadData<T>()` | Read INavData implementation |

### Mesh Classes

**Mesh:** Container for collision geometry
```csharp
public class Mesh {
    public List<MeshOutline> Outlines;  // Edge definitions
    public List<MeshPoint> Points;       // Vertex positions
}
```

**MeshOutline:** Edge between two points
```csharp
public class MeshOutline {
    public ushort PointIndexA;
    public ushort PointIndexB;
    public NavEdgeFlag Flag;
}
```

**MeshPoint:** Vertex position with transformation support
```csharp
public class MeshPoint {
    public Vector3 Position;
    public Vector2 GetPrefabPosition(NavMeshInst entry);
}
```

### Configuration

**Config.cs:** INI-style configuration
```
Format: key{value}
Example: NavBuilder.Name{Silkroad_Navmesh}
```

**Project.cs:**
```csharp
public class Project {
    public string Name;
    public string Path;
    public string SilkroadPath;
    public string OutputFile => Path.Combine(Path, Name + ".wg");
}
```

---

## 10. Known Limitations

From the project README and code analysis:

1. **Bridge/Building Collision:** Not working correctly - bridge elements are skipped but building interiors may not be handled properly.

2. **Dungeon Collision:** Not working - dungeon areas may require special handling.

3. **Performance Issues:** Large datasets may cause slowdowns during export or collision detection.

4. **Height Data:** TileMap, HeightMap, and WaterMap data reading is commented out in NavMeshTerrain, meaning vertical collision is not fully implemented.

5. **Object Types:** Only certain resource types are fully supported; compound objects may need additional handling.

---

## Quick Start for Developers

### Loading and Exporting Collision Data

```csharp
// 1. Initialize PK2 archives
Pk2Controller.LoadDataArchive("path/to/data.pk2");
Pk2Controller.LoadMediaArchive("path/to/media.pk2");
Pk2Controller.LoadMapArchive("path/to/map.pk2");

// 2. Get list of navmesh files
var mapInfo = new MapInfo();  // Loads mapinfo.mfo
var activeRegions = mapInfo.GetActiveRegions();

// 3. Load a specific navmesh
var terrain = NavMeshManager.LoadNavmesh("nv_61a9.nvm");

// 4. Access collision data
var internalEdges = terrain.GetInternalEdges();
var objects = terrain.GetObjects();

// 5. Export collision data
var exporter = new CollisionExporter("output.wg", "output.idx");
exporter.ExportFiles(navmeshFiles);

// 6. Load exported data for runtime use
var loader = new CollisionLoader("output.wg", "output.idx");
var collisions = loader.GetCollisions(0x61A9);

// 7. Check for collision
var collision = CollisionDetector.HasCollisionBetween(
    sourcePoint, destPoint, collisions);
```

### Converting Coordinates

```csharp
// World 3D → Collision 2D
int collisionX = (int)worldPosition.X;
int collisionY = 1920 - (int)worldPosition.Z;  // Note: Z becomes Y, inverted

// Region ID → Sector coordinates
byte xSector = (byte)(regionId & 0xFF);
byte ySector = (byte)((regionId >> 8) & 0xFF);

// Sector coordinates → Region ID
ushort regionId = (ushort)((ySector << 8) | xSector);
```

---

---

## Appendix A: How to Create and Load the Map

### A.1 Project Creation Workflow

```
User clicks "New Project"
         │
         ▼
┌─────────────────────────┐
│  NewProjectWindow       │
│  - Project Name         │
│  - Save Path            │
│  - Silkroad Client Path │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Create Config File     │
│  (project.cfg)          │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Load PK2 Archives      │
│  - media.pk2            │
│  - data.pk2             │
│  - map.pk2              │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Load Object/Map Index  │
│  - ObjectIndexManager   │
│  - MapInfoManager       │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Load Initial Region    │
│  (default or last used) │
└─────────────────────────┘
```

### A.2 Pseudocode: Project Creation

```
FUNCTION CreateProject():
    // 1. Show new project dialog
    dialog = ShowNewProjectWindow()
    IF dialog.Result != OK THEN RETURN

    // 2. Create config file
    configPath = dialog.SavePath + "/project.cfg"
    config = new Config(configPath)
    config.Set("NavBuilder.Name", dialog.ProjectName)
    config.Set("NavBuilder.SilkroadPath", dialog.SilkroadPath)
    config.SetArray("NavBuilder.SavedRegions", DEFAULT_REGIONS)
    config.Save()

    // 3. Set as current project
    Globals.CurrentProject = new Project(config)

    // 4. Reload project
    ReloadCurrentProject()
END FUNCTION
```

### A.3 Pseudocode: Loading Project and PK2 Archives

```
FUNCTION ReloadCurrentProject():
    project = Globals.CurrentProject

    // 1. Build PK2 file paths
    mediaPk2Path = project.SilkroadPath + "/" + "media.pk2"
    dataPk2Path = project.SilkroadPath + "/" + "data.pk2"
    mapPk2Path = project.SilkroadPath + "/" + "map.pk2"

    // 2. Load PK2 archives in parallel (for performance)
    PARALLEL DO:
        Pk2Controller.LoadMediaArchive(mediaPk2Path)  // Textures, images
        Pk2Controller.LoadDataArchive(dataPk2Path)    // Game data, navmesh
        Pk2Controller.LoadMapArchive(mapPk2Path)      // Additional map data
    END PARALLEL

    // 3. Load index files
    ObjectIndexManager.LoadObjectIndex()  // object.ifo - maps object ID → resource
    MapInfoManager.LoadMapInfo()          // mapinfo.mfo - active region bitmap

    // 4. Load initial region
    lastRegion = config.Get("NavBuilder.LastRegionId", default: 0)
    IF lastRegion == 0 THEN
        map.LoadRegion(new Region(113, 89))  // Default: Jangan area
    ELSE
        map.LoadRegion(new Region(lastRegion))
    END IF
END FUNCTION
```

### A.4 Pseudocode: Loading a Region

```
FUNCTION LoadRegion(centerRegion):
    // 1. Fire before-load event
    BeforeLoadRegion.Invoke(centerRegion)

    // 2. Get 3x3 grid of surrounding regions
    Regions = centerRegion.GetSurroundingRegions()
    // Returns array of 9 regions:
    // [0] [1] [2]   (top row: Y+1)
    // [3] [4] [5]   (middle row: current Y, [4] = center)
    // [6] [7] [8]   (bottom row: Y-1)

    // 3. Initialize terrain array
    Terrains = new NavMeshTerrain[9]

    // 4. Clear canvas and load minimap images
    ClearImage()
    LoadMiniMap()

    // 5. Load collision data
    IF ExternalCollisionFileName != null THEN
        LoadCollisionsFromFile(ExternalCollisionFileName)
    ELSE
        LoadTerrainCollision()  // Load from navmesh
    END IF

    // 6. Fire region-loaded event
    RegionLoaded.Invoke(centerRegion)
END FUNCTION
```

### A.5 Pseudocode: Loading Minimap

```
FUNCTION LoadMiniMap():
    sectorImages = new Image[9]

    // 1. Load minimap images for each region
    FOR i = 0 TO 8:
        TRY:
            // Image filename format: "{XSector}x{YSector}.ddj"
            // Example: "113x89.ddj"
            file = Pk2Controller.Media.GetFile(Regions[i].ImageFileName)
            sectorImages[i] = file.ToImage()  // Convert DDJ to Bitmap
        CATCH:
            sectorImages[i] = new Bitmap(256, 256)  // Blank fallback
        END TRY
    END FOR

    // 2. Draw 3x3 grid (each sector is 256x256 pixels)
    graphics = GetGraphics()

    // Top row (Y+1 sectors)
    graphics.DrawImage(sectorImages[0], Rectangle(0, 0, 256, 256))
    graphics.DrawImage(sectorImages[1], Rectangle(256, 0, 256, 256))
    graphics.DrawImage(sectorImages[2], Rectangle(512, 0, 256, 256))

    // Middle row
    graphics.DrawImage(sectorImages[3], Rectangle(0, 256, 256, 256))
    graphics.DrawImage(sectorImages[4], Rectangle(256, 256, 256, 256))  // Center
    graphics.DrawImage(sectorImages[5], Rectangle(512, 256, 256, 256))

    // Bottom row (Y-1 sectors)
    graphics.DrawImage(sectorImages[6], Rectangle(0, 512, 256, 256))
    graphics.DrawImage(sectorImages[7], Rectangle(256, 512, 256, 256))
    graphics.DrawImage(sectorImages[8], Rectangle(512, 512, 256, 256))

    // 3. Draw grid lines
    graphics.DrawLine(Black, (256, 0), (256, 768))
    graphics.DrawLine(Black, (512, 0), (512, 768))
    graphics.DrawLine(Black, (0, 256), (768, 256))
    graphics.DrawLine(Black, (0, 512), (768, 512))

    Refresh()
END FUNCTION
```

### A.6 Region Data Structure

```csharp
class Region {
    ushort Id;           // 16-bit region identifier
    byte XSector;        // Low byte of Id (0-255)
    byte YSector;        // High byte of Id (0-255)

    // Derived properties
    string ImageFileName => $"{XSector}x{YSector}.ddj";     // e.g., "113x89.ddj"
    string NavmeshFileName => $"nv_{Id:x4}.nvm";            // e.g., "nv_5971.nvm"
    NavMeshTerrain Terrain;  // Lazy-loaded via NavMeshManager

    // Get 3x3 surrounding regions
    Region[] GetSurroundingRegions() {
        return [
            Region(XSector-1, YSector+1), Region(XSector, YSector+1), Region(XSector+1, YSector+1),
            Region(XSector-1, YSector),   this,                       Region(XSector+1, YSector),
            Region(XSector-1, YSector-1), Region(XSector, YSector-1), Region(XSector+1, YSector-1)
        ];
    }
}
```

---

## Appendix B: How to Draw Map Objects (Bridges/Buildings)

### B.1 Object Drawing Workflow

```
Region Loaded
      │
      ▼
┌─────────────────────────┐
│ Get NavMeshTerrain      │
│ for each region         │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Extract Internal Edges  │
│ (terrain collision)     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Extract Object Instances│
│ (buildings, bridges)    │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ For Each Object:        │
│ - Load Resource/Mesh    │
│ - Get Mesh Outlines     │
│ - Transform to World    │
│ - Draw Lines            │
└─────────────────────────┘
```

### B.2 Pseudocode: Drawing Terrain and Object Collision

```
FUNCTION LoadTerrainCollision():
    graphics = GetGraphics()

    FOR i = 0 TO 8:  // 9 regions in 3x3 grid
        region = Regions[i]
        terrain = region.Terrain  // NavMeshTerrain (lazy-loaded)

        IF terrain == null THEN CONTINUE

        drawOffset = GetDrawOffset(i)  // Pixel offset for this region

        // ═══════════════════════════════════════════
        // STEP 1: Draw terrain internal edges
        // ═══════════════════════════════════════════
        edges = terrain.GetInternalEdges()
        FOR EACH edge IN edges:
            // Only draw edges at region boundaries (blocking edges)
            IF NOT edge.HasNeighbourCell THEN CONTINUE

            line = GetPrefabLine(edge.Min, edge.Max, drawOffset)
            graphics.DrawLine(RED, line.Source, line.Destination)
        END FOR

        // ═══════════════════════════════════════════
        // STEP 2: Draw object collision (buildings/bridges)
        // ═══════════════════════════════════════════
        objects = terrain.GetObjects()
        FOR EACH meshInst IN objects:
            // Skip if no mesh data loaded
            IF meshInst.Resource?.Mesh?.Outlines == null THEN CONTINUE

            // Draw each outline edge of the object
            FOR EACH outline IN meshInst.Resource.Mesh.Outlines:
                // Get mesh points and transform to world space
                pointA = meshInst.Resource.Mesh.Points[outline.PointIndexA]
                pointB = meshInst.Resource.Mesh.Points[outline.PointIndexB]

                worldPosA = pointA.GetPrefabPosition(meshInst)  // Transform
                worldPosB = pointB.GetPrefabPosition(meshInst)

                prefabLine = GetPrefabLine(worldPosA, worldPosB, drawOffset)

                // ═══════════════════════════════════════════
                // Color based on edge type
                // ═══════════════════════════════════════════
                IF outline.Flag == NavEdgeFlag.Bridge THEN
                    // GREEN for bridges (walkable underneath)
                    graphics.DrawLine(LIME_GREEN, prefabLine.Source, prefabLine.Destination)
                ELSE
                    // RED for solid collision (buildings, walls)
                    graphics.DrawLine(RED, prefabLine.Source, prefabLine.Destination)
                END IF
            END FOR
        END FOR

        Refresh()
    END FOR
END FUNCTION
```

### B.3 Coordinate Transformation for Objects

```
FUNCTION GetPrefabPosition(meshPoint, objectInstance):
    // meshPoint.Position is in LOCAL/prefab space
    // objectInstance contains world position and rotation

    // 1. Extract XZ plane (2D projection, ignore Y/height)
    localPos = Vector2(meshPoint.Position.X, meshPoint.Position.Z)

    // 2. Translate to world position
    worldPos = Vector2(
        localPos.X + objectInstance.Position.X,
        localPos.Y + objectInstance.Position.Z
    )

    // 3. Apply rotation around object center
    centerPoint = Vector2(objectInstance.Position.X, objectInstance.Position.Z)
    angle = objectInstance.Angle.Degrees

    rotatedPos = RotateVector(worldPos, centerPoint, angle)

    RETURN rotatedPos
END FUNCTION

FUNCTION RotateVector(point, center, angleDegrees):
    angleRadians = angleDegrees * (PI / 180)
    cosTheta = cos(angleRadians)
    sinTheta = sin(angleRadians)

    // 2D rotation formula
    RETURN Vector2(
        X: cosTheta * (point.X - center.X) - sinTheta * (point.Y - center.Y) + center.X,
        Y: sinTheta * (point.X - center.X) + cosTheta * (point.Y - center.Y) + center.Y
    )
END FUNCTION
```

### B.4 Screen Coordinate Mapping

```
FUNCTION GetPrefabLine(min, max, drawOffset):
    // Scale factor: 256 pixels per 1920 world units
    scale = 256.0 / 1920.0  // ≈ 0.1333

    // Convert world coordinates to screen coordinates
    line = new Line {
        Source = Point(
            (drawOffset.X + min.X) * scale,
            (drawOffset.Y + (1920 - min.Y)) * scale   // Y is inverted!
        ),
        Destination = Point(
            (drawOffset.X + max.X) * scale,
            (drawOffset.Y + (1920 - max.Y)) * scale
        )
    }

    RETURN line
END FUNCTION

FUNCTION GetDrawOffset(regionIndex):
    // 9 regions in 3x3 grid, each 1920 world units
    // Map regionIndex to pixel offset
    SWITCH regionIndex:
        CASE 0: RETURN (0, 0)           // Top-left
        CASE 1: RETURN (1920, 0)        // Top-center
        CASE 2: RETURN (3840, 0)        // Top-right
        CASE 3: RETURN (0, 1920)        // Middle-left
        CASE 4: RETURN (1920, 1920)     // Center (main region)
        CASE 5: RETURN (3840, 1920)     // Middle-right
        CASE 6: RETURN (0, 3840)        // Bottom-left
        CASE 7: RETURN (1920, 3840)     // Bottom-center
        CASE 8: RETURN (3840, 3840)     // Bottom-right
    END SWITCH
END FUNCTION
```

### B.5 Object/Mesh Data Flow

```
NavMeshTerrain
      │
      │ Objects (List<NavMeshInst>)
      ▼
┌─────────────────┐
│  NavMeshInst    │  ◄── Object instance in world
│  - Id           │      (position, rotation, etc.)
│  - Position     │
│  - Angle        │
│  - Resource ────┼──────┐
└─────────────────┘      │
                         ▼
              ┌─────────────────┐
              │    Resource     │  ◄── Loaded from .bsr file
              │    - Mesh ──────┼──────┐
              └─────────────────┘      │
                                       ▼
                            ┌─────────────────┐
                            │      Mesh       │  ◄── Loaded from .bms file
                            │  - Points[]     │      Collision geometry
                            │  - Outlines[]   │
                            └─────────────────┘
                                       │
              ┌────────────────────────┴────────────────────────┐
              ▼                                                 ▼
      ┌─────────────┐                                   ┌─────────────┐
      │  MeshPoint  │                                   │ MeshOutline │
      │  - Position │                                   │ - PointIdxA │
      │  - Flag     │                                   │ - PointIdxB │
      └─────────────┘                                   │ - Flag      │
                                                        └─────────────┘
```

---

## Appendix C: Collision Detection Workflow and Pseudocode

### C.1 Collision Detection Overview

The collision system checks if a movement path (line segment) intersects with any obstacle lines (collision edges).

```
┌─────────────────────────────────────────────────────────────────┐
│                    COLLISION DETECTION FLOW                      │
└─────────────────────────────────────────────────────────────────┘

   Source Point (Player)                    Destination Point (Target)
         ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●
         ┃         Movement Line              ┃
         ┃                                    ┃
         ┃    ┏━━━━━━━━━━━━━━━━━━━━━┓         ┃
         ┃    ┃      Building       ┃         ┃
         ┃    ┃    ╔═══════════╗    ┃◄──── Collision Edge
         ┃    ┃    ║           ║    ┃
         ┗━━━━╋━━━━╬═══════════╬━━━━╋━━━━━━━━━┛
              ┃    ║     ●     ║    ┃
              ┃    ╚═══════════╝    ┃  ▲
              ┃                     ┃  │
              ┗━━━━━━━━━━━━━━━━━━━━━┛  Intersection Point
```

### C.2 High-Level Pseudocode: Collision Detection

```
FUNCTION HasCollisionBetween(source, destination, obstacles):
    // Early exit if no obstacles
    IF obstacles == null THEN RETURN null

    // Create movement line from source to destination
    movementLine = Line(source, destination)

    // Check intersection with each obstacle
    FOR EACH obstacle IN obstacles:
        intersection = FindIntersection(movementLine, obstacle)

        IF intersection != null THEN
            // Found collision! Return the point
            RETURN intersection
        END IF
    END FOR

    // No collision found
    RETURN null
END FUNCTION
```

### C.3 Detailed Pseudocode: Line Intersection Algorithm

```
FUNCTION FindIntersection(lineA, lineB, tolerance = 1):
    // Extract coordinates
    x1, y1 = lineA.Source
    x2, y2 = lineA.Destination
    x3, y3 = lineB.Source
    x4, y4 = lineB.Destination

    // ═══════════════════════════════════════════════════════════════
    // Mathematical basis:
    // Line equation: y = mx + c  →  -mx + y = c
    // For two lines to intersect: solve system of equations
    // ═══════════════════════════════════════════════════════════════

    // ─────────────────────────────────────────
    // CASE 1: LineA is vertical (x1 == x2)
    // ─────────────────────────────────────────
    IF |x1 - x2| < tolerance THEN
        // Vertical line: x = constant
        // Calculate LineB's slope and intercept
        m2 = (y4 - y3) / (x4 - x3)
        c2 = -m2 * x3 + y3

        // Intersection: x = x1, y = c2 + m2 * x1
        x = x1
        y = c2 + m2 * x1

    // ─────────────────────────────────────────
    // CASE 2: LineB is vertical (x3 == x4)
    // ─────────────────────────────────────────
    ELSE IF |x3 - x4| < tolerance THEN
        // Calculate LineA's slope and intercept
        m1 = (y2 - y1) / (x2 - x1)
        c1 = -m1 * x1 + y1

        // Intersection: x = x3, y = c1 + m1 * x3
        x = x3
        y = c1 + m1 * x3

    // ─────────────────────────────────────────
    // CASE 3: Neither line is vertical
    // ─────────────────────────────────────────
    ELSE
        // Calculate slopes and intercepts for both lines
        m1 = (y2 - y1) / (x2 - x1)
        c1 = -m1 * x1 + y1

        m2 = (y4 - y3) / (x4 - x3)
        c2 = -m2 * x3 + y3

        // Solve: x = (c1 - c2) / (m2 - m1)
        // Note: if m1 == m2, lines are parallel (no intersection)
        IF |m2 - m1| < tolerance THEN
            RETURN null  // Parallel lines
        END IF

        x = (c1 - c2) / (m2 - m1)
        y = c2 + m2 * x

        // Verify solution
        IF |(-m1 * x + y - c1)| >= tolerance OR
           |(-m2 * x + y - c2)| >= tolerance THEN
            RETURN null  // Solution doesn't satisfy equations
        END IF
    END IF

    // ─────────────────────────────────────────
    // FINAL CHECK: Is intersection within BOTH line segments?
    // ─────────────────────────────────────────
    IF IsInsideLine(lineA, x, y) AND IsInsideLine(lineB, x, y) THEN
        RETURN Point(x, y)
    ELSE
        RETURN null  // Intersection is outside segment bounds
    END IF
END FUNCTION

FUNCTION IsInsideLine(line, x, y):
    // Check if (x,y) is within the bounding box of the line segment
    isInX = (x >= min(line.Source.X, line.Destination.X)) AND
            (x <= max(line.Source.X, line.Destination.X))

    isInY = (y >= min(line.Source.Y, line.Destination.Y)) AND
            (y <= max(line.Source.Y, line.Destination.Y))

    RETURN isInX AND isInY
END FUNCTION
```

### C.4 Complete Collision Workflow Example

```
WORKFLOW: Check if player can walk from A to B

INPUT:
  - playerPosition = Point(100, 200)
  - targetPosition = Point(500, 600)
  - currentRegionId = 0x5971

STEP 1: Load collision data for current region
────────────────────────────────────────────────
collisionLoader = new CollisionLoader("navmesh.wg", "navmesh.wgi")
obstacles = collisionLoader.GetCollisions(currentRegionId)
// Returns List<Line> with all terrain + object collision edges

STEP 2: Check for direct path collision
────────────────────────────────────────────────
collision = CollisionDetector.HasCollisionBetween(
    playerPosition,
    targetPosition,
    obstacles
)

STEP 3: Handle result
────────────────────────────────────────────────
IF collision != null THEN
    // ❌ Path is blocked!
    Print("Cannot walk directly - obstacle at " + collision)

    // Option A: Stop at collision point
    newTarget = collision

    // Option B: Calculate alternative path (not implemented in this codebase)
    // path = Pathfinder.FindPath(playerPosition, targetPosition, obstacles)
ELSE
    // ✅ Path is clear
    Print("Path is clear, walking to target")
    MovePlayer(targetPosition)
END IF
```

### C.5 Visual Example: Intersection Calculation

```
Example: Finding intersection of two lines

Line A (Movement): (100, 100) → (400, 300)
Line B (Wall):     (200, 50)  → (250, 350)

Step 1: Calculate Line A parameters
─────────────────────────────────────
  m1 = (300 - 100) / (400 - 100) = 200/300 = 0.667
  c1 = -0.667 * 100 + 100 = 33.3

Step 2: Calculate Line B parameters
─────────────────────────────────────
  m2 = (350 - 50) / (250 - 200) = 300/50 = 6.0
  c2 = -6.0 * 200 + 50 = -1150

Step 3: Solve for intersection
─────────────────────────────────────
  x = (c1 - c2) / (m2 - m1)
  x = (33.3 - (-1150)) / (6.0 - 0.667)
  x = 1183.3 / 5.333
  x ≈ 221.9

  y = c2 + m2 * x
  y = -1150 + 6.0 * 221.9
  y ≈ 181.4

Step 4: Check if inside both segments
─────────────────────────────────────
  Line A: 100 ≤ 221.9 ≤ 400  ✓ (X)
          100 ≤ 181.4 ≤ 300  ✓ (Y)

  Line B: 200 ≤ 221.9 ≤ 250  ✓ (X)
          50  ≤ 181.4 ≤ 350  ✓ (Y)

Result: Intersection at (222, 181) ✓
```

### C.6 Runtime Collision Checking in UI

From `MapCanvas.cs` - Interactive collision testing:

```
FUNCTION OnMouseClick(clickPosition):
    IF firstClickNotSet THEN
        // First click = Player position (green square)
        _clickPosA = clickPosition
        DrawSquare(GREEN, clickPosition)

    ELSE IF secondClickNotSet THEN
        // Second click = Target position (blue square)
        _clickPosB = clickPosition
        DrawSquare(BLUE, clickPosition)

        // ═══════════════════════════════════════════
        // Check if standing inside collision
        // ═══════════════════════════════════════════
        nearbyPoint = CalculatePointAtDistance(_clickPosA, _clickPosB, 10)
        tempCollision = CollisionDetector.HasCollisionBetween(
            _clickPosA, nearbyPoint, _loadedCollisions)

        IF tempCollision != null THEN
            // Adjust starting position to be outside collision
            _clickPosA = nearbyPoint
            DrawSquare(YELLOW, _clickPosA)
        END IF

        // ═══════════════════════════════════════════
        // Check path for collision
        // ═══════════════════════════════════════════
        collision = CollisionDetector.HasCollisionBetween(
            _clickPosA, _clickPosB, _loadedCollisions)

        IF collision != null THEN
            // ❌ Blocked - draw red line to collision point
            DrawSquare(INDIGO, collision)
            DrawLine(RED, _clickPosA, collision)
        ELSE
            // ✅ Clear - draw blue line to target
            DrawLine(BLUE, _clickPosA, _clickPosB)
        END IF

    ELSE
        // Third click = Reset
        _clickPosA = null
        _clickPosB = null
        ReloadRegion()
    END IF
END FUNCTION
```

### C.7 Data Structures Summary

```csharp
// Line segment for collision detection
struct Line {
    Point Source;       // Start point (X, Y)
    Point Destination;  // End point (X, Y)
}

// Point in 2D space
struct Point {
    int X;
    int Y;
}

// Collision loader for exported data
class CollisionLoader {
    Dictionary<int, long> Index;  // regionId → file offset

    List<Line> GetCollisions(int regionId);
}

// Main detector
class CollisionDetector {
    static Point HasCollisionBetween(
        Point source,
        Point destination,
        List<Line> obstacles
    );
}

// Line intersection calculator
class LineIntersection {
    static Point FindIntersection(
        Line lineA,
        Line lineB,
        double tolerance = 1
    );
}
```

---

## Appendix D: NavMesh Data Collection with Python Parser

### D.1 NavMesh Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    NAVMESH DATA FLOW                            │
└─────────────────────────────────────────────────────────────────┘

  mapinfo.mfo              object.ifo              *.bms
       │                        │                     │
       │ Active region IDs      │ Object registry     │ Collision mesh
       ▼                        ▼                     ▼
┌─────────────┐         ┌─────────────┐        ┌─────────────┐
│  MapInfo    │         │ ObjectIndex │        │    Mesh     │
│  - regions  │         │  - entries  │        │  - points   │
│    bitmap   │         │    (id→path)│        │  - outlines │
└──────┬──────┘         └──────┬──────┘        └──────┬──────┘
       │                       │                      │
       │                       │                      │
       ▼                       ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                       nv_XXYY.nvm                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Cells     │  │   Edges     │  │      Objects            │  │
│  │  (96x96)    │  │  Internal   │  │   (NavMeshInst)         │  │
│  │  - height   │  │  Global     │  │   - position, rotation  │  │
│  │  - flag     │  │  - src/dst  │  │   - resource → mesh     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    COMPLETE NAVMESH                             │
│  - Walkable cells with heights                                  │
│  - Cell-to-cell connectivity (internal edges)                   │
│  - Region-to-region connectivity (global edges)                 │
│  - Object collision boundaries (from BMS)                       │
└─────────────────────────────────────────────────────────────────┘
```

### D.2 File Format Summary

| File | Signature | Purpose | Key Data |
|------|-----------|---------|----------|
| `mapinfo.mfo` | `JMXVMFO 1000` | Active region bitmap | 8192-byte bitmap (256x256 regions) |
| `nv_XXYY.nvm` | `JMXVNVM 1000` | NavMesh terrain | Cells, internal edges, global edges, objects |
| `object.ifo` | Text file | Object ID → path | `ID "path/to/resource.bsr"` |
| `*.bsr` | `JMXVRES 0109` | Resource definition | Type, name, mesh path (.bms reference) |
| `*.bms` | `JMXVBMS 0110` | Collision mesh | Points, outlines, bounding box |
| `*.ddj` | DDS + 20 bytes | Minimap image | 256x256 RGBA texture |

### D.2.1 BSR File Format (Resource Definition)

**Signature:** `JMXVRES 0109` (12 bytes)

**Structure:**
```
[Header: 12 bytes]
    Signature: "JMXVRES 0109"

[Pointers: 32 bytes (8 x uint32)]
    Material pointer
    Mesh pointer
    Skeleton pointer
    Animation pointer
    Mesh group pointer
    Animation group pointer
    Sound effect pointer
    BoundingBox pointer  ← Used to locate mesh path

[Flags: 20 bytes]
    Unknown flags

[Resource Info]
    Type: uint32 (ResourceType enum)
    Name: Joymax string (length-prefixed, CP-949)

[Padding: 48 bytes]

[At BoundingBox pointer position]
    MeshPath: Joymax string (path to .bms file)
    BoundingBox: 6 floats (min_x, min_y, min_z, max_x, max_y, max_z)
    OrientedBoundingBox: additional orientation data
```

**Resource Types:**
| Type | Value | Description |
|------|-------|-------------|
| CHARACTER | 0x20000 | Character model |
| NPC | 0x20001 | NPC model |
| BUILDING | 0x20002 | Building/structure |
| ARTIFACT | 0x20003 | Artifact/decoration |
| NATURE | 0x20004 | Natural object (tree, rock) |
| OTHER | 0x20005 | Other objects |
| ITEM | 0x20006 | Item model |
| COMPOUND_SHORT | 0x10000 | Compound object (short) |
| COMPOUND_LONG | 0x30000 | Compound object (long) |

**Python Usage:**
```python
from silkroad_parser import Resource

resource = Resource.from_file("oas_kara_tree01.bsr")
print(f"Type: {resource.type:#x}")      # 0x20004 (Nature)
print(f"Name: {resource.name}")          # "oas_kara_tree01"
print(f"Mesh: {resource.mesh_path}")     # "prim\mesh\...\oas_kara_tree01.bms"
```

### D.3 Python Parser Usage

```python
from silkroad_parser import (
    MapInfo, NavMeshTerrain, ObjectIndex, Mesh
)

# 1. Load active regions
mapinfo = MapInfo.from_file("mapinfo.mfo")
regions = mapinfo.get_active_region_ids()
print(f"Active regions: {len(regions)}")  # 4021 regions

# 2. Load navmesh for a region
region_id = 0x5971  # Example: Jangan area
x = region_id & 0xFF          # 0x71 = 113
y = (region_id >> 8) & 0xFF   # 0x59 = 89
nvm_file = f"nv_{y:02x}{x:02x}.nvm"  # "nv_5971.nvm"

terrain = NavMeshTerrain.from_file(nvm_file)
print(f"Cells: {len(terrain.cells)}")
print(f"Internal edges: {len(terrain.internal_edges)}")
print(f"Global edges: {len(terrain.global_edges)}")
print(f"Objects: {len(terrain.objects)}")

# 3. Access cell data
for cell in terrain.cells:
    print(f"Cell flag={cell.flag}, height={cell.height}")
    for obj_idx in cell.object_indices:
        print(f"  Object instance: {obj_idx}")

# 4. Access edge data
for edge in terrain.internal_edges:
    print(f"Edge: cell {edge.cell_src} → {edge.cell_dst}")
    print(f"  Min: ({edge.min_x}, {edge.min_y})")
    print(f"  Max: ({edge.max_x}, {edge.max_y})")
    print(f"  Flag: {edge.flag}")

# 5. Load object index
objects = ObjectIndex.from_file("object.ifo")
for obj_id, entry in objects.entries.items():
    print(f"{obj_id}: {entry.path}")

# 6. Load collision mesh
mesh = Mesh.from_file("building.bms")
print(f"Points: {len(mesh.points)}")
print(f"Outlines: {len(mesh.outlines)}")
for outline in mesh.outlines:
    p1 = mesh.points[outline.point_index_a]
    p2 = mesh.points[outline.point_index_b]
    print(f"Edge: ({p1.position.x}, {p1.position.z}) → ({p2.position.x}, {p2.position.z})")
```

### D.4 Region ID and Filename Conventions

```
Region ID: 16-bit unsigned integer
  - Low byte (bits 0-7): X sector (0-255)
  - High byte (bits 8-15): Y sector (0-255)

Example: Region ID 0x5971
  - X sector = 0x71 = 113
  - Y sector = 0x59 = 89

File naming:
  - NavMesh: nv_{regionId:04x}.nvm  → nv_5971.nvm
  - Minimap: {x}x{y}.ddj            → 113x89.ddj

Code to convert:
  region_id = (y_sector << 8) | x_sector
  x_sector = region_id & 0xFF
  y_sector = (region_id >> 8) & 0xFF
```

### D.5 NavMesh Cell Grid

```
Each region contains a 96x96 grid of cells:

     0   1   2   3  ...  95
   ┌───┬───┬───┬───┬───┬───┐
 0 │   │   │   │   │   │   │
   ├───┼───┼───┼───┼───┼───┤
 1 │   │   │   │   │   │   │
   ├───┼───┼───┼───┼───┼───┤
 2 │   │   │   │   │   │   │
   ├───┼───┼───┼───┼───┼───┤
...│   │   │   │   │   │   │
   ├───┼───┼───┼───┼───┼───┤
95 │   │   │   │   │   │   │
   └───┴───┴───┴───┴───┴───┘

Cell index = y * 96 + x  (row-major order)

Each cell contains:
  - flag: Walkability/terrain type
  - height: Y coordinate (elevation)
  - object_indices: List of object instances in this cell
```

### D.6 Edge Types

```
Internal Edges (NavEdgeInternal):
  - Connect cells WITHIN the same region
  - cell_src, cell_dst: Cell indices (0-9215)
  - Used for intra-region pathfinding

Global Edges (NavEdgeGlobal):
  - Connect cells ACROSS different regions
  - region_src, region_dst: Region IDs
  - cell_src, cell_dst: Cell indices in respective regions
  - Used for inter-region pathfinding

Edge Flags:
  - Bit 0 (1): Block vertex-to-vertex movement
  - Bit 1 (2): Block cell-to-cell movement
  - Bit 2 (4): Inline edge
  - Bit 3 (8): Mesh transition
  - Bit 4 (16): Bridge (passable underneath)
  - Bit 7 (128): Fortress/siege related
```

### D.7 NavMesh Builder Script

The `navmesh_builder.py` script builds collision data from Silkroad navmesh files and outputs JSON format. It automatically extracts terrain collision edges and object collision edges (from BMS meshes).

#### Expected Folder Structure

The script expects the following folder structure (extracted from PK2 archives):

```
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
```

#### Usage

```bash
# Build collision for single region (hex or decimal)
python3 navmesh_builder.py ./output -r 3a44
python3 navmesh_builder.py ./output -r 0x3a44
python3 navmesh_builder.py ./output -r 14916

# Build collision for multiple regions
python3 navmesh_builder.py ./output -r 3a44 3a45 3a46
python3 navmesh_builder.py ./output -r 14916 14917 14918

# Build collision for ALL active regions
python3 navmesh_builder.py ./output --all

# Specify output file
python3 navmesh_builder.py ./output --all -o world.json

# Enable verbose output
python3 navmesh_builder.py ./output --all -v
```

#### Command Line Options

| Option | Description |
|--------|-------------|
| `data_folder` | Folder containing navmesh/Prim/Res subfolders |
| `-r, --region` | Process specific region(s) - supports hex (`3a44`, `0x3a44`) or decimal (`14916`), multiple IDs space-separated |
| `--all` | Process all active regions from mapinfo.mfo |
| `-o, --output` | Output JSON file (default: `navmesh.json`) |
| `-v, --verbose` | Show detailed progress |

#### Output JSON Structure

```json
{
  "region_count": 4021,
  "regions": {
    "0x3a44": {
      "region_id": 14916,
      "x_sector": 68,
      "y_sector": 58,
      "terrain_edges": [
        {
          "source": {"x": 880, "y": 520},
          "destination": {"x": 920, "y": 520}
        }
      ],
      "object_edges": [
        {
          "source": {"x": 100, "y": 200},
          "destination": {"x": 150, "y": 200}
        }
      ]
    }
  }
}
```

#### How It Works

1. **Terrain Collision**: Extracts blocking edges from `NavEdgeInternal` entries where `has_neighbour_cell` is True (edges at region boundaries).

2. **Object Collision**: For each object in the navmesh:
   - Looks up the resource path in `object.ifo`
   - Loads the BSR file to get the mesh path
   - Loads the BMS file for collision outlines
   - Transforms mesh points to world coordinates (translation + rotation)
   - Skips bridge elements (flag = 16) which are walkable underneath

3. **Coordinate Transformation**: Y-axis is inverted (`1920 - y`) to match the collision detection coordinate system.

#### Data Structure Descriptions

| Field | Description |
|-------|-------------|
| `terrain_edges` | Collision edges from terrain (blocking internal edges) |
| `object_edges` | Collision edges from objects (buildings, walls, etc.) |
| `source` | Start point of collision edge (x, y in collision space) |
| `destination` | End point of collision edge (x, y in collision space) |

### D.8 NavMesh to Web Converter

The `navmesh_to_js.py` script converts the navmesh JSON output from `navmesh_builder.py` into per-region JSON files optimized for web AJAX loading in xSROMap.

#### Usage

```bash
# Convert navmesh.json to per-region web files
python3 navmesh_to_js.py navmesh.json -o ../data/navmesh/

# With verbose output
python3 navmesh_to_js.py navmesh.json -o ../data/navmesh/ -v
```

#### Command Line Options

| Option | Description |
|--------|-------------|
| `input` | Input navmesh JSON file (from navmesh_builder.py) |
| `-o, --output` | Output directory for per-region JSON files (default: `./navmesh`) |
| `-v, --verbose` | Show detailed progress |

#### Input Format (from navmesh_builder.py)

```json
{
  "region_count": 2,
  "regions": {
    "0x61a7": {
      "region_id": 24999,
      "x_sector": 167,
      "y_sector": 97,
      "terrain_edges": [
        { "source": {"x": 180, "y": 640}, "destination": {"x": 200, "y": 640} }
      ],
      "object_edges": [
        { "source": {"x": 100, "y": 200}, "destination": {"x": 150, "y": 250} }
      ]
    }
  }
}
```

#### Output Format (per-region JSON: nv_XXXX.json)

```json
{
  "region_id": 24999,
  "x_sector": 167,
  "y_sector": 97,
  "terrain_edges": [[lat1, lng1, lat2, lng2], ...],
  "object_edges": [[lat1, lng1, lat2, lng2], ...]
}
```

#### Output Files

```
output_dir/
├── index.json      # List of available region IDs: {"regions": [24999, 25000]}
├── nv_61a7.json    # Region 24999 (0x61a7)
├── nv_61a8.json    # Region 25000 (0x61a8)
└── ...
```

#### Coordinate Transformation

The script converts navmesh collision coordinates to Leaflet lat/lng:

1. **Navmesh coordinates**: 0-1920 within region (Y-axis inverted by navmesh_builder.py)
2. **Leaflet coordinates**:
   - `lat = ySector + (1920 - y) / 1920.0 - 1`
   - `lng = xSector + x / 1920.0`

This transformation aligns collision edges with the minimap tiles in xSROMap.

#### xSROMap Integration

The web map loads navmesh data via AJAX when the user toggles navmesh visibility:

```javascript
// Toggle navmesh display
xSROMap.ToggleNavMesh();

// Show/hide navmesh
xSROMap.ShowNavMesh();
xSROMap.HideNavMesh();

// Check visibility
xSROMap.IsNavMeshVisible();

// Pre-load specific regions
xSROMap.PreloadNavMesh([24999, 25000]);

// Set custom data path
xSROMap.SetNavMeshPath('data/navmesh/');
```

#### Edge Rendering Styles

| Edge Type | Color | Description |
|-----------|-------|-------------|
| `terrain_edges` | Red (#FF0000) | Terrain collision boundaries |
| `object_edges` | Orange (#FF6600) | Object collision (buildings, walls) |
| `bridge` | Green (#00FF00) | Bridge edges (flag=16, walkable underneath) |
| `global_edges` | Blue (#0066FF) | Cross-region boundaries |

### D.9 Minimap Tools

#### DDJ to PNG Conversion

```bash
# Convert single DDJ to PNG
python3 silkroad_parser.py file.ddj --png

# Convert DDJ to DDS (default)
python3 silkroad_parser.py file.ddj
```

#### Stitch Minimap Tiles

The `stitch_minimap.py` script combines minimap tiles into a single world map image.

```bash
# Stitch all minimap tiles
python3 stitch_minimap.py data/mediapk2/minimap worldmap.png
```

The script:
1. Scans for all `NxN.png` tiles (e.g., `100x100.png`)
2. Calculates world bounds from tile coordinates
3. Creates a large canvas (256 pixels per tile)
4. Places each tile at correct position (Y-axis flipped so north is up)
5. Saves as PNG

---

*Document generated: December 2024*
*Last updated: December 2024 - Added D.8 NavMesh to Web Converter documentation*
