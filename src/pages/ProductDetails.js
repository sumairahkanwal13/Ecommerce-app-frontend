import { useNavigate, useParams } from "react-router-dom";
import useCart from "../context/CartContext";
import useFetch from "../useFetch";
import { useState } from "react";
import useWishlist from "../context/WishlistContext";
import { toast } from "react-toastify";

export default function ProductDetails(){
    const { id } = useParams();
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist()
    const navigate = useNavigate()

    const { data: product, loading, error } = useFetch(`https://project-1-five-psi.vercel.app/api/products/${id}`);
    const [ selectedSize, setSelectedSize ] = useState("");
    const [ message, setMessage ] = useState("");

    if(loading) return <p className="text-center mt-5">Loading....</p>
    if(error) return <p className="text-center text-danger" >Error occurred while fetching data.</p>
    if(!product) return <p className="text-center text-muted" >No product found.</p>

    const handleAddToCart = () => {
        if(!selectedSize){
            setMessage("Please select a size before adding to cart.");
            return;
        }
        addToCart({...product, selectedSize});
        toast.success(`${product.name} added to cart`)
        setMessage("");
        navigate("/cart");
    }

    const handleBuyNow = () =>{
      if(!selectedSize){
        setMessage("Please select a size before adding to cart.")
        return;
      }
      addToCart({...product, selectedSize})
      toast.success("Proceeding to checkout")
      navigate("/checkout")
     }

     const handleAddToWishlist = () => {
      addToWishlist(product)
      toast.info(`${product.name} added to wishlist!`)
     }

    return(
        <div className="container my-5">
      <div className="row gy-4">
        
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        
        <div className="col-md-7">
          <h3 className="fw-bold">{product.name}</h3>
          <p className="text-muted">
            {product.description.slice(0, 120)}... <br />
            <span className="text-secondary">
              {product.longDescription || "This is a premium quality product made with durable materials, ensuring comfort and style. Perfect for all-day wear, casual outings, and special occasions."}
            </span>
          </p>
          <h4 className="text-success mb-3">$ {product.price}</h4>

          
          <div className="mb-3">
            <h6 className="fw-bold">Select Size:</h6>
            <div className="d-flex gap-2 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setMessage("");
                  }}
                  className={`btn btn-outline-dark rounded-pill px-3 ${
                    selectedSize === size ? "bg-dark text-white" : ""
                  }`}
                  style={{ width: "60px" }}
                >
                  {size}
                </button>
              ))}
            </div>
            {message && <div className="text-danger mt-2 fw-semibold small">{message}</div>}
          </div>

          
          <div className="d-flex gap-3 mt-4 flex-wrap">
            <button className="btn btn-primary px-4" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-outline-secondary px-4" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className="btn btn-outline-danger px-4" onClick={handleAddToWishlist}>
              ❤️ Add to Wishlist
            </button>
          </div>

          <hr className="my-4" />
          <h6 className="fw-bold mb-2">Product Description</h6>
          <p className="text-secondary">
            {product.longDescription ||
              "Crafted with high-quality materials for maximum comfort and longevity. Designed for modern style and perfect fit. Ideal for all occasions — from casual days to evening events."}
          </p>
        </div>
      </div>
    </div>
    )


}