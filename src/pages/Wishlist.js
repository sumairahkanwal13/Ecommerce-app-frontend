import useWishlist from "../context/WishlistContext";
import useCart from "../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const handleMoveToCart = (item) => {
    const hasSizeOptions = item.size?.length > 0;

    if (hasSizeOptions && !selectedSize) {
      toast.error("Please select a size first!");
      return;
    }

    const productToAdd = hasSizeOptions
      ? { ...item, selectedSize }
      : item;

    addToCart(productToAdd);
    removeFromWishlist(item._id);
    toast.success("Moved to cart!");
    setSelectedItem(null);
    setSelectedSize("");
  };

  if (wishlist.length === 0) {
    return <h2 className="container mt-5">Wishlist is empty.</h2>;
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4">Your Wishlist</h1>
      {wishlist.map((item) => (
        <div className="card mb-3 shadow-sm" key={item._id}>
          <div className="row g-0 align-items-center">
            
            <div className="col-md-4 text-center">
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded"
                style={{ maxWidth: "200px" }}
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text fw-bold">
                  <strong>${item.price}</strong>
                </p>

                {selectedItem === item._id && item.size?.length > 0 && (
                  <select
                    className="form-select mb-3"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">Select Size...</option>
                    {item.size.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  className="btn btn-primary me-2"
                  onClick={() => {
                    if (item.size?.length > 0) {
                      if (selectedItem === item._id) {
                        handleMoveToCart(item);
                      } else {
                        setSelectedItem(item._id);
                        setSelectedSize("");
                      }
                    } else {
                      handleMoveToCart(item);
                    }
                  }}
                >
                  {selectedItem === item._id
                    ? "Confirm Move"
                    : "Move to Cart"}
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove From Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
