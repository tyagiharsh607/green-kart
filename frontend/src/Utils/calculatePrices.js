export const calculatePrices = (state) => {
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(0));
  state.shippingPrice = state.itemsPrice > 200 ? 0 : 50;
  state.totalPrice = Number(
    state.itemsPrice + state.taxPrice + state.shippingPrice
  ).toFixed(0);
  localStorage.setItem(
    "prices",
    JSON.stringify({
      itemsPrice: state.itemsPrice,
      taxPrice: state.taxPrice,
      shippingPrice: state.shippingPrice,
      totalPrice: Number(state.totalPrice),
    })
  );
};
