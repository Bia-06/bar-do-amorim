import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingIfood from './components/FloatingIfood';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Review from './pages/Review';
import Ambiente from './pages/Ambiente';
import WorkWithUs from './pages/WorkWithUs';
import ProductPage from './components/ProductPage/ProductPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './styles/globals.css';

function App() {
  return (
    <ProductProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cardapio" element={<Menu />} />
              <Route path="/produto/:productId" element={<ProductPage />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/avalie" element={<Review />} />
              <Route path="/ambiente" element={<Ambiente />} />
              <Route path="/trabalhe-conosco" element={<WorkWithUs />} />
              <Route path="/workwithus" element={<WorkWithUs />} />
            </Routes>
          </main>
          <WhatsAppButton />
          <FloatingIfood />
          <Footer />
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
