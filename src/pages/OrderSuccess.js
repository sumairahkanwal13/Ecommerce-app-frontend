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
      <div className="card p-5 shadow-lg">
        <h3 className="mb-4">Order Placed Successfully!</h3>
        <p>
          Thank you for shopping with <strong>Fashion 21</strong>.
        </p>

        {selectedAddress && (
          <div className="mt-4 text-start mx-auto" style={{ maxWidth: "600px" }}>
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

      
      <div
        className="mt-5 text-start mx-auto"
        style={{ maxWidth: "600px" }}
      >
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

        <h5 className="mt-3">
          Total:{" "}
          <span className="text-success">
            ${lastOrder.total.toFixed(2)}
          </span>
        </h5>

        <p className="text-muted mt-2">
          Ordered on: {lastOrder.date}
        </p>
      </div>

      <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
        Back to Shopping
      </button>
    </div>
  );
}
