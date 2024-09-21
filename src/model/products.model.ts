export type Item = {
  __typename?: "item";
  id: number;
  merchantId: number;
  name: string;
  shopifyId?: string | null;
  description?: string | null;
  currency: string;
  imageUrl?: string | null;
  itemVariants: ItemVariant[];
};

export type ItemVariant = {
  __typename?: "ItemVariant";
  itemId: number;
  id: number;
  imageUrl: string;
  isEnabled: boolean;
  merchantId: number;
  name?: string | null;
  price: string; // Use `number` for decimals
  selectedOptions: ItemVariantOption[];
  weight?: number; // Use `number` for decimals
};

export type Merchant = {
  address?: CustomerAddress;
  addressId?: number;
  bankName?: string;
  bankNumber?: string;
  createdAt: Date;
  currency: string;
  financialAccount: FinancialAccount;
  id: number;
  includesVat: boolean;
  inventoryRent?: InventoryRent;
  lastModified: Date;
  name: string;
  overShipping: number; // Use `number` for decimals
  owner?: User;
  ownerId?: string;
  shopifyShop?: string;
  taxId?: string;
  threshold: number; // Use `number` for decimals
  users: User[];
};

export type ItemVariantOption = {
  __typename?: "ItemVariantOption";
  id: number;
  itemVariantId: number;
  variantNameId: number;
  variantOption: VariantOption;
  variantOptionId: number;
};

export type VariantName = {
  id: number;
  name: string;
};

export type VariantOption = {
  __typename?: "VariantOption";
  colorCode?: string | null;
  id: number;
  value: string;
};

// Assuming these types exist elsewhere in your schema
export type CustomerAddress = {
  // Define fields according to your schema
};

export type FinancialAccount = {
  // Define fields according to your schema
};

export type InventoryRent = {
  // Define fields according to your schema
};

export type User = {
  // Define fields according to your schema
};
