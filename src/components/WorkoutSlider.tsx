import useScreenSize from "../hooks/useScreenSize";
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
const WorkoutSlider: React.FC<Props> = ({
  isLoading,
  workouts,
  sortBy,
  type,
}) => {
  useScreenSize();
  const sliderSettings = {
    slidesToShow: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 3,
        },
      },
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
