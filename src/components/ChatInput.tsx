import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSendMessageMutation, RootState } from "../store";
interface Props {
  refetch: Function;
}
const ChatInput: React.FC<Props> = ({ refetch }) => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value!
  );
  const currentWorkout = useSelector(
    (state: RootState) => state.currentWorkout.value!
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
    refetch();
    setMessage("");
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #FFFFFF",
      }}
    >
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputLabelProps={{ shrink: false }}
        sx={{
          "& fieldset": { border: "none" },
        }}
        placeholder="Type message"
      />
      <Button type="submit" variant="contained">
        Send
      </Button>
    </form>
  );
};
export default ChatInput;
