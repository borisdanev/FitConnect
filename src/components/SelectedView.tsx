import { ViewEnum } from "../enums/View";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import HomeView from "./HomeView";
import WorkoutView from "./WorkoutView";
const SelectedView = () => {
  const selectedView = useSelector((state: RootState) => state.view.value);
  switch (selectedView) {
    case ViewEnum.Home: {
      return (
        <Box sx={{ mt: 5 }}>
          <HomeView />
        </Box>
      );
    }
    case ViewEnum.Workout: {
      return (
        <Box sx={{ mt: 5 }}>
          <WorkoutView />
        </Box>
      );
    }
  }
  return <></>;
};
export default SelectedView;
