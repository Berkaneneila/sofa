import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};


const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
};


const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
          totalPrice: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
        };
      } else {
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
          totalPrice: newItems.reduce((total, item) => total + item.price * item.quantity, 0),
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: filteredItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const updatedItems = state.items
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        )
        .filter(item => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return initialState;

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.reduce((total, item) => total + item.quantity, 0),
        totalPrice: action.payload.reduce((total, item) => total + item.price * item.quantity, 0),
      };

    default:
      return state;
  }
};

const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  
  const addItem = item => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  const removeItem = itemId => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
  const updateQuantity = (itemId, quantity) =>
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: itemId, quantity } });
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });
  const loadCart = items => dispatch({ type: CART_ACTIONS.LOAD_CART, payload: items });

  
  const getItemQuantity = itemId => state.items.find(item => item.id === itemId)?.quantity || 0;
  const isInCart = itemId => state.items.some(item => item.id === itemId);
  const getSubtotal = () => state.totalPrice;
  const getShipping = () => (state.totalPrice > 50 ? 0 : 5.99);
  const getTotal = () => state.totalPrice + getShipping();

  const value = {
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loadCart,
    getItemQuantity,
    isInCart,
    getSubtotal,
    getShipping,
    getTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};


export default CartContext;
