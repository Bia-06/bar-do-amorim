import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1>Bem-vindo ao Bar do Amorim</h1>
              <p>Lugar perfeito para bons momentos e
                 a cerveja mais gelada da cidade!</p>
              <Link to="/cardapio" className="btn-hero">
                <span>Ver Cardápio</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="container">
          <h2>Nossos Destaques</h2>
          <div className="highlight-grid">
            <div className="highlight-item">
              <div className="highlight-icon"></div>
              <h3>Happy Hour</h3>
              <p>Diversas variedades do nosso cardápio com o preço baixo que gostamos</p>
              <Link to="/cardapio?categoria=happy-hour" className="price">
                A partir de R$ 7,90
              </Link>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon"></div>
              <h3>Porções de Boteco do Amorim</h3>
              <p>Porções generosas para compartilhar com amigos e família</p>
              <Link to="/cardapio?categoria=porcoes" className="price">
                A partir de R$ 32,00
              </Link>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon"></div>
              <h3>Almoço</h3>
              <p>Almoço caseiro com tempero de mãe e salada à vontade</p>
              <Link to="/cardapio?categoria=almoco" className="price">
                A partir de R$ 32,00
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;