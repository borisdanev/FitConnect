import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormikErrors } from "formik";
import {
  addToSelectedDays,
  setVisibleAlert,
  setCurrentSessionIndex,
  RootState,
} from "../store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
interface Props {
  index: number;
  day: string;
  errors: FormikErrors<{ [key: string]: string }>;
}
const CalendarDay: React.FC<Props> = ({ index, day, errors }) => {
  const dispatch = useDispatch();
  const [errorWarning, setErrorWarning] = useState(false);
  const selectedDays = useSelector(
    (state: RootState) => state.program.selectedDays
  );
  const currentSessionIndex = useSelector(
    (state: RootState) => state.program.currentSessionIndex
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentId = parseFloat((event.target as HTMLButtonElement).id);
    if (selectedDays.includes(currentId)) {
      if (currentId === currentSessionIndex) {
        dispatch(setVisibleAlert(true));
        return;
      }
      dispatch(setCurrentSessionIndex(currentId));
      return;
    }
    dispatch(addToSelectedDays(currentId));
    dispatch(setCurrentSessionIndex(currentId));
  };
  useEffect(() => {
    const errorsIndexes = Object.keys(errors).map((key) =>
      key.includes("input")
        ? key.split("input")[1].charAt(0)
        : key.split("name")[1]
    );
    errorsIndexes.includes(`${index}`) && setErrorWarning(true);
  }, [errors]);
  return (
    <Button
      key={index}
      id={`${index}`}
      variant={selectedDays.includes(index) ? "contained" : "text"}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "3rem",
        minWidth: "3rem",
        height: "3rem",
        borderRadius: "50%",
        bgcolor: `${
          selectedDays.includes(index)
            ? currentSessionIndex === index
              ? "hsl(151, 100%, 45%)"
              : "hsl(151, 100%, 30%)"
            : ""
        }`,
      }}
      onClick={(event) => handleClick(event)}
    >
      {day}
      {errorWarning && (
        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
          <Typography className="h6">Error</Typography>
        </Box>
      )}
    </Button>
  );
};
export default CalendarDay;
