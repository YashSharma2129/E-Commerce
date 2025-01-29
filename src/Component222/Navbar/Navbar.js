import React, { useContext } from "react";
import CartContext from "../store/cart-context";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Typography,
  Button,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled, alpha } from "@mui/material/styles";

const NavbarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: "sticky",
  top: 0,
  zIndex: 1200,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  paddingRight: theme.spacing(1),
  transition: theme.transitions.create("width"),
  [theme.breakpoints.up("sm")]: {
    width: "20ch",
    "&:focus": {
      width: "30ch",
    },
  },
}));

export default function Navbar({ isLoggedIn, setSearch }) {
  const cart = useContext(CartContext);
  const cartCount = cart.cartCount;

  const handleChange = (e) => {
    let inputValue = e.target.value.toLowerCase();
    setSearch(inputValue);
  };

  const userHandler = () => {
    window.location = isLoggedIn ? "/user" : "/signup";
  };

  const shoppingCartHandler = () => {
    window.location = "/cart";
  };

  const notificationsHandler = () => {
    window.location = "/notifications";
  };

  const favoritesHandler = () => {
    window.location = "/favorites";
  };

  return (
    <NavbarContainer position="sticky">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 700, color: "primary.main", cursor: "pointer" }}
          onClick={() => (window.location = "/")}
        >
          MyShop
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for products, categories..."
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
        </Search>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={favoritesHandler} aria-label="favorites">
            <Badge badgeContent={4} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={notificationsHandler} aria-label="notifications">
            <Badge badgeContent={10} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={shoppingCartHandler} aria-label="shopping cart">
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AccountCircleIcon />}
            onClick={userHandler}
          >
            {isLoggedIn ? "Profile" : "Sign Up"}
          </Button>
        </Box>
      </Toolbar>
    </NavbarContainer>
  );
}
