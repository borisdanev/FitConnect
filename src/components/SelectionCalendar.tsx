import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  addToSelectedDays,
  setVisibleAlert,
  setCurrentSessionIndex,
} from "../store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const SelectionCalendar: React.FC = () => {
  const dispatch = useDispatch();
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
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((item, i) => (
        <Button
          key={i}
          id={`${i}`}
          variant={selectedDays.includes(i) ? "contained" : "text"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "3rem",
            minWidth: "3rem",
            height: "3rem",
            borderRadius: "50%",
            bgcolor: `${
              selectedDays.includes(i)
                ? currentSessionIndex === i
                  ? "hsl(151, 100%, 45%)"
                  : "hsl(151, 100%, 30%)"
                : ""
            }`,
          }}
          onClick={(event) => handleClick(event)}
        >
          {item}
        </Button>
      ))}
    </Box>
  );
};
export default SelectionCalendar;
