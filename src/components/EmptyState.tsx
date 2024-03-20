import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Helmet, HelmetProvider } from "react-helmet-async";
interface Props {
  illustrationSrc: string;
  text: string;
}
const EmptyState: React.FC<Props> = ({ illustrationSrc, text }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <HelmetProvider>
        <Helmet>
          <link rel="preload" as="image" href={illustrationSrc} />
        </Helmet>
      </HelmetProvider>
      <img
        src={illustrationSrc}
        style={{
          width: "32rem",
          height: "350px",
          objectFit: "cover",
          maxWidth: "100%",
        }}
        alt="Empty state"
      />
      <Typography className="h3 heading-color">{text}</Typography>
    </Box>
  );
};
export default EmptyState;
