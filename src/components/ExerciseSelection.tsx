import { useGetExercisesQuery } from "../store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { ExerciseModel } from "../types/exercise.model";
interface Props {
  selectedExercises: ExerciseModel[];
  setSelectedExercises: (exercises: ExerciseModel[]) => void;
  setVisibleExerciseSelection: (isVisible: boolean) => void;
  setProvidedDetails: (isProvided: boolean) => void;
}
const ExerciseSelection: React.FC<Props> = ({
  setSelectedExercises,
  selectedExercises,
  setVisibleExerciseSelection,
  setProvidedDetails,
}) => {
  const { data: exercises, isLoading } = useGetExercisesQuery();
  const handleSelectExercise = (exercise: ExerciseModel) => {
    setSelectedExercises([...selectedExercises, exercise]);
    setVisibleExerciseSelection(false);
    setProvidedDetails(false);
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "3rem",
        width: "25rem",
        left: "0rem",
        height: "20rem !important",
        p: 2,
        bgcolor: "inherit",
        boxShadow: "-5px -5px 10px rgba(255, 255, 255, 0.2)",
        borderRadius: "inherit",
        overflow: "auto",
      }}
    >
      <Grid container columnSpacing={2} rowSpacing={2}>
        {isLoading
          ? Array(12)
              .fill(null)
              .map(() => (
                <Grid item xs={3}>
                  <Skeleton
                    variant="rectangular"
                    width="5rem"
                    height="5rem"
                  ></Skeleton>
                </Grid>
              ))
          : exercises?.map((item) => (
              <Grid key={item.name} item xs={3}>
                <Box onClick={() => handleSelectExercise(item)}>
                  <img
                    src={item.gifUrl}
                    style={{ maxWidth: "100%", height: "auto" }}
                    alt="Exercise demonstration"
                  />
                </Box>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};
export default ExerciseSelection;
