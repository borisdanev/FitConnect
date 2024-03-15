import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { FormikValues, FormikProps } from "formik";
import styled from "@mui/system/styled";
interface Props {
  formik: FormikProps<{
    title: string;
    description: string;
    imgFile: File | null;
  }>;
}
const Textarea: React.FC<Props> = ({ formik }) => {
  const Textarea = styled(BaseTextareaAutosize)(
    () => `
    box-sizing: border-box;
    width: 100%;
    max-height: 120px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 4px;
    color:white;
    background-color: rgb(46, 76, 62);
    border: 1px solid rgb(0, 230, 118);
    resize:none;
    // firefox
    &:focus-visible {
      outline: 0;
    }
    ::placeholder{
        color:rgb(0, 230, 118)
    }
  `
  );
  return (
    <Textarea
      id="description"
      name="description"
      value={formik.values.description}
      aria-label="minimum height"
      minRows={5}
      placeholder="Description"
      className="form-input"
      onChange={formik.handleChange}
    />
  );
};
export default Textarea;
