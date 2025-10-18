import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AddressContext = createContext();

const useAddress = () => useContext(AddressContext)

export default useAddress;

export function AddressProvider({children}){
    const [ addresses, setAddresses ] = useState(() => {
        const savedAddress = localStorage.getItem("addresses")
        return savedAddress ? JSON.parse(savedAddress) : []
    });

    useEffect(() => {
        localStorage.setItem("addresses", JSON.stringify(addresses))
    },[addresses])


    const [ selectedAddress, setSelectedAddress ] = useState(() => {
        const saved = localStorage.getItem("selectedAddress");
        return saved ? JSON.parse(saved) : null
    });

    useEffect(() => {
        localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress))
    }, [selectedAddress])

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

    const editAddress = (id, updatedAddress) => {
  setAddresses((prev) =>
    prev.map((addr) => addr._id === id ? updatedAddress : addr)
  );
  toast.info("Address Updated");
};


    return(
        <AddressContext.Provider value={{addresses,
        addAddress,
        removeAddress,
        clearAddresses,
        selectedAddress,
        setSelectedAddress,
        editAddress
        }}>  
            {children}
        </AddressContext.Provider>
    )
}