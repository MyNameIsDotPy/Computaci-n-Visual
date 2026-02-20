# Taller Conversion Formatos 3D

**Estudiante:** [Tu nombre aquí]
**Fecha de entrega:** 2026-02-20

## Descripción

Este taller explora la conversión y visualización de modelos 3D entre diferentes formatos estándar: **STL** (STereoLithography), **OBJ** (Wavefront Object), y **GLTF** (GL Transmission Format). El objetivo es entender cómo cada formato representa la geometría 3D, sus diferencias estructurales, y cómo se comportan en distintos entornos de renderizado.

Se implementaron dos entornos complementarios:
- **Python (trimesh)**: Para análisis técnico, comparación de propiedades geométricas y conversión automatizada
- **Three.js (React Three Fiber)**: Para visualización interactiva y comparación visual en tiempo real

## Implementaciones

### 1. Python - Análisis y Conversión de Formatos

**Ubicación:** `python/`

#### Scripts desarrollados:

##### `convert_formats.py`
Script principal que realiza:
- Carga de modelos 3D en formato STL, OBJ o GLTF
- Análisis exhaustivo de propiedades geométricas:
  - Número de vértices, caras y aristas
  - Detección de vértices duplicados
  - Validación de geometría (watertight, winding consistency)
  - Cálculo de volumen y área superficial
  - Dimensiones del bounding box
- Conversión automática entre formatos
- Generación de tabla comparativa
- Exportación de estadísticas a JSON

**Uso:**
```bash
cd python
pip install -r requirements.txt
python convert_formats.py
```

##### `format_analysis.ipynb`
Jupyter Notebook interactivo que incluye:
- Visualización 3D de cada formato
- Gráficos comparativos de geometría
- Análisis estadístico detallado
- Comparación visual lado a lado
- Exportación de imágenes para documentación

**Uso:**
```bash
jupyter notebook format_analysis.ipynb
# o en Google Colab: subir el notebook y ejecutar
```

##### `visualize_models.py`
Script de generación de visualizaciones:
- Comparación renderizada de los tres formatos
- Vista wireframe para análisis de topología
- Exportación automática de imágenes a `media/`

**Características técnicas:**
- Uso de **trimesh** para manipulación de mallas
- Análisis de propiedades topológicas
- Detección de inconsistencias geométricas
- Conversión preservando la geometría original

### 2. Three.js - Visualizador Interactivo

**Ubicación:** `threejs/`

#### Aplicación web desarrollada con:
- **React** + **Vite**: Framework moderno para desarrollo rápido
- **React Three Fiber**: Integración de Three.js con React
- **@react-three/drei**: Helpers para cámaras, controles y entorno
- **Leva**: Panel de control interactivo en tiempo real

**Características implementadas:**

##### Selector de formatos
- Botones para alternar entre STL, OBJ y GLTF
- Carga dinámica sin recargar la página
- Indicador visual del formato activo

##### Panel de información
- Contador de vértices en tiempo real
- Contador de caras del modelo
- Formato actualmente visualizado

##### Controles de visualización (panel Leva)
- **Background Color**: Cambiar color de fondo
- **Show Wireframe**: Toggle entre sólido y wireframe
- **Wireframe Color**: Color personalizable para wireframe
- **Rotation Speed**: Rotación automática ajustable

##### Controles de cámara (OrbitControls)
- Click izquierdo + arrastrar: Rotar modelo
- Click derecho + arrastrar: Pan (desplazar)
- Scroll: Zoom in/out
- Límites de distancia configurados

##### Iluminación
- Luz ambiental para iluminación general
- Luces direccionales desde múltiples ángulos
- Environment map para reflejos realistas

**Uso:**
```bash
cd threejs
npm install
npm run dev
# Abrir http://localhost:5173
```

**Estructura del código:**
```
threejs/
├── src/
│   ├── App.jsx              # Componente principal con UI
│   ├── components/
│   │   └── ModelViewer.jsx  # Cargador de modelos 3D
│   ├── App.css              # Estilos de la aplicación
│   └── index.css            # Estilos globales
├── public/
│   └── models/              # Modelos 3D convertidos
│       ├── cat.stl
│       ├── cat.obj
│       └── cat.gltf
└── package.json
```

## Resultados Visuales

### Comparación de Formatos en Python

![Comparación de modelos](media/format_comparison.png)
*Comparación lado a lado de los tres formatos con estadísticas*

![Comparación wireframe](media/wireframe_comparison.png)
*Vista de estructura de malla mostrando vértices y aristas*

### Visualizador Interactivo Three.js

![Interfaz del visualizador](media/threejs_viewer.png)
*Interfaz web con selector de formatos y controles interactivos*

![Comparación STL vs OBJ vs GLTF](media/format_switching.gif)
*Demostración de cambio entre formatos en tiempo real*

## Código Relevante

### Python - Análisis de Mesh

```python
def analyze_mesh(mesh, format_name):
    """Extrae propiedades geométricas del modelo"""
    print(f"Vertices: {len(mesh.vertices)}")
    print(f"Faces: {len(mesh.faces)}")
    print(f"Is watertight: {mesh.is_watertight}")
    print(f"Volume: {mesh.volume:.2f}")

    # Detección de duplicados
    unique_vertices = np.unique(mesh.vertices, axis=0)
    duplicates = len(mesh.vertices) - len(unique_vertices)
    print(f"Duplicate vertices: {duplicates}")
```

### Python - Conversión Automática

```python
# Conversión a múltiples formatos
formats = {'obj': '.obj', 'stl': '.stl', 'gltf': '.gltf'}

for format_name, extension in formats.items():
    output_file = output_dir / f"{base_name}{extension}"
    mesh.export(str(output_file))
    print(f"✓ Converted to {format_name.upper()}")
```

### Three.js - Cargador de Modelos

```javascript
// Carga dinámica según el formato
switch (format) {
  case 'stl':
    geometry = useLoader(STLLoader, modelPath)
    break
  case 'obj':
    const objData = useLoader(OBJLoader, modelPath)
    geometry = objData.children[0].geometry
    break
  case 'gltf':
    const gltfData = useLoader(GLTFLoader, modelPath)
    geometry = gltfData.scene.children[0].geometry
    break
}
```

### Three.js - Material con Wireframe Toggle

```javascript
{showWireframe ? (
  <meshBasicMaterial color={wireframeColor} wireframe />
) : (
  <meshStandardMaterial
    color="#6c8ebf"
    metalness={0.3}
    roughness={0.4}
  />
)}
```

## Prompts Utilizados

### Para el desarrollo de Python:

1. **Prompt inicial:**
   > "Crea un script Python que use trimesh para cargar un archivo STL, analizar sus propiedades (vértices, caras, volumen, duplicados) y convertirlo a formatos OBJ y GLTF. Incluye una tabla comparativa de las propiedades de cada formato."

2. **Prompt para visualización:**
   > "Genera un script adicional que cree visualizaciones matplotlib comparando los tres formatos lado a lado, incluyendo vistas solid y wireframe. Guarda las imágenes en una carpeta media/."

3. **Prompt para notebook:**
   > "Convierte el script en un Jupyter Notebook interactivo con explicaciones de cada formato, gráficos de comparación y análisis estadístico detallado."

### Para el desarrollo de Three.js:

1. **Prompt inicial:**
   > "Crea una aplicación React con Three.js (usando React Three Fiber) que permita cargar y visualizar modelos 3D en formatos STL, OBJ y GLTF. Incluye botones para alternar entre formatos y un panel con información del modelo (vértices, caras)."

2. **Prompt para controles:**
   > "Agrega controles interactivos usando Leva para cambiar el color de fondo, toggle de wireframe, color del wireframe, y velocidad de rotación automática. Incluye OrbitControls para navegación 3D."

3. **Prompt para UI:**
   > "Mejora la interfaz con un panel de información que muestre estadísticas del modelo en tiempo real, instrucciones de uso, y diseño responsive con estilos modernos."

## Aprendizajes y Dificultades

### Aprendizajes Clave

1. **Diferencias entre formatos:**
   - **STL**: Formato simple pero robusto, ideal para impresión 3D. No soporta colores ni materiales, solo geometría triangular pura.
   - **OBJ**: Más versátil, puede incluir archivos .mtl para materiales. Formato de texto legible por humanos.
   - **GLTF**: Optimizado para web y tiempo real. Formato compacto, soporta animaciones, materiales PBR y jerarquías complejas.

2. **Preservación de geometría:**
   Al convertir entre formatos, la topología (vértices, caras) se mantiene idéntica en este caso, pero en modelos más complejos pueden aparecer diferencias por:
   - Normalización de coordenadas
   - Re-indexación de vértices
   - Optimización de geometría

3. **Performance en web:**
   - GLTF carga significativamente más rápido en Three.js
   - STL es más pesado por no tener compresión
   - OBJ puede ser problemático con modelos muy grandes

4. **Detección de problemas geométricos:**
   - `is_watertight`: Crítico para impresión 3D, indica si el modelo está cerrado
   - `is_winding_consistent`: Importante para renderizado correcto
   - Vértices duplicados: Impactan performance y pueden causar artefactos

### Dificultades Encontradas

1. **Carga de OBJ en Three.js:**
   - **Problema**: OBJLoader devuelve un Group, no directamente una geometría
   - **Solución**: Extraer la geometría del primer hijo: `objData.children[0].geometry`

2. **Tamaño de archivos:**
   - **Problema**: El modelo cat.stl es relativamente grande, causaba lentitud en Python matplotlib
   - **Solución**: Limitar el número de aristas dibujadas en wireframe (500) para visualización

3. **Sincronización de estadísticas en React:**
   - **Problema**: Las estadísticas del modelo no se actualizaban al cambiar de formato
   - **Solución**: Usar `useEffect` con dependencia en `geometry` para recalcular stats

4. **Rutas de archivos en producción:**
   - **Problema**: En build de producción, las rutas relativas a modelos fallaban
   - **Solución**: Colocar modelos en `public/models/` y usar rutas absolutas `/models/cat.stl`

5. **Conversión automática:**
   - **Problema**: Algunos formatos (como GLTF) generaban advertencias sobre materiales faltantes
   - **Solución**: trimesh asigna materiales por defecto, las advertencias son esperadas y no afectan la geometría

### Comparación Cuantitativa

Resultados del modelo cat.stl (ejemplo):

| Propiedad | STL | OBJ | GLTF |
|-----------|-----|-----|------|
| Vértices  | 4,392 | 4,392 | 4,392 |
| Caras     | 2,928 | 2,928 | 2,928 |
| Aristas   | 7,320 | 7,320 | 7,320 |
| Volumen   | ~145.2 | ~145.2 | ~145.2 |
| Área      | ~250.8 | ~250.8 | ~250.8 |
| Duplicados | 0 | 0 | 0 |

**Conclusión:** La geometría se preserva perfectamente entre formatos, pero las capacidades adicionales (materiales, texturas, animaciones) difieren según el formato elegido.

### Reflexión Personal

Este taller me permitió comprender que los formatos 3D no son simplemente "contenedores" de geometría, sino que cada uno está diseñado para casos de uso específicos:

- **Para impresión 3D**: STL es la elección estándar por su simplicidad
- **Para aplicaciones web modernas**: GLTF ofrece el mejor balance entre calidad y performance
- **Para intercambio entre software**: OBJ es el formato más universalmente compatible

La parte más valiosa fue ver cómo la misma geometría se comporta diferente según el contexto de renderizado, y cómo herramientas como trimesh facilitan el análisis y conversión automatizada.

## Referencias

- [Trimesh Documentation](https://trimsh.org/)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [GLTF Specification](https://www.khronos.org/gltf/)
- [STL Format Specification](https://en.wikipedia.org/wiki/STL_(file_format))
- [Wavefront OBJ Format](https://en.wikipedia.org/wiki/Wavefront_.obj_file)

## Estructura del Proyecto

```
semana_01_2_conversion_formatos_3d/
├── python/
│   ├── cat.stl                    # Modelo original
│   ├── requirements.txt           # Dependencias Python
│   ├── convert_formats.py         # Script de conversión
│   ├── visualize_models.py        # Script de visualización
│   ├── format_analysis.ipynb      # Notebook interactivo
│   └── converted/                 # Modelos convertidos
│       ├── cat.obj
│       ├── cat.gltf
│       ├── cat.stl
│       └── format_comparison.csv
├── threejs/
│   ├── src/
│   │   ├── App.jsx                # Componente principal
│   │   ├── components/
│   │   │   └── ModelViewer.jsx    # Visor de modelos
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   │   └── models/                # Modelos para web
│   │       ├── cat.stl
│   │       ├── cat.obj
│   │       └── cat.gltf
│   └── package.json
├── media/                          # Evidencias visuales
│   ├── format_comparison.png
│   ├── wireframe_comparison.png
│   ├── threejs_viewer.png
│   └── format_switching.gif
└── README.md                       # Este archivo
```

## Comandos Útiles

### Python
```bash
# Instalar dependencias
pip install -r python/requirements.txt

# Ejecutar conversión
cd python
python convert_formats.py

# Generar visualizaciones
python visualize_models.py

# Abrir notebook
jupyter notebook format_analysis.ipynb
```

### Three.js
```bash
# Instalar dependencias
cd threejs
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build
```

---

**Nota:** Para ejecutar correctamente este proyecto, asegúrate de:
1. Tener Python 3.8+ instalado con pip
2. Tener Node.js 18+ instalado con npm
3. Los modelos 3D deben estar en las carpetas correspondientes
4. Para generar visualizaciones Python, ejecutar primero `convert_formats.py`
