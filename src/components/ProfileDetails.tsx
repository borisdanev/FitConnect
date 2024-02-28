import { useState } from "react";
import { useSelector } from "react-redux";
import {
  RootState,
  useUploadImageMutation,
  useGetUserWorkoutsQuery,
} from "../store";
import useGetWorkoutPrograms from "../hooks/useGetWorkoutPrograms";
import { User } from "../types/user.model";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FaCamera } from "react-icons/fa";
import ProfilePicture from "./ProfilePicture";
interface Props {
  currentUser: User;
}
const ProfileDetails: React.FC<Props> = ({ currentUser }) => {
  const [setUserProfilePicture] = useUploadImageMutation();
  const [selectedImage, setSelectedImage] = useState<string>("");
  // const { data: workouts } = useGetUserWorkoutsQuery(currentUser.id);
  const programs = useGetWorkoutPrograms(
    currentUser.id,
    currentUser.workouts?.map((workout) => workout.workout)
  );
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
    <Box
      sx={{
        bgcolor: "#37423d",
        pl: 2,
        py: 2,
        display: "flex",
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
      <Typography className="h3">
        {currentUser.firstName} {currentUser.lastName}
      </Typography>
      <Grid container>
        {[
          { text: "Created Workout", data: programs?.length },
          { text: "Joined Workout", data: currentUser.workouts.length },
          {
            text: "Total Members",
            data: currentUser.workouts.reduce((acc, current) => {
              return acc + current.workout.members;
            }, 0),
          },
        ].map((item, i, arr) => (
          <Grid xs={i < arr.length - 1 ? 5 : 8}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>{item.data}</Typography>
              <Typography sx={{ opacity: "0.8", ml: 1 }}>
                {item.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default ProfileDetails;
