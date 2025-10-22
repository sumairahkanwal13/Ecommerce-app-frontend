import { useNavigate } from "react-router-dom";
import useAddress from "../context/AddressContext";

export default function UserProfile(){
    const navigate = useNavigate();
    const { addresses } = useAddress()

    const user = {
        name: "Sumaira Kanwal",
        email: "sumaira@example.com",
        id: "U12345",
        phone: "+92 300 1234567",
        address: "123 Main Street, Karachi, Pakistan"

    }

    return(
        <div className="container my-5">
            <div className="card p-4 shadow">
                <h1 className="mb-4 text-center">User Profile</h1>
                <div className="mb-4">
                    <p><strong>Name: </strong>{user.name}</p>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Id: </strong>{user.id}</p>
                    <p><strong>Phone: </strong>{user.phone}</p>
                    <p><strong>Address: </strong>{user.address}</p>
                </div>

                <div className="mb-4">
                    <h4 className="fw-semibold mb-3">Saved Addresses</h4>
                    { addresses.length === 0 ? (
                        <p className="text-muted">No saved address yet</p>
                    ): (
                        <div className="row">
                            { addresses.map((address) => (
                                <div className="col-md-6 b-3" key={address._id}>
                                    <div className="card h-100 p-3 shadow-sm">
                                        <h4>{address.name}</h4>
                                        <p className="mb-1">
                                            {address.street}, {address.city}
                                        </p>

                                        <p className="mb-1">
                                            {address.country}, {address.postalCode}
                                        </p>

                                        <p className="mb-1">
                                            {address.phone}
                                        </p>
                                    </div>
                                </div>
                            ) )}
                        </div>
                    ) }
                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button className="btn btn-primary" onClick={() => navigate("/addressForm")}>
                        Add New Address
                    </button>

                    <button className="btn btn-outline-secondary" onClick={() => navigate("/orderHistory")}>
                        View Order History
                    </button>
                </div>
            </div>
        </div>
    )
}