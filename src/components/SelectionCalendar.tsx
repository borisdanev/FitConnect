import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  addToSelectedDays,
  removeFromSelectedDays,
  setAgreeToRemove,
  setVisibleAlert,
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
  useEffect(() => {
    if (agreeToRemove) {
      dispatch(removeFromSelectedDays(indexToRemove));
      dispatch(setAgreeToRemove(false));
    }
  }, [agreeToRemove]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentId = (event.target as HTMLButtonElement).id;
    if (selectedDays.includes(currentId)) {
      const index = selectedDays.findIndex((item) => item === currentId);
      setIndexToRemove(index);
      dispatch(setVisibleAlert(true));
      return;
    }
    dispatch(addToSelectedDays(currentId));
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((item, i) => (
        <Button
          key={i}
          id={`${i}`}
          variant={selectedDays.includes(`${i}`) ? "contained" : "text"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "3rem",
            minWidth: "3rem",
            height: "3rem",
            borderRadius: "50%",
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
