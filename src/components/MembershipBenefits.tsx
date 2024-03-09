import useScreenSize from "../hooks/useScreenSize";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoIosInfinite } from "react-icons/io";
interface Props {
  timesPerWeek: number;
}
const MembershipBenefits: React.FC<Props> = ({ timesPerWeek }) => {
  const screenSize = useScreenSize();
  return (
    <Box sx={{ mt: 2 }} className="h5">
      {[
        { icon: <FaRegCalendarAlt />, text: `${timesPerWeek}x/week` },
        {
          icon: <IoChatboxEllipsesOutline />,
          text: "Access to workout discussion",
        },
        { icon: <IoIosInfinite />, text: "Full lifetime access" },
      ].map((item, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: screenSize < 1200 ? "center" : "start",
            mb: 1,
          }}
        >
          {item.icon}
          <Typography textAlign="start" sx={{ ml: 2 }}>
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default MembershipBenefits;
