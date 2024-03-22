import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Logo from "../images/FitConnect_logo.webp";
interface Props {
  children: ReactElement;
  setOpenedForm: Function;
}
const AuthOverlay: React.FC<Props> = ({ children, setOpenedForm }) => {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id !== "1") return;
    dispatch(setOpenedForm(false));
  };
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1201,
        bgcolor: "#29332e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="position-fill"
      id="1"
      onClick={(e) => handleClick(e)}
    >
      <img src={Logo} alt="Logo" />
      {children}
    </Box>
  );
};
export default AuthOverlay;
