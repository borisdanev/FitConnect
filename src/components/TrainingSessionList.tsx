import { useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import TrainingSession from "./TrainingSession";
import Grid from "@mui/material/Grid";
import { IoIosLock } from "react-icons/io";
import { TrainingSessionModel } from "../types/trainingSession.model";
interface Props {
  trainingSessions: TrainingSessionModel[];
  isMember: boolean;
  setSelectedTrainingSession: (trainingSession: TrainingSessionModel) => void;
}
const TrainingSessionList: React.FC<Props> = ({
  trainingSessions,
  isMember,
  setSelectedTrainingSession,
}) => {
  const [value, setValue] = useState<string>(
    trainingSessions ? trainingSessions[0]?.name : ""
  );
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    const [trainingSession] = trainingSessions.filter(
      (item) => item.name === event.target.value
    );
    setSelectedTrainingSession(trainingSession);
  };
  const screenSize = useScreenSize();
  return (
    <Box
      sx={{
        ml: 2,
        height: screenSize > 1200 ? "26rem" : "15rem",
        overflow: "auto",
      }}
    >
      <Select
        value={value}
        sx={{
          width: "10rem",
          bgcolor: "#29332e",
          pl: 1,
          mb: 2,
        }}
        disableUnderline
        variant="standard"
        onChange={(event) => handleChange(event)}
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
          <TrainingSession
            key={i}
            exercises={item.exercises}
            name={item.name}
          />
        ))}
    </Box>
  );
};
export default TrainingSessionList;
