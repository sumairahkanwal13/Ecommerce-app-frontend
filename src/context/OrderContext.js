import { createContext, useContext } from "react";
import { useState } from "react";

const OrderContext = createContext();

const useOrder = () => useContext(OrderContext)
export default useOrder;


export function OrderProvider({children}){
    const [ orders, setOrders ] = useState([]);

    const addOrder = (order) =>{
        setOrders((prev) => [...prev, order])
        
    }

    const clearOrder = () => {
        setOrders([])
    }
    
    
    return (
        <OrderContext.Provider value={{orders, addOrder, clearOrder}}>
            {children}
        </OrderContext.Provider>
    )
}