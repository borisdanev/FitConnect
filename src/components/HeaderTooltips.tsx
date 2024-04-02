import { useGetUserWorkoutsQuery } from "../store";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Notifications from "./Notifications";
import Newsletter from "./Newsletter";
import { IoNotifications, IoMail } from "react-icons/io5";
interface Props {
  screenSize: number;
  userId: string;
}
const HeaderTooltips: React.FC<Props> = ({ screenSize, userId }) => {
  const { data: joinedWorkouts, error } = useGetUserWorkoutsQuery(userId);
  return (
    <Box className="h3" sx={{ display: "flex", justifyContent: "end" }}>
      <Tooltip
        enterTouchDelay={0}
        title={<Notifications list={joinedWorkouts} tooltip />}
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "#37423d",
              boxShadow: "1px 1px 5px white",
              "& .MuiTooltip-arrow": {
                color: "#37423d",
              },
            },
          },
        }}
        arrow
      >
        <IconButton
          aria-label="notifications"
          style={{ marginRight: screenSize > 500 ? "0.5rem" : "0" }}
          sx={{ fontSize: "clamp(1.3rem,4vw,1.5rem)" }}
        >
          <IoNotifications />
        </IconButton>
      </Tooltip>
      <Tooltip
        enterTouchDelay={0}
        title={<Newsletter />}
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "#37423d",
              boxShadow: "1px 1px 5px white",
              "& .MuiTooltip-arrow": {
                color: "#37423d",
              },
            },
          },
        }}
        arrow
      >
        <IconButton
          aria-label="mail"
          sx={{ fontSize: "clamp(1.3rem,4vw,1.5rem)" }}
        >
          <IoMail />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default HeaderTooltips;
