import { useSelector } from "react-redux";
import { RootState, useGetUserWorkoutsQuery } from "../store";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Notification from "./Notification";
import { FaBell } from "react-icons/fa";
const Notifications: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data: userWorkouts } = useGetUserWorkoutsQuery(currentUser.id);
  return (
    <List sx={{ height: "10rem" }}>
      {userWorkouts && userWorkouts.length > 0 ? (
        [
          ...userWorkouts.flatMap((workout) =>
            workout.workout.notifications.map((item) => ({
              ...item,
              title: workout.workout.title,
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
                roundedTop={i === 0}
                roundedBottom={i === arr.length - 1}
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
          <Typography className="h4" textAlign="center">
            Join workout and get notifications here
          </Typography>
        </Box>
      )}
    </List>
  );
};
export default Notifications;
