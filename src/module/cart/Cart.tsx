import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { clearCart, removeItem, updateQuantity } from "../../store/slices/cart";
import { RootState } from "../../store/store";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartItem } from "../../model/cart.model";
import ColorBadge from "../../components/color-badge/ColorBadge";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = useCallback(
    (cartItem: CartItem) => {
      dispatch(removeItem(cartItem));
    },
    [dispatch]
  );

  const handleUpdateQuantity = useCallback(
    (item: CartItem, quantity: number) => {
      dispatch(updateQuantity({ item, quantity }));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const goToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#F6F4F1",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.items.length === 0 ? (
        <>
          <Typography variant="h6">Your cart is empty.</Typography>
          <Button onClick={goToHome} variant="contained">
            Go to Home
          </Button>
        </>
      ) : (
        <Box>
          <Grid container spacing={2}>
            {cart.items.map((cartItem) => {
              const { item, itemVariant, size, color } = cartItem;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                  <Card sx={{ minWidth: 260, maxWidth: 260 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      alt={itemVariant.name || item.name || ""}
                      image={itemVariant.imageUrl || item.imageUrl || ""}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {`${item.name} ${
                          itemVariant.name ? `(${itemVariant.name})` : ""
                        }`}
                      </Typography>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyItems={"center"}
                        gap={2}
                      >
                        {size && (
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              border: "1px solid",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {size.variantOption.value}
                          </Box>
                        )}
                        {color && (
                          <ColorBadge color={color.variantOption.colorCode!} />
                        )}
                        <Typography variant="body2" color="text.secondary">
                          ${itemVariant.price} {item.currency}
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        pt={2}
                      >
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <IconButton
                            onClick={() => handleUpdateQuantity(cartItem, 1)}
                          >
                            <AddIcon />
                          </IconButton>
                          <Box
                            sx={{
                              borderColor: "#9A7BB8",
                              border: 1,
                              p: 1,
                              borderRadius: 2,
                            }}
                          >
                            <Typography>{cartItem.quantity} Qty</Typography>
                          </Box>
                          <IconButton
                            onClick={() => handleUpdateQuantity(cartItem, -1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </Box>
                        <IconButton
                          onClick={() => handleRemoveItem(cartItem)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Divider sx={{ marginY: 4 }} />

          <Typography variant="h5" gutterBottom>
            Total Price: ${cart.totalPrice}
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              alignItems: "center",
            }}
            gap={3}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
