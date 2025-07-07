'use client';

import { useState, useEffect } from 'react';

interface StatusBarProps {
  message: string;
}

export function StatusBar({ message }: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    
    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white px-6 py-3 border-t border-white/20 z-40">
      <div className="flex items-center justify-between max-w-full">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Deep Research Studio</span>
          </div>
          
          <div className="text-sm text-white/80 truncate flex-1">
            {message || 'Ready to research'}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <span>🕒</span>
            <span>{mounted ? currentTime : '--:--:--'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>🌐</span>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
} 