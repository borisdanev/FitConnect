import { useState } from "react";
import useHandleSearch from "../hooks/useHandleSearch";
import { useGetWorkoutsQuery } from "../store";
import { WorkoutType } from "../enums/WorkoutType";
import { SortType } from "../enums/SortType";
import Box from "@mui/material/Box";
import WorkoutSorting from "./WorkoutSorting";
import Filters from "./Filters";
import WorkoutList from "./WorkoutsList";
import { BreakPoints } from "../types/breakpoints.model";
interface Props {
  gridSpace: BreakPoints;
}
const SuggestedWorkouts: React.FC<Props> = ({ gridSpace }) => {
  const [type, setType] = useState<WorkoutType>(WorkoutType.All);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Rating);
  const { data, isLoading } = useGetWorkoutsQuery();
  const handleSearch = useHandleSearch();
  return (
    <Box>
      <Box sx={{ display: "flex", mb: 4 }}>
        <Filters type={type} setType={setType} />
        <WorkoutSorting sortBy={sortBy} setSortBy={setSortBy} />
      </Box>

      <WorkoutList
        sortBy={sortBy}
        type={type}
        workouts={data?.filter((workout) => handleSearch(workout))}
        isLoading={isLoading}
        gridSpace={gridSpace}
      />
    </Box>
  );
};
export default SuggestedWorkouts;
