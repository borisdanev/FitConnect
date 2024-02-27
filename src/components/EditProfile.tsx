import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { User } from "../types/user.model";
import { MdEmail } from "react-icons/md";
// import { FaLock } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/material/TextareaAutosize";
interface Props {
  currentUser: User;
}
const EditProfile: React.FC<Props> = ({ currentUser }) => {
  return (
    <Box sx={{ bgcolor: "#37423d", p: 2 }}>
      <Typography className="h4" sx={{ mb: 3, color: "#00e676" }}>
        Personal Info
      </Typography>
      <Grid container columnSpacing={2} rowSpacing={2}>
        {[
          { label: "First Name", value: currentUser.firstName },
          { label: "Last Name", value: currentUser.lastName },
          { label: "Email", value: currentUser.email, icon: <MdEmail /> },
          {
            label: "Password",
            value: currentUser.password,
            password: true,
            icon: <RiLockPasswordFill />,
          },
        ].map((item) => (
          <Grid item xs={6}>
            <TextField
              type={item.password ? "password" : "text"}
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
