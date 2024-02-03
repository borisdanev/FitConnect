import { useDispatch } from "react-redux";
import { removeFromSelectedExercises, setRemovedExerciseIndex } from "../store";
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
                id={`input${index * 3 + i + 1}`}
                name={`input${index * 3 + i + 1}`}
                sx={{ height: "1.5rem" }}
                value={formik.values[`input${index * 3 + i + 1}`]}
                onChange={formik.handleChange}
                placeholder={item}
              />
              <Box sx={{ color: "#59B386" }}>
                {formik.touched[`input${index * 3 + i + 1}`] &&
                  formik.errors[`input${index * 3 + i + 1}`]}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default ExerciseDetailsSelection;
