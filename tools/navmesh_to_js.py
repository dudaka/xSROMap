#!/usr/bin/env python3
"""
NavMesh to Web JSON Converter

Converts navmesh JSON (from navmesh_builder.py) to per-region JSON files
optimized for web AJAX loading in xSROMap.

Usage:
    python navmesh_to_js.py <input.json> -o <output_dir>
    python navmesh_to_js.py navmesh.json -o ../data/navmesh/

Input format (from navmesh_builder.py):
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

Output format per region (nv_XXXX.json):
{
  "region_id": 24999,
  "x_sector": 167,
  "y_sector": 97,
  "terrain_edges": [[lat1, lng1, lat2, lng2], ...],
  "object_edges": [[lat1, lng1, lat2, lng2], ...]
}
"""

import sys
import json
import argparse
from pathlib import Path
from typing import List, Tuple, Dict, Any


# =============================================================================
# CONSTANTS
# =============================================================================

REGION_SIZE = 1920  # World units per region


# =============================================================================
# COORDINATE CONVERSION
# =============================================================================

def region_to_sectors(region_id: int) -> Tuple[int, int]:
    """Convert region ID to x_sector, y_sector."""
    x_sector = region_id & 0xFF
    y_sector = (region_id >> 8) & 0xFF
    return x_sector, y_sector


def navmesh_to_leaflet(region_id: int, x: float, y: float) -> Tuple[float, float]:
    """
    Convert navmesh coordinates to Leaflet lat/lng.

    Navmesh coords: 0-1920 within region (Y is already inverted from world space)
    Leaflet coords:
        lat = ySector + (1920 - y) / 1920.0 - 1
        lng = xSector + x / 1920.0

    The navmesh_builder.py already inverts Y (y = 1920 - world_y), so we need
    to convert back for proper Leaflet coordinates.
    """
    x_sector, y_sector = region_to_sectors(region_id)

    # Navmesh Y is inverted (1920 - world_y), so we need to un-invert
    # for Leaflet which uses: lat = ySector + world_y/1920 - 1
    world_y = REGION_SIZE - y

    lat = y_sector + world_y / REGION_SIZE - 1
    lng = x_sector + x / REGION_SIZE

    return lat, lng


# =============================================================================
# EDGE PROCESSING
# =============================================================================

def process_terrain_edges(region_id: int, edges: List[Dict]) -> List[List[float]]:
    """
    Process terrain edges from navmesh_builder.py format.

    Input format:
        { "source": {"x": 180, "y": 640}, "destination": {"x": 200, "y": 640} }

    Output format:
        [lat1, lng1, lat2, lng2]
    """
    terrain_edges = []

    for edge in edges:
        source = edge.get('source', {})
        destination = edge.get('destination', {})

        src_x = source.get('x', 0)
        src_y = source.get('y', 0)
        dst_x = destination.get('x', 0)
        dst_y = destination.get('y', 0)

        lat1, lng1 = navmesh_to_leaflet(region_id, src_x, src_y)
        lat2, lng2 = navmesh_to_leaflet(region_id, dst_x, dst_y)

        terrain_edges.append([
            round(lat1, 6), round(lng1, 6),
            round(lat2, 6), round(lng2, 6)
        ])

    return terrain_edges


def process_object_edges(region_id: int, edges: List[Dict]) -> List[List]:
    """
    Process object collision edges from navmesh_builder.py format.

    Input format:
        { "source": {"x": 100, "y": 200}, "destination": {"x": 150, "y": 250} }

    Output format:
        [lat1, lng1, lat2, lng2]

    Note: navmesh_builder.py already filters out bridge edges (flag=16),
    so all edges here are solid collision.
    """
    object_edges = []

    for edge in edges:
        source = edge.get('source', {})
        destination = edge.get('destination', {})

        src_x = source.get('x', 0)
        src_y = source.get('y', 0)
        dst_x = destination.get('x', 0)
        dst_y = destination.get('y', 0)

        lat1, lng1 = navmesh_to_leaflet(region_id, src_x, src_y)
        lat2, lng2 = navmesh_to_leaflet(region_id, dst_x, dst_y)

        object_edges.append([
            round(lat1, 6), round(lng1, 6),
            round(lat2, 6), round(lng2, 6)
        ])

    return object_edges


# =============================================================================
# REGION CONVERSION
# =============================================================================

def convert_region(region_key: str, region_data: Dict[str, Any]) -> Dict[str, Any]:
    """Convert a single region's navmesh data to web format."""
    region_id = region_data.get('region_id', 0)
    x_sector = region_data.get('x_sector', 0)
    y_sector = region_data.get('y_sector', 0)

    # Process edges using the actual field names from navmesh_builder.py
    terrain_edges = process_terrain_edges(
        region_id,
        region_data.get('terrain_edges', [])
    )

    object_edges = process_object_edges(
        region_id,
        region_data.get('object_edges', [])
    )

    return {
        'region_id': region_id,
        'x_sector': x_sector,
        'y_sector': y_sector,
        'terrain_edges': terrain_edges,
        'object_edges': object_edges
    }


# =============================================================================
# CLI
# =============================================================================

def main():
    parser = argparse.ArgumentParser(
        description='Convert navmesh JSON to per-region web JSON files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument('input', help='Input navmesh JSON file')
    parser.add_argument('-o', '--output', default='./navmesh',
                        help='Output directory for per-region JSON files')
    parser.add_argument('-v', '--verbose', action='store_true',
                        help='Verbose output')

    args = parser.parse_args()

    # Load input JSON
    print(f"Loading {args.input}...")
    with open(args.input, 'r') as f:
        data = json.load(f)

    # Create output directory
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Process each region
    regions = data.get('regions', {})
    print(f"Processing {len(regions)} regions...")

    index = []  # List of available region IDs
    total_edges = 0

    for region_key, region_data in regions.items():
        region_id = region_data.get('region_id', 0)

        # Convert region data
        web_data = convert_region(region_key, region_data)

        # Generate output filename
        hex_id = f"{region_id:04x}"
        output_file = output_dir / f"nv_{hex_id}.json"

        # Write JSON file (compact format for web)
        with open(output_file, 'w') as f:
            json.dump(web_data, f, separators=(',', ':'))

        edge_count = (len(web_data['terrain_edges']) +
                     len(web_data['object_edges']))
        total_edges += edge_count

        if args.verbose:
            print(f"  {output_file.name}: {len(web_data['terrain_edges'])} terrain, "
                  f"{len(web_data['object_edges'])} object edges")

        index.append(region_id)

    # Write index file
    index_file = output_dir / 'index.json'
    with open(index_file, 'w') as f:
        json.dump({'regions': sorted(index)}, f, separators=(',', ':'))

    print(f"Done! Wrote {len(index)} region files to {output_dir}/")
    print(f"  Total edges: {total_edges}")
    print(f"  Index file: {index_file}")


if __name__ == '__main__':
    main()
