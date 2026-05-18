export default function Loader() {
  return (
    <div className="modern-loader">
      <div className="loader-spinner">
        <div className="loader-spinner-ring"></div>
        <div className="loader-spinner-ring"></div>
        <div className="loader-spinner-ring"></div>
      </div>
      
      <div className="loader-text">Analyzing Video</div>
      
      <div className="loader-progress">
        <div className="loader-progress-bar"></div>
      </div>
      
      <div className="loader-dots">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    </div>
  );
}