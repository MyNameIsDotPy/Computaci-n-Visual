function InfoPanel({ meshInfo, viewMode }) {
  return (
    <div className="info-panel">
      <h3>Mesh Info</h3>
      <div className="info-row">
        <span className="info-label">Mode:</span>
        <span className="info-value">{viewMode}</span>
      </div>
      <div className="info-row">
        <span className="info-label">Vertices:</span>
        <span className="info-value vertices">{meshInfo.vertices.toLocaleString()}</span>
      </div>
      <div className="info-row">
        <span className="info-label">Edges:</span>
        <span className="info-value edges">{meshInfo.edges.toLocaleString()}</span>
      </div>
      <div className="info-row">
        <span className="info-label">Faces:</span>
        <span className="info-value faces">{meshInfo.faces.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default InfoPanel
