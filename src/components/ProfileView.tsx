import { useState } from "react";

import {
  useGetProfilePictureQuery,
  useSetUserProfilePictureMutation,
} from "../store";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaUser } from "react-icons/fa";
const photoStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
const ProfileView = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value!
  );
  const [setUserProfilePicture] = useSetUserProfilePictureMutation();
  const { data, error } = useGetProfilePictureQuery(currentUser.id);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUserProfilePicture({ file: file, id: currentUser.id });
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
        <Box
          sx={{
            ml: 1,
            borderRadius: "50%",
            width: "7rem",
            height: "7rem",
            bgcolor: "white",
            position: "relative",
          }}
        >
          {!error ? (
            <img
              src={selectedImage ? selectedImage : data}
              style={{
                maxWidth: "100%",
                borderRadius: "50%",
                ...photoStyle,
              }}
            />
          ) : (
            <FaUser style={{ ...photoStyle }} />
          )}
        </Box>
        <Typography
          className="h4"
          sx={{ borderBottom: "2px solid #00e676", position: "relative" }}
        >
          {error}
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
