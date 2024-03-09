import Slider from "react-slick";
import WorkoutSkeleton from "./WorkoutSkeleton";
import Workout from "./Workout";
import { WorkoutModel } from "../types/workout.model";
import { SortType } from "../enums/SortType";
import { WorkoutType } from "../enums/WorkoutType";
interface Props {
  isLoading: boolean;
  workouts: WorkoutModel[];
  sortBy: SortType;
  type: WorkoutType;
}
const sliderSettings = {
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const WorkoutSlider: React.FC<Props> = ({
  isLoading,
  workouts,
  sortBy,
  type,
}) => {
  return (
    <Slider className="workouts-slider" {...sliderSettings}>
      {isLoading
        ? Array(8)
            .fill(null)
            .map((_, i) => <WorkoutSkeleton key={i} />)
        : [...workouts]
            .sort(
              (a, b) =>
                (b[sortBy as keyof WorkoutModel] as number) -
                (a[sortBy as keyof WorkoutModel] as number)
            )
            .filter(
              (workout) => workout.type === type || type === WorkoutType.All
            )
            .map((workout: WorkoutModel, i) => (
              <Workout key={i} workout={workout} />
            ))}
    </Slider>
  );
};
export default WorkoutSlider;
