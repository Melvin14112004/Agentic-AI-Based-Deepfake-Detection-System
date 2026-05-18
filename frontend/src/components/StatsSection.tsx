import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 99.7, label: "Detection Accuracy", suffix: "%", icon: "🎯" },
  { value: 50, label: "Analysis Time", suffix: "ms", icon: "⚡" },
  { value: 100, label: "Video Formats", suffix: "+", icon: "🎥" },
  { value: 24, label: "Support", suffix: "/7", icon: "🛡️" },
];

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.value;
            const duration = 2000;
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = end;
                  return newCounts;
                });
                clearInterval(timer);
              } else {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.floor(start);
                  return newCounts;
                });
              }
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={sectionRef} className="stats-section-enhanced">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card-enhanced">
          <div className="stat-icon-enhanced">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-value-enhanced">
              {counts[index]}
              {stat.suffix}
            </div>
            <div className="stat-label-enhanced">{stat.label}</div>
          </div>
          <div className="stat-glow"></div>
        </div>
      ))}
    </div>
  );
}