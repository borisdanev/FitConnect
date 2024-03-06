import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useUpdateUserMutation } from "../store";
import useScreenSize from "../hooks/useScreenSize";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FaLink } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import UserIllustation from "../images/user_illustration.webp";
import EmptyState from "./EmptyState";
import ProfileDetails from "./ProfileDetails";
import EditProfile from "./EditProfile";
import grey from "@mui/material/colors/grey";
import { FormikErrors, FormikValues } from "formik";
import { EditableUserData } from "../enums/EditableUserData";
import SuccessMessage from "./SuccessMessage";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
const ProfileView = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const [updateUser] = useUpdateUserMutation();
  const [dataToChange, setDataToChange] = useState<
    {
      key: EditableUserData;
      value: string;
    }[]
  >([]);
  const [errors, setErrors] = useState<FormikErrors<FormikValues>>({});
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const screenSize = useScreenSize();
  const handleSaveChanges = () => {
    if (Object.keys(errors).length > 0 || dataToChange.length < 1) return;
    setShowMessage(true);
    updateUser({ userId: currentUser.id, data: dataToChange });
  };
  const handleDiscardChanges = () => {};
  return (
    <>
      {currentUser.id ? (
        <Grid container columnSpacing={screenSize > 900 ? 3 : 1}>
          <Grid item xs={4}>
            <ProfileDetails currentUser={currentUser} />
            <Box
              sx={{
                display: "flex",
                flexDirection: screenSize > 1300 ? "row" : "column",
                width: "100%",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: grey[300],
                  color: grey[700],
                  mr: 2,
                  "&:hover": {
                    backgroundColor: grey[400],
                  },
                }}
                onClick={handleDiscardChanges}
              >
                Discard Changes
              </Button>
              <Button
                sx={{
                  bgcolor: `${
                    dataToChange.length > 0
                      ? "hsl(151, 100%,40%)"
                      : "hsl(151, 100%, 20%)"
                  }`,
                  "&:hover": {
                    backgroundColor: "hsl(151, 100%,20%)",
                  },
                }}
                variant="contained"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </Box>
            {showMessage && (
              <SuccessMessage
                message="Changes added successfully"
                width="18rem"
                Icon={FaRegFaceSmileBeam}
              />
            )}
          </Grid>
          <Grid item xs={8}>
            <EditProfile
              currentUser={currentUser}
              setDataToChange={setDataToChange}
              setErrors={setErrors}
            />
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
