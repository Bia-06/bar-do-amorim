import React, { useState } from 'react';
import './Review.css';

const Review = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rating: 0,
    comment: '',
    consent: false
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [contactMethod, setContactMethod] = useState('email');

  // Função para formatar o telefone no padrão (00) 00000-0000
  const formatPhoneNumber = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + 9 dígitos)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica a formatação
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 10) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let newValue = value;
    
    // Aplica formatação automática para telefone
    if (name === 'phone') {
      newValue = formatPhoneNumber(value);
    }
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : newValue
    });
  };

  const handleRatingClick = (stars) => {
    setFormData({
      ...formData,
      rating: stars
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    rating: formData.rating,
    comment: formData.comment,
    consent: formData.consent,
    contactMethod: contactMethod
  };

  try {
    // quando estiver no Netlify, esse caminho funciona
    const response = await fetch('/.netlify/functions/save-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao enviar avaliação');
    }

    alert('Obrigado pela sua avaliação!');

    // limpa o form
    setFormData({
      name: '',
      email: '',
      phone: '',
      rating: 0,
      comment: '',
      consent: false
    });
    setHoverRating(0);
    setContactMethod('email');
  } catch (error) {
    console.error(error);
    alert('Não foi possível enviar agora. Tente novamente.');
  }
};

  // Componente de Estrelas Interativas
  const StarRating = () => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className={`star ${star <= (hoverRating || formData.rating) ? 'filled' : ''}`}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
        <span className="rating-text">
          {formData.rating > 0 ? `${formData.rating} estrela${formData.rating > 1 ? 's' : ''}` : 'Clique para avaliar'}
        </span>
      </div>
    );
  };

  return (
    <div className="review-page">
      <div className="container">
        <h1>Avalie sua Experiência</h1>
        
        <div className="review-content">
          <div className="review-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome e Sobrenome *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
             <div className="form-group">
  <label>Como prefere ser contatado? *</label>
  <div className="contact-method">
    <div className="radio-option">
      <input
        type="radio"
        id="email-contact"
        name="contactMethod"
        value="email"
        checked={contactMethod === 'email'}
        onChange={(e) => setContactMethod(e.target.value)}
        required
      />
      <label htmlFor="email-contact" className="radio-label">
        <span className="icon-text">
          <img src="/images/icons/email.png" alt="Email" className="contact-icon" />
          Email
        </span>
      </label>
    </div>
    <div className="radio-option">
      <input
        type="radio"
        id="phone-contact"
        name="contactMethod"
        value="phone"
        checked={contactMethod === 'phone'}
        onChange={(e) => setContactMethod(e.target.value)}
        required
      />
      <label htmlFor="phone-contact" className="radio-label">
        <span className="icon-text">
          <img src="/images/icons/telefone.png" alt="Telefone" className="contact-icon" />
          Telefone
        </span>
      </label>
    </div>
  </div>
</div>
              
              <div className="form-group">
                <label htmlFor={contactMethod}>
                  {contactMethod === 'email' ? 'Email *' : 'Telefone *'}
                </label>
                <input
                  type={contactMethod === 'email' ? 'email' : 'tel'}
                  id={contactMethod}
                  name={contactMethod}
                  value={formData[contactMethod]}
                  onChange={handleChange}
                  required
                  placeholder={
                    contactMethod === 'email' 
                      ? 'seu@email.com' 
                      : '(00) 00000-0000'
                  }
                  maxLength={contactMethod === 'phone' ? '15' : undefined}
                />
              </div>
              
              <div className="form-group">
                <label>Avaliação *</label>
                <StarRating />
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Comentário</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Conte-nos sobre sua experiência..."
                ></textarea>
              </div>

              <div className="form-group consent-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                  />
                  <span>Concordo em compartilhar minha avaliação publicamente</span>
                </label>
              </div>
              
              <button 
                type="submit" 
                className="btn-submit"
                disabled={formData.rating === 0} // Desabilita se não tiver avaliação
              >
                 Enviar Avaliação
              </button>
            </form>
          </div>
          
          <div className="reviews-list">
            <h2>Avaliações Recentes</h2>
            <div className="review-item">
              <div className="review-header">
                <h3>Maria Silva</h3>
                <div className="rating">★★★★★</div>
              </div>
              <p>"Adorei os espetos! Ambiente muito agradável e atendimento excelente."</p>
            </div>
            
            <div className="review-item">
              <div className="review-header">
                <h3>João Santos</h3>
                <div className="rating">★★★★☆</div>
              </div>
              <p>"A parmegiana simplesmente estava deliciosa! Voltarei com certeza."</p>
            </div>

            <div className="review-item">
              <div className="review-header">
                <h3>Ana Costa</h3>
                <div className="rating">★★★★★</div>
              </div>
              <p>"Happy hour incrível! Drinks bem feitos e petiscos de qualidade."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;