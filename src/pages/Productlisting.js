import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import useWishlist from "../context/WishlistContext";

export default function ProductListing() {
  const { data: products = [], loading, error } = useFetch("https://project-1-five-psi.vercel.app/api/products");
  const { data: categories = [] } = useFetch("https://project-1-five-psi.vercel.app/api/categories");

  const [selectCategories, setSelectCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([15, 150]);
  const [selectRating, setSelectRating] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();
  const location = useLocation();

  
  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {
    const categoryName = new URLSearchParams(location.search).get("categories");
    if (!categoryName || !categories.length) return;

    const matchedCategory = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (matchedCategory) {
      setSelectCategories([matchedCategory._id]);
    }
  }, [location.search, categories]);

 
  const filteredProducts = products
    
    .filter((product) => {
      if (!searchQuery) return true;
      const name = product.name?.toLowerCase() || "";
      const desc = product.description?.toLowerCase() || "";
      return name.includes(searchQuery) || desc.includes(searchQuery);
    })

    
    .filter((product) =>
      selectCategories.length > 0
        ? selectCategories.includes(product.category?._id)
        : true
    )
    
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
   
    .filter((product) =>
      selectRating ? product.rating >= selectRating : true
    );

  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectCategories((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleClearFilter = () => {
    setSelectCategories([]);
    setPriceRange([15, 150]);
    setSelectRating(null);
    setSortOrder("");
  };

  if (loading) return <p className="text-center mt-5 mb-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 mb-5" >Error occurred while fetching data.</p>;

  return (
    <div className="container my-5">
      <div className="row">

        <div className="col-md-3">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h4 className="fw-semibold">Filters</h4>
    <button
      onClick={handleClearFilter}
      className="btn btn-link text-danger p-0"
      style={{ textDecoration: "none" }}
    >
      Clear
    </button>
  </div>

  
  <div className="mb-4">
    <h5 className="fw-semibold">Price</h5>
    <div className="d-flex justify-content-between small text-muted mb-1">
      <span>{priceRange[0]}</span>
      <span>{priceRange[1]}</span>
    </div>
    <input
      type="range"
      className="form-range"
      min="0"
      max="200"
      value={priceRange[1]}
      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
    />
  </div>

  
  <div className="mb-4">
    <h5 className="fw-semibold">Category</h5>
    {categories.map((category) => (
      <div key={category._id} className="form-check ms-1">
        <input
          className="form-check-input"
          type="checkbox"
          value={category._id}
          onChange={handleCategoryChange}
          checked={selectCategories.includes(category._id)}
        />
        <label className="form-check-label ms-1">{category.name}</label>
      </div>
    ))}
  </div>

  
  <div className="mb-4">
    <h5 className="fw-semibold">Rating</h5>
    {[4, 3, 2, 1].map((rating) => (
      <div key={rating} className="form-check ms-1">
        <input
          className="form-check-input"
          type="radio"
          name="rating"
          value={rating}
          onChange={(e) => setSelectRating(Number(e.target.value))}
          checked={selectRating === rating}
        />
        <label className="form-check-label ms-1">
          {rating} stars & above
        </label>
      </div>
    ))}
  </div>

  
  <div>
    <h5 className="fw-semibold">Sort by</h5>
    <div className="form-check ms-1">
      <input
        className="form-check-input"
        type="radio"
        name="sort"
        value="lowToHigh"
        onChange={(e) => setSortOrder(e.target.value)}
        checked={sortOrder === "lowToHigh"}
      />
      <label className="form-check-label ms-1">Price - Low to High</label>
    </div>
    <div className="form-check ms-1">
      <input
        className="form-check-input"
        type="radio"
        name="sort"
        value="highToLow"
        onChange={(e) => setSortOrder(e.target.value)}
        checked={sortOrder === "highToLow"}
      />
      <label className="form-check-label ms-1">Price - High to Low</label>
    </div>
  </div>
</div>

        



        <div className="col-md-9">
          <h1>
            {searchQuery
              ? `Search Results for "${searchQuery}" (${sortedProducts.length})`
              : `All Products (${sortedProducts.length})`}
          </h1>

          <div className="row">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <div key={product._id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                          }}
                      />
                    </Link>
                    <div className="card-body text-center">
                      <Link
                        to={`/product/${product._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <h5>{product.name}</h5>
                      </Link>
                      <p>
                        <strong>Price:</strong> ${product.price}
                      </p>
                      <p>
                        <strong>Rating:</strong> {product.rating}
                      </p>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        View Details
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => addToWishlist(product)}
                      >
                        Add To Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-5">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
