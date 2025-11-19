import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import './ProductPage.css';

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Produto não encontrado</h2>
          <p>O produto que você está procurando não existe.</p>
          <button onClick={() => navigate('/cardapio')} className="back-button">
            Voltar ao Cardápio
          </button>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    const savedCategory = localStorage.getItem('selectedCategory');
    
    if (savedCategory) {
      navigate('/cardapio');
    } else {
      navigate(-1);
    }
  };

  const getPriceLabels = () => {
    if (
      product.category?.toLowerCase().includes('bebida') || 
      product.category?.toLowerCase().includes('drink') ||
      product.category?.toLowerCase().includes('caipirinha') ||
      product.name?.toLowerCase().includes('caipirinha') ||
      product.name?.toLowerCase().includes('drink')
    ) {
      return {
        individual: "Cachaça",
        media: "Vodka",
        grande: "Saqué"
      };
    }
    
    if (product.name?.toLowerCase().includes('torresmo de rolo')) {
      return {
        individual: "Individual (1 unidade)",
        media: "Família (3 unidades)",
        grande: "Família (3 unidades)"
      };
    }
    
    if (
      product.category?.toLowerCase().includes('porção') || 
      product.category?.toLowerCase().includes('porcoes') ||
      product.name?.toLowerCase().includes('torresminho')
    ) {
      return {
        individual: "Meia",
        media: "Inteira",
        grande: "Família"
      };
    }
    
    return {
      individual: "Executivo (1 pessoa)",
      media: "Comercial (2 pessoas)",
      grande: "À La Carte (Até 4 pessoas)"
    };
  };

  const priceLabels = getPriceLabels();

  return (
    <div className="product-page">
      <div className="container">
        <button onClick={handleBackClick} className="product-back-button">
          ← Voltar
        </button>

        <div className="product-layout">
          {/* IMAGEM */}
          <div className="product-image-section">
            <div className="product-image-container">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <div className="product-image-placeholder">
                  <span>🍽️</span>
                  <p>Imagem não disponível</p>
                </div>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}

            {/* PREÇOS */}
            {product.details ? (
              <div className="price-section">
                <h3>Opções de Preço</h3>
                <div className="price-options">
                  {product.details.individual && product.details.individual !== "Não disponível" && (
                    <div className="price-option">
                      <span className="price-label">{priceLabels.individual}</span>
                      <span className="price-value">{product.details.individual}</span>
                    </div>
                  )}
                  {product.details.media && product.details.media !== "Não disponível" && (
                    <div className="price-option">
                      <span className="price-label">{priceLabels.media}</span>
                      <span className="price-value">{product.details.media}</span>
                    </div>
                  )}
                  {product.details.grande && product.details.grande !== "Não disponível" && (
                    <div className="price-option">
                      <span className="price-label">{priceLabels.grande}</span>
                      <span className="price-value">{product.details.grande}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="price-single-card">
                <div className="price-single-label">Preço</div>
                <div className="price-single-value">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </div>
              </div>
            )}

            {/* OBSERVAÇÃO */}
            {(product.details?.observacao || product.observacao) && (
              <div className="product-observation">
                <strong>Observação:</strong>{' '}
                {product.details?.observacao || product.observacao}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
