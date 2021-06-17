import { createContext, useContext, useState } from 'react';

const CartContext = createContext();
const CartProvider = CartContext.Provider;

function CartContextProvider({ children }) {
  // This is our own custom provider! We will store data (state) and functionality (updaters) in here and anyone can access it via the consumer!

  // Closed cart by default
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <CartProvider
      value={{
        cartOpen,
        toggleCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </CartProvider>
  );
}

// make a custom hook for accessing the cart local state
function useCart() {
  // We use a consumer here to access the local state
  const cartContext = useContext(CartContext);

  return cartContext;
}

export { CartContextProvider, useCart };
