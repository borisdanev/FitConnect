import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
interface FormValues {
  sets: string;
  reps: string;
  restTimer: string;
}
interface Props {
  name: string;
  gifUrl: string;
  values: FormValues;
  handleChange: (event: React.ChangeEvent) => void;
}
const ExerciseDetailsSelection: React.FC<Props> = ({
  name,
  gifUrl,
  values,
  handleChange,
}) => {
  return (
    <Box sx={{ display: "flex", height: "3rem", mt: 2 }}>
      <img
        src={gifUrl}
        style={{ maxWidth: "100%", height: "3rem" }}
        alt="Exercise Demonstration"
      />
      <Box sx={{ pl: 1 }}>
        <Typography>{name}</Typography>
        <Box sx={{ display: "flex" }}>
          {["sets", "reps", "restTime"].map((item) => (
            <Box key={item} sx={{ mr: 1 }}>
              <Input
                id={item}
                name={item}
                sx={{ height: "1.5rem" }}
                value={values[item as keyof FormValues]}
                onChange={handleChange}
                placeholder={item}
              />
              {/* {formik.touched[item as keyof FormValues] &&
                formik.errors[item as keyof FormValues] && (
                  <Box>{formik.errors[item as keyof FormValues]}</Box>
                )} */}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default ExerciseDetailsSelection;
