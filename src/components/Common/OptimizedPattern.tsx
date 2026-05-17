import React from 'react';

type PatternType = 'grid' | 'dots' | 'waves' | 'leaves';

interface OptimizedPatternProps {
  type: PatternType;
  className?: string;
  color?: string;
  opacity?: number;
}

export default function OptimizedPattern({ 
  type, 
  className = '', 
  color = 'currentColor', 
  opacity = 0.05 
}: OptimizedPatternProps) {
  const patterns: Record<PatternType, React.ReactNode> = {
    grid: (
      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="1" />
      </pattern>
    ),
    dots: (
      <pattern id="dots-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill={color} />
      </pattern>
    ),
    waves: (
      <pattern id="waves-pattern" width="100" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 10 Q 25 20 50 10 T 100 10" fill="none" stroke={color} strokeWidth="2" />
      </pattern>
    ),
    leaves: (
      <pattern id="leaves-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M30 10 Q 35 25 30 40 T 30 50 M30 10 Q 25 25 30 40" fill="none" stroke={color} strokeWidth="1.5" />
      </pattern>
    )
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {patterns[type]}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${type}-pattern)`} />
      </svg>
    </div>
  );
}
