import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadSection from "../components/UploadSection";
import UrlSection from "../components/UrlSection";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import { uploadVideo, analyzeUrl } from "../api/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await uploadVideo(file);
      setResult(res.data.data.result);
    } catch (err) {
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = async (url: string) => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }
    
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeUrl(url);
      setResult(res.data.data.result);
    } catch (err) {
      alert("URL analysis failed. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />
      
      <div className="container">
        {/* Simple Header */}
        <div className="page-header">
          <h1>Deepfake Detection</h1>
          <p>Upload a video or provide a URL for analysis</p>
        </div>

        {/* Main Analysis Grid */}
        <div className="dashboard-grid">
          <UploadSection onUpload={handleFileUpload} />
          <UrlSection onSubmit={handleUrlSubmit} />
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <Loader />
          </div>
        )}
        
        {/* Results */}
        {result && !loading && (
          <div className="results-container">
            <ResultCard result={result} />
          </div>
        )}
      </div>
    </div>
  );
}