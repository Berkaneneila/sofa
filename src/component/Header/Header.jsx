
import React, { useState } from "react";
import "./Header.css";
import picture from "../../assets/Landing Main Image.png";
import LoginPopup from "../LoginPopup/LoginPopup";

function Header() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

    const handleDiscoverClick = () => {
        setIsLoginPopupOpen(true);
    };

    const handleCloseLoginPopup = () => {
        setIsLoginPopupOpen(false);
    };

    return (
      <div className="Header">
        <div className="rightheader">
            <img src={picture} alt="headerimg"  className="imageheader"/>
        </div>
        <div className="leftHeader">
            <div className="header-content">
                <span className="header-badge">Premium Tea Collection</span>
                <h1>Découvrez l'Art du Thé Authentique</h1>
                <p>Plongez dans un monde de saveurs raffinées avec notre sélection exclusive de thés d'exception. Chaque feuille est soigneusement sélectionnée pour vous offrir une expérience gustative unique.</p>
                <p>De la cueillette à votre tasse, nous préservons la tradition et l'authenticité pour vous faire découvrir les plus beaux thés du monde.</p>
                <div className="header-actions">
                    <button className="btnheader primary" onClick={handleDiscoverClick}>
                        <i className="fa-solid fa-shopping-bag"></i>
                        Découvrir nos thés
                    </button>
                    <button className="btnheader secondary">
                        <i className="fa-solid fa-play"></i>
                        Voir notre histoire
                    </button>
                </div>
            </div>
        </div>
        
        <LoginPopup 
            isOpen={isLoginPopupOpen} 
            onClose={handleCloseLoginPopup} 
        />
      </div>
    )
}
export default Header;