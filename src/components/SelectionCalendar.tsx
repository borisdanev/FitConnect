import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
interface Props {
  selectedDays: string[];
  setSelectedDays: (id: string[]) => void;
}
const SelectionCalendar: React.FC<Props> = ({
  selectedDays,
  setSelectedDays,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentId = (event.target as HTMLButtonElement).id;
    if (selectedDays.includes(currentId)) {
      const newArr = selectedDays.filter((item) => item !== currentId);
      setSelectedDays(newArr);
      return;
    }
    setSelectedDays([...selectedDays, currentId]);
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
