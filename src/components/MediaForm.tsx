import { useUploadImageMutation } from "../store";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import Slider from "react-slick";
import FormContainer from "./FormContainer";
import { FaImage } from "react-icons/fa6";
import Typography from "@mui/material/Typography";
import { WorkoutModel } from "../types/workout.model";
import FormHelperText from "@mui/material/FormHelperText";
interface Props {
  sliderRef: React.RefObject<Slider>;
  createdProgram: WorkoutModel;
  setCreatedProgram: (program: WorkoutModel) => void;
}
interface FormValues {
  title: string;
  description: string;
  imgFile: File | null;
}
const MediaForm: React.FC<Props> = ({
  sliderRef,
  createdProgram,
  setCreatedProgram,
}) => {
  const [setWorkoutImage] = useUploadImageMutation();
  const initialValues: FormValues = {
    title: "",
    description: "",
    imgFile: null as File | null,
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    imgFile: Yup.mixed()
      .required()
      .test(
        "imgFile",
        "Maximum file size is 700KB",
        (value) => (value as File).size < 700000
      ),
  });
  const handleSubmit = (values: FormValues) => {
    const { title, description, imgFile } = values;
    if (!sliderRef.current || !imgFile) return;
    setCreatedProgram({ ...createdProgram, title, description });
    setWorkoutImage({ file: imgFile, id: createdProgram.id });
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
      <Box>
        {[
          { text: "Title", value: "title" },
          { text: "Description", value: "description" },
        ].map((item) => (
          <TextField
            key={item.value}
            id={item.value}
            name={item.value}
            label={item.text}
            sx={{ width: "100%", mb: 2 }}
            helperText={
              formik.touched[item.value as keyof FormValues] &&
              formik.errors[item.value as keyof FormValues]
            }
            className="form-input"
            value={formik.values[item.value as keyof FormValues]}
            onChange={formik.handleChange}
          />
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="h1"
        >
          <Box
            sx={{
              border: "1px solid #00e676",
              p: 7,
              borderRadius: "5px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <FaImage />
            <Typography className="h4">
              Choose Image For Your Program
            </Typography>
            <FormHelperText sx={{ textAlign: "center" }}>
              {formik.touched.imgFile && formik.errors.imgFile}
            </FormHelperText>
            <input
              type="file"
              accept="image/*"
              id="imgFile"
              name="imgFile"
              style={{ position: "absolute", opacity: 0 }}
              className="position-fill"
              onChange={(event) =>
                formik.setFieldValue(
                  "imgFile",
                  event.currentTarget.files ? event.currentTarget.files[0] : ""
                )
              }
            />
          </Box>
        </Box>
      </Box>
    </FormContainer>
  );
};
export default MediaForm;
