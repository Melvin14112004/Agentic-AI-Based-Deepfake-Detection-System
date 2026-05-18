import { useState } from "react";

const features = [
  {
    title: "Real-time Detection",
    description: "Get results in milliseconds with our optimized neural network",
    icon: "⚡",
    color: "#2563eb"
  },
  {
    title: "Multi-format Support",
    description: "Works with MP4, AVI, MOV, MKV and streaming URLs",
    icon: "🎥",
    color: "#3b82f6"
  },
  {
    title: "Enterprise Security",
    description: "Bank-level encryption and privacy protection",
    icon: "🔒",
    color: "#4f46e5"
  },
  {
    title: "API Access",
    description: "Integrate directly into your workflow with our REST API",
    icon: "🔌",
    color: "#6366f1"
  },
  {
    title: "Detailed Reports",
    description: "Comprehensive analysis with confidence scores and heatmaps",
    icon: "📊",
    color: "#2563eb"
  },
  {
    title: "Batch Processing",
    description: "Analyze multiple videos simultaneously",
    icon: "🔄",
    color: "#3b82f6"
  }
];

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="features-section-enhanced">
      <div className="section-header">
        <h2>Powerful Features</h2>
        <p>Everything you need to detect deepfakes with confidence</p>
      </div>

      <div className="features-grid-enhanced">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card-enhanced"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              '--feature-color': feature.color,
              transform: hoveredIndex === index ? 'scale(1.05) translateY(-10px)' : 'scale(1) translateY(0)',
            } as React.CSSProperties}
          >
            <div className="feature-icon-enhanced">
              <span>{feature.icon}</span>
              <div className="icon-glow"></div>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="feature-shine"></div>
          </div>
        ))}
      </div>
    </div>
  );
}