import axios from "axios";
import { cartSlice } from "@/features/cartSlice";

const {
  ADD_TO_CART,
  FETCH_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} = cartSlice.actions;

// add to cart
export const addToCart =
  (id, quantity = 0, kv) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "process.env.URLuser/cart/add",
      JSON.stringify({ id: id, quantity: quantity, kv: kv }),
      config,
    );

    dispatch(ADD_TO_CART(data.cart));
  };

// add to cart
export const fetchCart = () => async (dispatch) => {
  const { data } = await axios.get("process.env.URLuser/cart/");

  dispatch(FETCH_CART(data));
};

// delete cart item
export const deleteItemsFromCart = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(
    "process.env.URLuser/cart/delete",
    JSON.stringify({ id: id }),
    config,
  );

  dispatch(REMOVE_FROM_CART(data));
};

// // empty cart
// export const emptyCart = () => async (dispatch, getState) => {
//
//     dispatch({ type: EMPTY_CART });
//
//     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }
//
// // save shipping info
// export const saveShippingInfo = (data) => async (dispatch) => {
//
//     dispatch({
//         type: SAVE_SHIPPING_INFO,
//         payload: data,
//     });
//
//     localStorage.setItem('shippingInfo', JSON.stringify(data));
// }
