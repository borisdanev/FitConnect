import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ReactElement } from "react";
import { VscListSelection } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";

interface Props {
  toRender: [ReactElement, ReactElement];
}
const WorkoutViewToggle: React.FC<Props> = ({ toRender }) => {
  const [active, setActive] = useState<{ label: string; index: number }>({
    label: "Sessions",
    index: 0,
  });
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <Box
      sx={{
        position: "fixed",
        top: "20%",
        right: "2rem",
      }}
    >
      {!opened && (
        <IconButton
          sx={{ bgcolor: "#00e676", border: "3px solid white" }}
          onClick={() => setOpened(true)}
        >
          <VscListSelection />
        </IconButton>
      )}
      {opened && (
        <Box sx={{ width: "18rem", bgcolor: "#37423d" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {["Sessions", "Chat"].map((item, i) => (
              <Typography
                className="h5"
                sx={{
                  width: "50%",
                  textAlign: "center",
                  bgcolor:
                    item === active.label ? "hsl(151, 100%, 90%)" : "#37423d",
                  color: item === active.label ? "#00e676" : "white",
                  borderBottom:
                    item === active.label ? "5px solid #00e676" : "",
                }}
                onClick={() => setActive({ label: item, index: i })}
              >
                {item}
              </Typography>
            ))}
          </Box>
          <IconButton onClick={() => setOpened(false)}>
            <IoMdClose />
          </IconButton>
          <Box>{toRender[active.index]}</Box>
        </Box>
      )}
    </Box>
  );
};
export default WorkoutViewToggle;
