import { Link } from"react-router-dom";
import useFetch from "../useFetch";


export default function Home(){
    const { data:categories, loading, error } = useFetch("https://project-1-five-psi.vercel.app/api/categories")
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error occurred while fetching the data.</p>
    
    return(
        <div className="container my-5">
            <h1>Featured Categories</h1>
            <div className="row">
                { categories && categories.length > 0 ? (
                    categories.map((item) => (
                        <div className="col-md-4 col-sm-6 mb-4" key={item._id}>
                            <Link to={`/products?categories=${item.name}`} className="text-decoration-none">
                            <div className="card h-120 shadow-sm">
                                <img src={item.image} alt={item.name} className="card-img-top rounded-top"/>
                            </div>
                            <div className="card-body text-center">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="text-muted small">{item.description}</p>
                            </div>
                            </Link>
                        </div>
                    ))
                ): (
                    <p className="text-center">No category found.</p>
                )}
            </div>
            
        </div>
    )
}