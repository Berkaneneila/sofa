import Cart from "./Cart";
import "./Collection.css";
import picture from "../../assets/Image Holder.png";

function Collection() {
  // Ton tableau de données
  const cartData = [
    { logo: picture, title: "Free Shipping" },
    { logo: picture, title: "Best Quality" },
    { logo: picture, title: "24/7 Support" },
    { logo: picture, title: "Secure Payment" },
    { logo: picture, title: "Discounts" },
    { logo: picture, title: "Easy Return" },

    
  ];

  return (
    <div className="big-collection">
        <div className="title-collection">
            <h2 className="title-collection"> Our Collection</h2>
        </div>
         <div className="collection">
      {cartData.map((item, index) => (
        <Cart key={index} logo={item.logo} title={item.title} />
      ))}
    </div>
    </div>
   
  );
}

export default Collection;
