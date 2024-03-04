import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./themes/theme";
import MainContent from "./components/MainContent";
import useScreenSize from "./hooks/useScreenSize";
const App: React.FC = () => {
  const screenSize = useScreenSize();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        {screenSize > 900 && <Sidebar />}
        <MainContent />
      </div>
    </ThemeProvider>
  );
};
export default App;
