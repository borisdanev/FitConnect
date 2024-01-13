import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FormEvent } from "react";
const SignupForm: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1201,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        bgcolor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={handleSubmit}
      >
        {["First Name", "Last Name", "Email"].map((item, i) => (
          <TextField
            key={i}
            variant="outlined"
            label={item}
            sx={{ my: i === 1 ? 2 : 0 }}
          />
        ))}
        <Button type="submit">Sign Up</Button>
      </form>
    </Box>
  );
};
export default SignupForm;
