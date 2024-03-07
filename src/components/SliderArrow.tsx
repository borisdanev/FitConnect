import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
interface Props {
  variant: "prev" | "next";
}
const SliderArrow: React.FC<Props> = ({ variant }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        position: "absolute",
        top: "40%",
        fontSize: "1.5rem",
        zIndex: 99,
        borderRadius: "50%",
        p: 0.5,
        left: variant === "prev" ? "0.5rem" : "",
        right: variant === "next" ? "0.5rem" : "",
      }}
    >
      <IconButton>
        {variant === "prev" ? <FaChevronLeft /> : <FaChevronRight />}
      </IconButton>
    </Button>
  );
};
export default SliderArrow;
