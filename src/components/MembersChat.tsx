import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetMembersChatQuery, RootState } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoIosLock } from "react-icons/io";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
interface Props {
  isMember: boolean;
  // isCreator: boolean;
}
const MembersChat: React.FC<Props> = ({ isMember }) => {
  const currentWorkout = useSelector(
    (state: RootState) => state.currentWorkout.value
  );
  const { data: chatMessages, refetch } = useGetMembersChatQuery(
    currentWorkout.id
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (!scrollContainerRef.current) return;
    const scrollHeight = scrollContainerRef.current.scrollHeight;
    const clientHeight = scrollContainerRef.current.clientHeight;
    scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
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
            Join this workout to see the workout discussion
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            ref={scrollContainerRef}
            className="chat-scrollbar"
            sx={{
              height: "80%",
              pb: 2,
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {chatMessages?.map((item, i, arr) => (
              <ChatMessage
                key={i}
                sender={item.senderId}
                message={item.content}
                lastSender={i < arr.length - 1 ? arr[i + 1].senderId : ""}
              />
            ))}
          </Box>
          <ChatInput refetch={refetch} />
        </>
      )}
    </Box>
  );
};
export default MembersChat;
