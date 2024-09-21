import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { RootState } from "../../store/store";
import useSnackbar from "../../hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid2";
import { clearCart } from "../../store/slices/cart";

const shippingSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup
    .string()
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid Zip Code")
    .required("Zip Code is required"),
  paymentMethod: yup
    .string()
    .oneOf(
      ["card", "netbanking", "wallet", "emi", "upi"],
      "Payment Method is required"
    )
    .required(),
});

interface ShippingDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  paymentMethod: "card" | "netbanking" | "wallet" | "emi" | "upi";
}

const Checkout: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<ShippingDetails>({
    resolver: yupResolver(shippingSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      paymentMethod: "card",
    },
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ShippingDetails> = useCallback(
    (data) => {
      showSnackbar({
        message: "Your order has been placed successfully!",
        severity: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      dispatch(clearCart());
      navigate("/");
    },
    [dispatch, navigate, showSnackbar]
  );

  // Redirect to products page if cart is empty
  if (!cart.items.length) {
    navigate("/products");
    return null;
  }

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#F6F4F1",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Order Summary */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              {cart.items.map((cartItem) => {
                const { item, itemVariant, quantity } = cartItem;

                return (
                  <Box
                    key={item.id}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{ padding: 1 }}
                  >
                    <Typography variant="body2">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${itemVariant.price} x {quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total: $
                      {(parseFloat(itemVariant.price) * quantity).toFixed(2)}
                    </Typography>
                  </Box>
                );
              })}
            </CardContent>
          </Card>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6">
            Total Price: ${cart.totalPrice.toFixed(2)}
          </Typography>
        </Grid>

        {/* Shipping Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Shipping Details
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Address"
                  variant="outlined"
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  variant="outlined"
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="state"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State"
                  variant="outlined"
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="zip"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Zip Code"
                  variant="outlined"
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Divider sx={{ marginY: 4 }} />

            {/* Payment Method */}
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>

            <FormControl component="fieldset">
              <FormLabel component="legend">Select Payment Method</FormLabel>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Credit Card"
                    />
                    <FormControlLabel
                      value="netbanking"
                      control={<Radio />}
                      label="Net Banking"
                    />
                    <FormControlLabel
                      value="wallet"
                      control={<Radio />}
                      label="Wallet"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <br />
            <Button type="submit" variant="contained" color="primary">
              Place Order
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
