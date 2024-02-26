import { useState } from "react";
import { useUploadImageMutation } from "../store";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { FaCamera } from "react-icons/fa";
import ProfilePicture from "./ProfilePicture";
import { FaLink } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import UserIllustation from "../images/user_illustration.webp";
import EmptyState from "./EmptyState";
const ProfileView = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const [setUserProfilePicture] = useUploadImageMutation();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUserProfilePicture({ file: file, id: currentUser.id });
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <Grid container columnSpacing={3}>
        <Grid item xs={4}>
          <Box sx={{ bgcolor: "#37423d", pl: 2, py: 2 }}>
            <Box
              sx={{
                position: "relative",
                width: "7rem",
                height: "7rem",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                  bgcolor: "#00e676",
                  p: 1,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9,
                }}
              >
                <FaCamera className="h5" />
              </Box>
              <ProfilePicture
                selectedImage={selectedImage}
                userId={currentUser.id}
                width="7rem"
                height="7rem"
              />
              <input
                type="file"
                accept="image/*"
                style={{
                  opacity: 0,
                  position: "absolute",
                  zIndex: 99,
                }}
                className="position-fill"
                onChange={(e) => handleImageChange(e)}
              />
            </Box>
            <Typography>
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            {[
              { text: "Created Workout", data: currentUser.programs.length },
              { text: "Joined Workout", data: currentUser.workouts.length },
              {
                text: "Total Members",
                data: currentUser.workouts.reduce((acc, current) => {
                  return acc + current.workout.members;
                }, 0),
              },
            ].map((item) => (
              <Typography sx={{ mr: 1 }}>
                {item.data} {item.text}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ bgcolor: "#37423d", width: "100%", height: "5rem" }}></Box>
        </Grid>
      </Grid>
    </>
  );
};
export default ProfileView;
