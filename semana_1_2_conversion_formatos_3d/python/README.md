# Python - Análisis y Conversión de Formatos 3D

## Instalación

```bash
pip install -r requirements.txt
```

## Scripts disponibles

### 1. convert_formats.py
Convierte modelos 3D entre formatos STL, OBJ y GLTF.

**Uso:**
```bash
python convert_formats.py
```

**Output:**
- Crea carpeta `converted/` con los modelos convertidos
- Genera `format_comparison.json` con estadísticas
- Muestra tabla comparativa en consola

### 2. visualize_models.py
Genera visualizaciones comparativas de los modelos.

**Uso:**
```bash
python visualize_models.py
```

**Requisito:** Ejecutar primero `convert_formats.py`

**Output:**
- `../media/models_comparison.png`: Comparación renderizada
- `../media/wireframe_comparison.png`: Comparación wireframe

### 3. format_analysis.ipynb
Notebook interactivo para análisis detallado.

**Uso:**
```bash
jupyter notebook format_analysis.ipynb
```

O en Google Colab: Subir el archivo y ejecutar las celdas.

## Dependencias

- **trimesh**: Manipulación y análisis de mallas 3D
- **numpy**: Operaciones numéricas
- **pillow**: Procesamiento de imágenes
- **networkx**: Análisis de grafos (usado por trimesh)
- **matplotlib**: Visualización (para visualize_models.py)

## Notas

- El archivo `cat.stl` debe estar en el mismo directorio
- Los modelos convertidos se guardan en `converted/`
- Las imágenes se guardan en `../media/`
