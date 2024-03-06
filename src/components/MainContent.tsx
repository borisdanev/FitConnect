import Box from "@mui/material/Box";
import { drawerWidth } from "./Navigation";
import Header from "./Header";
import SelectedView from "./SelectedView";
import useScreenSize from "../hooks/useScreenSize";
const MainContent = () => {
  const screenSize = useScreenSize();
  return (
    <Box
      style={{
        marginLeft: `${screenSize > 900 ? drawerWidth + "px" : ""}`,
      }}
      sx={{ px: screenSize > 700 ? 4 : 1, pt: 2, position: "relative" }}
    >
      <Header />
      <SelectedView />
    </Box>
  );
};
export default MainContent;
