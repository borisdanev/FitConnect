import Box from "@mui/material/Box";
const SelectionCalendar: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((item, i) => (
        <Box key={i}>{item}</Box>
      ))}
    </Box>
  );
};
export default SelectionCalendar;
