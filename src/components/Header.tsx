import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setOpenedLoginForm,
  setOpenedSignupForm,
  useGetUserWorkoutsQuery,
} from "../store";
import useScreenSize from "../hooks/useScreenSize";
import { selectView } from "../store";
import { ViewEnum } from "../enums/View";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
import Newsletter from "./Newsletter";
import Navigation from "./Navigation";
import { slide as Menu } from "react-burger-menu";
const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data: joinedWorkouts } = useGetUserWorkoutsQuery(currentUser.id);
  const openedSignupForm = useSelector(
    (state: RootState) => state.form.openedSignupForm
  );
  const openedLoginForm = useSelector(
    (state: RootState) => state.form.openedLoginForm
  );
  const screenSize = useScreenSize();
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
    <Grid container>
      {screenSize < 900 && (
        <Grid item xs={1}>
          <Box
            sx={{
              position: "relative",
              width: "clamp(2rem, 6vw, 2.5rem)",
              height: "clamp(1.5rem, 4.5vw, 2rem)",
              mt: 0.5,
            }}
          >
            <Menu
              onOpen={() => setIsOpen(!isOpen)}
              onClose={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
            >
              <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
            </Menu>
          </Box>
        </Grid>
      )}
      <Grid
        item
        xs={screenSize > 430 ? (!currentUser.id ? 6 : 7) : 5}
        sm={6}
        lg={7}
      >
        <SearchBar />
      </Grid>
      <Grid item xs={2} sm={2}>
        <Box className="h3" sx={{ display: "flex", justifyContent: "end" }}>
          <Tooltip
            enterTouchDelay={0}
            title={<Notifications list={joinedWorkouts} tooltip />}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#37423d",
                  boxShadow: "1px 1px 5px white",
                  "& .MuiTooltip-arrow": {
                    color: "#37423d",
                  },
                },
              },
            }}
            arrow
          >
            <IconButton
              aria-label="notifications"
              style={{ marginRight: screenSize > 500 ? "0.5rem" : "0" }}
              sx={{ fontSize: "clamp(1.3rem,4vw,1.5rem)" }}
            >
              <IoNotifications />
            </IconButton>
          </Tooltip>
          <Tooltip
            enterTouchDelay={0}
            title={<Newsletter />}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#37423d",
                  boxShadow: "1px 1px 5px white",
                  "& .MuiTooltip-arrow": {
                    color: "#37423d",
                  },
                },
              },
            }}
            arrow
          >
            <IconButton
              aria-label="mail"
              sx={{ fontSize: "clamp(1.3rem,4vw,1.5rem)" }}
            >
              <IoMail />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
      <Grid
        item
        xs={screenSize > 430 ? (!currentUser.id ? 3 : 1) : 4}
        md={4}
        lg={3}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          {!currentUser.id ? (
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                sx={{
                  mr: screenSize > 900 ? 3 : 0,
                }}
                className="signup-button"
                onClick={() => dispatch(setOpenedSignupForm(true))}
              >
                Sign Up
              </Button>
              {screenSize > 900 && (
                <Button
                  variant="outlined"
                  onClick={() => dispatch(setOpenedLoginForm(true))}
                >
                  Login
                </Button>
              )}
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {screenSize > 600 && (
                <Typography>{currentUser.firstName}</Typography>
              )}
              <Box onClick={() => dispatch(selectView(ViewEnum.Profile))}>
                <ProfilePicture
                  userId={currentUser.id}
                  width="2rem"
                  height="2rem"
                />
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
      {openedSignupForm && <SignupForm />}
      {openedLoginForm && <LoginForm />}
    </Grid>
  );
};
export default Header;
