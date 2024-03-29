import { SortType } from "../enums/SortType";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
interface Props {
  sortBy: SortType;
  setSortBy: (sortBy: SortType) => void;
}
const WorkoutSorting: React.FC<Props> = ({ sortBy, setSortBy }) => {
  return (
    <FormControl sx={{ ml: 3 }}>
      <InputLabel>Sort by</InputLabel>
      <Select
        value={sortBy}
        onChange={(e: SelectChangeEvent) =>
          setSortBy(e.target.value as SortType)
        }
        label="Type"
        inputProps={{
          "aria-label": "sorting",
        }}
      >
        <MenuItem value={SortType.Rating}>Rating</MenuItem>
        <MenuItem value={SortType.Members}>Members</MenuItem>
      </Select>
    </FormControl>
  );
};
export default WorkoutSorting;
