export interface ExerciseModel {
  name: string;
  gifUrl: string;
  sets: { weight: number; reps: number }[];
  restBetweenSets: number;
  id: string;
}
