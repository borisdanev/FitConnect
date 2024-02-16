import { useDispatch, useSelector } from "react-redux";
import {
  useJoinWorkoutMutation,
  useAddNotificationMutation,
  setOpenedSignupForm,
  setCurrentUser,
  RootState,
} from "../store";
import { WorkoutModel } from "../types/workout.model";
import { User } from "../types/user.model";
import Button from "@mui/material/Button";
interface Props {
  refetch: Function;
  workout: WorkoutModel;
  user: User | undefined;
}
const JoinButton: React.FC<Props> = ({ refetch, workout, user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const currentWorkout = useSelector(
    (state: RootState) => state.currentWorkout.value
  );
  const [joinWorkout] = useJoinWorkoutMutation();
  const [addNotification] = useAddNotificationMutation();
  const handleJoin = () => {
    if (!user) {
      dispatch(setOpenedSignupForm(true));
      return;
    }
    joinWorkout({ workout, id: user.id });
    addNotification({
      notification: `${currentUser.firstName} ${currentUser.lastName} joined ${currentWorkout.title}`,
      workoutId: currentWorkout.id,
    });
    dispatch(setCurrentUser(user));
    refetch();
  };
  return (
    <Button
      variant="contained"
      sx={{ width: "100%", mt: 2 }}
      onClick={handleJoin}
    >
      Join Now
    </Button>
  );
};
export default JoinButton;
