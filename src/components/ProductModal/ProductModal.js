import React, { useEffect } from 'react';
import { usePriceFormatter } from '../../hooks/usePriceFormatter';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const { formatPrice } = usePriceFormatter();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const placeholder = e.target.nextSibling;
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {/* Imagem do Produto */}
        <div className="modal-image-container">
          {product.image ? (
            <>
              <img 
                src={product.image} 
                alt={product.name}
                onError={handleImageError}
                className="modal-image"
              />
              <div className="modal-image-placeholder" style={{display: 'none'}}>
                <span>📷</span>
                <p>Imagem não disponível</p>
              </div>
            </>
          ) : (
            <div className="modal-image-placeholder">
              <span>🍽️</span>
              <p>Imagem do produto</p>
            </div>
          )}
        </div>
        
        {/* Informações do Produto */}
        <div className="modal-info">
          <h2 className="modal-title">{product.name}</h2>
          
          {product.description && (
            <p className="modal-description">{product.description}</p>
          )}
          
          {/* Preços e Detalhes */}
          {product.details ? (
            <div className="price-section">
              <h3>Valores</h3>
              <div className="price-options">
                {product.details.individual !== "Não disponível" && (
                  <div className="price-option">
                    <span className="price-label">
                      {product.category === 'porcoes' ? 'Meia porção' : 'Executivo (1 pessoa)'}
                    </span>
                    <span className="price-value">{product.details.individual}</span>
                  </div>
                )}
                
                {product.details.media !== "Não disponível" && (
                  <div className="price-option">
                    <span className="price-label">
                      {product.category === 'porcoes' ? 'Inteira' : 'Comercial (2 pessoas)'}
                    </span>
                    <span className="price-value">{product.details.media}</span>
                  </div>
                )}
                
                {product.details.grande !== "Não disponível" && (
                  <div className="price-option">
                    <span className="price-label">
                      {product.category === 'porcoes' ? 'Família' : 'À La Carte (até 4 pessoas)'}
                    </span>
                    <span className="price-value">{product.details.grande}</span>
                  </div>
                )}
              </div>
              
              {product.details.observacao && (
                <p className="modal-observation">{product.details.observacao}</p>
              )}
            </div>
          ) : (
            <div className="single-price">
              <span className="modal-price">R$ {formatPrice(product.price)}</span>
              {product.observacao && (
                <p className="modal-observation">{product.observacao}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;