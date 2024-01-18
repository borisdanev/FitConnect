import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Exercise } from "../types/exercise.model";
import { SelectChangeEvent } from "@mui/material/Select";
import TrainingSession from "./TrainingSession";
import useIsMember from "../hooks/useIsMember";
import Grid from "@mui/material/Grid";
import { IoIosLock } from "react-icons/io";
interface Props {
  trainingSessions: {
    name: string;
    exercises: Exercise[];
  }[];
  id: string;
}
const TrainingSessionList: React.FC<Props> = ({ trainingSessions, id }) => {
  const [value, setValue] = useState<string>(
    trainingSessions ? trainingSessions[0]?.name : ""
  );
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value!
  );
  const isMember = useIsMember(id, currentUser?.workouts);
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
        {trainingSessions.map((item, i) => (
          <MenuItem
            key={item.name}
            value={item.name}
            disabled={i > 0 ? !isMember : false}
          >
            <Grid container>
              <Grid item xs={6} sx={{}}>
                {item.name}
              </Grid>
              {i > 0 && !isMember && (
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <IoIosLock />
                </Grid>
              )}
            </Grid>
          </MenuItem>
        ))}
      </Select>
      {trainingSessions
        .filter((item) => item.name === value)
        .map((item, i) => (
          <TrainingSession key={i} exercises={item.exercises} />
        ))}
    </Box>
  );
};
export default TrainingSessionList;
