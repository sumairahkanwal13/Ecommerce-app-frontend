import { useNavigate } from "react-router-dom";
import useCart from "../context/CartContext";
import useWishlist from "../context/WishlistContext";
import { toast } from "react-toastify";

export default function Cart(){
   const { cart,  removeFromCart, updateQuantity } = useCart()
   const { addToWishlist } = useWishlist()
   const navigate = useNavigate();
   
   if(cart.length === 0){
    return <h2 className="container mt-5">Cart is empty.</h2>
   }
   
   const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)

   const handleMoveToWishlist = (item) => {
    addToWishlist(item)
    removeFromCart(item._id)
    toast.success("Move to wishlist!")
   }
    return(
        <div className="container my-5">
      <h1 className="mb-4">Your Cart</h1>
      <div className="row">
        
        <div className="col-md-8">
          {cart.map((item) => (
            <div className="card mb-3 shadow-sm" key={`${item._id}-${item.selectedSize || ""}`}>
              <div className="row g-0 align-items-center">
                
                <div className="col-md-4 text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded-start"
                    style={{ maxHeight: "150px", objectFit: "contain" }}
                  />
                </div>

                
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title mb-2">{item.name}</h5>
                    {item.selectedSize && (
                      <p className="text-muted mb-1">
                        <strong>Size:</strong> {item.selectedSize}
                      </p>
                    )}
                    <p className="mb-1">
                      <strong>Unit Price:</strong> ${item.price.toFixed(2)}
                    </p>
                    <p className="mb-2">
                      <strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    
                    <div className="d-flex align-items-center mb-3">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() =>
                          updateQuantity(item._id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    
                    <div>
                      <button
                        className="btn btn-outline-danger btn-sm me-2"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleMoveToWishlist(item)}
                      >
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4 className="mb-3">Price Details</h4>
            <ul className="list-group list-group-flush mb-3">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h5 className="text-end">
              Total: <span className="text-success">${totalPrice.toFixed(2)}</span>
            </h5>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
