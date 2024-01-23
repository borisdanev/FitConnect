import { ExerciseModel } from "../types/exercise.model";
import Box from "@mui/material/Box";
import Exercise from "./Exercise";
interface Props {
  exercises: ExerciseModel[];
}
const TrainingSession: React.FC<Props> = ({ exercises }) => {
  return (
    <Box>
      {exercises.map((item, i) => (
        <Exercise
          key={item.id}
          name={item.name}
          gifUrl={item.gifUrl}
          id={item.id}
          index={i}
        />
      ))}
    </Box>
  );
};
export default TrainingSession;
