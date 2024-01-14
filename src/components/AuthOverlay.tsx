import { ReactElement } from "react";
import Box from "@mui/material/Box";
import Logo from "../images/FitConnect_logo.webp";
interface Props {
  children: ReactElement;
}
const AuthOverlay: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1201,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        bgcolor: "#29332e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={Logo} alt="Logo" />
      {children}
    </Box>
  );
};
export default AuthOverlay;
