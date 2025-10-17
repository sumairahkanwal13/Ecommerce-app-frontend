import useWishlist from "../context/WishlistContext";
import useCart from "../context/CartContext";

export default function Wishlist(){
    const  { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if(wishlist.length === 0){
        return <h2 className="container mt-5">Wishlist is empty.</h2>
    }
return (
    <div className="container my-4">
      <h1>Your Wishlist</h1>
      {wishlist.map((item) => (
        <div className="card mb-3" key={item._id}>
          <div className="row g-0 align-items-center">
            <div className="col-md-4 text-center">
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded"
                style={{ maxWidth: "200px" }}
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  <strong>${item.price}</strong>
                </p>

                <button
                  className="btn btn-primary me-2"
                  onClick={() => {
                    addToCart(item);
                    removeFromWishlist(item._id);
                  }}
                >
                  Move to Cart
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}