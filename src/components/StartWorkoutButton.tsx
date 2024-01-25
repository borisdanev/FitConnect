import { useDispatch, useSelector } from "react-redux";
import { setIsActiveWorkout, RootState, setVisibleOverlay } from "../store";
import Button from "@mui/material/Button";
const StartWorkoutButton = () => {
  const dispatch = useDispatch();
  const isActiveWorkout = useSelector(
    (state: RootState) => state.activeWorkout.isActive
  );
  const handleClick = (isActive: boolean) => {
    setVisibleOverlay(true);
    if (isActive) return;
    dispatch(setIsActiveWorkout(true));
  };
  return (
    <Button
      variant="outlined"
      sx={{ width: "100%", mt: 2 }}
      onClick={() => handleClick(isActiveWorkout)}
    >
      {isActiveWorkout ? "Open Workout" : "Start Workout"}
    </Button>
  );
};
export default StartWorkoutButton;
