import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import { Layout } from "../layout/Layout";
import Products from "../module/products/Products";
import ProductDetails from "../module/products/ProductDetails";
import Cart from "../module/cart/Cart";
import NotFound from "../layout/NotFound";
import Checkout from "../module/cart/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Products,
      },
      {
        path: "/product-details",
        Component: ProductDetails,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/checkout",
        Component: Checkout,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default function RouteProvider() {
  return <RouterProvider router={router} />;
}
