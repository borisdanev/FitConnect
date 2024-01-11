import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import logo from "../images/FitConnect_logo.webp";
import SidebarLinkList from "./SidebarLinkList";
export const drawerWidth = 200;
const Sidebar: React.FC = () => {
  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        variant="permanent"
      >
        <img src={logo} alt="logo" draggable="false" />
        <SidebarLinkList />
      </Drawer>
    </Box>
  );
};
export default Sidebar;
