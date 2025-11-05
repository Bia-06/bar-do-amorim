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
    consent: false
  });

  const [ageError, setAgeError] = useState('');

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
    const { name, value, type, checked, files } = e.target;
    
    let newValue = value;
    
    // Aplica formatação automática para telefone
    if (name === 'telefone') {
      newValue = formatPhoneNumber(value);
    }
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : newValue
    });

    // Validação em tempo real para idade
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

    // Validação final da idade antes de enviar
    if (formData.idade && parseInt(formData.idade) < 18) {
      setAgeError('Apenas pessoas maiores de 18 anos podem se candidatar');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('/.netlify/functions/send-job-application', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar candidatura.');
      }

      alert('Obrigado! Seu cadastro foi enviado com sucesso 🍻');
      setFormData({
        nome: '',
        idade: '',
        telefone: '',
        email: '',
        bairro: '',
        cidade: '',
        mensagem: '',
        curriculo: null,
        consent: false
      });
      setAgeError('');
    } catch (error) {
      console.error(error);
      alert('Não foi possível enviar agora. Tente novamente mais tarde.');
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
          {/* Nome Completo - Obrigatório */}
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
            {/* Idade - Obrigatório */}
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
            
            {/* Telefone - Obrigatório */}
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
                maxLength="15" // (00) 00000-0000 tem 15 caracteres
              />
            </div>
          </div>

          {/* Email - Opcional */}
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
            {/* Bairro - Obrigatório */}
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
            
            {/* Cidade - Obrigatório */}
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

          {/* Mensagem - Opcional */}
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

          {/* Currículo - Obrigatório */}
          <div className="form-group">
            <label htmlFor="curriculo">Anexar Currículo (PDF ou DOC)</label>
            <input 
              type="file" 
              id="curriculo" 
              name="curriculo" 
              accept=".pdf,.doc,.docx" 
              onChange={handleChange} 
            />
          </div>

          {/* Consentimento - Obrigatório */}
          <div className="form-group consent-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="consent" 
                checked={formData.consent} 
                onChange={handleChange} 
                required 
              />
              <span>Concordo em compartilhar meus dados para análise de candidatura *</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={!!ageError} // Desabilita o botão se houver erro de idade
          >
            Enviar Candidatura
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkWithUs;