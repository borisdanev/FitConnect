import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AuthOverlay from "./AuthOverlay";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useCreateUserMutation, useGetEmailsQuery } from "../store";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store";
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface Props {
  setOpenedForm: Function;
}
const SignupForm: React.FC<Props> = ({ setOpenedForm }) => {
  const { data: emailsList } = useGetEmailsQuery();
  const [createUser] = useCreateUserMutation();
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .matches(/@[^.]*\./, "Invalid email")
      .required("Email is required")
      .test(
        "email",
        "Email is alredy in use",
        (value) => !emailsList?.includes(value)
      ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values: FormValues) => {
    const { firstName, lastName, email, password } = values;
    const user = {
      firstName,
      lastName,
      email,
      password,
      id: uuidv4(),
    };
    createUser(user);
    dispatch(setCurrentUser(user));
    setOpenedForm(false);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <AuthOverlay setOpenedForm={setOpenedForm}>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            my: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {[
            { text: "First Name", value: "firstName" },
            { text: "Last Name", value: "lastName" },
            { text: "Email", value: "email" },
            { text: "Password", value: "password" },
          ].map((item, i) => (
            <TextField
              key={i}
              id={item.value}
              name={item.value}
              variant="outlined"
              label={item.text}
              sx={{ mt: i === 1 || 2 ? 2 : 0 }}
              className="form-input"
              helperText={
                formik.touched[item.value as keyof FormValues] &&
                formik.errors[item.value as keyof FormValues]
              }
              value={formik.values[item.value as keyof FormValues]}
              onChange={formik.handleChange}
            />
          ))}
        </Box>
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </AuthOverlay>
  );
};
export default SignupForm;
