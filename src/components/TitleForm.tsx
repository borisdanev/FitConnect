import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useFormik } from "formik";
import Slider from "react-slick";
import FormContainer from "./FormContainer";
interface Props {
  sliderRef: React.RefObject<Slider>;
}
interface FormValues {
  title: string;
  description: string;
}
const TitleForm: React.FC<Props> = ({ sliderRef }) => {
  const initialValues: FormValues = {
    title: "",
    description: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });
  const handleSubmit = () => {
    if (!sliderRef.current) return;
    sliderRef.current.slickGoTo(1);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <FormContainer
      handleSubmit={formik.handleSubmit}
      text="Title & Description"
    >
      {[
        { text: "Title", value: "title" },
        { text: "Description", value: "description" },
      ].map((item) => (
        <TextField
          key={item.value}
          id={item.value}
          name={item.value}
          label={item.text}
          sx={{ width: "100%", mb: 3 }}
          helperText={
            formik.touched[item.value as keyof FormValues] &&
            formik.errors[item.value as keyof FormValues]
          }
          className="form-input"
          value={formik.values[item.value as keyof FormValues]}
          onChange={formik.handleChange}
        />
      ))}
    </FormContainer>
  );
};
export default TitleForm;
