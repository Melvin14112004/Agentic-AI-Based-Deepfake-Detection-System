import { useState } from "react";

interface Props {
  onSubmit: (url: string) => void;
}

export default function UrlSection({ onSubmit }: Props) {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }
    onSubmit(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && url.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="card">
      <h2>Analyze from URL</h2>
      <p className="card-subtitle">YouTube, Vimeo, or direct video link</p>
      <div className="input-wrapper">
        <span className="input-icon">🔗</span>
        <input
          type="text"
          placeholder="https://"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button 
        className="button" 
        onClick={handleSubmit}
        disabled={!url.trim()}
        style={{
          opacity: !url.trim() ? 0.5 : 1,
          cursor: !url.trim() ? "not-allowed" : "pointer"
        }}
      >
        {url.trim() ? "Analyze Video" : "Enter a URL first"}
      </button>
      {url.trim() && (
        <p style={{ color: "var(--gray-400)", marginTop: "0.5rem", fontSize: "0.8rem" }}>
        </p>
      )}
    </div>
  );
}