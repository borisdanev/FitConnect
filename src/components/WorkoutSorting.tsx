import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
interface Props {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}
const WorkoutSorting: React.FC<Props> = ({ sortBy, setSortBy }) => {
  return (
    <FormControl sx={{ ml: 3 }}>
      <InputLabel>Sort by</InputLabel>
      <Select
        value={sortBy}
        onChange={(e: SelectChangeEvent) => setSortBy(e.target.value)}
        label="Type"
      >
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="members">Members</MenuItem>
      </Select>
    </FormControl>
  );
};
export default WorkoutSorting;
