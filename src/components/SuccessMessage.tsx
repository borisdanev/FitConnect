import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface Props {
  message: string;
  width: string;
  Icon: React.ElementType;
}
const SuccessMessage: React.FC<Props> = ({ message, Icon, width }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "hsl(151, 100%, 85%)",
        border: "2.5px solid #00e676",
        borderLeftWidth: "6px",
        borderRadius: "0.2rem",
        width,
        color: "#29332e",
        px: 1,
        py: 2,
      }}
      className="showAndFade"
    >
      {<Icon className="h2" color="#00e676" />}
      <Typography sx={{ ml: 1, fontWeight: "550 !important" }} className="h5">
        {message}
      </Typography>
    </Box>
  );
};
export default SuccessMessage;
