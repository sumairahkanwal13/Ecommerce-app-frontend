import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAddress from "../context/AddressContext";
import { toast } from "react-toastify";

const AddressForm = () => {
  const {id} = useParams()
  const { addresses, addAddress, editAddress } = useAddress();
  const navigate = useNavigate();

  const existingAddress = addresses.find((address) => address._id === Number(id));


  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    country: "",
    phone: ""
  });

  useEffect(() =>{
    if(existingAddress){
      setFormData(existingAddress)
    }
  }, [existingAddress])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(id){
      editAddress(Number(id), formData)
      toast.success("Address Updated Successfully!")
    } else {
      const newAddress = {...formData, _id: Date.now()}
      addAddress(newAddress)
      toast.success("Address Added!")
    }
    navigate("/address");
  };

  return (
    <div className="container my-4">
      <h2>{id ? "Edit Address" : "Add New Address"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          className="form-control mb-3"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Street:</label>
        <input
          type="text"
          name="street"
          className="form-control mb-3"
          value={formData.street}
          onChange={handleChange}
          required
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          className="form-control mb-3"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label>Country:</label>
        <input
          type="text"
          name="country"
          className="form-control mb-3"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          className="form-control mb-3"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary mt-3">
          {id ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
