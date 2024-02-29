import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageSrc from "../images/cover.webp";

const CoverImage: React.FC = () => {
  return (
    <Box
      width="100%"
      height="35rem"
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "-1",
      }}
    >
      <Box
        sx={{ position: "absolute", bgcolor: "black", opacity: "0.5" }}
        className="position-fill"
      ></Box>
      <Typography
        className="h2 heading-color"
        sx={{
          position: "absolute",
          width: "29rem",
          top: "40%",
          left: "4rem",
        }}
      >
        <span style={{ color: "#00e676" }}>Find</span> a Workout That Align Best
        With Your <span style={{ color: "#00e676" }}>Goals</span>
      </Typography>
      <img
        src={ImageSrc}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt="Cover image of man lifting barbell"
      />
    </Box>
  );
};
export default CoverImage;