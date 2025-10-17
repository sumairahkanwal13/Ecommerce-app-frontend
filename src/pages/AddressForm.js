import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddress from "../context/AddressContext";

const AddressForm = () => {
  const { addAddress } = useAddress();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    country: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = {
      ...formData,
      _id: Date.now(),
    };

    addAddress(newAddress);
    navigate("/address");
  };

  return (
    <div className="container my-4">
      <h2>Add New Address</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          className="form-control mb-3"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Street:</label>
        <input
          type="text"
          name="street"
          className="form-control mb-3"
          value={formData.street}
          onChange={handleChange}
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          className="form-control mb-3"
          value={formData.city}
          onChange={handleChange}
        />

        <label>Country:</label>
        <input
          type="text"
          name="country"
          className="form-control mb-3"
          value={formData.country}
          onChange={handleChange}
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          className="form-control mb-3"
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary mt-3">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
