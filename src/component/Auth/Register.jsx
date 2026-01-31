import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";


function Register() {
  const [isLogin, setIsLogin] = useState(false); 


  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // handle input changes
  const handleChange = (e, type = "register") => {
    const { name, value, type: inputType, checked } = e.target;

    if (type === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setFormData({
        ...formData,
        [name]: inputType === "checkbox" ? checked : value,
      });
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      alert("Connexion réussie !");
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la connexion");
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas!");
      return;
    }

    if (!formData.acceptTerms) {
      alert("Veuillez accepter les conditions d'utilisation!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      alert(res.data.message || "Inscription réussie !");
      setIsLogin(true); 
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        {isLogin ? (
          <>
            <div className="auth-header">
              <h1>Connexion</h1>
              <p>Accédez à votre compte</p>
            </div>

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={(e) => handleChange(e, "login")}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e) => handleChange(e, "login")}
                    required
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-btn">
                <i className="fa-solid fa-right-to-bracket"></i>
                Se connecter
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => setIsLogin(false)}
                >
                  S'inscrire
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="auth-header">
              <h1>Inscription</h1>
              <p>Créez votre compte</p>
            </div>

            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Votre prénom"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
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
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+213 31 23 45 67 89"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Votre mot de passe"
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirmez votre mot de passe"
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label className="terms-checkbox">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    J'accepte les{" "}
                    <Link to="/terms" className="terms-link">
                      conditions d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link to="/privacy" className="terms-link">
                      politique de confidentialité
                    </Link>
                  </span>
                </label>
              </div>

              <button type="submit" className="auth-btn">
                <i className="fa-solid fa-user-plus"></i>
                Créer mon compte
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Déjà un compte ?{" "}
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => setIsLogin(true)}
                >
                  Se connecter
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
