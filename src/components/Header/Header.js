import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Icon = ({ src, alt }) => (
  <img src={src} alt={alt} className="header-icon" />
);

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        {/* Logo / título */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <div className="logo-container">
            <img
              src="/images/logo.png"
              alt="Bar do Amorim"
              className="logo-image"
            />
            <div className="logo-text">
              <h1>Bar do Amorim</h1>
              <span>O melhor da região desde 2019</span>
            </div>
          </div>
        </Link>

        {/* Botão (mobile) */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <Icon src="/images/icons/menu.png" alt="Menu" />
        </button>

        {/* Navegação */}
        <nav className={`nav-center ${isMenuOpen ? 'active' : ''}`}>
  <Link
    to="/"
    className={location.pathname === '/' ? 'active' : ''}
    onClick={closeMenu}
  >
    <Icon src="/images/icons/botao-de-inicio.png" alt="Início" />
    <span>Início</span>
  </Link>

  <Link
    to="/cardapio"
    className={location.pathname === '/cardapio' ? 'active' : ''}
    onClick={closeMenu}
  >
    <Icon src="/images/icons/cardapio.png" alt="Cardápio" />
    <span>Cardápio</span>
  </Link>

  <Link
    to="/ambiente"
    className={location.pathname === '/ambiente' ? 'active' : ''}
    onClick={closeMenu}
  >
    <Icon src="/images/icons/camera.png" alt="Ambiente" />
    <span>Ambiente</span>
  </Link>

  <Link
    to="/sobre"
    className={location.pathname === '/sobre' ? 'active' : ''}
    onClick={closeMenu}
  >
    <Icon src="/images/icons/sobre.png" alt="Sobre" />
    <span>Sobre</span>
  </Link>

  <Link
    to="/avalie"
    className={location.pathname === '/avalie' ? 'active' : ''}
    onClick={closeMenu}
  >
    <Icon src="/images/icons/avaliar.png" alt="Avalie" />
    <span>Avalie</span>
  </Link>

  {/* 🔹 Novo link Trabalhe Conosco */}
  <Link
    to="/trabalhe-conosco"
    className={location.pathname === '/trabalhe-conosco' ? 'active' : ''}
    onClick={closeMenu}
  >
    <Icon src="/images/icons/trabalhe.png" alt="Trabalhe Conosco" />
    <span>Trabalhe Conosco</span>
  </Link>
</nav>
        {/* Informações desktop */}
        <div className="header-info">
          <div className="info-item">
            <Icon src="/images/icons/taxa10.png" alt="Sem taxa" />
            <span>Não cobramos taxa de 10%</span>
          </div>
          <div className="info-item">
            <Icon src="/images/icons/couvert.png" alt="Couvert" />
            <span>Couvert Artístico R$ 7,00</span>
          </div>
          <div className="info-item">
            <Icon src="/images/icons/wifi.png" alt="Wi-Fi" />
            <span>Wi-Fi: bardoamorim</span>
          </div>
        </div>

        {/* Informações mobile compacta */}
        <div className="mobile-info">
          <div className="mobile-info-items">
            {/* Linha 1: taxa + couvert */}
            <div className="mobile-info-row-top">
              <span className="mobile-info-iconline no-tax">
                <Icon src="/images/icons/taxa10.png" alt="Sem taxa" />
                <span>Não cobramos taxa de 10%</span>
              </span>

              <span className="mobile-info-iconline cover-charge">
                <Icon src="/images/icons/couvert.png" alt="Couvert" />
                <span>Couvert Artístico R$ 7,00</span>
              </span>
            </div>

            {/* Linha 2: Wi-Fi */}
            <div className="mobile-info-row-bottom">
              <span className="mobile-info-iconline">
                <Icon src="/images/icons/wifi.png" alt="Wi-Fi" />
                <span>Wi-Fi: bardoamorim</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
