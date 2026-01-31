import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Head from "./component/head/Head";       // make sure Head.jsx exists
import Contact from "./component/Contact/Contact"; // make sure Contact.jsx exists
import Header from "./component/Header/Header"; // make sure Header.jsx exists
import Collection from "./component/Collection/Collection"; // make sure Collection.jsx exists
import TeaCollection from "./component/TeaCollection/TeaCollection"; // TeaCollection component
import Blog from "./component/Blog/Blog"; // make sure Blog.jsx exists
import Salers from "./component/Salers/Salers"; // make sure Salers.jsx exists
import Footer from "./component/Footer/Footer"; // make sure Footer.jsx exists
import Login from "./component/Auth/login"; // Login component
import Register from "./component/Auth/Register"; // Register component
import Cart from "./component/Cart/Cart"; // Cart component
import Billing from "./component/Billing/Billing"; // Billing component
import ProductDemo from "./component/ProductDemo/ProductDemo"; // ProductDemo component
import Admin from "./component/Admin/Admin"; // Admin component
import "./App.css";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Head />
        <Routes>
          <Route path="/" element={<><Header/>
          <Collection />
          <Blog/>
          <Salers/>
          </>} />
          <Route path="/tea-collection" element={<TeaCollection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
