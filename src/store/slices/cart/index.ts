import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../../model/cart.model";

type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.itemVariant.id === newItem.itemVariant.id &&
          item.itemVariant.itemId === newItem.itemVariant.itemId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.totalQuantity += newItem.quantity;
      state.totalPrice +=
        parseFloat(newItem.itemVariant.price) * newItem.quantity;
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const { itemVariant, quantity } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.itemVariant.id === itemVariant.id &&
            item.itemVariant.itemId === itemVariant.itemId
          )
      );

      state.totalQuantity -= quantity;
      state.totalPrice -= parseFloat(itemVariant.price) * quantity;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ item: CartItem; quantity: number }>
    ) => {
      const { quantity } = action.payload;
      const { itemVariant } = action.payload.item;

      state.items.forEach((item) => {
        if (
          item.itemVariant.id === itemVariant.id &&
          item.itemVariant.itemId === itemVariant.itemId
        ) {
          item.quantity = item.quantity + quantity;
          state.totalQuantity += quantity;
          state.totalPrice += parseFloat(itemVariant.price) * quantity;
        }
      });
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
