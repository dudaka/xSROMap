# xSROMap Data Parser - Context Document

## Overview

This project parses Silkroad Online game data files to generate JavaScript files containing NPC and teleport information for a web-based map application.

**Available Implementations:**
- **C# version**: `main.cs` - Original implementation
- **Python version**: `main.py` - Uses pandas DataFrames for data processing

## Program Workflow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MAIN WORKFLOW                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌──────────────────────┐     ┌──────────────────────┐                          │
│  │ 1. LoadNameReferences│     │ Input Files:         │                          │
│  │                      │◄────│ - textdata_equip&... │                          │
│  │ Build name lookup    │     │ - textdata_object_.. │                          │
│  └──────────┬───────────┘     └──────────────────────┘                          │
│             │                                                                   │
│             ▼                                                                   │
│  ┌──────────────────────┐     ┌──────────────────────┐                          │
│  │ 2. LoadModels        │◄────│ characterdata_all.txt│                          │
│  │                      │     └──────────────────────┘                          │
│  │ Build model lookup   │                                                       │
│  │ (ID → Model)         │                                                       │
│  └──────────┬───────────┘                                                       │
│             │                                                                   │
│             ▼                                                                   │
│  ┌──────────────────────┐     ┌──────────────────────┐                          │
│  │ 3. GenerateNPCs      │◄────│ npcpos.txt           │                          │
│  │                      │     └──────────────────────┘                          │
│  │ Filter NPC Guides    │────────────────────────────────► NPCs.js              │
│  │ (tid2=2, tid3=2)     │                                                       │
│  └──────────┬───────────┘                                                       │
│             │                                                                   │
│             ▼                                                                   │
│  ┌──────────────────────┐     ┌──────────────────────┐                          │
│  │ 4. LoadTeleportData  │◄────│ teleportdata.txt     │                          │
│  │                      │     │ teleportbuilding.txt │                          │
│  │ Build teleport maps  │     └──────────────────────┘                          │
│  └──────────┬───────────┘                                                       │
│             │                                                                   │
│             ▼                                                                   │
│  ┌──────────────────────┐     ┌──────────────────────┐                          │
│  │ 5. LoadRegions       │◄────│ textzonename_all.txt │                          │
│  │                      │     └──────────────────────┘                          │
│  │ Build zone name map  │                                                       │
│  └──────────┬───────────┘                                                       │
│             │                                                                   │
│             ▼                                                                   │
│  ┌──────────────────────┐     ┌──────────────────────┐                          │
│  │ 6. LoadTeleportLinks │◄────│ teleportlink.txt     │                          │
│  │                      │     └──────────────────────┘                          │
│  │ Build source→dest    │                                                       │
│  │ teleport connections │                                                       │
│  └──────────┬───────────┘                                                       │
│             │                                                                   │
│             ▼                                                                   │
│  ┌──────────────────────┐                                                       │
│  │ 7. GenerateTeleport  │────────────────────────────────► TPs.js               │
│  │    Links             │────────────────────────────────► NPCsLinked.js        │
│  │                      │                                                       │
│  │ Combine buildings    │                                                       │
│  │ with teleport data   │                                                       │
│  └──────────────────────┘                                                       │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Input File Specifications

All input files are located in the `data/` directory and are **TSV (Tab-Separated Values)** files with **UTF-16 encoding**.

### Common Format Rules

- **Delimiter**: Tab character (`\t`)
- **Enabled Flag**: First column = `1` means record is enabled/active
- **Placeholder Values**: `xxx` or `0` indicate unused/null fields
- **Language Index**: Column index 9 (0-based) contains English text

---

### 1. characterdata_all.txt

**Purpose**: Defines all character/model types (NPCs, mobs, players, objects)

**Schema**:
```
[0]  Enabled     : "1" = active, "0" = disabled
[1]  ID          : uint - Unique model identifier
[2]  ServerName  : string - Internal server codename (e.g., "CHAR_CH_MAN_ADVENTURER")
[3]  xxx         : unused
[4]  xxx         : unused
[5]  NameRef     : string - Reference key for name lookup (or "xxx" if none)
[6]  xxx         : unused
[7-9] ...        : various flags
[10] tid2        : byte - Type ID level 2 (2 = NPC)
[11] tid3        : byte - Type ID level 3 (2 = Guide NPC)
[12] tid4        : byte - Type ID level 4
...  (many more columns for stats, assets, etc.)
```

**Key Type Identifiers (tid2, tid3)**:
| tid2 | tid3 | Description |
|------|------|-------------|
| 1    | *    | Player Character |
| 2    | 1    | NPC - General |
| 2    | 2    | NPC - Guide (Teleporter) |
| 3    | *    | Monster |
| 4    | *    | Object/Structure |

**Pseudocode**:
```
FOR each line in characterdata_all.txt:
    IF line starts with "1\t":  # enabled record
        data = split by tab
        model.ID = data[1]
        model.ServerName = data[2]
        model.Name = lookup_name(data[5])  # if not "xxx"
        model.tid2 = data[10]
        model.tid3 = data[11]
        model.tid4 = data[12]
        Models[model.ID] = model
```

---

### 2. npcpos.txt

**Purpose**: Defines spawn positions for NPCs in the game world

**Schema**:
```
[0] ModelID   : uint - References characterdata_all.txt ID
[1] Region    : uint - Map region identifier (e.g., 25000, 25001)
[2] X         : float - X coordinate within region
[3] Z         : float - Z coordinate (height/elevation)
[4] Y         : float - Y coordinate within region
```

**Example**:
```
2023    25257    659.73999    0.0    981.13
```

**Pseudocode**:
```
FOR each line in npcpos.txt:
    data = split by tab
    model = Models[data[0]]
    IF model.tid2 == 2 AND model.tid3 == 2:  # NPC Guide
        IF model.Name != "":
            npc = copy(model)
            npc.Region = data[1]
            npc.X = data[2]
            npc.Z = data[3]
            npc.Y = data[4]
            ADD to NPC list
```

---

### 3. textdata_equip&skill_all.txt / textdata_object_all.txt

**Purpose**: Multi-language name references for items, skills, NPCs, and objects

**Schema**:
```
[0]  Enabled     : "1" = active
[1]  ID/RefKey   : integer or string key
[2]  ServerName  : string - Reference key (for iSRO format, this is [2]; for other formats, [1])
[3-8] ...        : Various language translations
[9]  EnglishName : string - English localized name (LanguageIndex = 9)
...  (more languages)
```

**Format Detection**:
- If `data[1]` is numeric → iSRO format: key = `data[2]`
- If `data[1]` is string → Standard format: key = `data[1]`

**Pseudocode**:
```
FOR each line in text files:
    IF line starts with "1\t":
        data = split by tab
        IF data[LanguageIndex] != "0":
            IF data[1] is integer:  # iSRO format
                NameReferences[data[2]] = data[LanguageIndex]
            ELSE:
                NameReferences[data[1]] = data[LanguageIndex]
```

---

### 4. teleportdata.txt

**Purpose**: Defines teleport destination points with coordinates

**Schema**:
```
[0]  Enabled       : "1" = active
[1]  TeleportID    : string - Unique teleport point identifier
[2]  ServerName    : string - Internal name (e.g., "GATE_CH")
[3]  ModelID       : uint - Associated model ID
[4]  ZoneNameRef   : string - Reference to zone name (e.g., "SN_ZONE_22001")
[5]  Region        : uint - Map region
[6]  X             : float - X coordinate
[7]  Z             : float - Z coordinate (height)
[8]  Y             : float - Y coordinate
[9]  Radius        : uint - Teleport trigger radius
[10] Flag1         : various
[11] Flag2         : various
[12] Flag3         : various
```

**Example**:
```
1    1    GATE_CH    2094    SN_ZONE_22001    25000    969    0    1369    150    1    0    1
```

---

### 5. teleportlink.txt

**Purpose**: Defines connections between teleport points (source → destination mapping)

**Schema**:
```
[0]  Enabled         : "1" = active
[1]  SourceTeleportID: uint - Source teleport point (references teleportdata.txt)
[2]  DestTeleportID  : uint - Destination teleport point
[3]  Cost            : uint - Gold cost for teleport
[4-22] ...           : Various flags and conditions
```

**Example**:
```
1    1    2    5000    0    0    2    0    0    ...
```
This means: From teleport point 1, you can go to teleport point 2 for 5000 gold.

**Pseudocode**:
```
FOR each line in teleportlink.txt:
    IF line starts with "1\t":
        data = split by tab
        sourceID = data[1]
        destID = data[2]

        IF sourceID exists in TeleportsLinks:
            # Add destination to existing teleport
            destination = create_destination(TeleportData[destID])
            TeleportsLinks[sourceID].Links.add(destination)
        ELSE:
            # Create new teleport entry
            teleport = new Teleport()
            teleport.SourceID = sourceID
            teleport.ID = TeleportData[sourceID].ModelID
            teleport.Name = lookup_name(...)
            teleport.Region, X, Y, Z = TeleportData[sourceID]

            destination = create_destination(TeleportData[destID])
            teleport.Links.add(destination)

            TeleportsLinks[sourceID] = teleport
            StoreLinks[teleport.ID] = teleport
```

---

### 6. teleportbuilding.txt

**Purpose**: Defines physical teleport building structures with exact positions

**Schema**:
```
[0]  Enabled       : "1" = active
[1]  ID            : uint - Building identifier (matches TeleportData ModelID)
[2]  ServerName    : string - Internal name
[3]  LocalizedName : string - Display name (may be garbled/encoded)
[4]  xxx           : unused
[5]  NameRef       : string - Reference to name lookup
[6]  xxx           : unused
[7-11] ...         : Various flags
[12] Type          : uint - Building type (teleport type category)
...
[41] Region        : uint - Map region
[42] xxx           : unused
[43] X             : float - X coordinate
[44] Z             : float - Z coordinate
[45] Y             : float - Y coordinate
...
```

**Building Types**:
| Type | Description |
|------|-------------|
| 1    | City Gate |
| 2    | Portal |
| 3    | Fortress Gate |
| 5    | Default/Other |

---

### 7. textzonename_all.txt

**Purpose**: Maps region IDs to human-readable zone names

**Schema**:
```
[0]  Enabled     : "1" = active
[1]  ID          : uint - Unique identifier
[2]  RegionID    : uint - Map region ID (e.g., 24999, 25000)
[3]  ServerName  : string - Internal zone name reference
[4-8] ...        : Various language translations
[9]  EnglishName : string - English zone name (e.g., "Jangan", "Grassland")
...
```

**Example**:
```
1    1    24999    長安城    0    0    0    0    0    Jangan    ...
```

---

## Output File Specifications

### NPCs.js

```javascript
var NPCs=[
    {'name':'NPC Name','region':25000,'x':332.73,'z':0.0,'y':1406.7},
    ...
];
```

### NPCsLinked.js

```javascript
var NPCs=[
    {
        'name':'NPC Name',
        'region':25000,
        'x':332.73,
        'z':0.0,
        'y':1406.7,
        'teleport':[
            {'name':'Destination','region':25001,'x':100.0,'z':0.0,'y':200.0},
            ...
        ]
    },
    ...
];
```

### TPs.js

```javascript
var TPs=[
    {
        'name':'Teleport Name',
        'region':25000,
        'x':969.0,
        'z':0.0,
        'y':1369.0,
        'type':1,
        'teleport':[
            {'name':'Destination','region':25001,'x':100.0,'z':0.0,'y':200.0},
            ...
        ]
    },
    ...
];
```

---

## Data Classes

### Model
```csharp
class Model {
    uint ID;              // Unique identifier
    string ServerName;    // Internal codename
    string Name;          // Localized display name
    byte tid2, tid3, tid4; // Type identifiers
    string Region, X, Y, Z; // Position data
    List<Teleport> Links;  // Associated teleport destinations
}
```

### Teleport
```csharp
class Teleport {
    uint ID;              // Model ID
    uint SourceID;        // Teleport source identifier
    string Name;          // Display name
    string ServerName;    // Internal name
    string X, Y, Z, Region; // Position
    List<Destination> Links; // Available destinations

    class Destination {
        string Name;
        string X, Y, Z, Region;
    }
}
```

---

## Key Processing Logic

### NPC Filtering Criteria
```
Model must satisfy:
- tid2 == 2 (NPC category)
- tid3 == 2 (Guide subcategory)
- Name != "" (has localized name)
```

### Name Resolution Priority
1. Look up in NameReferences dictionary
2. Fall back to ServerName
3. Use empty string if not found

### Coordinate System
- **Region**: Grid-based world map identifier (e.g., 25000 = Jangan area)
- **X, Y**: Horizontal position within region
- **Z**: Vertical position (height/elevation)

---

## Configuration

```csharp
private static byte LanguageIndex = 9;  // English language column index
```

To change language output, modify `LanguageIndex` to the appropriate column:
| Index | Language |
|-------|----------|
| 9     | English  |
| 3-4   | Chinese variants |
| ...   | Other languages |

---

## File Dependencies Diagram

```
textdata_equip&skill_all.txt ─┐
                              ├──► NameReferences Dictionary
textdata_object_all.txt ──────┘
                                           │
                                           ▼
characterdata_all.txt ────────────────► Models Dictionary
                                           │
                                           ▼
npcpos.txt ───────────────────────────► Filter NPCs (tid2=2, tid3=2)
                                           │
                                           ├──► NPCs.js
                                           │
teleportdata.txt ─────────────────────► TeleportData Dictionary
                                           │
teleportbuilding.txt ─────────────────► TeleportAndBuildings Dictionary
                                           │
teleportlink.txt ─────────────────────► TeleportsLinks + StoreLinks
                                           │
textzonename_all.txt ─────────────────► RegionReferences Dictionary
                                           │
                                           ├──► TPs.js
                                           └──► NPCsLinked.js
```

---

## Usage Notes

1. **Input files must be in the `data/` subdirectory**
2. **File format**: TSV (Tab-Separated Values) with UTF-16 LE encoding
3. **Output**: JavaScript files with single-quoted JSON-like syntax
4. **Character escaping**: Single quotes in names are escaped as `\'`

---

## Python Implementation

### Requirements

The Python version uses a conda environment with the following dependencies:
- Python 3.11
- pandas >= 2.0

### Environment Setup

```bash
# Create conda environment
conda env create -f environment.yml

# Activate environment
conda activate xsromap
```

### Usage

```bash
# Run with data directory
python main.py --data-dir ./data

# Or from the data directory
cd data && python ../main.py
```

### Python Data Classes

```python
@dataclass
class Model:
    id: int              # Unique identifier
    server_name: str     # Internal codename
    name: str            # Localized display name
    tid2: int            # Type ID level 2
    tid3: int            # Type ID level 3
    tid4: int            # Type ID level 4
    region: str          # Map region
    x: str               # X coordinate
    y: str               # Y coordinate
    z: str               # Z coordinate
    links: list          # Associated teleport destinations

@dataclass
class Teleport:
    id: int              # Model ID
    source_id: int       # Teleport source identifier
    name: str            # Display name
    server_name: str     # Internal name
    region: str          # Map region
    x: str               # X coordinate
    y: str               # Y coordinate
    z: str               # Z coordinate
    links: list          # Available destinations

@dataclass
class Destination:
    name: str            # Destination name
    region: str          # Map region
    x: str               # X coordinate
    y: str               # Y coordinate
    z: str               # Z coordinate
```

### Key Features (Python)

1. **Pandas DataFrames**: Uses pandas for efficient TSV file reading and processing
2. **Multiple Encoding Support**: Automatically tries UTF-16, UTF-16-LE, and UTF-8 encodings
3. **Error Handling**: Skips malformed lines gracefully with `on_bad_lines='skip'`
4. **Dataclasses**: Clean data structures using Python dataclasses
5. **Command-line Interface**: Supports `--data-dir` argument for flexible data location

### Method Mapping (C# → Python)

| C# Method | Python Method |
|-----------|---------------|
| `LoadNameReferences()` | `load_name_references()` |
| `LoadModels()` | `load_models()` |
| `GenerateNPCs()` | `generate_npcs()` |
| `LoadTeleportData()` | `load_teleport_data()` |
| `LoadRegions()` | `load_regions()` |
| `LoadTeleportLinks()` | `load_teleport_links()` |
| `GenerateTeleportLinks()` | `generate_teleport_links()` |
| `GetNameReference()` | `_get_name_reference()` |
| `GetRegionReference()` | `_get_region_reference()` |
