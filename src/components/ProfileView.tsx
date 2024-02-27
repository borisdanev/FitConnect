import { useSelector } from "react-redux";
import { RootState } from "../store";
import Grid from "@mui/material/Grid";
import { FaLink } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import UserIllustation from "../images/user_illustration.webp";
import EmptyState from "./EmptyState";
import ProfileDetails from "./ProfileDetails";
import EditProfile from "./EditProfile";
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
