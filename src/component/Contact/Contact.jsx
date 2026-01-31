import React, { useState } from 'react';
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique pour envoyer le formulaire
    console.log('Form submitted:', formData);
    alert('Message envoyé avec succès!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contactez-nous</h1>
        <p>Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h3>Adresse</h3>
            <p>123 Rue du Thé<br />alger</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fa-solid fa-phone"></i>
            </div>
            <h3>Téléphone</h3>
            <p>+213 553301205</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>contact@teashop.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fa-solid fa-clock"></i>
            </div>
            <h3>Horaires</h3>
            <p>Lun - Ven: 9h00 - 18h00<br />Sam: 10h00 - 16h00</p>
          </div>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Envoyez-nous un message</h2>
            
            <div className="form-group">
              <label htmlFor="name">Nom complet *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom complet"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Sujet de votre message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Votre message..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              <i className="fa-solid fa-paper-plane"></i>
              Envoyer le message
            </button>
          </form>
        </div>
      </div>

      <div className="contact-map">
        <h2>Notre localisation</h2>
        <div className="map-placeholder">
          <i className="fa-solid fa-map-location-dot"></i>
          <p>Carte interactive</p>
        </div>
      </div>
    </div>
  );
}

export default Contact; 
