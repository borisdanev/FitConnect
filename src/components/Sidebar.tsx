import React from "react";
import Box from "@mui/material/Box";
import useScreenSize from "../hooks/useScreenSize";
import Navigation from "./Navigation";
const Sidebar: React.FC = () => {
  const screenSize = useScreenSize();
  return (
    <Box>
      <Navigation />
    </Box>
  );
};
export default Sidebar;
