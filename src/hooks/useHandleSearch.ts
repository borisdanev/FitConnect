import { useSelector } from "react-redux";
import { RootState } from "../store";
import { WorkoutType } from "../enums/WorkoutType";
import { WorkoutModel } from "../types/workout.model";
const useHandleSearch = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const searchKeyword = useSelector(
    (state: RootState) => state.searchSlice.keyword
  );
  const workoutTypeSearch = useSelector(
    (state: RootState) => state.searchSlice.type
  );
  console.log(currentUser);
  return (workout: WorkoutModel) =>
    searchKeyword
      ? workout.title.toLowerCase().includes(searchKeyword.toLowerCase())
      : workoutTypeSearch === WorkoutType.All
      ? workout.creatorId !== currentUser.id &&
        !currentUser.workouts.some((item) => item.workout.id === workout.id)
      : workout.type === workoutTypeSearch;
};
export default useHandleSearch;
