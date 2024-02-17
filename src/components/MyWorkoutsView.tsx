import { useSelector } from "react-redux";
import { RootState, useGetUserWorkoutsQuery } from "../store";
import Box from "@mui/material/Box";
import { title } from "process";
const MyWorkoutsView: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data: userWorkouts } = useGetUserWorkoutsQuery(currentUser.id);
  return (
    <>
      {userWorkouts &&
        [...userWorkouts.flatMap((item) => item.workout.notifications)].map(
          (item) => <Box>Something</Box>
        )}
    </>
  );
};
export default MyWorkoutsView;
