"""
3D Model Visualization Script
Creates visual comparisons of different 3D formats
"""

import trimesh
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path

def create_comparison_visualization(stl_file):
    """
    Create side-by-side visualization of different formats

    Args:
        stl_file: path to the STL file
    """
    # Load models
    raw_models = {
        'STL': trimesh.load(stl_file),
        'OBJ': trimesh.load('converted/cat.obj'),
        'GLTF': trimesh.load('converted/cat.gltf')
    }

    # Handle Scene objects (GLTF returns Scene)
    models = {}
    for name, data in raw_models.items():
        if isinstance(data, trimesh.Scene):
            models[name] = list(data.geometry.values())[0]
        else:
            models[name] = data

    # Create figure with subplots
    fig = plt.figure(figsize=(15, 5))

    for idx, (format_name, mesh) in enumerate(models.items(), 1):
        ax = fig.add_subplot(1, 3, idx, projection='3d')

        # Get vertices and faces
        vertices = mesh.vertices
        faces = mesh.faces

        # Plot
        ax.plot_trisurf(
            vertices[:, 0],
            vertices[:, 1],
            faces,
            vertices[:, 2],
            cmap='viridis',
            alpha=0.8,
            edgecolor='none'
        )

        ax.set_title(f'{format_name} Format\n{len(vertices)} vertices, {len(faces)} faces',
                    fontsize=12, fontweight='bold')
        ax.set_xlabel('X')
        ax.set_ylabel('Y')
        ax.set_zlabel('Z')

        # Set equal aspect ratio
        max_range = np.array([
            vertices[:, 0].max() - vertices[:, 0].min(),
            vertices[:, 1].max() - vertices[:, 1].min(),
            vertices[:, 2].max() - vertices[:, 2].min()
        ]).max() / 2.0

        mid_x = (vertices[:, 0].max() + vertices[:, 0].min()) * 0.5
        mid_y = (vertices[:, 1].max() + vertices[:, 1].min()) * 0.5
        mid_z = (vertices[:, 2].max() + vertices[:, 2].min()) * 0.5

        ax.set_xlim(mid_x - max_range, mid_x + max_range)
        ax.set_ylim(mid_y - max_range, mid_y + max_range)
        ax.set_zlim(mid_z - max_range, mid_z + max_range)

    plt.tight_layout()

    # Save figure
    output_path = Path('../media/models_comparison.png')
    output_path.parent.mkdir(exist_ok=True)
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    print(f"✓ Saved comparison visualization to {output_path}")
    plt.close()

def create_wireframe_comparison(stl_file):
    """
    Create wireframe comparison of different formats

    Args:
        stl_file: path to the STL file
    """
    raw_models = {
        'STL': trimesh.load(stl_file),
        'OBJ': trimesh.load('converted/cat.obj'),
        'GLTF': trimesh.load('converted/cat.gltf')
    }

    # Handle Scene objects (GLTF returns Scene)
    models = {}
    for name, data in raw_models.items():
        if isinstance(data, trimesh.Scene):
            models[name] = list(data.geometry.values())[0]
        else:
            models[name] = data

    fig = plt.figure(figsize=(15, 5))

    for idx, (format_name, mesh) in enumerate(models.items(), 1):
        ax = fig.add_subplot(1, 3, idx, projection='3d')

        vertices = mesh.vertices
        edges = mesh.edges_unique

        # Plot edges
        for edge in edges[:500]:  # Limit edges for performance
            points = vertices[edge]
            ax.plot3D(*points.T, 'b-', alpha=0.3, linewidth=0.5)

        # Plot vertices
        ax.scatter(vertices[:, 0], vertices[:, 1], vertices[:, 2],
                  c='red', s=1, alpha=0.5)

        ax.set_title(f'{format_name} Wireframe\n{len(vertices)} vertices, {len(edges)} edges',
                    fontsize=12, fontweight='bold')
        ax.set_xlabel('X')
        ax.set_ylabel('Y')
        ax.set_zlabel('Z')

    plt.tight_layout()

    output_path = Path('../media/wireframe_comparison.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    print(f"✓ Saved wireframe comparison to {output_path}")
    plt.close()

if __name__ == "__main__":
    stl_file = "cat.stl"

    if not Path(stl_file).exists():
        print(f"Error: {stl_file} not found")
        exit(1)

    if not Path('converted').exists():
        print("Error: Converted models not found. Run convert_formats.py first.")
        exit(1)

    print("Creating visualizations...")
    create_comparison_visualization(stl_file)
    create_wireframe_comparison(stl_file)
    print("\nAll visualizations created successfully!")
