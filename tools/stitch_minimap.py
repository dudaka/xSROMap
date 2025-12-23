#!/usr/bin/env python3
"""
Stitch minimap tiles into one large image.

Usage:
    python stitch_minimap.py <minimap_folder> [output_file]

Example:
    python stitch_minimap.py data/mediapk2/minimap worldmap.png
"""

import os
import re
import sys
from PIL import Image


def stitch_minimap(minimap_dir: str, output_path: str = "worldmap.png"):
    """Stitch all minimap tiles into one image."""

    # Parse all tile coordinates
    tiles = {}
    pattern = re.compile(r'(\d+)x(\d+)\.png$')

    print(f"Scanning {minimap_dir}...")
    for f in os.listdir(minimap_dir):
        match = pattern.match(f)
        if match:
            x, y = int(match.group(1)), int(match.group(2))
            tiles[(x, y)] = os.path.join(minimap_dir, f)

    if not tiles:
        print("No tiles found! Make sure PNG files exist with format: 100x100.png")
        return

    print(f"Found {len(tiles)} tiles")

    # Find bounds
    xs = [c[0] for c in tiles.keys()]
    ys = [c[1] for c in tiles.keys()]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)

    print(f"X range: {min_x} to {max_x} ({max_x - min_x + 1} tiles)")
    print(f"Y range: {min_y} to {max_y} ({max_y - min_y + 1} tiles)")

    # Calculate final image size
    tile_size = 256
    width = (max_x - min_x + 1) * tile_size
    height = (max_y - min_y + 1) * tile_size
    print(f"Final image size: {width}x{height} pixels")

    # Create output image
    print("Creating canvas...")
    output = Image.new('RGBA', (width, height), (0, 0, 0, 0))

    # Place tiles
    print("Stitching tiles...")
    count = 0
    for (x, y), filepath in tiles.items():
        try:
            tile = Image.open(filepath)
            # Calculate position (y is inverted - higher y = lower on map)
            px = (x - min_x) * tile_size
            py = (max_y - y) * tile_size  # Flip Y axis
            output.paste(tile, (px, py))
            count += 1
            if count % 500 == 0:
                print(f"  Placed {count}/{len(tiles)} tiles...")
        except Exception as e:
            print(f"  Error loading {filepath}: {e}")

    # Save output
    print(f"Saving {output_path}...")
    output.save(output_path, optimize=True)
    print(f"Done! Saved {output_path} ({width}x{height})")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    minimap_dir = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else "worldmap.png"

    stitch_minimap(minimap_dir, output_path)
