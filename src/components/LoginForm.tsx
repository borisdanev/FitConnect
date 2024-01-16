import { useState } from "react";
import AuthOverlay from "./AuthOverlay";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useGetUserQuery } from "../store";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store";
interface Props {
  setOpenedForm: Function;
}
interface FormValues {
  email: string;
  password: string;
}
const LoginForm: React.FC<Props> = ({ setOpenedForm }) => {
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .test("email", "Incorrect email or password", (value) => {
        if (data) return true;
        return false;
      }),
    password: Yup.string()
      .required("Password is required")
      .test("password", "Incorrect email or password", (value) => {
        if (value === data?.password) return true;
        return false;
      }),
  });
  const handleSubmit = () => {
    if (data) dispatch(setCurrentUser(data));
    setOpenedForm(false);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  const { data } = useGetUserQuery(formik.values.email);
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
            { text: "Email", value: "email" },
            { text: "Password", value: "password" },
          ].map((item, i) => (
            <TextField
              key={i}
              id={item.value}
              name={item.value}
              variant="outlined"
              label={item.text}
              sx={{ my: i === 1 ? 2 : 0 }}
              helperText={
                formik.touched[item.value as keyof FormValues] &&
                formik.errors[item.value as keyof FormValues]
              }
              className="form-input"
              value={formik.values[item.value as keyof FormValues]}
              onChange={formik.handleChange}
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
