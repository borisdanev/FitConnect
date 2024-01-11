import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SideBarLink from "./SidebarLink";
import { IoMdHome } from "react-icons/io";
import { IoBarbellSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { FaClipboard } from "react-icons/fa";
const SidebarLinkList = () => {
  const [active, setActive] = useState<string>("Home");
  const links = [
    { text: "Home", icon: IoMdHome },
    {
      text: "My Workouts",
      icon: IoBarbellSharp,
    },
    { text: "Settings", icon: IoMdSettings },
    { text: "My Programs", icon: FaClipboard },
  ];
  return (
    <Box
      sx={{
        pt: 4,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "80%",
      }}
    >
      <List>
        {links.map((link, i) => (
          <ListItem key={i} sx={{ p: 0 }} onClick={() => setActive(link.text)}>
            <SideBarLink text={link.text} Icon={link.icon} active={active} />
          </ListItem>
        ))}
      </List>
      <SideBarLink text={"Log out"} Icon={IoLogOut} active={active} />
    </Box>
  );
};
export default SidebarLinkList;
