import React from "react";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./themes/theme";
import MainContent from "./components/MainContent";
const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Sidebar />
        <MainContent />
      </div>
      //{" "}
    </ThemeProvider>
  );
};
export default App;
