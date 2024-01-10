import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import logo from "../images/FitConnect_logo.png";
import { IoMdHome } from "react-icons/io";
import SideBarLink from "./SidebarLink";
export const drawerWidth = 200;
const Sidebar: React.FC = () => {
  const links = [
    { text: "Home", icon: <IoMdHome style={{ marginRight: "0.5rem" }} /> },
  ];
  const DrawerContent = (
    <List>
      {links.map((link, i) => (
        <ListItem key={i} sx={{ p: 0 }}>
          <SideBarLink text={link.text} icon={link.icon} />
        </ListItem>
      ))}
    </List>
  );
  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
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
        {DrawerContent}
      </Drawer>
    </Box>
  );
};
export default Sidebar;
