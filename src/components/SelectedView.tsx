import { ViewEnum } from "../enums/View";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import HomeView from "./HomeView";
import WorkoutView from "./WorkoutView";
import ProfileView from "./ProfileView";
const SelectedView = () => {
  const selectedView = useSelector((state: RootState) => state.view.value);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
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
    case ViewEnum.Profile: {
      return <Box sx={{ mt: 5 }}>{currentUser.id && <ProfileView />}</Box>;
    }
  }
  return <></>;
};
export default SelectedView;
