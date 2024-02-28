import { useEffect } from "react";
import { useUpdateUserMutation } from "../store";
import { useFormik, FormikErrors, FormikValues } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { User } from "../types/user.model";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import InputAdornment from "@mui/material/InputAdornment";
import * as Yup from "yup";
import { EditableUserData } from "../enums/EditableUserData";
interface Props {
  currentUser: User;
  setDataToChange: (data: EditableUserData[]) => void;
  setErrors: (errors: FormikErrors<FormikValues>) => void;
}
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const EditProfile: React.FC<Props> = ({
  currentUser,
  setDataToChange,
  setErrors,
}) => {
  const initialValues: FormValues = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: currentUser.password,
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .matches(/@[^.]*\./, "Invalid email")
      .required("Email is required"),
    // .test(
    //   "email",
    //   "Email is alredy in use",
    //   (value) => !emailsList?.includes(value)
    // ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: FormValues) => console.log(values),
  });
  const [updateUser] = useUpdateUserMutation();
  useEffect(() => {
    setErrors(formik.errors);
  }, [formik.errors]);
  useEffect(() => {
    const changedData = Object.keys(initialValues).filter(
      (key) =>
        formik.values[key as keyof FormValues] !==
        initialValues[key as keyof FormValues]
    );
    setDataToChange(changedData as EditableUserData[]);
  }, [formik.values]);
  return (
    <Box sx={{ bgcolor: "#37423d", p: 2 }}>
      <Typography className="h4" sx={{ mb: 3, color: "#00e676" }}>
        Personal Info
      </Typography>
      <Grid container columnSpacing={2} rowSpacing={2}>
        {[
          { label: "First Name", value: "firstName" },
          { label: "Last Name", value: "lastName" },
          { label: "Email", value: "email", icon: <MdEmail /> },
          {
            label: "password",
            value: currentUser.password,
            password: true,
            icon: <RiLockPasswordFill />,
          },
        ].map((item, i) => (
          <Grid key={i} item xs={6}>
            <TextField
              id={item.value}
              name={item.value}
              type={item.password ? "password" : "text"}
              value={formik.values[item.value as keyof FormValues]}
              label={item.label}
              variant="outlined"
              helperText={formik.errors[item.value as keyof FormValues]}
              InputProps={{
                startAdornment: item.icon ? (
                  <InputAdornment position="start" sx={{ color: "#00e676" }}>
                    {item.icon}
                  </InputAdornment>
                ) : (
                  ""
                ),
              }}
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <TextField
            label="Bio"
            variant="outlined"
            value="Nothing"
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default EditProfile;
