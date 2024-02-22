import { useState } from "react";
import { useUploadImageMutation } from "../store";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { FaCamera } from "react-icons/fa";
import ProfilePicture from "./ProfilePicture";
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
      <Box
        sx={{
          display: "flex",
          mt: 3,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
        <Typography className="h2">
          {currentUser.firstName} {currentUser.lastName}
        </Typography>
        <Typography>{currentUser.email}</Typography>
        <Grid container sx={{ width: "50%", mt: 3 }}>
          {[
            {
              label: "Created Workout Programs",
              data: currentUser.programs.length,
            },
            { label: "Joined Workouts", data: currentUser.workouts.length },
            {
              label: "Workout Program Members",
              data: currentUser.programs.reduce((acc, current) => {
                return acc + current.members;
              }, 0),
            },
          ].map((item, i) => (
            <Grid xs={4}>
              <Box
                key={i}
                sx={{
                  mr: 2,
                  bgcolor: "#37423d",
                  borderBottom: "5px solid #00e676",
                  height: "10rem",
                  textAlign: "center",
                  borderRadius: "0.5rem",
                }}
              >
                <Typography className="h3" sx={{ pt: 2 }} color="#00e676">
                  {item.data}
                </Typography>
                <Typography className="h4">{item.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default ProfileView;
