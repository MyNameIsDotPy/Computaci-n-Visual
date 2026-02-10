import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import ModelViewer from './ModelViewer'

function Scene({ viewMode, autoRotate, pointSize, onMeshInfo }) {
  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <color attach="background" args={['#1a1a2e']} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, -3, 2]} intensity={0.3} />

      <ModelViewer
        viewMode={viewMode}
        pointSize={pointSize}
        onMeshInfo={onMeshInfo}
      />

      <Grid
        infiniteGrid
        fadeDistance={20}
        fadeStrength={5}
        cellSize={0.5}
        cellColor="#333"
        sectionSize={2}
        sectionColor="#555"
      />

      <OrbitControls autoRotate={autoRotate} autoRotateSpeed={2} />
    </Canvas>
  )
}

export default Scene
