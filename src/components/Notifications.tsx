import { useSelector } from "react-redux";
import { RootState, useGetJoinedWorkoutQuery } from "../store";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Notification from "./Notification";
import { FaBell } from "react-icons/fa";
import { WorkoutModel } from "../types/workout.model";
import { JoinedWorkout } from "../types/joinedWorkout.model";
interface Props {
  list: WorkoutModel[] | JoinedWorkout[] | undefined;
  tooltip?: boolean;
}
const isJoinedWorkoutType = (obj: any): obj is JoinedWorkout => {
  return obj.hasOwnProperty("workout");
};
const Notifications: React.FC<Props> = ({ list, tooltip }) => {
  return (
    <List
      sx={{
        height: tooltip
          ? list && list.length > 0
            ? "20rem"
            : "15rem"
          : "30rem",
        overflow: "auto",
        pt: 0,
        topBottomRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
      }}
      className="chat-scrollbar"
    >
      {list &&
      [...list].reduce((acc, current) => {
        return (
          acc +
          (isJoinedWorkoutType(current)
            ? current.workout.notifications.length
            : current.notifications.length)
        );
      }, 0) > 0 ? (
        [
          ...list.flatMap((workout) =>
            [
              ...(isJoinedWorkoutType(workout)
                ? workout.workout.notifications
                : workout.notifications),
            ].map((item) => ({
              ...item,
              title: isJoinedWorkoutType(workout)
                ? workout.workout.title
                : workout.title,
            }))
          ),
        ]
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((notification, i, arr) => (
            <ListItem
              key={i}
              sx={{
                p: 0,
                borderBottom: `${
                  i < arr.length - 1 ? "2px solid hsl(153, 9%, 30%)" : ""
                }`,
              }}
            >
              <Notification
                title={notification.title}
                userId={notification.userId}
                message={notification.message}
                dateAdded={notification.dateAdded}
              />
            </ListItem>
          ))
      ) : (
        <Box
          sx={{
            bgcolor: "#37423d",
            height: "100%",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaBell className="h2" />
          <Typography sx={{ mt: 1 }} className="h4" textAlign="center">
            Workout Notifications
          </Typography>
        </Box>
      )}
    </List>
  );
};
export default Notifications;
