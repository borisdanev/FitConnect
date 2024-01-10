import Box from "@mui/material/Box";
import { drawerWidth } from "./Sidebar";
import Header from "./Header";
const MainContent = () => {
  return (
    <Box style={{ marginLeft: `${drawerWidth}px` }}>
      <Header />
    </Box>
  );
};
export default MainContent;
