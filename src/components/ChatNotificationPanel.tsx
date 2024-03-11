import { useState, ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
interface Props {
  toRender: [ReactElement, ReactElement];
  setOpened: (opened: boolean) => void;
  isOpened: boolean;
}
const ChatNotificationPanel: React.FC<Props> = ({
  toRender,
  setOpened,
  isOpened,
}) => {
  const [active, setActive] = useState<{ label: string; index: number }>({
    label: "Sessions",
    index: 0,
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpened ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: isOpened ? "block" : "none" }}
    >
      <Box sx={{ width: "18rem", bgcolor: "#37423d" }}>
        <Box sx={{ display: "flex" }}>
          {["Sessions", "Chat"].map((item, i) => (
            <motion.div
              initial={{ backgroundColor: "#37423d", color: "white" }}
              animate={{
                backgroundColor:
                  item === active.label ? "hsl(151, 100%, 90%)" : "#37423d",
                color: item === active.label ? "#00e676" : "white",
                borderBottom: item === active.label ? "5px solid #00e676" : "",
              }}
              transition={{ duration: 0.15 }}
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                className="h5"
                sx={{
                  width: "50%",
                  textAlign: "center",
                  // bgcolor:
                  //   item === active.label ? "hsl(151, 100%, 90%)" : "#37423d",
                  // color: item === active.label ? "#00e676" : "white",
                  // borderBottom:
                  //   item === active.label ? "5px solid #00e676" : "",
                }}
                onClick={() => setActive({ label: item, index: i })}
              >
                {item}
              </Typography>
            </motion.div>
          ))}
        </Box>
        <IconButton onClick={() => setOpened(false)}>
          <IoMdClose />
        </IconButton>
        <Box>{toRender[active.index]}</Box>
      </Box>
    </motion.div>
  );
};
export default ChatNotificationPanel;
