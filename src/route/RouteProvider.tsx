import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [],
  },
]);

export default function RouteProvider() {
  return <RouterProvider router={router} />;
}
