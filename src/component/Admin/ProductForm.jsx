import React, { useState, useEffect } from 'react';
import './ProductForm.css';

function ProductForm({ product, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    image: '',
    category: 'green',
    origin: '',
    caffeine: 'medium',
    brewingTime: '',
    temperature: '',
    ingredients: '',
    benefits: '',
    stock: '',
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        quantity: product.quantity || '',
        description: product.description || '',
        image: product.image || '',
        category: product.category || 'green',
        origin: product.origin || '',
        caffeine: product.caffeine || 'medium',
        brewingTime: product.brewingTime || '',
        temperature: product.temperature || '',
        ingredients: product.ingredients || '',
        benefits: product.benefits || '',
        stock: product.stock || '',
        isActive: product.isActive !== undefined ? product.isActive : true
      });
    }
  }, [product]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Le prix doit être supérieur à 0';
    if (!formData.quantity.trim()) newErrors.quantity = 'La quantité est requise';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.image.trim()) newErrors.image = 'L\'URL de l\'image est requise';
    if (!formData.origin.trim()) newErrors.origin = 'L\'origine est requise';
    if (!formData.brewingTime.trim()) newErrors.brewingTime = 'Le temps d\'infusion est requis';
    if (!formData.temperature.trim()) newErrors.temperature = 'La température est requise';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Le stock doit être positif';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        id: product ? product.id : Date.now().toString()
      };

      console.log('Product saved:', productData);
      
      // Here you would typically make an API call to save the product
      // await saveProduct(productData);
      
      onSave(productData);
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h2>{product ? 'Modifier le produit' : 'Nouveau produit'}</h2>
        <p>{product ? 'Modifiez les informations du produit' : 'Ajoutez un nouveau produit à votre catalogue'}</p>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Informations de base</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nom du produit *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Ex: Thé Vert Premium"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Prix (€) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? 'error' : ''}
                placeholder="24.99"
                step="0.01"
                min="0"
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantité *</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={errors.quantity ? 'error' : ''}
                placeholder="Ex: 50g, 100g, 1kg"
              />
              {errors.quantity && <span className="error-message">{errors.quantity}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={errors.stock ? 'error' : ''}
                placeholder="100"
                min="0"
              />
              {errors.stock && <span className="error-message">{errors.stock}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Décrivez votre produit..."
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="image">URL de l'image *</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={errors.image ? 'error' : ''}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <span className="error-message">{errors.image}</span>}
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Détails du thé</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="green">Thé Vert</option>
                <option value="black">Thé Noir</option>
                <option value="white">Thé Blanc</option>
                <option value="oolong">Thé Oolong</option>
                <option value="pu-erh">Thé Pu-erh</option>
                <option value="herbal">Tisane</option>
                <option value="rooibos">Rooibos</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="origin">Origine *</label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className={errors.origin ? 'error' : ''}
                placeholder="Ex: Chine, Inde, Japon"
              />
              {errors.origin && <span className="error-message">{errors.origin}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="caffeine">Teneur en caféine</label>
              <select
                id="caffeine"
                name="caffeine"
                value={formData.caffeine}
                onChange={handleChange}
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
                <option value="none">Sans caféine</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brewingTime">Temps d'infusion *</label>
              <input
                type="text"
                id="brewingTime"
                name="brewingTime"
                value={formData.brewingTime}
                onChange={handleChange}
                className={errors.brewingTime ? 'error' : ''}
                placeholder="Ex: 3-5 minutes"
              />
              {errors.brewingTime && <span className="error-message">{errors.brewingTime}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="temperature">Température *</label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className={errors.temperature ? 'error' : ''}
              placeholder="Ex: 80-85°C"
            />
            {errors.temperature && <span className="error-message">{errors.temperature}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingrédients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Liste des ingrédients..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="benefits">Bienfaits</label>
            <textarea
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="Décrivez les bienfaits du thé..."
              rows="3"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Paramètres</h3>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <span>Produit actif (visible sur le site)</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">
            <i className="fa-solid fa-times"></i>
            Annuler
          </button>
          
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Enregistrement...
              </>
            ) : (
              <>
                <i className="fa-solid fa-save"></i>
                {product ? 'Mettre à jour' : 'Créer le produit'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
