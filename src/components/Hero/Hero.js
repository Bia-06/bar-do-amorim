// src/components/Hero.js
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Bem-vindo ao Bar do Amorim</h1>
        <p>Lugar perfeito para bons momentos e ótimas bebidas</p>
        <a href="#" className="btn">Ver Cardápio →</a>
      </div>
    </section>
  );
}

export default Hero;