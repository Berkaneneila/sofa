import "./Cart.css";

function Cart({ logo, title }) {   
  return (
    <div className="cartcollection">
      <div className="imagecartdiv">
        <img src={logo} alt="cartimg" className="imagecart" />
      </div>

      <div className="titlecollection">
        <h5 id="text-title">{title}</h5>
      </div>
    </div>
  );
}

export default Cart;
