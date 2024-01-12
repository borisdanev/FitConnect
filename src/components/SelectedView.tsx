import { RootState } from "../store";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import HomeView from "./HomeView";
const SelectedView = () => {
  const selectedView = useSelector((state: RootState) => state.view.value);
  switch (selectedView) {
    case "Home": {
      return (
        <Box sx={{ mt: 5 }}>
          <HomeView />
        </Box>
      );
    }
  }
  return <></>;
};
export default SelectedView;
