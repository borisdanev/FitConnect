import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { IoNotifications } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { IoMail } from "react-icons/io5";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Typography from "@mui/material/Typography";
const Header = () => {
  const [openedSignupForm, setOpenedSignupForm] = useState<boolean>(false);
  const [openedLoginForm, setOpenedLoginForm] = useState<boolean>(false);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenedSignupForm(false);
        setOpenedLoginForm(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
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
      {!currentUser ? (
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            sx={{ mr: 3 }}
            onClick={() => setOpenedSignupForm(true)}
          >
            Sign Up
          </Button>
          <Button variant="outlined" onClick={() => setOpenedLoginForm(true)}>
            Login
          </Button>
        </Box>
      ) : (
        <Typography>{currentUser.firstName}</Typography>
      )}
      {openedSignupForm && <SignupForm setOpenedForm={setOpenedSignupForm} />}
      {openedLoginForm && <LoginForm setOpenedForm={setOpenedLoginForm} />}
    </Box>
  );
};
export default Header;
