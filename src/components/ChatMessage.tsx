import Box from "@mui/material/Box";
interface Props {
  message: string;
  sender: string;
  lastSender: string;
}
const ChatMessage: React.FC<Props> = ({ message, sender, lastSender }) => {
  console.log(message, sender, lastSender);
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
      {lastSender !== sender && (
        <Box
          sx={{
            borderRadius: "50%",
            height: "2rem",
            width: "2rem",
            mr: 1,
            bgcolor: "white",
          }}
        ></Box>
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
