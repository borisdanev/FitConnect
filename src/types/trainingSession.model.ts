import { ExerciseModel } from "./exercise.model";
export interface TrainingSessionModel {
  name: string;
  exercises: ExerciseModel[];
}
