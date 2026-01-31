import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Billing.css';

function Billing() {
  const [formData, setFormData] = useState({
    // Informations de facturation
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    
    // Informations de livraison
    shippingSameAsBilling: true,
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: 'France',
    
    // Informations de paiement
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Options
    saveInfo: false,
    newsletter: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
      if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
      if (!formData.email) newErrors.email = 'L\'email est requis';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
      if (!formData.phone) newErrors.phone = 'Le téléphone est requis';
      if (!formData.address) newErrors.address = 'L\'adresse est requise';
      if (!formData.city) newErrors.city = 'La ville est requise';
      if (!formData.postalCode) newErrors.postalCode = 'Le code postal est requis';
    }
    
    if (step === 2 && !formData.shippingSameAsBilling) {
      if (!formData.shippingFirstName) newErrors.shippingFirstName = 'Le prénom est requis';
      if (!formData.shippingLastName) newErrors.shippingLastName = 'Le nom est requis';
      if (!formData.shippingAddress) newErrors.shippingAddress = 'L\'adresse est requise';
      if (!formData.shippingCity) newErrors.shippingCity = 'La ville est requise';
      if (!formData.shippingPostalCode) newErrors.shippingPostalCode = 'Le code postal est requis';
    }
    
    if (step === 3) {
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber) newErrors.cardNumber = 'Le numéro de carte est requis';
        if (!formData.expiryDate) newErrors.expiryDate = 'La date d\'expiration est requise';
        if (!formData.cvv) newErrors.cvv = 'Le CVV est requis';
        if (!formData.cardName) newErrors.cardName = 'Le nom sur la carte est requis';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      console.log('Order submitted:', formData);
      alert('Commande passée avec succès!');
    }
  };

  const orderSummary = {
    items: [
      { name: "Thé Vert Premium", price: 24.99, quantity: 2 },
      { name: "Thé Noir Earl Grey", price: 19.99, quantity: 1 },
      { name: "Thé Blanc Jasmin", price: 29.99, quantity: 1 }
    ],
    subtotal: 99.97,
    shipping: 0,
    tax: 19.99,
    total: 119.96
  };

  return (
    <div className="billing-container">
      <div className="billing-header">
        <h1>Finaliser la commande</h1>
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Facturation</span>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Livraison</span>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Paiement</span>
          </div>
        </div>
      </div>

      <div className="billing-content">
        <div className="billing-form-container">
          <form className="billing-form" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="form-step">
                <h2>Informations de facturation</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Prénom *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Nom *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Téléphone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="+33 1 23 45 67 89"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Adresse *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                    placeholder="123 Rue du Thé"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Ville *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'error' : ''}
                      placeholder="Paris"
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="postalCode">Code postal *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={errors.postalCode ? 'error' : ''}
                      placeholder="75001"
                    />
                    {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Pays *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
                <h2>Informations de livraison</h2>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="shippingSameAsBilling"
                      checked={formData.shippingSameAsBilling}
                      onChange={handleChange}
                    />
                    <span>Même adresse que la facturation</span>
                  </label>
                </div>

                {!formData.shippingSameAsBilling && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="shippingFirstName">Prénom *</label>
                        <input
                          type="text"
                          id="shippingFirstName"
                          name="shippingFirstName"
                          value={formData.shippingFirstName}
                          onChange={handleChange}
                          className={errors.shippingFirstName ? 'error' : ''}
                          placeholder="Prénom de livraison"
                        />
                        {errors.shippingFirstName && <span className="error-message">{errors.shippingFirstName}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="shippingLastName">Nom *</label>
                        <input
                          type="text"
                          id="shippingLastName"
                          name="shippingLastName"
                          value={formData.shippingLastName}
                          onChange={handleChange}
                          className={errors.shippingLastName ? 'error' : ''}
                          placeholder="Nom de livraison"
                        />
                        {errors.shippingLastName && <span className="error-message">{errors.shippingLastName}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="shippingAddress">Adresse *</label>
                      <input
                        type="text"
                        id="shippingAddress"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        className={errors.shippingAddress ? 'error' : ''}
                        placeholder="Adresse de livraison"
                      />
                      {errors.shippingAddress && <span className="error-message">{errors.shippingAddress}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="shippingCity">Ville *</label>
                        <input
                          type="text"
                          id="shippingCity"
                          name="shippingCity"
                          value={formData.shippingCity}
                          onChange={handleChange}
                          className={errors.shippingCity ? 'error' : ''}
                          placeholder="Ville de livraison"
                        />
                        {errors.shippingCity && <span className="error-message">{errors.shippingCity}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="shippingPostalCode">Code postal *</label>
                        <input
                          type="text"
                          id="shippingPostalCode"
                          name="shippingPostalCode"
                          value={formData.shippingPostalCode}
                          onChange={handleChange}
                          className={errors.shippingPostalCode ? 'error' : ''}
                          placeholder="Code postal"
                        />
                        {errors.shippingPostalCode && <span className="error-message">{errors.shippingPostalCode}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="shippingCountry">Pays *</label>
                        <select
                          id="shippingCountry"
                          name="shippingCountry"
                          value={formData.shippingCountry}
                          onChange={handleChange}
                        >
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="shipping-options">
                  <h3>Options de livraison</h3>
                  <div className="shipping-option">
                    <input type="radio" id="standard" name="shippingMethod" value="standard" defaultChecked />
                    <label htmlFor="standard">
                      <span className="option-name">Livraison standard</span>
                      <span className="option-price">Gratuite</span>
                      <span className="option-time">3-5 jours ouvrés</span>
                    </label>
                  </div>
                  <div className="shipping-option">
                    <input type="radio" id="express" name="shippingMethod" value="express" />
                    <label htmlFor="express">
                      <span className="option-name">Livraison express</span>
                      <span className="option-price">€9.99</span>
                      <span className="option-time">1-2 jours ouvrés</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-step">
                <h2>Informations de paiement</h2>
                <div className="payment-methods">
                  <div className="payment-method">
                    <input type="radio" id="card" name="paymentMethod" value="card" defaultChecked />
                    <label htmlFor="card">
                      <i className="fa-solid fa-credit-card"></i>
                      <span>Carte de crédit</span>
                    </label>
                  </div>
                  <div className="payment-method">
                    <input type="radio" id="paypal" name="paymentMethod" value="paypal" />
                    <label htmlFor="paypal">
                      <i className="fa-brands fa-paypal"></i>
                      <span>PayPal</span>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="card-details">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Numéro de carte *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={errors.cardNumber ? 'error' : ''}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiryDate">Date d'expiration *</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className={errors.expiryDate ? 'error' : ''}
                          placeholder="MM/AA"
                          maxLength="5"
                        />
                        {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvv">CVV *</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className={errors.cvv ? 'error' : ''}
                          placeholder="123"
                          maxLength="4"
                        />
                        {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cardName">Nom sur la carte *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={errors.cardName ? 'error' : ''}
                        placeholder="Nom tel qu'il apparaît sur la carte"
                      />
                      {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                    </div>
                  </div>
                )}

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleChange}
                    />
                    <span>Sauvegarder mes informations pour la prochaine fois</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                    />
                    <span>M'abonner à la newsletter</span>
                  </label>
                </div>
              </div>
            )}

            <div className="form-actions">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="btn-secondary">
                  <i className="fa-solid fa-arrow-left"></i>
                  Précédent
                </button>
              )}
              
              {currentStep < 3 ? (
                <button type="button" onClick={nextStep} className="btn-primary">
                  Suivant
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              ) : (
                <button type="submit" className="btn-primary">
                  <i className="fa-solid fa-credit-card"></i>
                  Confirmer la commande
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="order-summary">
          <h3>Résumé de la commande</h3>
          <div className="summary-items">
            {orderSummary.items.map((item, index) => (
              <div key={index} className="summary-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">€{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Sous-total:</span>
              <span>€{orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Livraison:</span>
              <span>{orderSummary.shipping === 0 ? 'Gratuite' : `€${orderSummary.shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>TVA:</span>
              <span>€{orderSummary.tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>€{orderSummary.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="security-badge">
            <i className="fa-solid fa-shield-alt"></i>
            <span>Paiement sécurisé SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
