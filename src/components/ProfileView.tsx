import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useScreenSize from "../hooks/useScreenSize";
import Grid from "@mui/material/Grid";
import { FaLink } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import UserIllustation from "../images/user_illustration.webp";
import EmptyState from "./EmptyState";
import ProfileDetails from "./ProfileDetails";
import EditProfile from "./EditProfile";
import { FormikErrors, FormikValues } from "formik";
import EditProfileButtons from "./EditProfileButtons";
import { EditableUserData } from "../enums/EditableUserData";
import SuccessMessage from "./SuccessMessage";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
const ProfileView = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const [errors, setErrors] = useState<FormikErrors<FormikValues>>({});
  const [dataToChange, setDataToChange] = useState<
    {
      key: EditableUserData;
      value: string;
    }[]
  >([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const screenSize = useScreenSize();

  return (
    <>
      {currentUser.id ? (
        <Grid container columnSpacing={screenSize > 900 ? 3 : 1} rowSpacing={2}>
          <Grid item xs={12} sm={4}>
            <ProfileDetails currentUser={currentUser} />
            {screenSize > 600 && (
              <EditProfileButtons
                userId={currentUser.id}
                setShowMessage={setShowMessage}
                errors={errors}
                dataToChange={dataToChange}
              />
            )}
            {showMessage && (
              <SuccessMessage
                message="Changes added successfully"
                width="18rem"
                Icon={FaRegFaceSmileBeam}
              />
            )}
          </Grid>
          <Grid item sm={8}>
            <EditProfile
              currentUser={currentUser}
              setDataToChange={setDataToChange}
              setErrors={setErrors}
            />
            {screenSize < 600 && (
              <EditProfileButtons
                userId={currentUser.id}
                setShowMessage={setShowMessage}
                errors={errors}
                dataToChange={dataToChange}
              />
            )}
          </Grid>
        </Grid>
      ) : (
        <EmptyState
          text="You Are Logged Out"
          illustrationSrc={UserIllustation}
        />
      )}
    </>
  );
};
export default ProfileView;
