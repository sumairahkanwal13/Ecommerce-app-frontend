import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

const useWishlist = () => useContext(WishlistContext)

export default useWishlist;

export function WishlistProvider({children}){
  const [ wishlist, setWishlist ] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    return savedWishlist ? JSON.parse(savedWishlist) : []
  })

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  },[ wishlist])

  const addToWishlist = (product) => {
   setWishlist((prevList) => [...prevList, product])
   toast.success(`${product.name} added to wishlist!`)
  };
  const clearWishlist = () => {
    setWishlist([]);
    toast.warn("Wishlist Cleared!")
  }

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter((item) => item._id !== id))
    toast.error("Item remove from wishlist!")
  }
    return(
        <WishlistContext.Provider value={{wishlist, addToWishlist, clearWishlist, removeFromWishlist}}>
            {children}
            </WishlistContext.Provider>
    )
}