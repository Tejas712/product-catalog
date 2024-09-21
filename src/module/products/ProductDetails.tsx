import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getSelectedItem } from "../../store/slices/selected-product/selectors";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import ProductCarousel from "./components/ProductCarousel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ColorBadge from "../../components/color-badge/ColorBadge";
import { ItemVariantOption } from "../../model/products.model";
import Button from "@mui/material/Button";

const ProductDetails = () => {
  const { item, itemVariant, colors, sizes } = useSelector(getSelectedItem);
  const [selectedColor, setSelectedColor] = useState<ItemVariantOption>();
  const [selectedSize, setSelectedSize] = useState<ItemVariantOption>();
  const isAlreadyInCart = false;
  const goToCart = () => {};
  const addToCart = () => {};
  const buyNow = () => {};

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
            {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ ml: 1, color: "text.secondary" }}
              >
                {product.averageRating}
              </Typography>
            </Box> */}
            <Typography variant="h5" gutterBottom color="primary">
              {itemVariant?.price} {item?.currency}
            </Typography>

            {/* Color Options */}
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

        {/* Reviews */}
        {/* <Box>
          <Typography variant="h6" gutterBottom>
            Reviews
          </Typography>
          <Box display={"flex"} flexWrap={"wrap"} gap={2}>
            {product.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </Box>
        </Box> */}
      </>
    </Container>
  );
};

export default ProductDetails;
