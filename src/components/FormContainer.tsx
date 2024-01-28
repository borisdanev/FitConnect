import Box from "@mui/material/Box";
import { ReactElement } from "react";
import IconButton from "@mui/material/IconButton";
import { FaChevronRight } from "react-icons/fa6";
import Typography from "@mui/material/Typography";
interface Props {
  text: string;
  children: ReactElement | ReactElement[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
}
const FormContainer: React.FC<Props> = ({ children, text, handleSubmit }) => {
  return (
    <form
      style={{ marginRight: "2rem" }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <Typography textAlign="center" className="h3" sx={{ mb: 2 }}>
        {text}
      </Typography>
      <Box
        sx={{ overflow: "auto", height: "22rem !important" }}
        className="type-scrollbar"
      >
        {children}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <IconButton type="submit" sx={{ color: "#00e676" }}>
          <FaChevronRight />
        </IconButton>
      </Box>
    </form>
  );
};
export default FormContainer;
