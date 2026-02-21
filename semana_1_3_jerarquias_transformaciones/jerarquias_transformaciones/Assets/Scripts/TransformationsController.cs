using UnityEngine;
using UnityEngine.UI;

public class TransformationsController : MonoBehaviour
{
    // UI Sliders
    public Slider positionXSlider;   // Range: -3 to 3
    public Slider rotationYSlider;   // Range: 0 to 360
    public Slider scaleSlider;       // Range: 1 to 5

    private void Start()
    {
        // Optional: initialize slider values to match current transform
        positionXSlider.value = transform.position.x;
        rotationYSlider.value = transform.eulerAngles.y;
        scaleSlider.value = transform.localScale.x;
    }

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