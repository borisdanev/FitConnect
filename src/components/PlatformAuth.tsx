import { ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface Props {
  icon: ReactElement;
  platform: string;
  handler: () => void;
}
const PlatformAuth: React.FC<Props> = ({ icon, platform, handler }) => {
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid #00e676",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: 1,
        borderRadius: "6px",
        transition: "all 0.1s ease",
        "&:hover": {
          bgcolor: "hsl(152, 25%, 20%)",
          cursor: "pointer",
        },
      }}
      className="h4"
      onClick={handler}
    >
      {icon}
      <Typography className="h6" sx={{ mt: 1 }}>
        Sign in with {platform}
      </Typography>
    </Box>
  );
};
export default PlatformAuth;
