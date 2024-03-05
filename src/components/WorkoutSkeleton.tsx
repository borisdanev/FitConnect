import Skeleton from "@mui/material/Skeleton";
const WorkoutSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton variant="rectangular" width="18.5rem" height="12.5rem" />
      <Skeleton
        sx={{ mt: 1 }}
        variant="rectangular"
        width="14rem"
        height="1.1rem"
      />
      <Skeleton
        sx={{ my: 1 }}
        variant="rectangular"
        width="2rem"
        height="0.8rem"
      />
      <Skeleton variant="rectangular" width="14rem" height="0.8rem" />
    </>
  );
};
export default WorkoutSkeleton;
