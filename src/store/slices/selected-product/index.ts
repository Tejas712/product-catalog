import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Item,
  ItemVariant,
  ItemVariantOption,
} from "../../../model/products.model";
import {
  COLOR_VARIANT_ID,
  SIZE_VARIANT_ID,
} from "../../../constants/product.constant";

type SelectedItemState = {
  item?: Item;
  itemVariant?: ItemVariant;
  colors: ItemVariantOption[];
  sizes: ItemVariantOption[];
};

const initialState: SelectedItemState = {
  item: undefined,
  itemVariant: undefined,
  colors: [],
  sizes: [],
};

const SelectedItemSlice = createSlice({
  name: "selectedItem",
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<Item>) => {
      const itemVariant = action.payload.itemVariants[0];
      const colors = itemVariant?.selectedOptions.filter(
        (o) => o.variantOptionId === COLOR_VARIANT_ID
      );
      const sizes = itemVariant?.selectedOptions.filter(
        (o) => o.variantOptionId === SIZE_VARIANT_ID
      );
      state.item = action.payload;
      state.itemVariant = itemVariant;
      state.colors = colors;
      state.sizes = sizes;
    },
    clearItem: (state) => {
      return initialState;
    },
  },
});

export const { setItem, clearItem } = SelectedItemSlice.actions;

export default SelectedItemSlice.reducer;
