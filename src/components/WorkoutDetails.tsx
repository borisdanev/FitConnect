import useScreenSize from "../hooks/useScreenSize";
import Typography from "@mui/material/Typography";
import RatingStars from "./RatingStars";
import { HiUsers } from "react-icons/hi";
import { WorkoutType } from "../enums/WorkoutType";
interface Props {
  title: string;
  desc: string;
  type: WorkoutType;
  rating: number;
  rates: number;
  members: number;
  creator: string;
}
const WorkoutDetails: React.FC<Props> = ({
  title,
  desc,
  type,
  rating,
  rates,
  members,
  creator,
}) => {
  const screenSize = useScreenSize();
  return (
    <>
      <Typography className="h1">{title}</Typography>
      <Typography className="h4" sx={{ mb: 1, opacity: "0.8" }}>
        {desc}
      </Typography>
      <Typography
        sx={{
          display: "flex",
          mb: 1,
          justifyContent: screenSize < 1200 ? "center" : "start",
        }}
        className="h5"
      >
        <Typography sx={{ opacity: "0.8", mr: 1 }}>Type:</Typography>
        <Typography sx={{ borderBottom: "1px solid #00e676" }}>
          {type}
        </Typography>
      </Typography>
      <RatingStars rating={rating} rates={rates} />
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 1,
          justifyContent: screenSize < 1200 ? "center" : "start",
        }}
        className="h5"
      >
        <HiUsers style={{ marginRight: "0.9rem" }} /> {members}{" "}
        {members > 1 ? "members" : "member"}
      </Typography>
      <Typography
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: screenSize < 1200 ? "center" : "start",
        }}
        className="h5"
      >
        <Typography sx={{ opacity: "0.8", mr: 1 }}>Created by</Typography>{" "}
        {creator}
      </Typography>
    </>
  );
};
export default WorkoutDetails;
