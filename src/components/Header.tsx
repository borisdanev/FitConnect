import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setOpenedLoginForm, setOpenedSignupForm } from "../store";
import useScreenSize from "../hooks/useScreenSize";
import { selectView } from "../store";
import { ViewEnum } from "../enums/View";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";
import HeaderTooltips from "./HeaderTooltips";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Typography from "@mui/material/Typography";
import ProfilePicture from "./ProfilePicture";
import Navigation from "./Navigation";
import { slide as Menu } from "react-burger-menu";
const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
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
        <HeaderTooltips screenSize={screenSize} userId={currentUser.id} />
      </Grid>
      <Grid
        item
        xs={screenSize > 430 ? (!currentUser.id ? 3 : 1) : 4}
        md={4}
        lg={3}
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
