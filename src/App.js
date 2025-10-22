import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AddressProvider } from "./context/AddressContext";
import { OrderProvider } from "./context/OrderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Nav from "./components/Nav";
import Home from './pages/Home';
import Productlisting from "./pages/Productlisting";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails"
import Address from "./pages/Address";
import AddressForm from "./pages/AddressForm";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import UserProfile from "./pages/UserProfile";
import OrderHistory from "./pages/OrderHistory";
import Footer from "./components/Footer";


function App() {
  return (
    <CartProvider>
    <WishlistProvider>
      <AddressProvider>
        <OrderProvider>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={< Home/>}/>
        <Route path="/products" element={<Productlisting />}/>
        <Route path="/cart" element={< Cart/>}/>
        <Route path="/product/:id" element={< ProductDetails/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/address" element={<Address/>}/>
        <Route path="/addressForm" element={<AddressForm/>}/>
        <Route path="/addressForm/:id" element={<AddressForm/>}/>
        <Route path="/checkout" element={< Checkout/>}/>
        <Route path="/orderSuccess" element={< OrderSuccess/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/orderHistory" element={<OrderHistory/>}/>
      </Routes>
      <Footer/>
    </Router>
    <ToastContainer position="top-right" 
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored" />
    </OrderProvider>
    </AddressProvider>
    </WishlistProvider>
    </CartProvider>
  );
}

export default App;
