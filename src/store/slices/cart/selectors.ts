import { RootState } from "../../store";

export const cartTotalItems = (state: RootState) => {
  return  state.cart.items.length;
}

export const cartItemList = (state: RootState) => {
  return  state.cart.items;
}

