using UnityEngine;

/// <summary>
/// Applies basic geometric transformations to a GameObject:
/// - Random translation on X or Y axis every few seconds
/// - Constant rotation dependent on Time.deltaTime
/// - Oscillating scale using Mathf.Sin(Time.time)
/// </summary>
public class BasicTransformations : MonoBehaviour
{
    [Header("Translation Settings")]
    [Tooltip("Range for random translation on X or Y axis")]
    public float translationRange = 3f;
    [Tooltip("Seconds between each random translation")]
    public float translationInterval = 2f;
    [Tooltip("Speed of the translation movement")]
    public float translationSpeed = 5f;

    [Header("Rotation Settings")]
    [Tooltip("Degrees per second for each axis")]
    public float rotationSpeedX = 30f;
    public float rotationSpeedY = 45f;
    public float rotationSpeedZ = 20f;

    [Header("Scale Settings")]
    [Tooltip("Base scale of the object")]
    public float baseScale = 1f;
    [Tooltip("Amplitude of the scale oscillation")]
    public float scaleAmplitude = 0.4f;
    [Tooltip("Frequency of the scale oscillation")]
    public float scaleFrequency = 1.5f;

    private Vector3 targetPosition;
    private float translationTimer;

    void Start()
    {
        // Initialize with current position as first target
        targetPosition = transform.position;
        translationTimer = 0f;
    }

    void Update()
    {
        HandleTranslation();
        HandleRotation();
        HandleScale();
    }

    /// <summary>
    /// Picks a new random target on X or Y every translationInterval seconds,
    /// then moves toward it smoothly using transform.Translate().
    /// </summary>
    void HandleTranslation()
    {
        translationTimer += Time.deltaTime;

        if (translationTimer >= translationInterval)
        {
            translationTimer = 0f;

            // Randomly choose X or Y axis for translation
            bool moveOnX = Random.value > 0.5f;
            float randomValue = Random.Range(-translationRange, translationRange);

            targetPosition = moveOnX
                ? new Vector3(randomValue, transform.position.y, transform.position.z)
                : new Vector3(transform.position.x, randomValue, transform.position.z);
        }

        // Move toward target using transform.Translate
        Vector3 direction = targetPosition - transform.position;
        transform.Translate(direction * translationSpeed * Time.deltaTime, Space.World);
    }

    /// <summary>
    /// Rotates the object continuously on all axes using Time.deltaTime.
    /// </summary>
    void HandleRotation()
    {
        transform.Rotate(
            rotationSpeedX * Time.deltaTime,
            rotationSpeedY * Time.deltaTime,
            rotationSpeedZ * Time.deltaTime
        );
    }

    /// <summary>
    /// Oscillates the object scale using Mathf.Sin(Time.time).
    /// </summary>
    void HandleScale()
    {
        float oscillation = Mathf.Sin(Time.time * scaleFrequency);
        float currentScale = baseScale + oscillation * scaleAmplitude;
        transform.localScale = new Vector3(currentScale, currentScale, currentScale);
    }
}