import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>Sobre o Bar do Amorim</h1>

        {/* HISTÓRIA */}
        <div className="about-content">
          <div className="about-text">
            <h2>Nossa História</h2>
            <p>
              Em 2006 nascia o Escritório Beer, uma ideia dos ex-proprietários
              Flavinho e Chileno que por 10 anos comandava um bar irreverente
              com grandes personalidades e clientes.
            </p>
            <p>
              O atual proprietário, famoso Amorim, que por sua vez era grande
              frequentador do bar e sua vontade de tomar frente do negócio junto
              com sua esposa Márcia ganhou forma; e em outubro de 2017 adquiriu
              o comércio que tanto sonhou, mas sua vontade de dar sua
              personalidade ao bar se fez, agora, a sua verdadeira identidade.
              Assim nasce "Bar do Amorim", um lugar com grandes momentos e
              verdadeiras histórias!
            </p>
            <p>
              Se você mora em Marília e ainda não conhece, pare de perder tempo.
              Ambiente familiar e agradável. Aguardamos você e sua família para
              curtir e saborear nossas delícias.
            </p>
          </div>
        </div>

        {/* CONTATO + LOCALIZAÇÃO (MESMA CAIXA) */}
        <div className="unified-contact-section">
          <div className="contact-info">
            <div className="contact-content">
              
              {/* CARTÃO: ENTRE EM CONTATO */}
              <div className="contact-details">
                <h2>Entre em Contato</h2>

                <div className="contact-item">
                  <span className="contact-icon">
                    <img src="/images/icons/tel.png" alt="Telefone" />
                  </span>
                  <div className="contact-text">
                    <strong>Telefone:</strong> (14) 3454-1403
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">
                    <img src="/images/icons/whats.png" alt="WhatsApp" />
                  </span>
                  <div className="contact-text">
                    <strong>WhatsApp:</strong> (14) 99694-3024
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">
                    <img src="/images/icons/e-mail.png" alt="Email" />
                  </span>
                  <div className="contact-text">
                    <strong>Email:</strong> bardoamorim_2020@outlook.com
                    <span className="contact-note">(para currículo)</span>
                  </div>
                </div>

                <h3>Horário de Funcionamento</h3>

                <div className="contact-item">
                  <span className="contact-icon">
                    <img src="/images/icons/horario.png" alt="Horário" />
                  </span>
                  <div className="contact-text">
                    Segunda a Sábado: <strong>09h às 01h</strong>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">
                    <img src="/images/icons/happyhour.png" alt="Happy Hour" />
                  </span>
                  <div className="contact-text">
                    Happy Hour: Segunda à Sexta das <strong>16h às 20h</strong>
                    <span className="contact-note">(exceto feriados)</span>
                  </div>
                </div>
              </div>

              {/* CARTÃO: LOCALIZAÇÃO */}
              <div className="map-container">
                <h2>Nossa Localização</h2>

                <div className="map-address">
                  <span className="map-icon-inline">
                    <img src="/images/icons/localizacao.png" alt="Localização" />
                  </span>
                  <div className="map-text">
                    R. Júlio de Mesquita, 582<br />
                    Jardim Maria Izabel<br />
                    Marília - SP • 17515-230
                  </div>
                </div>

                <div className="about-map">
                  <iframe
                    title="Localização do Bar do Amorim"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.441904270924!2d-49.94786872469102!3d-22.21704807967817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bfd6e5b0b3d5a5%3A0x9a5b3b5b5b5b5b5b!2sR.%20J%C3%BAlio%20de%20Mesquita%2C%20582%20-%20Mar%C3%ADlia%2C%20SP%2C%2017515-230!5e0!3m2!1spt-BR!2sbr!4v1633024000000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <a
                  className="map-button"
                  href="https://maps.google.com/?q=R.+Júlio+de+Mesquita,+582,+Marília+SP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/icons/mapa.png"
                    alt="Mapa"
                    className="map-icon-button"
                  />
                  <span>Ver rota no Google Maps</span>
                </a>
              </div>
            </div>{/* contact-content */}
          </div>{/* contact-info */}
        </div>{/* unified-contact-section */}
      </div>
    </div>
  );
};

export default About;
