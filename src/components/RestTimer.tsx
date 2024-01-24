import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Box from "@mui/material/Box";
interface Props {
  restBetweenSets: number;
}
const RestTimer: React.FC<Props> = ({ restBetweenSets }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <CountdownCircleTimer
        isPlaying
        duration={restBetweenSets * 60}
        colors={["#00e676", "#00e676", "#00e676", "#00e676"]}
        colorsTime={[7, 5, 2, 0]}
        size={50}
        strokeWidth={2}
      >
        {({ remainingTime }) => `${remainingTime}s`}
      </CountdownCircleTimer>
    </Box>
  );
};
export default RestTimer;
