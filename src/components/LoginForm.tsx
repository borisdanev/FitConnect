import AuthOverlay from "./AuthOverlay";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
interface Props {
  setOpenedForm: Function;
}
interface FormValues {
  email: string;
  password: string;
}
const LoginForm: React.FC<Props> = ({ setOpenedForm }) => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    // .test(
    //   "email",
    //   "Email is alredy in use",
    //   (value) => !emailsList?.includes(value)
    // ),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = () => {};
  return (
    <AuthOverlay setOpenedForm={setOpenedForm}>
      <form className="auth-form" onClick={handleSubmit}>
        <Box
          sx={{
            my: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {["Email", "Password"].map((item, i) => (
            <TextField
              key={i}
              variant="outlined"
              label={item}
              sx={{ my: i === 1 ? 2 : 0 }}
              className="form-input"
            />
          ))}
        </Box>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </AuthOverlay>
  );
};
export default LoginForm;
