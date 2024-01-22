import { useState } from "react";
import { useSetUserProfilePictureMutation } from "../store";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProfilePicture from "./ProfilePicture";
const ProfileView = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const [setUserProfilePicture] = useSetUserProfilePictureMutation();
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
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
        </Typography>
      </Box>
    </>
  );
};
export default ProfileView;
