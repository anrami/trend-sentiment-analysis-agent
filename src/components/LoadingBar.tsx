'use client';

import { useEffect, useState } from 'react';

interface LoadingBarProps {
  isLoading: boolean;
}

export default function LoadingBar({ isLoading }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          // Slowly increase up to 90% while loading
          if (oldProgress >= 90) {
            clearInterval(timer);
            return 90;
          }
          // Increase speed varies based on current progress
          const increment = Math.max(1, (90 - oldProgress) / 10);
          return Math.min(oldProgress + increment, 90);
        });
      }, 200);

      return () => {
        clearInterval(timer);
      };
    } else {
      // When loading is complete, quickly fill to 100%
      setProgress(100);
      const timer = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1 w-full bg-gray-200">
        <div
          className="h-full bg-blue-500 transition-all duration-200 ease-out"
          style={{
            width: `${progress}%`,
            transition: isLoading ? 'width 0.2s ease-in-out' : 'width 0.5s ease-out'
          }}
        />
      </div>
    </div>
  );
}
