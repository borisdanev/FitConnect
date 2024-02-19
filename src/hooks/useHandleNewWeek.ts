import { useEffect } from "react";
import {
  useGetJoinedWorkoutQuery,
  useUpdateWeekProgressMutation,
} from "../store";
const useHandleNewWeek = (
  userId: string,
  workoutId: string,
  isMember: boolean
) => {
  const { data: joinedWorkout } = useGetJoinedWorkoutQuery({
    userId,
    workoutId,
  });
  const [updateWeekProgress] = useUpdateWeekProgressMutation();
  useEffect(() => {
    if (!isMember || !joinedWorkout || !joinedWorkout?.lastSessionFinishDate)
      return;
    const lastSessionFinishDate = new Date(
      joinedWorkout.lastSessionFinishDate.seconds * 1000
    );
    const currentDate = new Date();
    const getISOWeek = (date: Date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      const yearStart = new Date(d.getFullYear(), 0, 1);
      return Math.ceil(((+d - +yearStart) / 86400000 + 1) / 7);
    };
    const [year1, week1] = [
      lastSessionFinishDate.getFullYear(),
      getISOWeek(lastSessionFinishDate),
    ];
    const [year2, week2] = [currentDate.getFullYear(), getISOWeek(currentDate)];
    const isSameWeek = year1 === year2 && week1 === week2;
    // updateWeekProgress();
    console.log("here handling");
    if (isSameWeek) {
      updateWeekProgress({ userId, workoutId, finishedSessions: 1 });
    }
  }, []);
};
export default useHandleNewWeek;
