import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useSendMessageMutation, RootState } from "../store";
import { IoMdSend } from "react-icons/io";
const ChatInput: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const currentWorkout = useSelector(
    (state: RootState) => state.currentWorkout.value
  );
  const [sendMessage] = useSendMessageMutation();
  const [message, setMessage] = useState<string>("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;
    sendMessage({
      senderId: currentUser.id,
      content: message,
      workoutId: currentWorkout.id,
    });
    setMessage("");
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "hsl(153, 9%, 20%)",
        borderRadius: "2rem",
        paddingRight: "0.6rem",
      }}
    >
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputLabelProps={{ shrink: false }}
        sx={{
          width: "85%",
          "& fieldset": { border: "none" },
        }}
        placeholder="Type message..."
      />
      <IconButton sx={{ width: "2.5rem", height: "2.5rem" }}>
        <IoMdSend />
      </IconButton>
    </form>
  );
};
export default ChatInput;
