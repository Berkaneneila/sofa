import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useCart } from "../../context/CartContext";
import "./Head.css";
import logo from "../../assets/Frame 3.png";

function Head() {
  const { totalItems } = useCart();

  return (
    <div className='head'>
      <div className="left">
        <img src={logo} alt="Rendelle Logo" className="logo" />
        <ul className="nav">
            <li><Link to="/">Home</Link></li>
               <li><HashLink smooth to="/#blog" className="nav-link">Blog</HashLink></li>
          <li><Link to="/Tea-Collection">Tea collection</Link></li>
       

          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </div>
      <div className="right">
        <Link to="/cart" className="cart-icon-link">
          <i className="fa-solid fa-cart-shopping panier"></i>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </Link>
        <Link to="/login" className="user-icon-link">
          <i className="fa-solid fa-user panier"></i>
        </Link>
      
      </div>
    </div>
  );
}
export default Head;
