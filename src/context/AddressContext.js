import { createContext, useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AddressContext = createContext();

const useAddress = () => useContext(AddressContext)

export default useAddress;

export function AddressProvider({children}){
    const [ addresses, setAddresses ] = useState([]);
    const [ selectedAddress, setSelectedAddress ] = useState(null);

     const addAddress = (address) => {
    setAddresses((prevAddresses) => [...prevAddresses, address]);
    toast.success("Address added successfully!")
  };

    
    const removeAddress = (id) => {
        setAddresses(prev => prev.filter((item) => item._id !== id))
        toast.error("Address removed!")
    }

    const clearAddresses = () => {
        setAddresses([])
        toast.warn("Address cleared!")
    }
    return(
        <AddressContext.Provider value={{addresses,
        addAddress,
        removeAddress,
        clearAddresses,
        selectedAddress,
        setSelectedAddress,}}>  
            {children}
        </AddressContext.Provider>
    )
}