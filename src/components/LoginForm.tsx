import AuthOverlay from "./AuthOverlay";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginForm = () => {
  const handleSubmit = () => {};
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
          {["Email", "Password"].map((item, i) => (
            <TextField
              key={i}
              variant="outlined"
              label={item}
              sx={{ my: i === 1 ? 2 : 0 }}
              className="form-input"
            />
          ))}
        </Box>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </AuthOverlay>
  );
};
export default LoginForm;
