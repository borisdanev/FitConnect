import { useDispatch } from "react-redux";
import { selectView } from "../store";
import { logOut } from "../store/slices/userSlice";
import { ViewEnum } from "../enums/View";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SideBarLink from "./SidebarLink";
import { FaHouse, FaDumbbell } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { FaClipboard, FaUser } from "react-icons/fa";
interface Props {
  setIsOpen: ((isOpen: boolean) => void) | undefined;
}
const SidebarLinkList: React.FC<Props> = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const links = [
    { text: ViewEnum.Home, icon: FaHouse },
    {
      text: ViewEnum.MyWorkouts,
      icon: FaDumbbell,
    },
    { text: ViewEnum.Profile, icon: FaUser },
    { text: ViewEnum.MyPrograms, icon: FaClipboard },
  ];
  return (
    <Box
      sx={{
        pt: 4,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "80%",
        overflow: "hidden",
      }}
    >
      <List>
        {links.map((link, i) => (
          <ListItem
            key={i}
            sx={{ p: 0 }}
            onClick={() => {
              dispatch(selectView(link.text));
              setIsOpen && setIsOpen(false);
            }}
          >
            <SideBarLink text={link.text} Icon={link.icon} />
          </ListItem>
        ))}
      </List>
      <Box
        onClick={() => {
          dispatch(logOut());
          setIsOpen && setIsOpen(false);
        }}
      >
        <SideBarLink text={"Log out"} Icon={IoLogOut} />
      </Box>
    </Box>
  );
};
export default SidebarLinkList;
