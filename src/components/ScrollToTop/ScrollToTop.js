import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // sempre que o pathname mudar, sobe pro topo
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // troca pra 'smooth' se você quiser animação
    });
  }, [pathname]);

  return null; // esse componente não renderiza nada visível
};

export default ScrollToTop;
