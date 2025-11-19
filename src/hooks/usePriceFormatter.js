import { useMemo } from 'react';

export const usePriceFormatter = () => {
  const formatPrice = useMemo(() => {
    return (price) => {
      if (typeof price === 'number') {
        return price.toFixed(2).replace('.', ',');
      }
      
      if (typeof price === 'string') {
        return price.replace('.', ',');
      }
      
      return price;
    };
  }, []);

  return { formatPrice };
};