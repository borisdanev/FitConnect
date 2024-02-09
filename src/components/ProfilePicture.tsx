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
  width: string;
  height: string;
}
const ProfilePicture: React.FC<Props> = ({
  selectedImage,
  userId,
  width,
  height,
}) => {
  const { data, isLoading } = useGetStoragePictureQuery(userId);
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...photoStyle,
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
            maxWidth: "100%",
            borderRadius: "50%",
            objectFit: "cover",
            ...photoStyle,
          }}
        />
      )}
    </Box>
  );
};
export default ProfilePicture;
