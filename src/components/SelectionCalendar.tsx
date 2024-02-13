import { FormikProps } from "formik";
import Box from "@mui/material/Box";
import CalendarDay from "./CalendarDay";
interface Props {
  formik: FormikProps<{ [key: string]: string }>;
}
const SelectionCalendar: React.FC<Props> = ({ formik }) => {
  const errors = Object.keys(formik.errors).map((item) =>
    item.includes("input")
      ? item.split("input")[1].charAt(0)
      : item.split("name")[1]
  );
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((item, i) => (
        <CalendarDay key={i} index={i} day={item} errors={formik.errors} />
      ))}
    </Box>
  );
};
export default SelectionCalendar;
