import React, { FC, useCallback, useMemo } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Item } from "../../../model/products.model";

type Props = {
  item: Item;
  onClick?: (item: Item) => void;
};
const ProductCard: FC<Props> = ({ item, onClick }: Props) => {
  const variant = item.itemVariants[0];

  const onItemClick = useCallback(() => {
    onClick?.(item);
  }, [item, onClick]);
  const name = useMemo(() => {
    return `${item.name} ${variant.name ? `(${variant.name})` : ""}`;
  }, [item.name, variant.name]);
  return (
    <Card
      onClick={onItemClick}
      sx={{
        width: 250,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        alt={variant.name || item.name || ""}
        height="150"
        image={variant.imageUrl || item.imageUrl || ""}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {variant.price} {item.currency}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {item.description}
        </Typography>
      </CardContent>
      {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button size="small"></Button>
      </Box> */}
    </Card>
  );
};

export default ProductCard;
