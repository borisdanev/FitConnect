import { useSelector } from "react-redux";
import { RootState, useGetUserWorkoutsQuery } from "../store";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Notification from "./Notification";
const Notifications: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data: userWorkouts } = useGetUserWorkoutsQuery(currentUser.id);
  return (
    <List>
      {userWorkouts &&
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
          ))}
    </List>
  );
};
export default Notifications;
