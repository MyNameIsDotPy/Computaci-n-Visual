"""
3D Model Format Conversion and Analysis Script
Loads, analyzes, and converts between .STL, .OBJ, and .GLTF formats
"""

import trimesh
import numpy as np
from pathlib import Path
import json

def analyze_mesh(mesh, format_name):
    """
    Analyze and print mesh properties

    Args:
        mesh: trimesh.Trimesh object
        format_name: string name of the format
    """
    print(f"\n{'='*60}")
    print(f"Analysis of {format_name.upper()} format")
    print(f"{'='*60}")

    print(f"Vertices: {len(mesh.vertices)}")
    print(f"Faces: {len(mesh.faces)}")
    print(f"Edges: {len(mesh.edges)}")
    print(f"Is watertight: {mesh.is_watertight}")
    print(f"Is winding consistent: {mesh.is_winding_consistent}")
    print(f"Volume: {mesh.volume:.2f}")
    print(f"Surface area: {mesh.area:.2f}")

    # Check for duplicate vertices
    unique_vertices = np.unique(mesh.vertices, axis=0)
    duplicates = len(mesh.vertices) - len(unique_vertices)
    print(f"Duplicate vertices: {duplicates}")

    # Bounds
    bounds = mesh.bounds
    print(f"Bounding box: {bounds[0]} to {bounds[1]}")

    return {
        'format': format_name,
        'vertices': len(mesh.vertices),
        'faces': len(mesh.faces),
        'edges': len(mesh.edges),
        'is_watertight': mesh.is_watertight,
        'is_winding_consistent': mesh.is_winding_consistent,
        'volume': float(mesh.volume),
        'surface_area': float(mesh.area),
        'duplicate_vertices': duplicates,
        'bounds_min': bounds[0].tolist(),
        'bounds_max': bounds[1].tolist()
    }

def convert_formats(input_file):
    """
    Convert a 3D model between STL, OBJ, and GLTF formats

    Args:
        input_file: path to input file (STL, OBJ, or GLTF)
    """
    input_path = Path(input_file)

    if not input_path.exists():
        print(f"Error: File {input_file} not found")
        return

    print(f"\nLoading model from: {input_path.name}")

    # Load the mesh
    try:
        mesh = trimesh.load(input_file)
        print(f"Successfully loaded {input_path.suffix} file")
    except Exception as e:
        print(f"Error loading file: {e}")
        return

    # Analyze original mesh
    stats = []
    original_format = input_path.suffix[1:]  # Remove the dot
    stats.append(analyze_mesh(mesh, original_format))

    # Define output formats
    output_dir = input_path.parent / "converted"
    output_dir.mkdir(exist_ok=True)

    base_name = input_path.stem

    # Convert to different formats
    formats = {
        'obj': '.obj',
        'stl': '.stl',
        'gltf': '.gltf'
    }

    print(f"\n{'='*60}")
    print("Starting conversions...")
    print(f"{'='*60}")

    for format_name, extension in formats.items():
        if format_name == original_format.lower():
            continue  # Skip the original format

        output_file = output_dir / f"{base_name}{extension}"

        try:
            # Export to new format
            mesh.export(str(output_file))
            print(f"\n[OK] Converted to {format_name.upper()}: {output_file.name}")

            # Load the converted file and analyze it
            converted_data = trimesh.load(str(output_file))

            # Handle Scene objects (GLTF returns Scene)
            if isinstance(converted_data, trimesh.Scene):
                # Get the first geometry from the scene
                converted_mesh = list(converted_data.geometry.values())[0]
            else:
                converted_mesh = converted_data

            stats.append(analyze_mesh(converted_mesh, format_name))

        except Exception as e:
            print(f"[ERROR] Error converting to {format_name}: {e}")

    # Save comparison stats to JSON
    stats_file = output_dir / f"{base_name}_comparison.json"
    with open(stats_file, 'w') as f:
        json.dump(stats, f, indent=2)

    print(f"\n{'='*60}")
    print(f"Conversion complete!")
    print(f"Comparison stats saved to: {stats_file.name}")
    print(f"{'='*60}")

    # Generate comparison table
    print("\n" + "="*80)
    print("COMPARISON TABLE")
    print("="*80)
    print(f"{'Property':<25} {'STL':>15} {'OBJ':>15} {'GLTF':>15}")
    print("-"*80)

    # Create a dictionary for easy lookup
    stats_dict = {s['format'].lower(): s for s in stats}

    properties = ['vertices', 'faces', 'edges', 'volume', 'surface_area', 'duplicate_vertices']
    prop_names = ['Vertices', 'Faces', 'Edges', 'Volume', 'Surface Area', 'Duplicate Vertices']

    for prop, prop_name in zip(properties, prop_names):
        stl_val = stats_dict.get('stl', {}).get(prop, 'N/A')
        obj_val = stats_dict.get('obj', {}).get(prop, 'N/A')
        gltf_val = stats_dict.get('gltf', {}).get(prop, 'N/A')

        # Format values appropriately
        if isinstance(stl_val, float) and isinstance(obj_val, float) and isinstance(gltf_val, float):
            stl_str = f"{stl_val:>15.2f}"
            obj_str = f"{obj_val:>15.2f}"
            gltf_str = f"{gltf_val:>15.2f}"
        else:
            stl_str = f"{stl_val:>15}" if not isinstance(stl_val, float) else f"{stl_val:>15.2f}"
            obj_str = f"{obj_val:>15}" if not isinstance(obj_val, float) else f"{obj_val:>15.2f}"
            gltf_str = f"{gltf_val:>15}" if not isinstance(gltf_val, float) else f"{gltf_val:>15.2f}"

        print(f"{prop_name:<25} {stl_str} {obj_str} {gltf_str}")

    print("="*80)

    return output_dir

if __name__ == "__main__":
    # Convert the cat.stl model
    input_file = "cat.stl"

    if Path(input_file).exists():
        output_dir = convert_formats(input_file)
        print(f"\nAll converted files are in: {output_dir}")
    else:
        print(f"Error: {input_file} not found in current directory")
        print("Please make sure cat.stl is in the same directory as this script")
