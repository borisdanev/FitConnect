import React, { ElementType, ReactElement } from "react";
import Button from "@mui/material/Button";
import { IconType } from "react-icons";
import { JsxElement } from "typescript";

interface Props {
  text: string;
  icon: ReactElement;
}
const SideBarLink: React.FC<Props> = ({ text, icon }) => {
  return (
    <Button
      className="h4"
      sx={{
        color: "white",
        width: "100%",
        display: "flex",
        justifyContent: "start",
      }}
    >
      {icon}
      {text}
    </Button>
  );
};
export default SideBarLink;
