import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  addToSelectedDays,
  removeFromSelectedDays,
  setAgreeToRemove,
  setVisibleAlert,
  setCurrentSessionIndex,
} from "../store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const SelectionCalendar: React.FC = () => {
  const dispatch = useDispatch();
  const [indexToRemove, setIndexToRemove] = useState<number>(0);
  const selectedDays = useSelector(
    (state: RootState) => state.program.selectedDays
  );
  const agreeToRemove = useSelector(
    (state: RootState) => state.program.agreeToRemove
  );
  const currentSessionIndex = useSelector(
    (state: RootState) => state.program.currentSessionIndex
  );
  useEffect(() => {
    if (!agreeToRemove) return;
    dispatch(removeFromSelectedDays(indexToRemove));
    dispatch(setAgreeToRemove(false));
    dispatch(setVisibleAlert(false));
  }, [agreeToRemove]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentId = parseFloat((event.target as HTMLButtonElement).id);
    if (selectedDays.includes(currentId)) {
      if (currentId === currentSessionIndex) {
        setIndexToRemove(currentId);
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
            // bgcolor: `${currentSessionIndex === i ? "red" : "green"}`,
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
