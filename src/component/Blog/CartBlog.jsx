import "./CartBlog.css";

function CartBlog({ logo, title, text, buttonText }) {
  return (
    <div className="cartblog">
      <div className="imageblogdiv">
        <img src={logo} alt={title} className="imageblog" />
      </div>

      <div className="contentblog">
        <h3 className="blog-title">{title}</h3>
        <p className="blog-text">{text}</p>
        <button className="blog-btn">{buttonText}</button>
      </div>
    </div>
  );
}

export default CartBlog;
