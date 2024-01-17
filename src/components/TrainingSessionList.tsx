import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Exercise } from "../types/exercise.model";
import { SelectChangeEvent } from "@mui/material/Select";
import TrainingSession from "./TrainingSession";
interface Props {
  trainingSessions:
    | {
        name: string;
        exercises: Exercise[];
      }[]
    | undefined;
}
const TrainingSessionList: React.FC<Props> = ({ trainingSessions }) => {
  const [value, setValue] = useState<string>(
    trainingSessions ? trainingSessions[0]?.name : ""
  );
  return (
    <Box sx={{ ml: 2 }}>
      <Select
        value={value}
        sx={{
          width: "10rem",
        }}
        disableUnderline
        variant="standard"
        onChange={(e: SelectChangeEvent) => setValue(e.target.value)}
        label="S"
      >
        {trainingSessions?.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {trainingSessions
        ?.filter((item) => item.name === value)
        .map((item) => (
          <TrainingSession exercises={item.exercises} />
        ))}
    </Box>
  );
};
export default TrainingSessionList;
