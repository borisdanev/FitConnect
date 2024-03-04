import useScreenSize from "../hooks/useScreenSize";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Logo from "../images/FitConnect_logo.webp";
import SidebarLinkList from "./SidebarLinkList";
import { IoMdClose } from "react-icons/io";
export const drawerWidth = 200;
interface Props {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}
const Navigation: React.FC<Props> = ({ setIsOpen }) => {
  const screenSize = useScreenSize();
  return (
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
      {screenSize < 900 && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton onClick={() => setIsOpen && setIsOpen(false)}>
            <IoMdClose className="heading-color" />
          </IconButton>
        </Box>
      )}
      <img
        src={Logo}
        alt="logo"
        draggable="false"
        style={{ maxWidth: "100%" }}
      />
      <SidebarLinkList setIsOpen={setIsOpen && setIsOpen} />
    </Drawer>
  );
};
export default Navigation;
