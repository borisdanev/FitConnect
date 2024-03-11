import { EditableUserData } from "../enums/EditableUserData";
export interface ProfileModel {
  [EditableUserData.FirstName]: string;
  [EditableUserData.LastName]: string;
  [EditableUserData.Email]: string;
  [EditableUserData.Password]: string;
}
