import Box from "@mui/material/Box";
import { drawerWidth } from "./Sidebar";
import Header from "./Header";
import SelectedView from "./SelectedView";
const MainContent = () => {
  return (
    <Box
      style={{ marginLeft: `${drawerWidth}px` }}
      sx={{ px: 4, pt: 2, position: "relative" }}
    >
      <Header />
      <SelectedView />
    </Box>
  );
};
export default MainContent;
