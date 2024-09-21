import { gql } from "../../__generated__";

export const GET_ALL_ITEMS =
  gql(`query Data($itemPageInput: paginateItemsInput!) {
  paginateItems(itemPageInput: $itemPageInput) {
    cursor
    data {
      id
      merchantId
      name
      shopifyId
      description
      currency
      imageUrl
      itemVariants {
        itemId
        id
        imageUrl
        isEnabled
        merchantId
        name
        price
        weight
        selectedOptions {
          id
          itemVariantId
          variantOption {
            id
            value
            colorCode
          }
          variantNameId
          variantOptionId
        }
      }
    }
  }
}`);
