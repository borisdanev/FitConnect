import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useGetWorkoutsQuery } from "../store";
import { WorkoutType } from "../enums/WorkoutType";
import { SortType } from "../enums/SortType";
import Box from "@mui/material/Box";
import WorkoutSorting from "./WorkoutSorting";
import Filters from "./Filters";
import WorkoutList from "./WorkoutsList";
interface Props {
  gridSpace: number;
}
const SuggestedWorkouts: React.FC<Props> = ({ gridSpace }) => {
  const [type, setType] = useState<WorkoutType>(WorkoutType.All);
  const [sortBy, setSortBy] = useState<SortType>(SortType.rating);
  const searchKeyword = useSelector(
    (state: RootState) => state.searchSlice.keyword
  );
  const { data, isLoading } = useGetWorkoutsQuery();
  return (
    <Box>
      <Box sx={{ display: "flex", mb: 4 }}>
        <Filters type={type} setType={setType} />
        <WorkoutSorting sortBy={sortBy} setSortBy={setSortBy} />
      </Box>
      <WorkoutList
        sortBy={sortBy}
        type={type}
        workouts={data?.filter((workout) =>
          workout.title.toLowerCase().includes(searchKeyword.toLowerCase())
        )}
        isLoading={isLoading}
        gridSpace={gridSpace}
      />
    </Box>
  );
};
export default SuggestedWorkouts;
