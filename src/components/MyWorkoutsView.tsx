import { useSelector } from "react-redux";
import { RootState, useGetUserWorkoutsQuery } from "../store";
import Box from "@mui/material/Box";
import { title } from "process";
const MyWorkoutsView: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data: userWorkouts } = useGetUserWorkoutsQuery(currentUser.id);
  console.log(userWorkouts);
  return (
    <>
      {userWorkouts &&
        [...userWorkouts.flatMap((item) => item.workout.notifications)]
          .sort((a, b) => b.dateAdded - a.dateAdded)
          .map((workout) => <Box>{JSON.stringify(item)}</Box>)}
    </>
  );
};
export default MyWorkoutsView;
