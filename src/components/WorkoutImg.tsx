import { useEffect } from "react";
import { useGetStoragePictureQuery } from "../store";
// import webp from "webp-converter";
interface Props {
  workoutId: string;
}
const WorkoutImg: React.FC<Props> = ({ workoutId }) => {
  const { data: workoutSrc } = useGetStoragePictureQuery(workoutId);
  //   useEffect(() => {
  //     if (!workoutSrc) return;
  //     const convertImg = async () => {
  //       const webpBlob = await imageConversion.convertURL(workoutSrc, {
  //         outputFormat: "webp",
  //         quality: 0.8, // Adjust quality as needed
  //       });
  //     };
  //     convertImg();
  //   }, [workoutSrc]);
  return (
    <img
      src={workoutSrc}
      style={{ width: "100%", height: "12.5rem", objectFit: "cover" }}
      alt="workout cover image"
    />
  );
};
export default WorkoutImg;
