import { useState } from 'react'
import { useControls } from 'leva'
import Scene from './components/Scene'
import InfoPanel from './components/InfoPanel'
import './App.css'

function App() {
  const [meshInfo, setMeshInfo] = useState({ vertices: 0, edges: 0, faces: 0 })

  const { viewMode, autoRotate, pointSize } = useControls({
    viewMode: {
      value: 'all',
      options: ['vertices', 'edges', 'faces', 'all'],
      label: 'View Mode',
    },
    autoRotate: { value: true, label: 'Auto Rotate' },
    pointSize: { value: 3, min: 1, max: 10, step: 0.5, label: 'Point Size' },
  })

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Scene
          viewMode={viewMode}
          autoRotate={autoRotate}
          pointSize={pointSize}
          onMeshInfo={setMeshInfo}
        />
      </div>
      <InfoPanel meshInfo={meshInfo} viewMode={viewMode} />
    </div>
  )
}

export default App
