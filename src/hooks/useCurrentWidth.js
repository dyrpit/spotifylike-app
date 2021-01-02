import { useEffect, useState } from 'react';

import { getElementWidth } from '../utils/getElementWidth';

export const useCurrentWidth = (elementName, delay = 20) => {
  const [width, setWidth] = useState(getElementWidth(elementName));

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      clearInterval(timeoutId);

      timeoutId = setTimeout(() => setWidth(getElementWidth(elementName)), delay);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [delay, elementName]);

  return width;
};
