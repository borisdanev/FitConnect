import { useDispatch } from "react-redux";
import { removeFromSelectedExercises } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { FormikProps } from "formik";
import { MdDelete } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
interface FormValues {
  sets: string;
  reps: string;
  restTimer: string;
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
          <IconButton
            onClick={() => dispatch(removeFromSelectedExercises(index))}
          >
            <MdDelete />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex" }}>
          {["sets", "reps", "rest"].map((item, i) => (
            <Box key={item} sx={{ mr: 1 }}>
              <Input
                id={`input${index * 3 + i + 1}`}
                name={item}
                sx={{ height: "1.5rem" }}
                value={formik.values[item as keyof FormValues]}
                onChange={formik.handleChange}
                placeholder={item}
              />
              {formik.touched[item as keyof FormValues] &&
                formik.errors[item as keyof FormValues] && (
                  <Box sx={{ color: "#59B386" }}>
                    {formik.errors[item as keyof FormValues]}
                  </Box>
                )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default ExerciseDetailsSelection;
