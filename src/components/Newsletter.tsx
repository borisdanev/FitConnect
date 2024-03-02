import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMailOpenSharp } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { MdMarkEmailRead } from "react-icons/md";
import SuccessMessage from "./SuccessMessage";
const Newsletter: React.FC = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .matches(/@[^.]*\./, "Invalid email")
      .required("Email is required"),
  });
  const handleSubmit = () => {
    setShowMessage(true);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
        }}
      >
        <IoMailOpenSharp color="#00e676" className="h1" />
        <Typography className="h3 heading-color" sx={{ my: 1 }}>
          SUBSCRIBE
        </Typography>
        <Typography textAlign="center">
          Subscribe to our newsletter to receive the latest updates
        </Typography>
        <TextField
          id="email"
          variant="standard"
          label="Email"
          placeholder="Enter Your Email"
          helperText={formik.touched.email && formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Button
          variant="outlined"
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        >
          <CiMail className="h4" />
          <Typography ml={1}>Subscribe</Typography>
        </Button>
        {showMessage && (
          <SuccessMessage
            message="Successfully subscribed to our newsletter"
            Icon={MdMarkEmailRead}
            width="15rem"
          />
        )}
      </Box>
    </form>
  );
};
export default Newsletter;
