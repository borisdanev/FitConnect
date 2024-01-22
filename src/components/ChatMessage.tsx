import { useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import ProfilePicture from "./ProfilePicture";
interface Props {
  message: string;
  sender: string;
  lastSender: string;
}
const ChatMessage: React.FC<Props> = ({ message, sender, lastSender }) => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  return (
    <Box
      sx={{
        display: "flex",
        mt: 1,
        justifyContent: currentUser.id === sender ? "end" : "start",
      }}
    >
      {lastSender !== sender && currentUser.id !== sender && (
        <ProfilePicture userId={sender} width="2rem" height="2rem" />
      )}
      <Box
        sx={{
          bgcolor: "rgb(0, 230, 118)",
          p: 1,
          borderRadius: "8rem",

          ml: lastSender === sender ? 5 : 0,
        }}
      >
        {message}
      </Box>
    </Box>
  );
};
export default ChatMessage;
