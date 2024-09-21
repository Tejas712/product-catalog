import { Item, ItemVariant, ItemVariantOption } from "./products.model";

export type CartItem = {
  item: Item;
  itemVariant: ItemVariant;
  quantity: number;
  color?: ItemVariantOption;
  size?: ItemVariantOption;
};
