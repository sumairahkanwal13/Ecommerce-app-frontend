import useAddress from "../context/AddressContext";
import { useNavigate } from "react-router-dom";

export default function Address(){
   
    const { addresses, removeAddress, setSelectedAddress, selectedAddress } = useAddress();
    const navigate = useNavigate()


    return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="container my-4">Address Info</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/addressForm")}
        >
          Add New Address
        </button>
      </div>

      <div className="row">
        {addresses.length === 0 ? (
          <p>No saved addresses yet.</p>
        ) : (
          addresses.map((address) => (
            <div className="col-md-4 mb-3" key={address._id}>
              <div className="card p-3">
                <h5>{address.name}</h5>
                <p>
                  {address.street}, {address.city}
                </p>
                <p>
                  {address.country}, {address.postalCode}
                </p>
                <p>{address.phone}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedAddress(address)}
                  >
                    Select
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeAddress(address._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedAddress && (
        <div className="alert alert-success mt-3">
          Selected Address: {selectedAddress.name}, {selectedAddress.street},{" "}
          {selectedAddress.city}, {selectedAddress.country},{" "}
          {selectedAddress.phone}
        </div>
      )}

      { selectedAddress && (
        <div className="text-end mt-3" >
            <button className="btn btn-success" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </div>
      ) }
    </div>
  );
}