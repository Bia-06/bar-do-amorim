import React from 'react';
import { Link } from 'react-router-dom';
import { usePriceFormatter } from '../../hooks/usePriceFormatter';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { formatPrice } = usePriceFormatter();

  // Função para salvar a categoria atual antes de navegar
  const handleProductClick = () => {
    // Salva a categoria atual no localStorage para restaurar ao voltar
    const currentCategory = product.category || 'todos';
    localStorage.setItem('selectedCategory', currentCategory);
  };

  return (
    <Link 
      to={`/produto/${product.id}`} 
      className="product-card-link"
      onClick={handleProductClick} // ADICIONADO onClick
    >
      <div className="product-card">
        <div className="product-image">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="product-image-img"
            />
          ) : (
            // REMOVIDO O PLACEHOLDER "Imagem não disponível"
            <div className="image-placeholder">
              <span>📷</span>
            </div>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {product.description && (
            <p className="product-description">{product.description}</p>
          )}
          
          <div className="product-price">
            {product.details ? (
              <span className="price-from">A partir de R$ {formatPrice(product.price)}</span>
            ) : (
              <span className="price-single">R$ {formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;