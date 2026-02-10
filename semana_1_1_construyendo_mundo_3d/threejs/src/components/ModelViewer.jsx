import { useEffect, useMemo, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import * as THREE from 'three'

function ModelViewer({ viewMode, pointSize, onMeshInfo }) {
  const geometry = useLoader(STLLoader, '/cat.stl')

  const centeredGeometry = useMemo(() => {
    if (!geometry) return null
    const geo = geometry.clone()
    geo.computeBoundingBox()
    geo.center()
    geo.computeVertexNormals()
    return geo
  }, [geometry])

  const wireframeGeometry = useMemo(() => {
    if (!centeredGeometry) return null
    return new THREE.WireframeGeometry(centeredGeometry)
  }, [centeredGeometry])

  useEffect(() => {
    if (!centeredGeometry) return

    const posAttr = centeredGeometry.attributes.position
    const vertexCount = posAttr ? posAttr.count : 0
    const indexAttr = centeredGeometry.index
    const faceCount = indexAttr ? indexAttr.count / 3 : vertexCount / 3

    let edgeCount = 0
    if (indexAttr) {
      const edgeSet = new Set()
      for (let i = 0; i < indexAttr.count; i += 3) {
        const a = indexAttr.getX(i)
        const b = indexAttr.getX(i + 1)
        const c = indexAttr.getX(i + 2)
        edgeSet.add(Math.min(a, b) + '_' + Math.max(a, b))
        edgeSet.add(Math.min(b, c) + '_' + Math.max(b, c))
        edgeSet.add(Math.min(a, c) + '_' + Math.max(a, c))
      }
      edgeCount = edgeSet.size
    } else {
      edgeCount = Math.floor(faceCount * 3 / 2)
    }

    onMeshInfo({
      vertices: vertexCount,
      edges: edgeCount,
      faces: Math.floor(faceCount),
    })
  }, [centeredGeometry, onMeshInfo])

  if (!centeredGeometry) return null

  const showVertices = viewMode === 'vertices' || viewMode === 'all'
  const showEdges = viewMode === 'edges' || viewMode === 'all'
  const showFaces = viewMode === 'faces' || viewMode === 'all'

  return (
    <group>
      {showFaces && (
        <mesh geometry={centeredGeometry}>
          <meshStandardMaterial
            color="#ff7f7f"
            roughness={0.4}
            metalness={0.1}
            transparent={viewMode === 'all'}
            opacity={viewMode === 'all' ? 0.6 : 1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {showEdges && wireframeGeometry && (
        <lineSegments geometry={wireframeGeometry}>
          <lineBasicMaterial color="#4ade80" linewidth={1} />
        </lineSegments>
      )}

      {showVertices && (
        <points geometry={centeredGeometry}>
          <pointsMaterial
            color="#4a9eff"
            size={pointSize * 0.01}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  )
}

export default ModelViewer
