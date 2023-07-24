import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/screens/LandingPage/LandingPage";
import PairingBoardPage from "./components/screens/PairingBoardPage/PairingBoardPage";
import StoreProvider from "./contexts/StoreProvider";
import ThemeProvider from "./contexts/ThemeProvider";

const App = () => (
  <ThemeProvider>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/pairing-board" Component={PairingBoardPage} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </ThemeProvider>
);

export default App;
