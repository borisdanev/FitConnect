import { useGetStoragePictureQuery } from "../store";
interface Props {
  workoutId: string;
}
const WorkoutImg: React.FC<Props> = ({ workoutId }) => {
  const { data: workoutSrc } = useGetStoragePictureQuery(workoutId);
  return (
    <img
      src={workoutSrc}
      style={{ width: "100%", height: "12.5rem", objectFit: "cover" }}
      alt="workout cover image"
    />
  );
};
export default WorkoutImg;
