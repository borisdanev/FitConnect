import Box from "@mui/material/Box";
interface Props {
  message: string;
  writer: string;
  lastSender: string;
}
const ChatMessage: React.FC<Props> = ({ message, writer, lastSender }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
      {lastSender !== writer && (
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

          ml: lastSender === writer ? 5 : 0,
        }}
      >
        {message}
      </Box>
    </Box>
  );
};
export default ChatMessage;
