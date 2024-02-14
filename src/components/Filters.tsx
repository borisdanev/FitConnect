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
  return (
    <FormControl>
      <InputLabel>Type</InputLabel>
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
  );
};
export default Filters;
