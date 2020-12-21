import { useEffect, useState } from 'react';

import { getWidth } from '../utils/getWidth';

export const useCurrentWidth = (delay) => {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      clearInterval(timeoutId);

      timeoutId = setTimeout(() => setWidth(getWidth()), delay);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [delay]);

  return width;
};
