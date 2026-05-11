'use client';

import { useEffect, useState } from 'react';

export default function PlasticCounter({ 
  label, 
  target = 142580 
}: { 
  label: string; 
  target?: number 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = Math.ceil(target / (duration / 16)); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col items-center sm:items-start gap-1">
      <div className="text-3xl sm:text-5xl font-mono font-bold text-green-700 dark:text-green-500 tabular-nums">
        {count.toLocaleString()}
      </div>
      <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
        {label}
      </div>
    </div>
  );
}
