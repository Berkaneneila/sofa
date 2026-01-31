import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './LoginPopup.css';

function LoginPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique de connexion
    console.log('Login attempt:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="login-popup-overlay" onClick={onClose}>
      <div className="login-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </button>
        
        <div className="login-popup-header">
          <h2>Connexion</h2>
          <p>Connectez-vous pour découvrir nos thés d'exception</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Votre mot de passe"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              Se souvenir de moi
            </label>
            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="login-btn">
            <i className="fa-solid fa-sign-in-alt"></i>
            Se connecter
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn google">
              <i className="fa-brands fa-google"></i>
              Continuer avec Google
            </button>
            <button type="button" className="social-btn facebook">
              <i className="fa-brands fa-facebook-f"></i>
              Continuer avec Facebook
            </button>
          </div>

          <div className="signup-link">
            <p>Pas encore de compte ? <a href="/register">Créer un compte</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;
