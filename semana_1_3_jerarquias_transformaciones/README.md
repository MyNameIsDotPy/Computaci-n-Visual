# Taller Jerarquias Transformaciones

**Estudiante:** Angel Santiago Avendaño
**Fecha de entrega:** 2026-02-21

## Descripción

Este taller explora las **estructuras jerárquicas y árboles de transformación** en gráficos 3D, aplicando la relación padre-hijo entre objetos para entender cómo las transformaciones se propagan en la jerarquía de una escena. El objetivo es comprender y visualizar en tiempo real cómo la posición, rotación y escala de un nodo padre afectan directamente a todos sus hijos.

Se implementó el ejercicio en **Unity 6 (LTS)** con una escena que contiene una jerarquía de 3 niveles (padre → hijo → nieto) controlada mediante sliders de UI.

## Implementaciones

### Unity 6 (LTS)

**Ubicación:** `jerarquias_transformaciones/`

#### Escena

Se construyó una jerarquía de objetos 3D con 3 niveles, todos usando esferas:

- **Padre** (`SphereParent`): esfera central, único nodo controlado por los sliders
  - **Hijo** (`SphereChild`): esfera desplazada respecto al padre
    - **Nieto** (`SphereGrandchild`): esfera desplazada respecto al hijo

Solo el nodo padre recibe las transformaciones desde los sliders. Los hijos heredan automáticamente los cambios, demostrando la propagación del árbol de transformaciones de Unity.

#### Script de control

**`Assets/Scripts/TransformationsController.cs`**

Script adjunto al nodo padre que lee tres sliders de UI y aplica las transformaciones en cada frame:

| Slider       | Eje/Propiedad   | Rango   |
|--------------|-----------------|---------|
| Movimiento X | Traslación en X | -3 a 3  |
| Rotación Y   | Rotación en Y   | 0 a 360 |
| Escala       | Escala uniforme | 1 a 5   |

Los valores de posición, rotación y escala se muestran en la consola de Unity y se actualizan en tiempo real a través de la interfaz de UI.

#### Características implementadas

- Jerarquía de 3 niveles (padre → hijo → nieto)
- Control interactivo con sliders de Unity UI
- Herencia automática de transformaciones
- Visualización en tiempo real del efecto sobre los nodos hijos

## Resultados Visuales

### Demostración de jerarquía y transformaciones

![Demo de jerarquía y transformaciones](media/demo.gif)
*Control en tiempo real de posición, rotación y escala del padre. Los hijos y nietos heredan todas las transformaciones.*

## Código Relevante

### `TransformationsController.cs` — Control del nodo padre con sliders

```csharp
using UnityEngine;
using UnityEngine.UI;

public class TransformationsController : MonoBehaviour
{
    // UI Sliders
    public Slider positionXSlider;   // Range: -3 to 3
    public Slider rotationYSlider;   // Range: 0 to 360
    public Slider scaleSlider;       // Range: 1 to 5

    private void Update()
    {
        // Position (X axis)
        transform.position = new Vector3(
            positionXSlider.value,
            transform.position.y,
            transform.position.z
        );

        // Rotation (Y axis)
        transform.rotation = Quaternion.Euler(
            transform.eulerAngles.x,
            rotationYSlider.value,
            transform.eulerAngles.z
        );

        // Scale (uniform)
        float scale = scaleSlider.value;
        transform.localScale = new Vector3(scale, scale, scale);
    }
}
```

> El script se adjunta únicamente al nodo **padre**. Unity propaga automáticamente las transformaciones a todos los hijos y nietos mediante el árbol de transformaciones de la escena.

## Aprendizajes y Dificultades

### Aprendizajes Clave

1. **Herencia de transformaciones en Unity:**
   Todas las transformaciones del padre (posición, rotación, escala) se aplican en el espacio local de los hijos. Mover el padre arrastra la jerarquía completa; los hijos mantienen sus offsets locales.

2. **Transform local vs. global:**
   Unity diferencia entre `transform.position` (espacio mundo) y `transform.localPosition` (espacio local respecto al padre). Al trabajar con jerarquías, usar `localPosition` permite controlar el offset relativo sin que las transformaciones del padre interfieran.

3. **Propagación en cascada:**
   Al rotar el padre, el nieto orbita alrededor del padre describiendo un arco determinado por su distancia acumulada en la jerarquía. Esto ilustra perfectamente la multiplicación de matrices de transformación en un árbol de escena.

4. **Quaternion.Euler para rotaciones:**
   Usar `Quaternion.Euler` en lugar de asignar directamente `eulerAngles` evita el gimbal lock y permite interpolaciones más suaves.

### Dificultades Encontradas

1. **Conflicto entre slider y posición manual:**
   - **Problema**: Al inicializar el slider con `positionXSlider.value = transform.position.x`, el padre se reposicionaba a 0 si el slider no estaba enlazado aún.
   - **Solución**: Configurar los valores de los sliders directamente en el Inspector antes de ejecutar la escena.

2. **Escala no uniforme en la jerarquía:**
   - **Problema**: Al escalar el padre de forma no uniforme, los hijos pueden deformarse de maneras inesperadas.
   - **Solución**: Usar siempre escala uniforme (mismo valor en X, Y y Z) en el nodo padre para evitar distorsiones en los hijos.

3. **Gimbal lock con ángulos de Euler:**
   - **Problema**: Asignar directamente `eulerAngles.y` causaba saltos en la rotación cerca de 90°.
   - **Solución**: Reconstruir la rotación completa con `Quaternion.Euler(x, sliderY, z)` manteniendo los otros ejes.

### Reflexión Personal

El taller dejó en claro que las jerarquías de objetos no son solo una forma de organizar la escena visualmente, sino que implementan matemáticamente la **multiplicación de matrices de transformación**. Entender que cada nodo hijo vive en el espacio local de su padre simplifica enormemente el diseño de animaciones y sistemas de objetos compuestos, como brazos robóticos, vehículos con ruedas o sistemas solares.

## Estructura del Proyecto

```
semana_1_3_jerarquias_transformaciones/
├── jerarquias_transformaciones/      # Proyecto Unity 6
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   └── TransformationsController.cs
│   │   └── Scenes/
│   ├── Packages/
│   ├── ProjectSettings/
│   └── .gitignore
├── media/
│   └── demo.gif                      # Demostración del funcionamiento
└── README.md
```
