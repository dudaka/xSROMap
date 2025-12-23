# Silkroad Online & Leaflet Map Coordinate Systems

This document provides a comprehensive explanation of the coordinate systems used in Silkroad Online and how they map to the Leaflet web map implementation in xSROMap.

---

## Table of Contents

1. [Overview](#overview)
2. [Silkroad Online Coordinate Systems](#silkroad-online-coordinate-systems)
   - [Game Coordinates (IG)](#game-coordinates-ig---in-game)
   - [Internal Client Coordinates (IC)](#internal-client-coordinates-ic)
   - [Region Encoding](#region-encoding)
3. [Understanding Sectors](#understanding-sectors)
   - [What is a Sector?](#what-is-a-sector)
   - [Total Sectors in the Map](#total-sectors-in-the-map)
   - [X and Y Sector Ranges](#x-and-y-sector-ranges)
4. [The Z Coordinate](#the-z-coordinate)
   - [Z on World Map](#z-on-world-map)
   - [Z in Dungeons](#z-in-dungeons)
5. [Leaflet Map Coordinate System](#leaflet-map-coordinate-system)
6. [Coordinate Conversion Functions](#coordinate-conversion-functions)
7. [Mathematical Formulas](#mathematical-formulas)
8. [Key Constants](#key-constants)
9. [World Map vs Dungeon Coordinates](#world-map-vs-dungeon-coordinates)
   - [Key Differences](#key-differences)
   - [World Map Details](#world-map-details)
   - [Dungeon Details](#dungeon-details)
10. [Practical Examples](#practical-examples)

---

## Overview

The xSROMap system bridges two fundamentally different coordinate systems:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COORDINATE SYSTEMS OVERVIEW                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐         ┌─────────────────────┐                    │
│  │   SILKROAD ONLINE   │         │    LEAFLET MAP      │                    │
│  │    (Game Engine)    │ ◄─────► │   (Web Display)     │                    │
│  └─────────────────────┘         └─────────────────────┘                    │
│                                                                             │
│  Two formats:                    Simple CRS:                                │
│  • Game Coords (PosX, PosY)      • lat (Y-axis)                             │
│  • Internal (X, Y, Z, Region)    • lng (X-axis)                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Silkroad Online Coordinate Systems

Silkroad Online uses two distinct coordinate formats for representing positions in the game world.

### Game Coordinates (IG - In Game)

These are the **continuous world coordinates** that players typically see or use in-game.

| Property | Type  | Description                              |
|----------|-------|------------------------------------------|
| `posX`   | float | Continuous X position in the world       |
| `posY`   | float | Continuous Y position in the world       |

**Characteristics:**
- Continuous floating-point values spanning the entire game world
- Can be negative (west/south of origin) or positive (east/north of origin)
- The origin (0, 0) is approximately at the center of the world map
- Each "sector" spans 192 units in both X and Y directions

**Example:**
```
posX = 114.0, posY = 47.25  (Default view - near Hotan)
```

---

### Internal Client Coordinates (IC)

These are the **sector-based coordinates** used internally by the game client for network packets and data storage.

| Property | Type   | Description                                      |
|----------|--------|--------------------------------------------------|
| `x`      | uint   | Local X position within sector (0-1920)          |
| `y`      | uint   | Local Y position within sector (0-1920)          |
| `z`      | uint   | Height/elevation                                 |
| `region` | ushort | Encoded sector identifier                        |

**Characteristics:**
- Position within a sector is divided into 1920 units (192 * 10)
- Each sector represents a 192x192 game unit area
- The `region` encodes both the X and Y sector indices
- More precise for network transmission (integer values)

**Value Ranges:**
- `x`: 0 to 1920 (within sector)
- `y`: 0 to 1920 (within sector)
- `z`: 0+ (height above ground)
- `region`: 0 to 65535 (encoded sector)

---

### Region Encoding

The `region` value is a 16-bit unsigned integer that encodes both the X and Y sector indices:

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGION ENCODING (16-bit)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Bits:    15  14  13  12  11  10  9   8   7   6   5   4   3   2   1   0   │
│            └──────────────────────┘   └──────────────────────────┘         │
│                   Y Sector                    X Sector                     │
│                 (High Byte)                 (Low Byte)                     │
│                                                                 │
│   Formula:                                                      │
│   region = (ySector << 8) | xSector                             │
│                                                                 │
│   Decoding:                                                     │
│   xSector = region & 0xFF         (Lower 8 bits)                │
│   ySector = (region >> 8) & 0xFF  (Upper 8 bits)                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**World Map Regions:**
- Valid range: 0 to 32767 (regions <= 32767 are world map)
- Sector coordinates typically range from ~120-180 for X and ~80-110 for Y

**Dungeon/Instance Regions:**
- Range: 32768 to 65535 (regions > 32767 are dungeons/instances)
- Each dungeon has a unique region ID (e.g., 32769 = Donwhang Stone Cave)

**Example Region Decoding:**
```javascript
region = 25000

xSector = 25000 & 0xFF           = 168
ySector = (25000 >> 8) & 0xFF    = 97

// Verification: (97 << 8) | 168 = 24832 + 168 = 25000 ✓
```

---

## Understanding Sectors

### What is a Sector?

A **sector** is the fundamental unit of the Silkroad game world's grid system. The entire world map is divided into a grid of rectangular tiles called sectors.

**Sector Properties:**
- Each sector is **192 × 192 game units** in size
- Has a unique **X index** (horizontal) and **Y index** (vertical)
- Contains local coordinates from **0 to 1920** (192 × 10 for network precision)
- Corresponds to one minimap tile image file

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SECTOR GRID                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Y Sector ↑                                                                │
│            │                                                                │
│        98  │  ┌────────┬────────┬────────┐                                  │
│            │  │ Sector │ Sector │ Sector │                                  │
│            │  │(134,98)│(135,98)│(136,98)│                                  │
│        97  │  ├────────┼────────┼────────┤                                  │
│            │  │ Sector │ Sector │ Sector │  ← Each cell is 192×192 units   │
│            │  │(134,97)│(135,97)│(136,97)│                                  │
│        96  │  ├────────┼────────┼────────┤                                  │
│            │  │ Sector │ Sector │ Sector │                                  │
│            │  │(134,96)│(135,96)│(136,96)│                                  │
│            │  └────────┴────────┴────────┘                                  │
│            └────────────────────────────────────► X Sector                  │
│                  134      135      136                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Position Within a Sector:**

Once inside a sector, your position is given by local `x` and `y` values (0-1920):

```
┌────────────────────────────────────────┐
│           One Sector (192 × 192)       │
│                                        │
│  y=1920 ┌──────────────────────────┐   │
│         │                          │   │
│         │      Player at           │   │
│         │     x=500, y=800         │   │
│         │          ●               │   │
│         │                          │   │
│   y=0   └──────────────────────────┘   │
│        x=0                      x=1920 │
│                                        │
└────────────────────────────────────────┘
```

**Why Sectors?**

1. **Efficient networking** - Send integer values instead of large floats
2. **Tile-based map loading** - Load/unload map chunks as player moves
3. **Minimap tiles** - Each sector corresponds to one minimap image file at `assets/img/silkroad/minimap/{z}/{x}x{y}.jpg`
4. **Region-based logic** - Game can quickly check which area a player is in

---

### Total Sectors in the Map

Based on the code configuration:

```javascript
var mapSize = 49152;  // Total map size in game units
// 49152 / 192 = 256 sectors per axis
```

| Metric | Value | Calculation |
|--------|-------|-------------|
| Theoretical Maximum | 65,536 sectors | 256 × 256 |
| World Map Limit | 32,768 sectors | 256 × 128 (region ≤ 32767, ySector max = 127) |
| Actual Playable | ~1,800 sectors | ~60 × 30 (approximate) |

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      THEORETICAL vs ACTUAL MAP SIZE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Full Grid Capacity:                                                        │
│  ───────────────────                                                        │
│  • Theoretical grid:  256 × 256 = 65,536 sectors                            │
│  • World map limit:   Region ≤ 32767 means ySector max = 127                │
│                       → 256 × 128 = 32,768 possible world sectors           │
│                                                                             │
│  Actual Usage:                                                              │
│  ─────────────                                                              │
│  • The playable Silkroad world uses only a fraction of the grid             │
│  • Roughly ~60 sectors wide × ~30 sectors tall ≈ 1,800 active sectors       │
│  • Most of the theoretical grid is empty/unused                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### X and Y Sector Ranges

From the code constants and region encoding:

| Axis | Encoding | Theoretical Range | Practical Range (Playable) |
|------|----------|-------------------|----------------------------|
| X Sector | Lower 8 bits of region | 0 - 255 | ~120 - 180 |
| Y Sector | Upper 8 bits of region | 0 - 127 (world map) | ~80 - 110 |

**Origin Point:**

The game world is centered around sector **(135, 92)** which corresponds to game coordinates `posX=0, posY=0`.

```javascript
// Origin offsets in the code
var xSector = ... + 135;  // X origin at sector 135
var ySector = ... + 92;   // Y origin at sector 92

// Initial map view
map.setView([91, 135], 8);  // [lat=91, lng=135]
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SECTOR RANGE VISUALIZATION                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Y Sector                                                                   │
│     ↑                                                                       │
│ 127 ┤ · · · · · · · · · · · · · · · · · · · · · (max for world map)        │
│     │                                                                       │
│ 110 ┤           ┌─────────────────────────┐                                 │
│     │           │                         │                                 │
│ 100 ┤           │     PLAYABLE WORLD      │                                 │
│     │           │                         │                                 │
│  92 ┤─ ─ ─ ─ ─ ─│─ ─ ─ ─ ● ─ ─ ─ ─ ─ ─ ─ ─│─ ─ ─ ─  (origin Y = 92)       │
│     │           │      (135,92)           │                                 │
│  80 ┤           └─────────────────────────┘                                 │
│     │                                                                       │
│   0 ┼───────────────────────────────────────────────────► X Sector          │
│     0          120     135     150       180           255                  │
│                         ↑                                                   │
│                   (origin X = 135)                                          │
│                                                                             │
│  Note: Sectors outside the playable area exist in the grid but contain     │
│  no game content (empty ocean, void, or unused space).                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The Z Coordinate

The **Z coordinate** represents **height/elevation** and behaves differently depending on whether you're on the world map or in a dungeon.

### Z on World Map

On the world map, the Z coordinate is **largely ignored** for positioning purposes:

```javascript
gameCoords['z'] = 0;  // Always set to 0 for world map
```

**Why Z is Ignored on World Map:**
- The world map is essentially a **2D representation**
- Terrain height is handled by the **3D game engine**, not the coordinate system
- All world map positions use `z = 0` regardless of actual terrain elevation
- The web map displays a flat 2D view anyway

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Z ON WORLD MAP                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   In-Game 3D View:              Web Map 2D View:                            │
│   ────────────────              ────────────────                            │
│                                                                             │
│       /\                        ┌──────────────────┐                        │
│      /  \    ← Mountain         │                  │                        │
│     /    \                      │    All positions │                        │
│    /  ●   \   Player on         │    shown at z=0  │                        │
│   /________\  mountain          │        ●         │                        │
│                                 │                  │                        │
│   z = varies (game engine)      └──────────────────┘                        │
│   z = 0 (coordinate system)     z is not displayed                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Z in Dungeons

In dungeons, Z becomes **critical** for determining which floor to display:

```javascript
// Donwhang Stone Cave floor configuration (region 32769)
mappingLayers['32769'] = new SRLayer(/* floor 1 */, {
    posZ: 0,
    overlap: [
        new SRLayer(/* floor 2 */, { posZ: 115 }),
        new SRLayer(/* floor 3 */, { posZ: 230 }),
        new SRLayer(/* floor 4 */, { posZ: 345 }),
    ]
});
```

**Floor Selection Logic:**

The code determines which floor to display based on the Z value:

```javascript
// Find correct floor based on Z value
for (var i = 0; i < layers.length; i++) {
    if (coord.z < layers[i].options.posZ) break;
    layer = layers[i];
}
```

**Multi-Floor Dungeon Example:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DONWHANG STONE CAVE (Region 32769)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Z Value        Floor         Map Layer Shown                              │
│   ───────        ─────         ───────────────                              │
│                                                                             │
│   z ≥ 345   →   Floor 4   →   dh_a01_floor04_{x}x{y}.jpg                   │
│   z ≥ 230   →   Floor 3   →   dh_a01_floor03_{x}x{y}.jpg                   │
│   z ≥ 115   →   Floor 2   →   dh_a01_floor02_{x}x{y}.jpg                   │
│   z ≥ 0     →   Floor 1   →   dh_a01_floor01_{x}x{y}.jpg                   │
│                                                                             │
│   Visual Representation:                                                    │
│   ──────────────────────                                                    │
│                                                                             │
│   Floor 4  ┌───────────┐  posZ = 345                                        │
│            │           │                                                    │
│   Floor 3  ├───────────┤  posZ = 230                                        │
│            │           │                                                    │
│   Floor 2  ├───────────┤  posZ = 115                                        │
│            │           │                                                    │
│   Floor 1  └───────────┘  posZ = 0                                          │
│                                                                             │
│   Same X,Y coordinates can exist on different floors!                       │
│   Example:                                                                  │
│   • x=500, y=800, z=50   → Shows Floor 1                                   │
│   • x=500, y=800, z=200  → Shows Floor 3                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Z Coordinate Summary

| Context | Z Value | Purpose | Displayed? |
|---------|---------|---------|------------|
| World Map | Always 0 | Not used for positioning | Shown as 0 in popup |
| Dungeon Floor 1 | 0 | Ground level | Yes |
| Dungeon Floor 2 | 115 | Second level | Yes |
| Dungeon Floor 3 | 230 | Third level | Yes |
| Dungeon Floor 4 | 345 | Fourth level | Yes |
| Teleport Data | Varies | Spawn height at destination | Yes |

---

## Leaflet Map Coordinate System

The xSROMap uses Leaflet with `CRS.Simple` - a simple rectangular (Cartesian) projection.

| Property | Description                                      |
|----------|--------------------------------------------------|
| `lat`    | Latitude - corresponds to Y axis (vertical)      |
| `lng`    | Longitude - corresponds to X axis (horizontal)   |

**Configuration:**
```javascript
L.map('map', {
    crs: L.CRS.Simple,   // Simple rectangular projection
    minZoom: 0,
    maxZoom: 9,
});
```

**Map Bounds:**
```javascript
// Map size: 192 map units × 256 tiles = 49152 game units
var mapSize = 49152;
map.fitBounds([
    [0, 0],          // Southwest corner
    [mapSize, mapSize]  // Northeast corner
]);
```

**Initial View:**
```javascript
map.setView([91, 135], 8);  // [lat, lng], zoom
// This corresponds to approximately the center of the Silkroad world
```

---

## Coordinate Conversion Functions

The xSROMap implements four key conversion functions:

### 1. CoordSROToMap (Silkroad → Leaflet)

Converts Silkroad coordinates to Leaflet map coordinates.

```javascript
var CoordSROToMap = function (coords) {
    var lng, lat;

    // Dungeon coordinates (region > 32767)
    if (coords.region > 32767) {
        lng = (128 * 192 + coords.x / 10) / 192;
        lat = (127 * 192 + coords.y / 10) / 192;
        return [lat, lng];
    }

    // World coordinates - Game format (posX, posY)
    if (coords.posY && coords.posX) {
        lat = coords.posY / 192 + 91;
        lng = coords.posX / 192 + 135;
    }
    // World coordinates - Internal format (x, y, region)
    else {
        lng = (coords.region & 0xFF) + coords.x / 1920;
        lat = ((coords.region >> 8) & 0xFF) + coords.y / 1920 - 1;
    }

    return [lat, lng];
};
```

### 2. CoordMapToSRO (Leaflet → Silkroad)

Converts Leaflet map coordinates to Silkroad coordinates.

```javascript
var CoordMapToSRO = function (latlng) {
    // World layer
    if (mapLayer == mappingLayers['']) {
        return CoordsGameToSRO({
            posX: (latlng.lng - 135) * 192,
            posY: (latlng.lat - 91) * 192,
        });
    }

    // Dungeon layer
    return {
        x: (latlng.lng * 192 - 128 * 192) * 10,
        y: (latlng.lat * 192 - 127 * 192) * 10,
        z: mapLayer.options.posZ,
        region: mapLayer.options.region,
    };
};
```

### 3. CoordsGameToSRO (Game → Internal)

Converts game coordinates to internal client format.

```javascript
var CoordsGameToSRO = function (gameCoords) {
    // Calculate local position within sector (0-1920)
    gameCoords['x'] = Math.round((Math.abs(gameCoords.posX) % 192.0) * 10.0);
    if (gameCoords.posX < 0.0) gameCoords.x = 1920 - gameCoords.x;

    gameCoords['y'] = Math.round((Math.abs(gameCoords.posY) % 192.0) * 10.0);
    if (gameCoords.posY < 0.0) gameCoords.y = 1920 - gameCoords.y;

    gameCoords['z'] = 0;

    // Calculate sector indices
    var xSector = Math.round(
        (gameCoords.posX - gameCoords.x / 10.0) / 192.0 + 135
    );
    var ySector = Math.round(
        (gameCoords.posY - gameCoords.y / 10.0) / 192.0 + 92
    );

    // Encode region
    gameCoords['region'] = (ySector << 8) | xSector;

    return gameCoords;
};
```

### 4. fixCoords (Normalize Coordinates)

Normalizes input coordinates and handles negative regions.

```javascript
var fixCoords = function (x, y, z, region) {
    // Fix negative region (from signed short)
    if (region < 0) region += 65536;

    // If no region provided, treat as game coordinates
    if (region == null) {
        return CoordsGameToSRO({ posX: x, posY: y });
    }

    // Already internal format
    return { x: x, y: y, z: z, region: region };
};
```

---

## Mathematical Formulas

### World Map Conversions

#### Game Coordinates (posX, posY) ↔ Leaflet (lat, lng)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    WORLD MAP CONVERSION FORMULAS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Game → Leaflet:                                                            │
│  ───────────────                                                            │
│  lat = posY / 192 + 91                                                      │
│  lng = posX / 192 + 135                                                     │
│                                                                             │
│  Leaflet → Game:                                                            │
│  ───────────────                                                            │
│  posX = (lng - 135) × 192                                                   │
│  posY = (lat - 91) × 192                                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Internal Coordinates (x, y, region) ↔ Leaflet (lat, lng)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 INTERNAL COORDINATES CONVERSION FORMULAS                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Internal → Leaflet:                                                        │
│  ───────────────────                                                        │
│  xSector = region & 0xFF                                                    │
│  ySector = (region >> 8) & 0xFF                                             │
│                                                                             │
│  lng = xSector + x / 1920                                                   │
│  lat = ySector + y / 1920 - 1                                               │
│                                                                             │
│  Leaflet → Internal:                                                        │
│  ───────────────────                                                        │
│  (First convert to Game coords, then use CoordsGameToSRO)                   │
│                                                                             │
│  posX = (lng - 135) × 192                                                   │
│  posY = (lat - 91) × 192                                                    │
│                                                                             │
│  x = round(|posX| mod 192 × 10)                                             │
│  y = round(|posY| mod 192 × 10)                                             │
│                                                                             │
│  if posX < 0: x = 1920 - x                                                  │
│  if posY < 0: y = 1920 - y                                                  │
│                                                                             │
│  xSector = round((posX - x/10) / 192 + 135)                                 │
│  ySector = round((posY - y/10) / 192 + 92)                                  │
│                                                                             │
│  region = (ySector << 8) | xSector                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Dungeon Map Conversions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DUNGEON CONVERSION FORMULAS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Internal → Leaflet:                                                        │
│  ───────────────────                                                        │
│  lng = (128 × 192 + x / 10) / 192                                           │
│  lat = (127 × 192 + y / 10) / 192                                           │
│                                                                             │
│  Simplified:                                                                │
│  lng = 128 + x / 1920                                                       │
│  lat = 127 + y / 1920                                                       │
│                                                                             │
│  Leaflet → Internal:                                                        │
│  ───────────────────                                                        │
│  x = (lng × 192 - 128 × 192) × 10                                           │
│  y = (lat × 192 - 127 × 192) × 10                                           │
│                                                                             │
│  Simplified:                                                                │
│  x = (lng - 128) × 1920                                                     │
│  y = (lat - 127) × 1920                                                     │
│                                                                             │
│  z = obtained from layer options (posZ)                                     │
│  region = obtained from layer options (region ID > 32767)                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Constants

| Constant | Value  | Description                                          |
|----------|--------|------------------------------------------------------|
| 192      | 192    | Sector size in game units                            |
| 1920     | 1920   | Local coordinate range within sector (192 × 10)      |
| 135      | 135    | X-axis offset (sector origin on Leaflet map)         |
| 91       | 91     | Y-axis offset for Leaflet conversion                 |
| 92       | 92     | Y-axis offset for sector calculation                 |
| 128      | 128    | X-axis offset for dungeon maps                       |
| 127      | 127    | Y-axis offset for dungeon maps                       |
| 32767    | 32767  | Maximum region ID for world map                      |
| 49152    | 49152  | Total map size (192 × 256 tiles)                     |

### Why These Offsets?

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           OFFSET EXPLANATION                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  The offsets (135, 91/92) represent the "origin" of the game world          │
│  relative to the Leaflet map's coordinate system.                           │
│                                                                             │
│  Game World Origin (posX=0, posY=0):                                        │
│  ──────────────────────────────────                                         │
│  • Maps to Leaflet coordinates (lat=91, lng=135)                            │
│  • This is approximately the center of the playable world                   │
│                                                                             │
│  Sector Grid:                                                               │
│  ────────────                                                               │
│  • X sectors range roughly from ~120 to ~180                                │
│  • Y sectors range roughly from ~80 to ~110                                 │
│  • Origin sector is at (135, 92) in the encoding                            │
│                                                                             │
│  Dungeon Origin (128, 127):                                                 │
│  ─────────────────────────                                                  │
│  • Dungeons use a separate coordinate space                                 │
│  • Centered at (128, 127) on the Leaflet map                                │
│  • Each dungeon layer occupies the same map area but different Z levels    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## World Map vs Dungeon Coordinates

### Key Differences

The coordinate system behaves fundamentally differently between the world map and dungeons:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      WORLD MAP vs DUNGEON COMPARISON                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Aspect              │ World Map              │ Dungeon                     │
│  ────────────────────┼────────────────────────┼─────────────────────────────│
│  Region Value        │ 0 - 32767              │ 32768 - 65535               │
│  Region Meaning      │ Encodes sector (X,Y)   │ Fixed dungeon ID            │
│  X,Y Meaning         │ Local within sector    │ Absolute in dungeon         │
│  Z Usage             │ Ignored (always 0)     │ Determines floor            │
│  Region Changes      │ Yes, as player moves   │ No, stays constant          │
│  Leaflet Origin      │ (135, 91)              │ (128, 127)                  │
│  Conversion Formula  │ Sector-based           │ Fixed offset                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Detection Logic:**

```javascript
if (coords.region > 32767) {
    // Dungeon - use fixed origin conversion
} else {
    // World map - use sector-based conversion
}
```

---

### World Map Details

**How Region Works on World Map:**

On the world map, the region value **encodes your position** by storing which sector you're in:

```
region = (ySector << 8) | xSector
```

As you move between sectors, your region value changes:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    WORLD MAP - REGION CHANGES WITH MOVEMENT                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Moving from Jangan to Donwhang:                                           │
│                                                                             │
│   ┌────────┬────────┬────────┬────────┐                                     │
│   │        │        │        │        │                                     │
│   │  Reg   │  Reg   │  Reg   │  Reg   │                                     │
│   │ 24960  │ 24961  │ 24962  │ 24963  │                                     │
│   ├────────┼────────┼────────┼────────┤                                     │
│   │   ●────┼────────┼────────┼────►   │  Player walks east                  │
│   │ Start  │        │        │  End   │                                     │
│   │ 24704  │ 24705  │ 24706  │ 24707  │                                     │
│   └────────┴────────┴────────┴────────┘                                     │
│                                                                             │
│   Region changes: 24704 → 24705 → 24706 → 24707                             │
│   (as player crosses sector boundaries)                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### World Map (region <= 32767)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            WORLD MAP GRID                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Y Sector                                                                  │
│      ↑                                                                      │
│  110 │  ┌─────┬─────┬─────┬─────┬─────┐                                     │
│      │  │     │     │     │     │     │ ← Each cell is 192×192 game units  │
│  105 │  ├─────┼─────┼─────┼─────┼─────┤                                     │
│      │  │     │     │     │     │     │                                     │
│  100 │  ├─────┼─────┼─────┼─────┼─────┤                                     │
│      │  │     │  ●  │     │     │     │ ● = Origin (posX=0, posY=0)        │
│   95 │  ├─────┼─────┼─────┼─────┼─────┤     at sector (135, ~92)           │
│      │  │     │     │     │     │     │                                     │
│   90 │  ├─────┼─────┼─────┼─────┼─────┤                                     │
│      │  │     │     │     │     │     │                                     │
│   85 │  └─────┴─────┴─────┴─────┴─────┘                                     │
│      └──────────────────────────────────► X Sector                          │
│         120   130   140   150   160                                         │
│                                                                             │
│   Region = (ySector << 8) | xSector                                         │
│   Example: Sector (135, 97) = region 24839                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Dungeon Details

**How Region Works in Dungeons:**

In dungeons, the region is a **fixed identifier** - it doesn't encode position, it identifies which dungeon you're in:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DUNGEON - REGION STAYS CONSTANT                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Player moving inside Donwhang Stone Cave:                                 │
│                                                                             │
│   ┌─────────────────────────────────────────┐                               │
│   │                                         │                               │
│   │   ●────────────────────────►            │                               │
│   │  Start                    End           │                               │
│   │  x=100                    x=5000        │                               │
│   │  y=200                    y=3000        │                               │
│   │                                         │                               │
│   │         Region: 32769 (always)          │                               │
│   │                                         │                               │
│   └─────────────────────────────────────────┘                               │
│                                                                             │
│   Region NEVER changes: always 32769 (Donwhang Cave ID)                     │
│   Only X, Y, Z values change as player moves                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Dungeon Coordinate Conversion:**

Dungeons use a simpler conversion formula with a fixed origin at (128, 127):

```javascript
// Dungeon → Leaflet
lng = 128 + x / 1920;
lat = 127 + y / 1920;

// Leaflet → Dungeon
x = (lng - 128) * 1920;
y = (lat - 127) * 1920;
z = mapLayer.options.posZ;      // From layer config
region = mapLayer.options.region; // From layer config
```

---

### Dungeon Maps (region > 32767)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DUNGEON LAYERS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Known Dungeon Regions:                                                    │
│   ─────────────────────                                                     │
│                                                                             │
│   Region  │ Name                              │ Notes                       │
│   ────────┼───────────────────────────────────┼─────────────────────────────│
│   32769   │ Donwhang Stone Cave              │ Has 4 floors (posZ: 0-345)  │
│   32770   │ Tomb of Qui-Shin [B6]            │                             │
│   32771   │ Tomb of Qui-Shin [B5]            │                             │
│   32772   │ Tomb of Qui-Shin [B4]            │                             │
│   32773   │ Tomb of Qui-Shin [B3]            │                             │
│   32774   │ Tomb of Qui-Shin [B2]            │                             │
│   32775   │ Tomb of Qui-Shin [B1]            │                             │
│   32779   │ Sanctum of Blue Eye              │                             │
│   32780   │ Sanctum of Anubis                │                             │
│   32781   │ Sanctum of Isis                  │                             │
│   32782   │ Sanctum of Haroeris              │                             │
│   32783   │ Sanctum of Seth                  │                             │
│   32784   │ Temple                           │                             │
│   32785   │ Cave of Meditation               │                             │
│   32786   │ Flame Mountain                   │                             │
│   32787   │ The Earth's Room                 │                             │
│   32788   │ Yuno's Room                      │                             │
│   32789   │ Jupiter's Room                   │                             │
│   32790   │ Zealots Hideout                  │                             │
│   32793   │ Kalia's Hideout                  │                             │
│                                                                             │
│   Multi-Floor Dungeons:                                                     │
│   ─────────────────────                                                     │
│   Some dungeons (like Donwhang Stone Cave) have multiple floors            │
│   sharing the same region ID but with different Z values (posZ).           │
│                                                                             │
│   Donwhang Stone Cave Floors:                                               │
│   • Floor 1: posZ = 0                                                       │
│   • Floor 2: posZ = 115                                                     │
│   • Floor 3: posZ = 230                                                     │
│   • Floor 4: posZ = 345                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Layer Selection Code

When navigating to a coordinate, the code determines the correct map layer to display:

```javascript
var getLayer = function (coord) {
    // Check if dungeon (region > 32767)
    if (coord.region > 32767) {
        var layer = mappingLayers['' + coord.region];
        if (layer) {
            // Check if dungeon has multiple floors (overlap)
            if (layer.options.overlap) {
                var layers = layer.options.overlap;
                // Find correct floor based on Z position
                for (var i = 0; i < layers.length; i++) {
                    if (coord.z < layers[i].options.posZ) break;
                    layer = layers[i];
                }
            } else {
                layer.options['posZ'] = 0;
            }
            layer.options['region'] = coord.region;
        }
        return layer;
    }
    // World map - return default layer
    return mappingLayers[''];
};
```

**Layer Selection Flow:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LAYER SELECTION FLOW                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Input: { x: 500, y: 800, z: 200, region: 32769 }                          │
│                                                                             │
│   Step 1: Is region > 32767?                                                │
│           32769 > 32767 = YES → Dungeon                                     │
│                                                                             │
│   Step 2: Get layer for region 32769                                        │
│           → Donwhang Stone Cave (has overlap floors)                        │
│                                                                             │
│   Step 3: Find floor based on Z = 200                                       │
│           Floor 1: posZ = 0   → 200 >= 0   ✓ (candidate)                   │
│           Floor 2: posZ = 115 → 200 >= 115 ✓ (candidate)                   │
│           Floor 3: posZ = 230 → 200 >= 230 ✗ (too high)                    │
│           → Select Floor 2 (highest floor where z >= posZ)                  │
│                                                                             │
│   Result: Display dh_a01_floor02_{x}x{y}.jpg                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Practical Examples

### Example 1: Converting Game Coordinates to Leaflet

```javascript
// Player position in game: posX = 100, posY = 50

// Step 1: Convert to Leaflet
lat = 50 / 192 + 91 = 91.26
lng = 100 / 192 + 135 = 135.52

// Result: Leaflet position [91.26, 135.52]
```

### Example 2: Converting Internal Coordinates to Leaflet

```javascript
// NPC position: x = 500, y = 800, region = 25000

// Step 1: Decode region
xSector = 25000 & 0xFF = 168
ySector = (25000 >> 8) & 0xFF = 97

// Step 2: Calculate Leaflet coordinates
lng = 168 + 500 / 1920 = 168.26
lat = 97 + 800 / 1920 - 1 = 96.42

// Result: Leaflet position [96.42, 168.26]
```

### Example 3: Converting Leaflet Click to Game Coordinates

```javascript
// User double-clicks at: lat = 95.5, lng = 140.0

// Step 1: Convert to game coordinates
posX = (140.0 - 135) * 192 = 960
posY = (95.5 - 91) * 192 = 864

// Step 2: Convert to internal format (CoordsGameToSRO)
x = round(960 % 192 * 10) = 0  // 960 is exactly 5 sectors
y = round(864 % 192 * 10) = 960

xSector = round((960 - 0) / 192 + 135) = 140
ySector = round((864 - 96) / 192 + 92) = 96

region = (96 << 8) | 140 = 24716

// Result: Internal coords { x: 0, y: 960, z: 0, region: 24716 }
```

### Example 4: Dungeon Coordinate Conversion

```javascript
// Position in Donwhang Cave: x = 5000, y = 3000, region = 32769

// Since region > 32767, use dungeon formula
lng = (128 * 192 + 5000 / 10) / 192 = 130.60
lat = (127 * 192 + 3000 / 10) / 192 = 128.56

// Result: Leaflet position [128.56, 130.60]
```

---

## Visual Coordinate Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     COMPLETE COORDINATE FLOW DIAGRAM                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         ┌─────────────────────┐                             │
│                         │  USER INTERACTION   │                             │
│                         │  (Click on map)     │                             │
│                         └──────────┬──────────┘                             │
│                                    │                                        │
│                                    ▼                                        │
│                         ┌─────────────────────┐                             │
│                         │   Leaflet LatLng    │                             │
│                         │   {lat, lng}        │                             │
│                         └──────────┬──────────┘                             │
│                                    │                                        │
│                    ┌───────────────┼───────────────┐                        │
│                    │               │               │                        │
│                    ▼               ▼               ▼                        │
│           ┌────────────┐   ┌────────────┐   ┌────────────┐                  │
│           │ World Map  │   │  Dungeon   │   │  Display   │                  │
│           │ Conversion │   │ Conversion │   │  Popup     │                  │
│           └─────┬──────┘   └─────┬──────┘   └────────────┘                  │
│                 │                │                                          │
│                 ▼                ▼                                          │
│        ┌─────────────┐   ┌─────────────┐                                    │
│        │ Game Coords │   │ Internal IC │                                    │
│        │ (posX,posY) │   │ (x,y,z,reg) │                                    │
│        └─────┬───────┘   └─────────────┘                                    │
│              │                                                              │
│              ▼                                                              │
│        ┌─────────────┐                                                      │
│        │CoordsGameTo │                                                      │
│        │    SRO      │                                                      │
│        └─────┬───────┘                                                      │
│              │                                                              │
│              ▼                                                              │
│        ┌─────────────┐                                                      │
│        │ Internal IC │                                                      │
│        │(x,y,z,region│                                                      │
│        └─────────────┘                                                      │
│                                                                             │
│                                                                             │
│  REVERSE FLOW (Loading NPC/Teleport data):                                  │
│  ─────────────────────────────────────────                                  │
│                                                                             │
│        ┌─────────────┐                                                      │
│        │  Data File  │                                                      │
│        │ (npcpos.txt)│                                                      │
│        └─────┬───────┘                                                      │
│              │                                                              │
│              ▼                                                              │
│        ┌─────────────┐                                                      │
│        │ Internal IC │                                                      │
│        │(x,y,z,region│                                                      │
│        └─────┬───────┘                                                      │
│              │                                                              │
│              ▼                                                              │
│        ┌─────────────┐                                                      │
│        │CoordSROToMap│                                                      │
│        └─────┬───────┘                                                      │
│              │                                                              │
│              ▼                                                              │
│        ┌─────────────┐                                                      │
│        │Leaflet LatLng                                                      │
│        │ [lat, lng]  │                                                      │
│        └─────┬───────┘                                                      │
│              │                                                              │
│              ▼                                                              │
│        ┌─────────────┐                                                      │
│        │   L.marker  │                                                      │
│        │   Display   │                                                      │
│        └─────────────┘                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Summary Table

| From            | To              | Function                 | World Map Formula                            |
|-----------------|-----------------|--------------------------|----------------------------------------------|
| Game (posX,posY)| Leaflet (lat,lng)| Direct calculation      | lat=posY/192+91, lng=posX/192+135            |
| Internal (IC)   | Leaflet (lat,lng)| CoordSROToMap           | lat=ySector+y/1920-1, lng=xSector+x/1920     |
| Leaflet (lat,lng)| Game (posX,posY)| Direct calculation      | posX=(lng-135)*192, posY=(lat-91)*192        |
| Leaflet (lat,lng)| Internal (IC)   | CoordMapToSRO           | Via game coords + CoordsGameToSRO            |
| Game (posX,posY)| Internal (IC)   | CoordsGameToSRO         | Complex sector calculation                   |

---

## Notes

1. **Tile Layer Inversion**: The Leaflet SRLayer inverts the Y coordinate (`tile.y = -tile.y`) to match Silkroad's coordinate orientation.

2. **Distance Calculation**: The `distanceTo` function is overridden for CRS.Simple to use Euclidean distance instead of geographic distance.

3. **Virtual Markers**: Markers use virtualization for performance - they are only added to the DOM when visible in the current viewport.

4. **URL Parameters**: The map supports GET parameters (`x`, `y`, `z`, `region`) for sharing specific locations via URL.
