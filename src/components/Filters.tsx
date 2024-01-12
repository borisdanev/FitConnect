import { useState } from "react";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { WorkoutType } from "../enums/WorkoutType";
interface Props {
  type: string;
  setType: Function;
}
const Filters: React.FC<Props> = ({ type, setType }) => {
  const [sorting, setSorting] = useState<string>("R");
  return (
    <Box sx={{ display: "flex", mb: 4 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          value={type}
          onChange={(e: SelectChangeEvent) => setType(e.target.value)}
          label="Type"
        >
          {Object.values(WorkoutType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ ml: 3 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sorting}
          onChange={(e: SelectChangeEvent) => setSorting(e.target.value)}
          label="Type"
        >
          <MenuItem value="R">Rating</MenuItem>
          <MenuItem value="Participants">Participants</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default Filters;
