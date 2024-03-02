import Alert from "@mui/material/Alert";
interface Props {
  children: JSX.Element | JSX.Element[];
}
const FormAlert: React.FC<Props> = ({ children }) => {
  return (
    <Alert
      severity="error"
      color="error"
      sx={{
        position: "absolute",
        top: "40%",
        right: "0.5rem",
        left: "0.5rem",
        bgcolor: "#FDEDED",
      }}
    >
      {children}
    </Alert>
  );
};
export default FormAlert;
