import { Box, Button, CircularProgress, Container, Grid2 } from "@mui/material";
import ProductCard from "./components/ProductCard";
import useProductList from "./hooks/useProductList";
import { useCallback } from "react";
import { Item } from "../../model/products.model";
import { useNavigate } from "react-router-dom";
import useProductDetails from "./hooks/useProductDetails";
import { useDispatch } from "react-redux";
import { setItem } from "../../store/slices/selected-product";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, productList, hasNext, hasPrev, onNext, onPrevious } =
    useProductList();

  const onProductClick = useCallback(
    (item: Item) => {
      dispatch(setItem(item));
      navigate("/product-details");
    },
    [dispatch, navigate]
  );

  return loading ? (
    <Box display={"flex"} justifyContent={"center"}>
      <CircularProgress size="30px" />
    </Box>
  ) : (
    <Container>
      <Grid2 container spacing={3} justifyContent={"center"}>
        {productList.map((item) => {
          return (
            <ProductCard key={item.id} item={item} onClick={onProductClick} />
          );
        })}
      </Grid2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={onPrevious}
          disabled={!hasPrev}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={onNext} disabled={!hasNext}>
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Products;
