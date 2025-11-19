import React, { useState } from 'react';
import './WorkWithUs.css';

const WorkWithUs = () => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    telefone: '',
    email: '',
    bairro: '',
    cidade: '',
    mensagem: '',
    curriculo: null,
    consentimento: false
  });

  const [ageError, setAgeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    const limitedNumbers = numbers.slice(0, 11);
    
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
    const { name, value, type, checked, files } = e.target;
    
    let newValue = value;
    
    if (name === 'telefone') {
      newValue = formatPhoneNumber(value);
    }
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : newValue
    });

    if (name === 'idade') {
      if (value && parseInt(value) < 18) {
        setAgeError('Apenas pessoas maiores de 18 anos podem se candidatar');
      } else {
        setAgeError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.idade && parseInt(formData.idade) < 18) {
      setAgeError('Apenas pessoas maiores de 18 anos podem se candidatar');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/processa_trabalhe.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          idade: formData.idade,
          telefone: formData.telefone,
          email: formData.email,
          bairro: formData.bairro,
          cidade: formData.cidade,
          mensagem: formData.mensagem,
          curriculo_nome: formData.curriculo ? formData.curriculo.name : null,
          consentimento: formData.consentimento
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Erro ao enviar candidatura.');
      }

      alert('Obrigado! Sua candidatura foi enviada com sucesso 🍻');
      setFormData({
        nome: '',
        idade: '',
        telefone: '',
        email: '',
        bairro: '',
        cidade: '',
        mensagem: '',
        curriculo: null,
        consentimento: false
      });
      setAgeError('');
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message || 'Não foi possível enviar agora. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="work-page">
      <div className="container">
        <h1>Trabalhe Conosco</h1>
        <p className="intro-text">
          Venha fazer parte da equipe <strong>Bar do Amorim</strong>!  
          Preencha o formulário abaixo e envie seu currículo para avaliarmos sua candidatura.
        </p>

        <form onSubmit={handleSubmit} className="work-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo *</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="idade">Idade *</label>
              <input 
                type="number" 
                id="idade" 
                name="idade" 
                value={formData.idade} 
                onChange={handleChange} 
                required 
                min="1"
                max="120"
              />
              {ageError && <div className="error-message">{ageError}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="telefone">Telefone *</label>
              <input 
                type="tel" 
                id="telefone" 
                name="telefone" 
                value={formData.telefone} 
                onChange={handleChange} 
                required 
                placeholder="(00) 00000-0000" 
                maxLength="15"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="seu@email.com" 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bairro">Bairro *</label>
              <input 
                type="text" 
                id="bairro" 
                name="bairro" 
                value={formData.bairro} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cidade">Cidade *</label>
              <input 
                type="text" 
                id="cidade" 
                name="cidade" 
                value={formData.cidade} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mensagem">Fale um pouco sobre você</label>
            <textarea 
              id="mensagem" 
              name="mensagem" 
              rows="5" 
              value={formData.mensagem} 
              onChange={handleChange} 
              placeholder="Conte um pouco sobre sua experiência ou área de interesse..."
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="curriculo">Anexar Currículo (PDF ou DOC)</label>
            <input 
              type="file" 
              id="curriculo" 
              name="curriculo" 
              accept=".pdf,.doc,.docx" 
              onChange={handleChange} 
            />
            <small style={{color: '#666', fontSize: '0.875rem'}}>
              📝 O arquivo será registrado em nosso sistema
            </small>
          </div>

          <div className="form-group consent-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="consentimento" 
                checked={formData.consentimento} 
                onChange={handleChange} 
                required 
              />
              <span>Concordo em compartilhar meus dados para análise de candidatura *</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={!!ageError || isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkWithUs;