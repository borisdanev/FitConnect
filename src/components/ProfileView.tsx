import { useSelector } from "react-redux";
import { RootState } from "../store";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FaLink } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import UserIllustation from "../images/user_illustration.webp";
import EmptyState from "./EmptyState";
import ProfileDetails from "./ProfileDetails";
import EditProfile from "./EditProfile";
import grey from "@mui/material/colors/grey";
const ProfileView = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  return (
    <>
      {currentUser.id ? (
        <Grid container columnSpacing={3}>
          <Grid item xs={4}>
            <ProfileDetails currentUser={currentUser} />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: grey[300],
                  color: grey[700],
                  mr: 2,
                  "&:hover": {
                    backgroundColor: grey[400],
                  },
                }}
              >
                Discard Changes
              </Button>
              <Button
                sx={{
                  bgcolor: "hsl(151, 100%,20%)",
                  "&:hover": {
                    backgroundColor: "hsl(151, 100%,20%)",
                  },
                }}
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <EditProfile currentUser={currentUser} />
          </Grid>
        </Grid>
      ) : (
        <EmptyState
          text="You Are Logged Out"
          illustrationSrc={UserIllustation}
        />
      )}
    </>
  );
};
export default ProfileView;
