import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { User } from "../types/user.model";
import { BiCurrentLocation } from "react-icons/bi";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/material/TextareaAutosize";
interface Props {
  currentUser: User;
}
const EditProfile: React.FC<Props> = ({ currentUser }) => {
  return (
    <Box sx={{ bgcolor: "#37423d", p: 2 }}>
      <Grid container columnSpacing={2} rowSpacing={2}>
        {[
          { label: "First Name", value: currentUser.firstName },
          { label: "Last Name", value: currentUser.lastName },
          { label: "Email", value: currentUser.email },
          { label: "Location", value: "None", icon: <BiCurrentLocation /> },
        ].map((item) => (
          <Grid item xs={6}>
            <TextField
              value={item.value}
              label={item.label}
              variant="outlined"
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
