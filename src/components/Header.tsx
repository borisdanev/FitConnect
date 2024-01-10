import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IoNotifications } from "react-icons/io5";
import SearchBar from "./SearchBar";
const Header = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", px: 4, pt: 2 }}
    >
      <SearchBar />
      <IoNotifications />
      <Box sx={{ display: "flex" }}>
        <Button variant="contained" sx={{ mr: 3, color: "white" }}>
          Sign Up
        </Button>
        <Button variant="outlined">Login</Button>
      </Box>
    </Box>
  );
};
export default Header;
