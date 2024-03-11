import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ReactElement } from "react";
import { VscListSelection } from "react-icons/vsc";
import ChatNotificationPanel from "./ChatNotificationPanel";
interface Props {
  toRender: [ReactElement, ReactElement];
}
const WorkoutViewToggle: React.FC<Props> = ({ toRender }) => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <Box
      sx={{
        position: "fixed",
        top: "20%",
        right: "2rem",
      }}
    >
      <ChatNotificationPanel
        toRender={toRender}
        setOpened={setOpened}
        isOpened={opened}
      />
      {!opened && (
        <IconButton
          sx={{ bgcolor: "#00e676", border: "3px solid white" }}
          onClick={() => setOpened(true)}
        >
          <VscListSelection />
        </IconButton>
      )}
    </Box>
  );
};
export default WorkoutViewToggle;
