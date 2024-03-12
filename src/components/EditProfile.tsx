import { useEffect } from "react";
import { FormikProps, FormikErrors, FormikValues } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { User } from "../types/user.model";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import InputAdornment from "@mui/material/InputAdornment";
import { EditableUserData } from "../enums/EditableUserData";
import { ProfileModel } from "../types/profile.model";
interface Props {
  currentUser: User;
  setDataToChange: (data: { key: EditableUserData; value: string }[]) => void;
  setErrors: (errors: FormikErrors<FormikValues>) => void;
  formik: FormikProps<ProfileModel>;
  initialValues: ProfileModel;
}
const EditProfile: React.FC<Props> = ({
  setDataToChange,
  setErrors,
  formik,
  initialValues,
}) => {
  useEffect(() => {
    setErrors(formik.errors);
  }, [formik.errors]);
  useEffect(() => {
    const changedData = Object.keys(initialValues)
      .filter(
        (key) =>
          formik.values[key as keyof ProfileModel] !==
          initialValues[key as keyof ProfileModel]
      )
      .map((key) => ({
        key: key as EditableUserData,
        value: formik.values[key as keyof ProfileModel],
      }));
    setDataToChange(changedData);
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
            label: "Password",
            value: "password",
            password: true,
            icon: <RiLockPasswordFill />,
          },
        ].map((item, i) => (
          <Grid key={i} item xs={12} md={6}>
            <TextField
              id={item.value}
              name={item.value}
              type={item.password ? "password" : "text"}
              value={formik.values[item.value as keyof ProfileModel]}
              label={item.label}
              variant="outlined"
              helperText={formik.errors[item.value as keyof ProfileModel]}
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
