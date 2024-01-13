import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { IoNotifications } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { IoMail } from "react-icons/io5";
import SignupForm from "./SignupForm";
const Header = () => {
  const [openedForm, setOpenedForm] = useState<boolean>(false);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SearchBar />
      <Box className="h3">
        <IconButton
          aria-label="notifications"
          style={{ marginRight: "0.5rem" }}
        >
          <IoNotifications />
        </IconButton>
        <IconButton aria-label="mail">
          <IoMail />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="contained"
          sx={{ mr: 3, color: "white" }}
          onClick={() => setOpenedForm(true)}
        >
          Sign Up
        </Button>
        <Button variant="outlined">Login</Button>
      </Box>
      {openedForm && <SignupForm />}
    </Box>
  );
};
export default Header;
