import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoMdAdd } from "react-icons/io";
import useCreateProgram from "../hooks/useCreateProgram";
interface Props {
  width: string;
  height: string;
}
const CreateProgramAction: React.FC<Props> = ({ width, height }) => {
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
        bgcolor: "#37423d",
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
