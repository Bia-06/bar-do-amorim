import { useMemo } from 'react';

export const usePriceFormatter = () => {
  const formatPrice = useMemo(() => {
    return (price) => {
      if (typeof price === 'number') {
        return price.toFixed(2).replace('.', ',');
      }
      
      if (typeof price === 'string') {
        // Se já for string, troca ponto por vírgula
        return price.replace('.', ',');
      }
      
      return price;
    };
  }, []);

  return { formatPrice };
};