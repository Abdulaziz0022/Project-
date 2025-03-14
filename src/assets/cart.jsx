import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const pushCard = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((product) => product.id === item.id);
      
      if (existingItem) {
        toast.info(`${item.title} is already in the cart.`);
        return prevCart; 
      }
  
      toast.success(`${item.title} added to cart!`);
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };
  
  
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== itemId));
    toast.info("Cart cleared.");
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared.");
  };
  
  const increase = (itemId) => {
    let current = [...cart];
    let index = current.findIndex((product) => product.id === itemId); 
  
    if (index !== -1) {
      if (current[index].quantity < current[index].stock) {
        current[index] = { ...current[index], quantity: current[index].quantity + 1 };
        setCart(current);
      } else {
        toast.error(`${current[index].title} is not available.`);
      }
    }
  };
  
  const decrease = (itemId) => {
    let current = [...cart];
    let index = current.findIndex((product) => product.id === itemId);
  
    if (index !== -1) {
      if (current[index].quantity > 1) {
        current[index] = { ...current[index], quantity: current[index].quantity - 1 };
        setCart(current);
      } else {
        toast.info(`${current[index].title} removed from cart.`);
        current.splice(index, 1); 
        setCart(current);
      }
    }
  };
  

  return (
    <CartContext.Provider value={{ cart, pushCard, increase, decrease, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
