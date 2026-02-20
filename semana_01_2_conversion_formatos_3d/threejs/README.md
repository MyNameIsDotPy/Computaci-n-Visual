# Three.js - Visualizador Interactivo de Formatos 3D

Aplicación web interactiva para comparar modelos 3D en formatos STL, OBJ y GLTF.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Build para Producción

```bash
npm run build
npm run preview  # Para probar el build
```

## Características

### Selector de Formatos
- Botones para cambiar entre STL, OBJ y GLTF
- Carga dinámica sin recargar la página

### Panel de Información
- Muestra vértices y caras en tiempo real
- Formato actualmente activo

### Controles Interactivos (Leva)
- **Background Color**: Cambiar color de fondo
- **Show Wireframe**: Ver estructura de malla
- **Wireframe Color**: Personalizar color wireframe
- **Rotation Speed**: Rotación automática

### Controles de Cámara (OrbitControls)
- **Click izquierdo + arrastrar**: Rotar
- **Click derecho + arrastrar**: Pan
- **Scroll**: Zoom

### Iluminación
- Luz ambiental y direccional
- Environment map para reflejos

## Estructura

```
src/
├── App.jsx              # Componente principal
├── components/
│   └── ModelViewer.jsx  # Cargador de modelos
├── App.css
└── index.css

public/
└── models/              # Modelos 3D
    ├── cat.stl
    ├── cat.obj
    └── cat.gltf
```

## Dependencias Principales

- **react**: ^18.x
- **vite**: ^6.x
- **three**: ^0.x
- **@react-three/fiber**: React renderer para Three.js
- **@react-three/drei**: Helpers útiles
- **leva**: Panel de controles

## Preparación de Modelos

Los modelos deben estar en `public/models/`:

1. Ejecuta el script Python de conversión:
   ```bash
   cd ../python
   python convert_formats.py
   ```

2. Copia los modelos convertidos:
   ```bash
   cp python/converted/*.{obj,gltf,stl} threejs/public/models/
   ```

## Notas Técnicas

### Carga de Formatos

- **STL**: `STLLoader` de Three.js
- **OBJ**: `OBJLoader` de Three.js
- **GLTF**: `GLTFLoader` de Three.js

### Performance

- GLTF carga más rápido (formato binario)
- STL es más pesado (sin compresión)
- OBJ es texto plano (legible pero más grande)

### Compatibilidad

- Funciona en todos los navegadores modernos
- Requiere WebGL habilitado
- Responsive design para móviles
