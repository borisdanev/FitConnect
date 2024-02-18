import { CountdownCircleTimer } from "react-countdown-circle-timer";
interface Props {
  restBetweenSets: number;
  setTimerOn: (on: boolean) => void;
}
const RestTimer: React.FC<Props> = ({ restBetweenSets, setTimerOn }) => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={restBetweenSets * 60}
      colors={["#00e676", "#00e676", "#00e676", "#00e676"]}
      colorsTime={[7, 5, 2, 0]}
      size={50}
      strokeWidth={2}
    >
      {({ remainingTime }) => {
        if (remainingTime > 0) return `${remainingTime}s`;
        setTimerOn(false);
      }}
    </CountdownCircleTimer>
  );
};
export default RestTimer;
