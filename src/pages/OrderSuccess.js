import { useNavigate } from "react-router-dom";
import useAddress from "../context/AddressContext";
import useCart from "../context/CartContext";
import useOrder from "../context/OrderContext";
import { useEffect } from "react";

export default function OrderSuccess() {
  const { clearCart } = useCart();
  const { orders } = useOrder();
  const { selectedAddress } = useAddress();
  const navigate = useNavigate();

  const lastOrder = orders[orders.length - 1];

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!lastOrder) {
    return (
      <div className="container text-center my-5">
        <h3>No recent order found.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        
        <div className="col-md-8">
          <div className="card p-4 shadow-sm mb-4">
            <h3 className="text-success mb-3">Order Placed Successfully!</h3>
            <p>
              Thank you for shopping with <strong>Fashion 21</strong>.
            </p>

            {selectedAddress && (
              <div className="mt-4 text-start">
                <h5>Delivery Address</h5>
                <p>
                  <strong>{selectedAddress.name}</strong> <br />
                  {selectedAddress.street}, {selectedAddress.city} <br />
                  {selectedAddress.country} <br />
                  {selectedAddress.phone}
                </p>
              </div>
            )}
          </div>

          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Order Summary</h5>
            {lastOrder.items.map((item) => (
              <div
                key={item._id}
                className="d-flex justify-content-between border-bottom py-2"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <p className="text-muted mt-3 mb-0">
              Ordered on: {lastOrder.date}
            </p>
          </div>
        </div>

  
        <div className="col-md-4 text-center align-self-center mt-4 mt-md-0">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Total</h4>
            <h3 className="text-success mb-4">
              ${lastOrder.total.toFixed(2)}
            </h3>

            <button
              className="btn btn-primary px-4"
              onClick={() => navigate("/")}
            >
              Back to Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
