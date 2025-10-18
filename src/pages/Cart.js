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
      <h1>Your Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cart.map((item) => (
            <div className="card mb-3" key={`${item._id}-${item.selectedSize || ""}`}>
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
                    <h5 className="card-title mb-1">{item.name}</h5>
                    <p className="card-text mb-1">
                      <strong>Price: </strong>${item.price}
                    </p>

                    {item.selectedSize && (
                      <p className="card-text mb-1 text-muted">
                        <strong>Size: </strong>{item.selectedSize}
                      </p>
                    )}

                    <div className="d-flex align-items-center mb-2">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </button>
                    </div>

                    <button
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove From Cart
                    </button>

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleMoveToWishlist(item)}
                    >
                      Move to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4 className="mb-3">Price Details</h4>
            <p>Total Items: {cart.length}</p>
            <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
