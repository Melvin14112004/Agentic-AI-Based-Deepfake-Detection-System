import { useRef, useState } from "react";

interface Props {
  onUpload: (file: File) => void;
}

export default function UploadSection({ onUpload }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = () => {
    const file = fileRef.current?.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedFile) {
      handleUpload();
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
    } else {
      alert("Please drop a valid video file");
    }
  };

  return (
    <div 
      className="card"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{
        borderColor: dragActive ? "var(--primary)" : undefined,
        transform: dragActive ? "scale(1.02)" : "scale(1)",
        transition: "all 0.2s ease",
        outline: "none"
      }}
    >
      <h2>Upload Video</h2>
      <p className="card-subtitle">Drag & drop or click to browse</p>
      <div className="input-wrapper">
        <span className="input-icon">📁</span>
        <input 
          type="file" 
          ref={fileRef} 
          onChange={handleFileChange}
          accept="video/*"
        />
      </div>
      {selectedFile && (
        <p style={{ color: "var(--gray-600)", marginBottom: "0.5rem", fontSize: "0.8rem",fontWeight: 500 }}>
          Selected: {selectedFile.name}
        </p>
      )}
      <button 
        className="button" 
        onClick={handleUpload}
        disabled={!selectedFile}
        style={{
          opacity: !selectedFile ? 0.5 : 1,
          cursor: !selectedFile ? "not-allowed" : "pointer"
        }}
      >
        {selectedFile ? "Analyze Video" : "Select a file first"}
      </button>
      {selectedFile && (
        <p style={{ color: "var(--gray-400)", marginTop: "0.5rem", fontSize: "0.8rem" }}>
        </p>
      )}
    </div>
  );
}