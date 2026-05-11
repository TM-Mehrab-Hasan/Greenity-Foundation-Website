'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle({ dictionary }: { dictionary: any }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-700/20 dark:border-green-500/30 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-500"
      aria-label="Toggle Eco Mode"
    >
      <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-green-700/30'}`} />
      {isDark ? dictionary.common.lightMode : dictionary.common.ecoMode}
    </button>
  );
}
