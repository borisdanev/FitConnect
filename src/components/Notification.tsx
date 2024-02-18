import { useGetStoragePictureQuery } from "../store";
import { FaUser } from "react-icons/fa6";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Timestamp } from "firebase/firestore";
import useNotificationTime from "../hooks/useNotificationTime";
interface Props {
  title: string;
  message: string;
  dateAdded: Timestamp;
  userId: string;
  roundedTop: boolean;
  roundedBottom: boolean;
}
const Notification: React.FC<Props> = ({
  title,
  message,
  dateAdded,
  userId,
  roundedTop,
  roundedBottom,
}) => {
  const { data: imgSrc } = useGetStoragePictureQuery(userId);
  const notificationTime = useNotificationTime(dateAdded.seconds * 1000);
  return (
    <Grid
      container
      sx={{
        bgcolor: "#37423d",
        borderTopRightRadius: `${roundedTop ? "0.5rem" : 0}`,
        borderTopLeftRadius: `${roundedTop ? "0.5rem" : 0}`,
        borderBottomLeftRadius: `${roundedBottom ? "0.5rem" : 0}`,
        borderBottomRightRadius: `${roundedBottom ? "0.5rem" : 0}`,
        p: 2,
      }}
    >
      <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }}
            alt="user image"
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              bgcolor: "white",
            }}
          >
            <FaUser color="black" />
          </Box>
        )}
      </Grid>
      <Grid item xs={7}>
        <Typography className="h5" sx={{ opacity: "0.7" }}>
          {title}
        </Typography>
        <Typography className="h6">{message}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ opacity: "0.8" }} className="h6">
          {notificationTime}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Notification;
