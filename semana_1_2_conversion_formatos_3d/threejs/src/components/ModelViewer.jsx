import { useEffect, useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

function ModelViewer({ format, modelPath, showWireframe, wireframeColor, rotationSpeed, onStatsUpdate }) {
  const meshRef = useRef()
  let geometry = null

  try {
    switch (format) {
      case 'stl':
        geometry = useLoader(STLLoader, modelPath)
        break
      case 'obj':
        const objData = useLoader(OBJLoader, modelPath)
        // Extract geometry from OBJ
        if (objData.children[0]) {
          geometry = objData.children[0].geometry
        }
        break
      case 'gltf':
        const gltfData = useLoader(GLTFLoader, modelPath)
        // Extract geometry from GLTF
        if (gltfData.scene.children[0]) {
          geometry = gltfData.scene.children[0].geometry
        }
        break
      default:
        break
    }
  } catch (error) {
    console.error(`Error loading ${format} model:`, error)
  }

  // Update stats when geometry changes
  useEffect(() => {
    if (geometry) {
      const vertices = geometry.attributes.position?.count || 0
      const faces = geometry.index ? geometry.index.count / 3 : vertices / 3

      onStatsUpdate({
        vertices: vertices,
        faces: Math.floor(faces)
      })
    }
  }, [geometry, onStatsUpdate])

  // Animate rotation
  useFrame((state, delta) => {
    if (meshRef.current && rotationSpeed !== 0) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  if (!geometry) {
    return null
  }

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {showWireframe ? (
        <meshBasicMaterial color={wireframeColor} wireframe />
      ) : (
        <>
          <meshStandardMaterial
            color="#6c8ebf"
            metalness={0.3}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </>
      )}
    </mesh>
  )
}

export default ModelViewer
