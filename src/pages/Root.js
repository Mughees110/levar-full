import { Outlet, useNavigation } from "react-router-dom";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import "../App.css";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
function RootLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [tab, setTab] = useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (val) => {
    setTab(val);
    //setOpen(false);
    console.log(val);
  };
  const handleDrawerClose2 = () => {
    setOpen(false);
  };
  const logout = () => {
    console.log("hi");

    localStorage.removeItem("role");
    //setOpen(false);
  };
  const navigation = useNavigation();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          style={{ backgroundColor: "#FBAF02" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <img src="/logo.png" style={{ width: "70px" }} />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader style={{ backgroundColor: "#FBAF02" }}>
            <IconButton onClick={handleDrawerClose2}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {localStorage.getItem("role") && (
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {tab === "categories" ? (
                      <img src="/groups2.png" style={{ width: "25px" }} />
                    ) : (
                      <img src="/groups.png" style={{ width: "25px" }} />
                    )}
                  </ListItemIcon>
                  <Link
                    to="/categories"
                    onClick={() => {
                      handleDrawerClose("categories");
                    }}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Categories
                  </Link>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {tab === "shops" ? (
                      <img src="/shops2.png" style={{ width: "25px" }} />
                    ) : (
                      <img src="/shops.png" style={{ width: "25px" }} />
                    )}
                  </ListItemIcon>
                  <Link
                    to="/shops"
                    onClick={() => handleDrawerClose("shops")}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Shops
                  </Link>
                </ListItemButton>
              </ListItem>

              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {tab === "riders" ? (
                      <img src="/riders2.png" style={{ width: "25px" }} />
                    ) : (
                      <img src="/riders.png" style={{ width: "25px" }} />
                    )}
                  </ListItemIcon>
                  <Link
                    to="/riders"
                    onClick={() => handleDrawerClose("riders")}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Riders
                  </Link>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img src="/logout.png" style={{ width: "25px" }} />
                  </ListItemIcon>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </Link>
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Typography paragraph>
            {navigation.state === "loading" && (
              <div className="loading-modal">
                <div className="loading-modal-content">
                  <div className="loading-spinner"></div>
                </div>
              </div>
            )}
            <Outlet />
          </Typography>
        </Main>
      </Box>
    </>
  );
}

export default RootLayout;
