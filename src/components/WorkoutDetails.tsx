import Typography from "@mui/material/Typography";
import RatingStars from "./RatingStars";
import { HiUsers } from "react-icons/hi";
interface Props {
  title: string;
  desc: string;
  rating: number;
  rates: number;
  members: number;
  creator: string;
}
const WorkoutDetails: React.FC<Props> = ({
  title,
  desc,
  rating,
  rates,
  members,
  creator,
}) => {
  return (
    <>
      <Typography className="h1">{title}</Typography>
      <Typography className="h4" sx={{ mb: 1 }}>
        {desc}
      </Typography>
      <RatingStars rating={rating} rates={rates} />
      <Typography sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <HiUsers style={{ marginRight: "0.9rem" }} /> {members} members
      </Typography>
      <Typography sx={{ mt: 1 }}>Created by {creator}</Typography>
    </>
  );
};
export default WorkoutDetails;
