import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { WorkoutModel } from "../types/workout.model";
import { useFormik } from "formik";
import useDynamicSchema from "../hooks/useDynamicSchema";
import FormContainer from "./FormContainer";
import SelectionCalendar from "./SelectionCalendar";
import useDynamicInitialValues from "../hooks/useDynamicInitialValues";
import useAdjustInputValues from "../hooks/useAdjustInputValues";
import TrainingSessionDetails from "./TrainingSessionDetails";
import Box from "@mui/material/Box";
interface Props {
  createdProgram: WorkoutModel;
}
const TrainingSessionForm: React.FC<Props> = ({ createdProgram }) => {
  const selectedDays = useSelector(
    (state: RootState) => state.program.selectedDays
  );
  const currentSessionIndex = useSelector(
    (state: RootState) => state.program.currentSessionIndex
  );
  const trainingSessions = useSelector(
    (state: RootState) => state.program.trainingSessions
  );
  const validationSchema = useDynamicSchema(
    trainingSessions.map((item) => item.exercises.length * 3)
  );
  const initialValues = useDynamicInitialValues(
    trainingSessions.map((item) => item.exercises.length * 3)
  );
  const handleSubmit = (values: any) => {};
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  useAdjustInputValues(initialValues, formik);
  return (
    <FormContainer text="Sessions" handleSubmit={formik.handleSubmit}>
      <SelectionCalendar />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        {selectedDays
          .filter((item) => item === currentSessionIndex)
          .map((_, i) => (
            <TrainingSessionDetails
              key={i}
              formik={formik}
              selectedExercises={
                trainingSessions[currentSessionIndex].exercises
              }
            />
          ))}
      </Box>
    </FormContainer>
    //
  );
};
export default TrainingSessionForm;
