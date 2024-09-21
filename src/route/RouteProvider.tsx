import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "../layout/Layout";
import Products from "../module/products/Products";
import ProductDetails from "../module/products/ProductDetails";
import Cart from "../module/cart/Cart";
import NotFound from "../layout/NotFound";

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
