import { useState } from "react";
import { useUploadImageMutation } from "../store";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ProfilePicture
          selectedImage={selectedImage}
          userId={currentUser.id}
          width="7rem"
          height="7rem"
        />
        <Typography
          className="h4"
          sx={{ borderBottom: "2px solid #00e676", position: "relative" }}
        >
          Choose new photo
          <input
            type="file"
            accept="image/*"
            style={{
              opacity: 0,
              position: "absolute",
            }}
            className="position-fill"
            onChange={(e) => handleImageChange(e)}
          />
        </Typography>
      </Box>
    </>
  );
};
export default ProfileView;
