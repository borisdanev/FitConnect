import { ChangeEvent, ReactElement } from "react";
import Box from "@mui/material/Box";
import Logo from "../images/FitConnect_logo.webp";
interface Props {
  children: ReactElement;
  setOpenedForm: Function;
}
const AuthOverlay: React.FC<Props> = ({ children, setOpenedForm }) => {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id !== "1") return;
    setOpenedForm(false);
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
        bgcolor: "#29332e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      id="1"
      onClick={(e) => handleClick(e)}
    >
      <img src={Logo} alt="Logo" />
      {children}
    </Box>
  );
};
export default AuthOverlay;
