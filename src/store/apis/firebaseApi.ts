import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { WorkoutModel } from "../../types/workout.model";
import { User } from "../../types/user.model";
import { Exercise } from "../../types/exercise.model";
const config = {
  apiKey: "AIzaSyC3SF-qqer9CuVN_TdSu5WolN-68sB7-dM",
  authDomain: "fitconnect-7de1b.firebaseapp.com",
  projectId: "fitconnect-7de1b",
  storageBucket: "fitconnect-7de1b.appspot.com",
  messagingSenderId: "486343392781",
  appId: "1:486343392781:web:2f7a1e684407f414915f44",
  measurementId: "G-WDRZ1C5EVD",
};
const app = initializeApp(config);
const db = getFirestore(app);
export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getWorkouts: builder.query<WorkoutModel[], void>({
      queryFn: async () => {
        const snapshots = await getDocs(collection(db, "workouts"));
        const data = snapshots.docs.map((doc) => doc.data() as WorkoutModel);
        data.splice(1, 0, ...Array(10).fill(data[0]));
        return { data };
      },
    }),
    getUser: builder.query<User, string>({
      queryFn: async (email) => {
        const snapshots = await getDocs(collection(db, "users"));
        const users = snapshots.docs.map((doc) => doc.data() as User);
        const [data] = users.filter((user) => user.email === email);
        return { data };
      },
    }),
    getEmails: builder.query<string[], void>({
      queryFn: async () => {
        const snapshots = await getDocs(collection(db, "users"));
        const users = snapshots.docs.map((doc) => doc.data() as User);
        const data = users.map((user) => user.email);
        return { data };
      },
    }),
    getExercises: builder.query<Exercise[], void>({
      queryFn: async () => {
        const snapshots = await getDocs(collection(db, "exercises"));
        const data = snapshots.docs.map((doc) => doc.data() as Exercise);
        return { data };
      },
    }),
    getProfilePicture: builder.query<string, string>({
      queryFn: async (id) => {
        try {
          const storage = getStorage();
          const url = (await getDownloadURL(ref(storage, id))) as string;
          return { data: url };
        } catch (err) {
          return { error: "Not Good" };
        }
      },
    }),
    createUser: builder.mutation<any, User>({
      queryFn: async (user) => {
        const docRef = await setDoc(doc(db, "users", user.id), {
          ...user,
        });
        return { data: docRef };
      },
    }),
    joinWorkout: builder.mutation<any, { workout: WorkoutModel; id: string }>({
      queryFn: async (args) => {
        const docRef = doc(db, "users", args.id);
        await updateDoc(docRef, {
          workouts: arrayUnion(args.workout),
        });
        return { data: docRef };
      },
    }),
    setUserProfilePicture: builder.mutation<any, { file: File; id: string }>({
      queryFn: async (args) => {
        const storage = getStorage();
        const storageRef = ref(storage, args.id);
        const snapshots = await uploadBytes(storageRef, args.file);
        return { data: "data" };
      },
    }),
  }),
});
export const {
  useGetWorkoutsQuery,
  useCreateUserMutation,
  useGetEmailsQuery,
  useGetUserQuery,
  useGetExercisesQuery,
  useJoinWorkoutMutation,
  useSetUserProfilePictureMutation,
  useGetProfilePictureQuery,
} = firebaseApi;
