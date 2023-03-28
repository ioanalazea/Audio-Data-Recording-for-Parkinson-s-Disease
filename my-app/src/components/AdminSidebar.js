import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DvrIcon from "@mui/icons-material/Dvr";
import LogoutIcon from "@mui/icons-material/Logout";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
export default function AdminSidebar() {
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const handleGoToAll = () => {
    if (location.pathname.includes('overview'))
      navigate(-1);
  };

  const handleGoToOverview = () => {
    if (!location.pathname.includes('overview'))
      navigate("overview");
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key={"All"}>
          <ListItemIcon>
            <AdminPanelSettingsIcon sx={{ color: "#219EBC" }} />
          </ListItemIcon>
          <ListItemText
            primary={"Admin dashboard"}
            sx={{
              color: "#A4A6B3",
              ".MuiListItemText-primary": {
                fontFamily: "Metropolis",
                fontWeight: "700",
                fontSize: "19px",
              },
            }}
          />
        </ListItem>
        <ListItem key={"Overview"} disablePadding>
          <ListItemButton onClick={handleGoToOverview}>
            <ListItemIcon>
              <SummarizeIcon sx={{ color: "#A4A6B3" }} />
            </ListItemIcon>
            <ListItemText
              primary={"Overview"}
              sx={{
                color: "#A4A6B3",
                ".MuiListItemText-primary": {
                  fontFamily: "Metropolis",
                  fontWeight: "600",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={"All"} disablePadding>
          <ListItemButton onClick={handleGoToAll}>
            <ListItemIcon>
              <DvrIcon sx={{ color: "#A4A6B3" }} />
            </ListItemIcon>
            <ListItemText
              primary={"All recordings"}
              sx={{
                color: "#A4A6B3",
                ".MuiListItemText-primary": {
                  fontFamily: "Metropolis",
                  fontWeight: "600",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={"Log out"} disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#A4A6B3" }} />
            </ListItemIcon>
            <ListItemText
              primary={"Log out"}
              sx={{
                color: "#A4A6B3",
                ".MuiListItemText-primary": {
                  fontFamily: "Metropolis",
                  fontWeight: "600",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  const anchor = "left";
  return (
    <React.Fragment key={anchor}>
      <Tooltip title="Main menu">
        <Button onClick={toggleDrawer(anchor, true)}>
          <HomeIcon fontSize="large" sx={{ color: "#323031" }} />
        </Button>
      </Tooltip>
      <Drawer
        sx={{
          ".MuiPaper-root": { backgroundColor: "#323031" },
        }}
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
