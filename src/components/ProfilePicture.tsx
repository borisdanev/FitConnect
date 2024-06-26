import { useGetStoragePictureQuery } from "../store";
import Box from "@mui/material/Box";
import { FaUser } from "react-icons/fa";
const photoStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
interface Props {
  selectedImage?: string;
  userId: string;
  hasProfilePicture: boolean;
  width: string;
  height: string;
}
const ProfilePicture: React.FC<Props> = ({
  selectedImage,
  userId,
  hasProfilePicture,
  width,
  height,
}) => {
  const { data, isLoading } = useGetStoragePictureQuery(
    hasProfilePicture ? userId : ""
  );
  return (
    <Box
      sx={{
        ml: 1,
        borderRadius: "50%",
        width,
        height,
        bgcolor: "white",
        position: "relative",
      }}
    >
      {(isLoading || !data) && !selectedImage ? (
        <Box
          sx={{
            ...photoStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaUser
            style={{
              color: "black",
              fontSize: `${parseFloat(width.split("rem")[0]) / 2}rem`,
            }}
          />
        </Box>
      ) : (
        <img
          src={selectedImage ? selectedImage : data}
          style={{
            ...photoStyle,
            maxWidth: "100%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}
    </Box>
  );
};
export default ProfilePicture;
