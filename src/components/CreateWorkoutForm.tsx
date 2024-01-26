import { useDispatch } from "react-redux";
import { setOpenedCreateProgramForm } from "../store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CreateProgramImg from "../images/create_program.jpg";
const CreateWorkoutForm: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        zIndex: 1201,
        backdropFilter: "blur(1.8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      // onClick={(e) =>
      //   e.target === e.currentTarget &&
      //   dispatch(setOpenedCreateProgramForm(false))
      // }
    >
      <Grid container width="60rem">
        <Grid item xs={6}>
          <Box sx={{ bgcolor: "#2e4c3e", p: 2 }}>
            <TextField
              label="Title"
              className="form-input"
              sx={{ width: "100%" }}
            />
            <TextField
              label="Description"
              className="form-input"
              sx={{ width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <img
              style={{ maxWidth: "100%", height: "100%" }}
              src={CreateProgramImg}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CreateWorkoutForm;
