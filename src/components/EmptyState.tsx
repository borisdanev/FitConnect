import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface Props {
  illustrationSrc: string;
  text: string;
}
const EmptyState: React.FC<Props> = ({ illustrationSrc, text }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={illustrationSrc} />
      <Typography className="h3 heading-color">{text}</Typography>
    </Box>
  );
};
export default EmptyState;
