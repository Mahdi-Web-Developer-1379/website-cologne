"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    streetAddress: "",
    postalCode: "",
    phone: "",
    email: "",
    description: ""
  });

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  const calcTotalPrice = () => {
    return cart.reduce((prev, item) => prev + item.price * item.count, 0);
  };

  const calcShippingPrice = () => {
    if (!stateSelectedOption) return 0;
    return stateSelectedOption.price || 0;
  };

  const getFinalTotal = () => {
    const total = calcTotalPrice() + calcShippingPrice();
    if (appliedDiscount) {
      const discountAmount = (total * appliedDiscount.percent) / 100;
      return total - discountAmount;
    }
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        discount,
        setDiscount,
        appliedDiscount,
        setAppliedDiscount,
        stateSelectedOption,
        setStateSelectedOption,
        citySelectedOption,
        setCitySelectedOption,
        userDetails,
        setUserDetails,
        calcTotalPrice,
        calcShippingPrice,
        getFinalTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

