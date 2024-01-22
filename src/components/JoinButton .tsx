import { useDispatch } from "react-redux";
import {
  useJoinWorkoutMutation,
  setOpenedSignupForm,
  setCurrentUser,
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
  const [joinWorkout] = useJoinWorkoutMutation();
  const handleJoin = () => {
    if (!user) {
      dispatch(setOpenedSignupForm(true));
      return;
    }
    joinWorkout({ workout, id: user.id });
    refetch();
    dispatch(setCurrentUser(user));
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
