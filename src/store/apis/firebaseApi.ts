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
  getDoc,
  getCountFromServer,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { WorkoutModel } from "../../types/workout.model";
import { User } from "../../types/user.model";
import { ExerciseModel } from "../../types/exercise.model";
import { Message } from "../../types/message.model";
import { JoinedWorkout } from "../../types/joinedWorkout.model";
import { RatingModel } from "../../types/rating.model";
import { NotificationModel } from "../../types/notification.model";
import { EditableUserData } from "../../enums/EditableUserData";
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
  tagTypes: ["Rating", "Join", "Create"],
  endpoints: (builder) => ({
    getWorkouts: builder.query<WorkoutModel[], void>({
      queryFn: async () => {
        const snapshots = await getDocs(collection(db, "workouts"));
        const data = snapshots.docs.map((doc) => doc.data() as WorkoutModel);
        return { data };
      },
      providesTags: ["Create"],
    }),
    getUser: builder.query<User, string>({
      queryFn: async (email) => {
        const snapshots = await getDocs(collection(db, "users"));
        const users = snapshots.docs.map((doc) => doc.data() as User);
        const [data] = users.filter((user) => user.email === email);
        return { data };
      },
      providesTags: ["Join"],
    }),
    getUserWorkouts: builder.query<JoinedWorkout[], string>({
      queryFn: async (userId) => {
        const docRef = doc(db, "users", userId);
        const snapshot = await getDoc(docRef);
        const data = snapshot.data() as User;
        const workouts = data.workouts;
        return { data: workouts };
      },
      providesTags: ["Create"],
    }),
    getJoinedWorkout: builder.query<
      JoinedWorkout,
      { userId: string; workoutId: string }
    >({
      queryFn: async (args) => {
        const docRef = doc(db, "users", args.userId);
        const snapshot = await getDoc(docRef);
        const data = snapshot.data() as User;
        const [workout] = data.workouts.filter(
          (item) => item.workout.id === args.workoutId
        );
        return { data: workout };
      },
      providesTags: ["Rating"],
    }),
    getEmails: builder.query<string[], void>({
      queryFn: async () => {
        const snapshots = await getDocs(collection(db, "users"));
        const users = snapshots.docs.map((doc) => doc.data() as User);
        const data = users.map((user) => user.email);
        return { data };
      },
    }),
    getExercises: builder.query<ExerciseModel[], void>({
      queryFn: async () => {
        const snapshots = await getDocs(collection(db, "exercises"));
        const data = snapshots.docs.map((doc) => doc.data() as ExerciseModel);
        return { data };
      },
    }),
    getMembersChat: builder.query<Message[], string>({
      queryFn: async (workoutId) => {
        const docRef = doc(db, "workouts", workoutId);
        const snap = await getDoc(docRef);
        const data = snap.data() as WorkoutModel;
        const messages = data.membersChat.reverse();
        return { data: messages };
      },
    }),
    getStoragePicture: builder.query<string, string>({
      queryFn: async (id) => {
        try {
          const storage = getStorage();
          const url = (await getDownloadURL(ref(storage, id))) as string;
          return { data: url };
        } catch (err) {
          return {
            error: {
              status: 500,
              statusText: "Internal Server Error",
              data: "Invalid ID provided.",
            },
          };
        }
      },
    }),
    createUser: builder.mutation<void, User>({
      queryFn: async (user) => {
        await setDoc(doc(db, "users", user.id), {
          ...user,
        });
        return { data: undefined };
      },
    }),
    createProgram: builder.mutation<void, WorkoutModel>({
      queryFn: async (program) => {
        await setDoc(doc(db, "workouts", program.id), {
          ...program,
        });
        return { data: undefined };
      },
      invalidatesTags: ["Create"],
    }),
    joinWorkout: builder.mutation<void, { workout: WorkoutModel; id: string }>({
      queryFn: async (args) => {
        const userRef = doc(db, "users", args.id);
        const workoutRef = doc(db, "workouts", args.workout.id);
        const getDocument = async () => {
          const docSnap = await getDoc(workoutRef);
          if (docSnap.exists()) {
            await updateDoc(workoutRef, {
              members: args.workout.members + 1,
            });
            await updateDoc(userRef, {
              workouts: arrayUnion({
                workout: args.workout,
                finishedSessions: 0,
                previousWeekProgress: 0,
                isRated: false,
              }),
            });
            return;
          }
          getDocument();
        };
        getDocument();
        return { data: undefined };
      },
      invalidatesTags: ["Join"],
    }),
    setFinishedSession: builder.mutation<
      void,
      { userId: string; workoutId: string }
    >({
      queryFn: async (args) => {
        const docRef = doc(db, "users", args.userId);
        const userSnapshot = await getDoc(docRef);
        const user = userSnapshot.data() as User;
        const [workout] = user.workouts.filter(
          (workout) => workout.workout.id === args.workoutId
        );
        const otherWorkouts = user.workouts.filter(
          (workout) => workout.workout.id !== args.workoutId
        );
        await updateDoc(docRef, {
          workouts: [
            ...otherWorkouts,
            {
              ...workout,
              finishedSessions: workout.finishedSessions + 1,
              previousWeekProgress: workout.previousWeekProgress,
              lastSessionFinishDate: new Date(),
            },
          ],
        });
        return { data: undefined };
      },
    }),
    updateWeekProgress: builder.mutation<
      void,
      { userId: string; workoutId: string; finishedSessions: number }
    >({
      queryFn: async (args) => {
        const { userId, workoutId, finishedSessions } = args;
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);
        const user = userSnapshot.data() as User;
        const [currentWorkout] = user.workouts.filter(
          (workout) => workout.workout.id === workoutId
        );
        const otherWorkouts = user.workouts.filter(
          (workout) => workout.workout.id !== workoutId
        );
        await updateDoc(userRef, {
          workouts: [
            ...otherWorkouts,
            {
              ...currentWorkout,
              finishedSessions: 0,
              previousWeekProgress: finishedSessions,
            },
          ],
        });
        return { data: undefined };
      },
    }),
    updateUser: builder.mutation<
      void,
      { userId: string; data: { key: EditableUserData; value: string }[] }
    >({
      queryFn: async (args) => {
        const { userId, data } = args;
        const userRef = doc(db, "users", userId);
        data.forEach(async (item) => {
          await updateDoc(userRef, {
            [item.key]: item.value,
          });
        });
        return { data: undefined };
      },
    }),
    updateJoinedWorkout: builder.mutation<void, string>({
      queryFn: async (workoutId) => {
        const userSnapshots = await getDocs(collection(db, "users"));
        const users = userSnapshots.docs.map((doc) => doc.data() as User);
        const workoutRef = doc(db, "workouts", workoutId);
        const workoutSnapshot = await getDoc(workoutRef);
        const workout = workoutSnapshot.data() as WorkoutModel;
        const filteredUsers = users.filter((user) =>
          user.workouts.some((workout) => workout.workout.id === workoutId)
        );
        const usersRef = filteredUsers.map((user) => ({
          ref: doc(db, "users", user.id),
          outerWorkout: user.workouts.find(
            (workout) => workout.workout.id === workoutId
          ),
          otherWorkouts: user.workouts.filter(
            (workout) => workout.workout.id !== workoutId
          ),
        }));
        usersRef.forEach(
          async (doc) =>
            await updateDoc(doc.ref, {
              workouts: [
                ...doc.otherWorkouts,
                { ...doc.outerWorkout, workout },
              ],
            })
        );
        return { data: undefined };
      },
    }),
    sendMessage: builder.mutation<void, Message>({
      queryFn: async (message) => {
        const docRef = doc(db, "workouts", message.workoutId);
        await updateDoc(docRef, {
          membersChat: arrayUnion(message),
        });
        return { data: undefined };
      },
    }),
    uploadImage: builder.mutation<void, { file: File; id: string }>({
      queryFn: async (args) => {
        const storage = getStorage();
        const storageRef = ref(storage, args.id);
        await uploadBytes(storageRef, args.file);
        return { data: undefined };
      },
    }),
    rateWorkout: builder.mutation<
      void,
      { id: string; uid: string; rating: RatingModel }
    >({
      queryFn: async (args) => {
        const { currentRating, newRating, totalRates } = args.rating;
        const workoutRef = doc(db, "workouts", args.id);
        const userRef = doc(db, "users", args.uid);
        const userSnapshot = await getDoc(userRef);
        const user = userSnapshot.data() as User;
        const workout = user.workouts.find(
          (workout) => workout.workout.id === args.id
        );
        const otherWorkouts = user.workouts.filter(
          (workout) => workout.workout.id !== args.id
        );
        await updateDoc(userRef, {
          workouts: [...otherWorkouts, { ...workout, isRated: true }],
        });
        const totalRating = currentRating + newRating;
        await updateDoc(workoutRef, {
          rates: totalRates + 1,
          rating: parseFloat((totalRating / (totalRates + 1)).toFixed(1)),
        });
        return { data: undefined };
      },
      invalidatesTags: ["Rating"],
    }),
    addNotification: builder.mutation<
      void,
      { notification: NotificationModel; workoutId: string }
    >({
      queryFn: async (args) => {
        const usersSnaphots = await getDocs(collection(db, "users"));
        const users = usersSnaphots.docs.map((doc) => doc.data() as User);
        const filteredUsers = users.filter((user) =>
          user.workouts.some((workout) => workout.workout.id === args.workoutId)
        );
        const usersRef = filteredUsers.map((user) => ({
          ref: doc(db, "users", user.id),
          notifications: user.workouts.filter(
            (workout) => workout.workout.id === args.workoutId
          )[0].workout.notifications,
          outerWorkout: user.workouts.find(
            (workout) => workout.workout.id === args.workoutId
          ),
          innerWorkout: user.workouts.find(
            (workout) => workout.workout.id === args.workoutId
          )?.workout,
          otherWorkouts: user.workouts.filter(
            (workout) => workout.workout.id !== args.workoutId
          ),
        }));
        usersRef.forEach(
          async (doc) =>
            await updateDoc(doc.ref, {
              workouts: [
                ...doc.otherWorkouts,
                {
                  ...doc.outerWorkout,
                  workout: {
                    ...doc.innerWorkout,
                    notifications: [...doc.notifications, args.notification],
                  },
                },
              ],
            })
        );
        return { data: undefined };
      },
    }),
  }),
});
export const {
  useGetWorkoutsQuery,
  useCreateUserMutation,
  useGetEmailsQuery,
  useGetUserQuery,
  useGetUserWorkoutsQuery,
  useGetJoinedWorkoutQuery,
  useGetExercisesQuery,
  useJoinWorkoutMutation,
  useCreateProgramMutation,
  useSetFinishedSessionMutation,
  useUpdateWeekProgressMutation,
  useUpdateUserMutation,
  useUpdateJoinedWorkoutMutation,
  useUploadImageMutation,
  useGetStoragePictureQuery,
  useSendMessageMutation,
  useGetMembersChatQuery,
  useRateWorkoutMutation,
  useAddNotificationMutation,
} = firebaseApi;
