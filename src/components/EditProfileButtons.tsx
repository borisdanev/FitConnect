import { useState } from "react";
import { useUpdateUserMutation } from "../store";
import useScreenSize from "../hooks/useScreenSize";
import { EditableUserData } from "../enums/EditableUserData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import grey from "@mui/material/colors/grey";
import { FormikErrors, FormikValues } from "formik";
interface Props {
  userId: string;
  setShowMessage: (show: boolean) => void;
  errors: FormikErrors<FormikValues>;
  dataToChange: { key: EditableUserData; value: string }[];
}
const EditProfileButtons: React.FC<Props> = ({
  userId,
  setShowMessage,
  errors,
  dataToChange,
}) => {
  const screenSize = useScreenSize();
  const [updateUser] = useUpdateUserMutation();

  const handleSaveChanges = () => {
    if (Object.keys(errors).length > 0 || dataToChange.length < 1) return;
    setShowMessage(true);
    updateUser({ userId, data: dataToChange });
  };
  const handleDiscardChanges = () => {};
  return (
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
  );
};
export default EditProfileButtons;
