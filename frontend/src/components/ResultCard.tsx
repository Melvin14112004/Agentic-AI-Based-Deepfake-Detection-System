interface Props {
  result: any;
}

export default function ResultCard({ result }: Props) {
  const isFake = result.is_deepfake;
  const confidence = result?.confidence 
    ? (result.confidence * 100).toFixed(2) 
    : "0.00";

  return (
    <div className="result-card">
      <div className="result-header">
        <div className={`result-icon ${isFake ? 'fake' : 'real'}`}>
          {isFake ? '⚠️' : '✓'}
        </div>
        <div className="result-title">
          <h3>Analysis Result</h3>
          <p>{isFake ? 'Fake Detected' : 'Authentic'}</p>
        </div>
      </div>

      <div className="result-confidence">
        <div className="confidence-label">
          <span>Confidence</span>
          <span>{confidence}%</span>
        </div>
        <div className="confidence-bar">
          <div 
            className="confidence-fill"
            style={{ width: `${confidence}%` }}
          />
        </div>
        <div className="confidence-value">
          {confidence}%
        </div>
      </div>

      {result.details && (
        <div 
          className="result-details"
          style={{ 
            marginTop: "2rem", 
            padding: "1.5rem", 
            background: "var(--gray-800)", 
            borderRadius: "16px",
            fontSize: "0.9rem",
            color: "var(--gray-300)"
          }}
        >
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(result.details, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}