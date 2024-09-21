import React, { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Badge, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "./navItems";
import { useSelector } from "react-redux";
import { cartTotalItems } from "../../store/slices/cart/selectors";

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const cartTotalItem = useSelector(cartTotalItems);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const goToCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }} gap={4}>
      <List>
        {navItems.map((nav) => (
          <ListItemButton key={nav.key} onClick={() => navigate(nav.route)}>
            <ListItemText primary={nav.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={goToCart}>
          <ShoppingCartIcon sx={{ marginRight: "10px" }} />
          <ListItemText primary="Cart" />{" "}
          <Badge
            badgeContent={`${cartTotalItem}`}
            color="primary"
            sx={{ marginRight: "10px" }}
          ></Badge>
        </ListItemButton>
        <ListItemButton>
          <AccountCircleIcon sx={{ marginRight: "10px" }} />
          <ListItemText primary="Account" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="static" sx={{ boxShadow: 0 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Products
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
            gap={4}
          >
            {navItems.map((nav) => (
              <Typography
                key={nav.key}
                variant="body1"
                sx={{
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
              >
                <Link
                  to={nav.route}
                  style={{ textDecoration: "none", color: "#ffff" }}
                >
                  {nav.label}
                </Link>
              </Typography>
            ))}
            <IconButton edge="end" onClick={goToCart} sx={{ color: "#fff" }}>
              <Badge badgeContent={`${cartTotalItem}`}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton edge="end" sx={{ color: "#fff" }}>
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Header;
