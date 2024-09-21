import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedItem } from "../../store/slices/selected-product/selectors";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import ProductCarousel from "./components/ProductCarousel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ColorBadge from "../../components/color-badge/ColorBadge";
import { ItemVariantOption } from "../../model/products.model";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../store/slices/cart";
import { cartItemList } from "../../store/slices/cart/selectors";

const ProductDetails = () => {
  const { item, itemVariant, colors, sizes } = useSelector(getSelectedItem);
  const [selectedColor, setSelectedColor] = useState<ItemVariantOption>();
  const [selectedSize, setSelectedSize] = useState<ItemVariantOption>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemList);

  const isAlreadyInCart = useMemo(() => {
    return cartItems.some(
      (itm) =>
        itm.itemVariant.itemId === itemVariant?.itemId &&
        itm.itemVariant.id === itemVariant?.id
    );
  }, [cartItems, itemVariant?.id, itemVariant?.itemId]);

  useEffect(() => {
    if (!(item && itemVariant)) {
      navigate("/");
    }
  }, [navigate]);
  
  const addToCart = useCallback(() => {
    if (!(item && itemVariant)) {
      return;
    }
    return dispatch(
      addItem({
        item,
        itemVariant,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      })
    );
  }, [dispatch, item, itemVariant, selectedColor, selectedSize]);

  const buyNow = useCallback(() => {
    if (!(item && itemVariant)) {
      return;
    }
    dispatch(
      addItem({
        item,
        itemVariant,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      })
    );
    navigate("/cart");
  }, [dispatch, item, itemVariant, navigate, selectedColor, selectedSize]);

  const goToCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const images = useMemo(() => {
    const images = [];
    if (itemVariant?.imageUrl) {
      images.push(itemVariant?.imageUrl);
    }
    if (item?.imageUrl) {
      images.push(item.imageUrl);
    }
    return images;
  }, [item, itemVariant]);

  const name = useMemo(() => {
    return `${item?.name} ${itemVariant?.name ? `(${itemVariant.name})` : ""}`;
  }, [item, itemVariant]);

  console.log("check data", { images, name, colors, sizes, item });

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <>
        <Grid container spacing={4}>
          {/* Sidebar with Thumbnail Images */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductCarousel images={images} />
          </Grid>

          {/* Product Information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h4" gutterBottom>
              {name}
            </Typography>
            <Typography variant="h5" gutterBottom color="primary">
              {itemVariant?.price} {item?.currency}
            </Typography>

            {/* Color Options */}
            {!!colors.length && (
              <>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Colors
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  {colors.map((color) => (
                    <ColorBadge
                      key={color.itemVariantId}
                      color={color.variantOption.colorCode!}
                      onClick={() => setSelectedColor(color)}
                      selected={
                        selectedColor?.itemVariantId === color.itemVariantId
                      }
                    />
                  ))}
                </Box>
              </>
            )}
            {/* Size Options */}
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              {sizes.map((size) => (
                <Button
                  key={size.itemVariantId}
                  variant={
                    selectedSize?.itemVariantId === size.itemVariantId
                      ? "contained"
                      : "outlined"
                  }
                  sx={{ borderRadius: "50%" }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.variantOption.value}
                </Button>
              ))}
            </Box>

            {itemVariant?.isEnabled ? (
              isAlreadyInCart ? (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={goToCart}
                  >
                    Go to Cart
                  </Button>
                </Box>
              ) : (
                <>
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      fullWidth
                      onClick={addToCart}
                    >
                      Add to Cart
                    </Button>
                  </Box>

                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={buyNow}
                    >
                      Buy Now
                    </Button>
                  </Box>
                </>
              )
            ) : (
              <Typography color="error" sx={{ mt: 2, fontSize: "18px" }}>
                Out of Stock
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Description */}
        <Box mt={4}>
          <Typography variant="body1" paragraph>
            {item?.description}
          </Typography>
        </Box>
      </>
    </Container>
  );
};

export default ProductDetails;
