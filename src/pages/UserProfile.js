import { useNavigate } from "react-router-dom";

export default function UserProfile(){
    const navigate = useNavigate();

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
                <div className="mb-3">
                    <p><strong>Name: </strong>{user.name}</p>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Id: </strong>{user.id}</p>
                    <p><strong>Phone: </strong>{user.phone}</p>
                    <p><strong>Address: </strong>{user.address}</p>
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