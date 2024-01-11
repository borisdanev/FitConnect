import Box from "@mui/material/Box";
import { drawerWidth } from "./Sidebar";
import Header from "./Header";
import WorkoutList from "./WorkoutsList";
const MainContent = () => {
  return (
    <Box style={{ marginLeft: `${drawerWidth}px` }} sx={{ px: 4, pt: 2 }}>
      <Header />
      <WorkoutList />
    </Box>
  );
};
export default MainContent;
