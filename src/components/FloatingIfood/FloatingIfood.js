import React from 'react';
import './FloatingIfood.css';

const FloatingIfood = () => {
  // URL do seu iFood - SUBSTITUA pela URL real do seu estabelecimento
  const ifoodUrl = "https://www.ifood.com.br/delivery/marilia-sp/bar-do-amorim-jardim-maria-izabel/675aa472-71d1-4911-858a-d664fec469a4"; // ← SUBSTITUA XXXXX pelo ID real

  const handleIfoodClick = () => {
    // Abre o iFood em uma nova aba
    window.open(ifoodUrl, '_blank', 'noopener,noreferrer');
    
    // Opcional: Tracking de clique
    if (window.gtag) {
      window.gtag('event', 'ifood_click', {
        'event_category': 'conversion',
        'event_label': 'floating_button'
      });
    }
  };

  return (
    <div className="floating-ifood">
      <span className="ifood-tooltip">
        Peça pelo iFood!
      </span>
      <button 
        className="ifood-button"
        onClick={handleIfoodClick}
        aria-label="Peça pelo iFood"
        title="Peça pelo iFood"
      >
        <img 
          src="https://imagensfree.com.br/wp-content/uploads/2021/11/icone-ifood.png" 
          alt="iFood" 
          className="ifood-icon"
          onError={(e) => {
            // Fallback caso a imagem não carregue
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        {/* Fallback text caso a imagem não carregue */}
        <span style={{display: 'none', color: 'white', fontWeight: 'bold', fontSize: '12px'}}>
          iFood
        </span>
      </button>
    </div>
  );
};

export default FloatingIfood;