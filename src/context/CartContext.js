import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart]);
  
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        toast.info(`${product.name} quantity increased`, { position: "top-right" });
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name} added to cart`, { position: "top-right" });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const removedItem = prevCart.find((item) => item._id === id);
      const updatedCart = prevCart.filter((item) => item._id !== id);

      if (removedItem) {
        toast.info(`${removedItem.name} removed from cart`, { position: "top-right" });
      }
      return updatedCart;
    });
  };

  const updateQuantity = (id, newQuantity) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(newQuantity, 1) }
        : item
    )
  );
};

  
  const clearCart = (showToast = true) => {
    setCart([]);
    if(showToast){
      toast.warn("Cart cleared", { position: "top-right" });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export default useCart;
