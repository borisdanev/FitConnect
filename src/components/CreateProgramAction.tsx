import useCreateProgram from "../hooks/useCreateProgram";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoMdAdd } from "react-icons/io";
interface Props {
  width: string;
  height: string;
  bgColor: string;
}
const CreateProgramAction: React.FC<Props> = ({ width, height, bgColor }) => {
  const createProgram = useCreateProgram();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: "0.5rem",
        bgcolor: bgColor,
        width,
        height,
      }}
      onClick={createProgram}
    >
      <IoMdAdd className="h1" color="white" />
      <Typography className="h3" textAlign="center">
        Create
      </Typography>
    </Box>
  );
};
export default CreateProgramAction;
