import { Timestamp } from "firebase/firestore";
export interface NotificationModel {
  message: string;
  timestamp: number;
  dateAdded: Timestamp;
  userId: string;
}
