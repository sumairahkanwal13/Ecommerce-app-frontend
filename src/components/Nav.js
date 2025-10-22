import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useState } from "react";
import useCart from "../context/CartContext";
import useWishlist from "../context/WishlistContext";

export default function Nav() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);

    }else {
      navigate("/products")
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    navigate("/products")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
      <div className="container-fluid px-4">
        
        <Link className="navbar-brand fw-bold fs-4 text-dark" to="/">
          Fashion 21
        </Link>

        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <form
            className="d-flex mx-auto my-2"
            style={{ maxWidth: "400px", width: "100%" }}
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            { searchTerm && (
              <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleClearSearch}
              >
                Clear
                </button>
            ) }
          </form>

          
          <div className="d-flex align-items-center ms-auto gap-2">
            <Link
              to="/wishlist"
              className="btn btn-outline-secondary position-relative"
            >
              <FaHeart size={18} />
              {wishlistCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="btn btn-outline-primary position-relative"
            >
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="dropdown">
              <button
                className="btn btn-outline-dark dropdown-toggle"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUser size={18} />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/orderHistory">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/address">
                    Addresses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
