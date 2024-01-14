import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AuthOverlay from "./AuthOverlay";
import { FormEvent } from "react";
import { User } from "../types/user.mode";
import { v4 as uuidv4 } from "uuid";
const SignupForm: React.FC = () => {
  const id = uuidv4();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(id);
  };
  return (
    <AuthOverlay>
      <form
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          display: "flex",
          padding: "0 1.5rem 1rem 1.5rem",
          alignItems: "center",
          flexDirection: "column",
          width: "20rem",
        }}
        onClick={handleSubmit}
      >
        <Box
          sx={{
            my: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {["First Name", "Last Name", "Email", "Password"].map((item, i) => (
            <TextField
              key={i}
              variant="outlined"
              label={item}
              sx={{ mt: i === 1 || 2 ? 2 : 0 }}
              className="form-input"
            />
          ))}
        </Box>
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </AuthOverlay>
  );
};
export default SignupForm;
