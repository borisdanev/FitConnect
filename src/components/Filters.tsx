import { WorkoutType } from "../enums/WorkoutType";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
interface Props {
  type: WorkoutType;
  setType: (type: WorkoutType) => void;
}
const Filters: React.FC<Props> = ({ type, setType }) => {
  return (
    <FormControl>
      <InputLabel>Type</InputLabel>
      <Select
        value={type}
        onChange={(e: SelectChangeEvent) =>
          setType(e.target.value as WorkoutType)
        }
        label="Type"
      >
        {Object.values(WorkoutType).map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default Filters;
