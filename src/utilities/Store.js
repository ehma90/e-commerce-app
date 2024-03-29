import { createContext, useReducer } from "react";
import Cookies from "js-cookie"

export const initialState = {
  cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : 
  {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: ''
  },
};

export const Store = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (x) => x.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
        Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM" : {
      const cartItems = state.cart.cartItems.filter((item) => {
        item.slug === action.payload.item
      })
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_RESET": {
      return {
        ...state,
        cartItems: [],
        shippingAddress: {location: {}},
        paymentMethod: "",
      }
    }
    case "SAVE_SHIPPING_ADDRESS": {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload
          }
        }
      }
    }
    case "SAVE_PAYMENT_METHOD": {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload
        }
      }
    }
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};
