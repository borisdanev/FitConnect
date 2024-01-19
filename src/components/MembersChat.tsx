import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoIosLock } from "react-icons/io";
import ChatMessage from "./ChatMessage";
interface Props {
  isMember: boolean;
}
const MembersChat: React.FC<Props> = ({ isMember }) => {
  return (
    <Box
      sx={{
        // bgcolor: "#4E6157",
        bgcolor: "#37423d",
        // border: "3px #4E6157 solid",
        p: 2,
        borderRadius: "0.5rem",
        ml: 2,
        mt: 2,
        height: "25rem",
      }}
    >
      {!isMember ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <IoIosLock style={{ fontSize: "4rem" }} />
          <Typography className="h4" textAlign="center" width="80%">
            Join this workouts to see workout discussion
          </Typography>
        </Box>
      ) : (
        [
          { writer: "John Doe", message: "hello there" },
          { writer: "John Doe", message: "me again" },
        ].map((item, i, arr) => {
          return (
            <ChatMessage
              key={i}
              writer={item.writer}
              message={item.message}
              lastSender={i > 0 ? arr[i - 1].writer : ""}
            />
          );
        })
      )}
    </Box>
  );
};
export default MembersChat;
