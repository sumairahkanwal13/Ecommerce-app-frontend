import { useNavigate } from "react-router-dom";
import useAddress from "../context/AddressContext";
import useCart from "../context/CartContext";
import useOrder from "../context/OrderContext";
import { toast } from "react-toastify";


export default function Checkout() {
  const { selectedAddress } = useAddress();
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrder()
  const navigate = useNavigate();


  if (!selectedAddress) {
    return (
      <div className="container text-center my-5">
        <h3>Please select a delivery address first.</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/address")}
        >
          Go to Address Page
        </button>
      </div>
    );
  }

  
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  
 const handlePlaceOrder = () => {
  const newOrder ={
    id: Date.now(),
    items: cart,
    address: selectedAddress,
    total,
    date: new Date().toLocaleString()
  };

  addOrder(newOrder);
  clearCart(false);
  toast.success("Order has been placed!")
  toast.dismiss()
  navigate("/orderSuccess");
};


return (
    <div className="container my-4">
      <h2 className="mb-4">Checkout</h2>

      
      <div className="card p-3 mb-3">
        <h5>Delivery Address</h5>
        <p><strong>{selectedAddress.name}</strong></p>
        <p>
          {selectedAddress.street}, {selectedAddress.city}
        </p>
        <p>{selectedAddress.country}</p>
        <p>{selectedAddress.phone}</p>
      </div>

      
      <div className="card p-3 mb-3">
        <h5>Order Summary</h5>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      
      <div className="text-end">
        <h5>
          Total: <span className="text-success">${total.toFixed(2)}</span>
        </h5>
        <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
  
}
