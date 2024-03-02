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
}
const Notification: React.FC<Props> = ({
  title,
  message,
  dateAdded,
  userId,
}) => {
  const { data: imgSrc } = useGetStoragePictureQuery(userId);
  const notificationTime = useNotificationTime(dateAdded.seconds * 1000);
  return (
    <Grid
      container
      columnSpacing={1}
      sx={{
        bgcolor: "#37423d",
        py: 2,
        px: 2,
      }}
    >
      <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
            alt="user image"
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "2.1rem",
              height: "2.1rem",
              borderRadius: "50%",
              bgcolor: "white",
            }}
          >
            <FaUser color="black" />
          </Box>
        )}
      </Grid>
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className="h5" sx={{ opacity: "0.7" }}>
              {title}
            </Typography>
            <Typography className="h6">{message}</Typography>
          </Grid>
          <Grid>
            <Typography sx={{ opacity: "0.8" }} className="h6">
              {notificationTime}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Notification;
