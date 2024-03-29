import useRatingStars from "../hooks/useRatingStarts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
interface Props {
  rating: number;
  rates: number;
}
const starStyle = {
  marginRight: "0.3rem",
  color: "rgb(0, 230, 118)",
};
const RatingStars: React.FC<Props> = ({ rating, rates }) => {
  const starArr = useRatingStars(rating);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ mr: 1 }}>{rating}</Typography>
      {starArr.map((item, i) => {
        if (item === "full") return <FaStar key={i} style={starStyle} />;
        if (item === "empty") return <FaRegStar key={i} style={starStyle} />;
        return <FaStarHalfAlt key={i} style={starStyle} />;
      })}
      ({rates})
    </Box>
  );
};
export default RatingStars;
