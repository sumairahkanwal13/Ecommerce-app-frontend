import useWishlist from "../context/WishlistContext";
import useCart from "../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const handleMoveToCart = (item) => {
    if (item.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size first!");
      return;
    }

    const productToAdd = item.sizes?.length > 0
      ? { ...item, selectedSize }
      : item;

    addToCart(productToAdd);
    removeFromWishlist(item._id);
    toast.success("Moved to cart!");

    
    setSelectedItemId(null);
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

                
                {selectedItemId === item._id && item.sizes?.length > 0 && (
                  <select
                    className="form-select mb-3"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">Select Size...</option>
                    {item.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  className="btn btn-primary me-2"
                  onClick={() => {
                    if (item.sizes?.length > 0) {
                      if (selectedItemId === item._id) {
                        handleMoveToCart(item);
                      } else {
                        setSelectedItemId(item._id);
                        setSelectedSize("");
                      }
                    } else {
                      handleMoveToCart(item);
                    }
                  }}
                >
                  {selectedItemId === item._id ? "Confirm Move" : "Move to Cart"}
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
