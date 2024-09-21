import "./Layout.css";
import Header from "./header/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Header />
      <Box component="main" className="container" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
};
