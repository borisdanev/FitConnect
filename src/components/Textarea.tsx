import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import grey from "@mui/material/colors/grey";
import blue from "@mui/material/colors/blue";
import styled from "@mui/system/styled";
const Textarea: React.FC = () => {
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
      aria-label="minimum height"
      minRows={5}
      placeholder="Description"
    />
  );
};
export default Textarea;
