import { createSlice } from "@reduxjs/toolkit";
import { calculatePrices } from "../../Utils/calculatePrices";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  paymentMethod: "PayPal",
  itemsPrice: JSON.parse(localStorage.getItem("prices"))?.itemsPrice || 0,
  taxPrice: JSON.parse(localStorage.getItem("prices"))?.taxPrice || 0,
  shippingPrice: JSON.parse(localStorage.getItem("prices"))?.shippingPrice || 0,
  totalPrice:
    Number(JSON.parse(localStorage.getItem("prices"))?.totalPrice) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const alreadyExists = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!alreadyExists) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item._id === alreadyExists._id ? action.payload : item
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      calculatePrices(state);
    },
    removeFromCart: (state, action) => {
      const _id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== _id);

      calculatePrices(state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.taxPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("prices");
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;
