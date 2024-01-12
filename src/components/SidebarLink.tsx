import React from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { IconType } from "react-icons";
import Typography from "@mui/material/Typography";
interface Props {
  text: string;
  Icon: IconType;
}
const SideBarLink: React.FC<Props> = ({ text, Icon }) => {
  const selectedView = useSelector((state: RootState) => state.view.value);
  return (
    <Button
      className="h5"
      variant={selectedView !== text ? "text" : "contained"}
      sx={{
        color: "white",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        pl: 2,
      }}
    >
      <Icon style={{ marginRight: "0.5rem" }} />
      <Typography className="h5">{text}</Typography>
    </Button>
  );
};
export default SideBarLink;
