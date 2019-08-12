import { useState, useEffect } from 'react';
import { breakpoints } from '../styles/variables';

export default function useMetrics() {
  const [metrics, setMetrics] = useState({
    isXL: (window.innerWidth > breakpoints.xl),
    isLG: (window.innerWidth > breakpoints.lg && window.innerWidth <= breakpoints.xl),
    isMD: (window.innerWidth > breakpoints.md && window.innerWidth <= breakpoints.lg),
    isSM: (window.innerWidth > breakpoints.sm && window.innerWidth <= breakpoints.md),
    isXS: (window.innerWidth <= breakpoints.xs),
  });

  useEffect(() => {
    const handleResize = () => {
      setMetrics({
        isXL: (window.innerWidth > breakpoints.xl),
        isLG: (window.innerWidth > breakpoints.lg && window.innerWidth <= breakpoints.xl),
        isMD: (window.innerWidth > breakpoints.md && window.innerWidth <= breakpoints.lg),
        isSM: (window.innerWidth > breakpoints.sm && window.innerWidth <= breakpoints.md),
        isXS: (window.innerWidth <= breakpoints.xs),
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return metrics;
}
