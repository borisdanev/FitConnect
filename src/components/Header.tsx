import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setOpenedLoginForm, setOpenedSignupForm } from "../store";
import { selectView } from "../store";
import { ViewEnum } from "../enums/View";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { IoNotifications, IoMail } from "react-icons/io5";
import SearchBar from "./SearchBar";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Typography from "@mui/material/Typography";
import ProfilePicture from "./ProfilePicture";
import Tooltip from "@mui/material/Tooltip";
import Notifications from "./Notifications";
const Header = () => {
  const dispatch = useDispatch();

  const openedSignupForm = useSelector(
    (state: RootState) => state.form.openedSignupForm
  );
  const openedLoginForm = useSelector(
    (state: RootState) => state.form.openedLoginForm
  );
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(setOpenedSignupForm(false));
        dispatch(setOpenedLoginForm(false));
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
        <Tooltip title={<Notifications />} arrow>
          <IconButton
            aria-label="notifications"
            style={{ marginRight: "0.5rem" }}
          >
            <IoNotifications />
          </IconButton>
        </Tooltip>
        <IconButton aria-label="mail">
          <IoMail />
        </IconButton>
      </Box>
      {!currentUser.id ? (
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            sx={{ mr: 3 }}
            onClick={() => dispatch(setOpenedSignupForm(true))}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            onClick={() => dispatch(setOpenedLoginForm(true))}
          >
            Login
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{currentUser.firstName}</Typography>
          <Box onClick={() => dispatch(selectView(ViewEnum.Profile))}>
            <ProfilePicture
              userId={currentUser.id}
              width="2rem"
              height="2rem"
            />
          </Box>
        </Box>
      )}
      {openedSignupForm && <SignupForm />}
      {openedLoginForm && <LoginForm />}
    </Box>
  );
};
export default Header;
