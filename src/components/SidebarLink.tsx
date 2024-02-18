import React from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { IconType } from "react-icons";
import Typography from "@mui/material/Typography";
interface Props {
  text: string;
  Icon: IconType;
}
const SideBarLink: React.FC<Props> = ({ text, Icon }) => {
  const selectedView = useSelector((state: RootState) => state.view.value);
  return (
    <Box
      className="h5 "
      // variant={selectedView !== text ? "text" : "contained"}

      sx={{
        bgcolor: `${
          selectedView === text ? "hsl(151, 100%, 87%)" : "transparent"
        }`,
        width: "100%",
        color: `${selectedView === text ? "#00e676" : "white"}`,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        borderLeft: `${selectedView === text ? "6px solid #00e676" : "none"}`,
        pl: 2,
        py: 1,
        transition: "all 0.15s ease",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Icon style={{ marginRight: "0.5rem" }} />
      <Typography className="h5">{text.toLocaleUpperCase()}</Typography>
    </Box>
  );
};
export default SideBarLink;
