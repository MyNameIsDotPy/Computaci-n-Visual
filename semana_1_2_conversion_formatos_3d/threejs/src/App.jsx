import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center, Environment } from '@react-three/drei'
import { useState } from 'react'
import { useControls } from 'leva'
import ModelViewer from './components/ModelViewer'
import './App.css'

function App() {
  const [selectedFormat, setSelectedFormat] = useState('stl')
  const [modelStats, setModelStats] = useState(null)

  const { backgroundColor, showWireframe, wireframeColor, rotationSpeed } = useControls({
    backgroundColor: '#1a1a1a',
    showWireframe: false,
    wireframeColor: '#00ff00',
    rotationSpeed: { value: 0, min: -2, max: 2, step: 0.1 }
  })

  const formats = [
    { id: 'stl', name: 'STL', path: '/models/cat.stl' },
    { id: 'obj', name: 'OBJ', path: '/models/cat.obj' },
    { id: 'gltf', name: 'GLTF', path: '/models/cat.gltf' }
  ]

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Format Selector */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '10px',
        color: 'white'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>3D Format Viewer</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          {formats.map(format => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedFormat === format.id ? '#4CAF50' : '#555',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
            >
              {format.name}
            </button>
          ))}
        </div>

        {/* Model Info Display */}
        {modelStats && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '5px',
            fontSize: '12px'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Model Info</h3>
            <div><strong>Format:</strong> {selectedFormat.toUpperCase()}</div>
            <div><strong>Vertices:</strong> {modelStats.vertices?.toLocaleString()}</div>
            <div><strong>Faces:</strong> {modelStats.faces?.toLocaleString()}</div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '15px',
        borderRadius: '10px',
        color: 'white',
        fontSize: '12px',
        maxWidth: '300px'
      }}>
        <strong>Controls:</strong><br/>
        🖱️ Left click + drag: Rotate<br/>
        🖱️ Right click + drag: Pan<br/>
        🖱️ Scroll: Zoom<br/>
        📊 Use panel on right for more options
      </div>

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: backgroundColor }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />

        <Center>
          <ModelViewer
            format={selectedFormat}
            modelPath={formats.find(f => f.id === selectedFormat)?.path}
            showWireframe={showWireframe}
            wireframeColor={wireframeColor}
            rotationSpeed={rotationSpeed}
            onStatsUpdate={setModelStats}
          />
        </Center>

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={20}
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

export default App
