import * as Yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
interface FormValues {
  sets: string;
  reps: string;
  restTimer: string;
}
interface Props {
  name: string;
  gifUrl: string;
  handleOpenSelection: (values: FormValues) => void;
}
const ExerciseDetailsSelection: React.FC<Props> = ({
  name,
  gifUrl,
  handleOpenSelection,
}) => {
  const initialValues = {
    sets: "",
    reps: "",
    restTimer: "",
  };
  const validationSchema = Yup.object().shape({
    sets: Yup.string().required("Field is required"),
    reps: Yup.string().required("Field is required"),
    restTimer: Yup.string().required("Field is required"),
  });
  const handleSubmit = (values: FormValues) => {
    handleOpenSelection(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Box sx={{ display: "flex", height: "3rem", mt: 2 }}>
      <img
        src={gifUrl}
        style={{ maxWidth: "100%", height: "3rem" }}
        alt="Exercise Demonstration"
      />
      <Box sx={{ pl: 1 }}>
        <Typography>{name}</Typography>
        <form style={{ display: "flex" }} onSubmit={formik.handleSubmit}>
          {["sets", "reps", "restTime"].map((item) => (
            <Box key={item} sx={{ mr: 1 }}>
              <Input
                id={item}
                name={item}
                sx={{ height: "1.5rem" }}
                value={formik.values[item as keyof FormValues]}
                onChange={formik.handleChange}
                placeholder={item}
              />
              {formik.touched[item as keyof FormValues] &&
                formik.errors[item as keyof FormValues] && (
                  <Box>{formik.errors[item as keyof FormValues]}</Box>
                )}
            </Box>
          ))}
        </form>
      </Box>
    </Box>
  );
};
export default ExerciseDetailsSelection;
