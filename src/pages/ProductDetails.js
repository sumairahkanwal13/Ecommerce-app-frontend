import { useNavigate, useParams } from "react-router-dom";
import useCart from "../context/CartContext";
import useFetch from "../useFetch";
import { useState } from "react";

export default function ProductDetails(){
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate()

    const { data: product, loading, error } = useFetch(`http://localhost:3000/api/products/${id}`);
    const [ selectedSize, setSelectedSize ] = useState("");
    const [ message, setMessage ] = useState("");

    if(loading) return <p>Loading....</p>
    if(error) return <p>Error occurred while fetching data.</p>
    if(!product) return <p>No product found.</p>

    const handleAddToCart = () => {
        if(!selectedSize){
            setMessage("Please select a size before adding to cart.");
            return;
        }
        addToCart({...product, selectedSize});
        setMessage("");
        navigate("/cart");
    }

    return(
        <div className="container my-5">
      <div className="row">
        
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        
        <div className="col-md-7">
          <h3>{product.name}</h3>
          <p className="text-muted">{product.description?.slice(0, 100)}...</p>
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
            {message && (
              <div className="text-danger mt-2 fw-semibold small">
                {message}
              </div>
            )}
          </div>

          
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-primary px-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="btn btn-outline-secondary px-4">
              Buy Now
            </button>
          </div>

          <hr className="my-4" />
          <p>{product.description}</p>
        </div>
      </div>
    </div>
    )


}