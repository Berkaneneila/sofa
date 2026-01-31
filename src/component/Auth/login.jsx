import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Requête login au backend
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

    
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Ajouter le token par défaut à axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      alert(res.data.message || "Connexion réussie ✅");
      console.log("Réponse backend login :", res.data);

      // Redirection après connexion
      navigate("/dashboard");

    } catch (err) {
      console.error("Erreur login:", err.response?.data || err);
      alert(err.response?.data?.message || "Erreur lors de la connexion ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Connexion</h1>
          <p>Connectez-vous à votre compte</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Votre mot de passe"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn">Se connecter</button>
        </form>

        <div className="auth-footer">
          <p>
            Pas encore de compte ?{" "}
            <Link to="/register" className="auth-link">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
