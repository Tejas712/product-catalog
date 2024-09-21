import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "../layout/Layout";
import Products from "../module/products/Products";
import ProductDetails from "../module/products/ProductDetails";

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
    ],
  },
]);

export default function RouteProvider() {
  return <RouterProvider router={router} />;
}
