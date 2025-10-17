import useOrder from "../context/OrderContext";

export default function OrderHistory(){
    const { orders } = useOrder();

    if(orders.length === 0){
        return (
            <div className="container text-center my-5">
                <h3>No previous orders found.</h3>
                <p>Start Shopping with <strong>Fashion 21</strong></p>
            </div>
        )
    }

    return (
        <div className="container my-4">
            <h2 className="mb-4 text-center">Your Order History</h2>
            { orders.map((order) => (
                <div className="card mb-4 p-4 shadow-sm" key={order._id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Order ID: {order.id}</h5>
                        <span className="text-muted">{order.date}</span>
                    </div>
                    <hr/>

                    <div>
                        {order.items.map((item) => (
                            <div key={item._id}  className="d-flex justify-content-between border-bottom py-1">
                                <span>{item.name}, (*{item.quantity})</span>
                                <span>${item.price * item.quantity}.toFixed(2)</span>
                            </div>
                        ) )}
                    </div>

                    <div className="mt-3">
                        <h6>Delivery Address:</h6>
                        <p>
                            {order.address.name} <br/>
                            {order.address.street}, {order.address.city}, {order.address.country}<br/>
                            {order.address.phone}
                        </p>
                    </div>

                    <h5 className="text-end mt-3">
                        Total: <span className="text-success"> {order.total.toFixed(2)} </span>
                    </h5>
                </div>
            ) )}
        </div>
    )
}