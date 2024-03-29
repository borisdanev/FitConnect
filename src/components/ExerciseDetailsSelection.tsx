import { useDispatch, useSelector } from "react-redux";
import {
  removeFromSelectedExercises,
  setRemovedExerciseIndex,
  RootState,
} from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { FormikProps } from "formik";
import { MdDelete } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
interface FormValues {
  [key: string]: string;
}
interface Props {
  name: string;
  gifUrl: string;
  formik: FormikProps<FormValues>;
  index: number;
}
const ExerciseDetailsSelection: React.FC<Props> = ({
  name,
  gifUrl,
  formik,
  index,
}) => {
  const dispatch = useDispatch();
  const currentSessionIndex = useSelector(
    (state: RootState) => state.program.currentSessionIndex
  );
  const handleRemoveExercise = () => {
    dispatch(removeFromSelectedExercises(index));
    dispatch(setRemovedExerciseIndex(index * 3));
  };
  return (
    <Box sx={{ display: "flex", mt: 2, ml: 1.5 }}>
      <img
        src={gifUrl}
        style={{ maxWidth: "100%", height: "3rem" }}
        alt="Exercise Demonstration"
      />
      <Box sx={{ pl: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{name}</Typography>
          <IconButton onClick={() => handleRemoveExercise()}>
            <MdDelete />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex" }}>
          {["sets", "reps", "rest"].map((item, i) => (
            <Box key={item} sx={{ mr: 1 }}>
              <Input
                id={`input${currentSessionIndex}${index * 3 + i + 1}`}
                sx={{ height: "1.5rem" }}
                type="number"
                value={
                  Object.keys(formik.values).includes(
                    `input${currentSessionIndex}${index * 3 + i + 1}`
                  )
                    ? formik.values[
                        `input${currentSessionIndex}${index * 3 + i + 1}`
                      ]
                    : ""
                }
                onChange={formik.handleChange}
                placeholder={i < 2 ? item : `${item} (min)`}
              />
              <Box sx={{ color: "#59B386" }}>
                {
                  formik.errors[
                    `input${currentSessionIndex}${index * 3 + i + 1}`
                  ]
                }
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default ExerciseDetailsSelection;
