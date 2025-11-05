import React from 'react';
import './Ambiente.css';

const Ambiente = () => {
  const fotosAmbiente = [
    {
      id: 1,
      src: '/images/ambiente/ambiente1.jpg',
      alt: 'Vista completa do Bar do Amorim',
      descricao: 'A fachada mais famosa da cidade!'
    },
    {
      id: 2,
      src: '/images/ambiente/ambiente2.jpg',
      alt: 'Área externa do bar',
      descricao: 'Primeiro parklet de Marília é nosso em parceria com Amstel'
    },
    {
      id: 3,
      src: '/images/ambiente/ambiente3.jpg',
      alt: 'Bar do Amorim à noite',
      descricao: 'Ambiente iluminado perfeito para happy hour'
    },
    {
      id: 4,
      src: '/images/ambiente/barantes.jpg',
      alt: 'Antes de ser Bar do Amorim',
      descricao: 'Famosa época de Escritório Beer'
    },
    {
      id: 5,
      src: '/images/ambiente/escritoriobeer.jpg',
      alt: 'Processo de Bar do Amorim',
      descricao: 'A esquina mais linda da cidade antes de virar Bar do Amorim'
    },
    {
      id: 6,
      src: '/images/ambiente/projetobar.jpg',
      alt: 'Projeto de Bar do Amorim',
      descricao: 'Projeto do nosso amado Bar em 2019'
    },
  ];

  return (
    <div className="ambiente-page">
      <div className="container">
        <h1>Nosso Ambiente</h1>
        <p className="page-subtitle">
          Conheça o ambiente acolhedor e descontraído do Bar do Amorim
        </p>

        <div className="galeria-ambiente">
          {fotosAmbiente.map((foto) => (
            <div 
              key={foto.id} 
              className="foto-item"
            >
              <img 
                src={foto.src} 
                alt={foto.alt}
                className="foto-ambiente"
              />
              <p className="foto-descricao">{foto.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ambiente;
