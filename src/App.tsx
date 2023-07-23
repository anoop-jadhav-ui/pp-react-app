import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/screens/LandingPage/LandingPage";
import { PairingStoreProvider } from "./store/pairingStore";
import { TeamMemberStoreProvider } from "./store/teamMembersStore";
import PairingBoardPage from "./components/screens/PairingBoardPage/PairingBoardPage";

const StoreProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <TeamMemberStoreProvider>
      <PairingStoreProvider>{children}</PairingStoreProvider>
    </TeamMemberStoreProvider>
  );
};

const App = () => {
  return (
    <StoreProviders>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/pairing-board" Component={PairingBoardPage} />
        </Routes>
      </BrowserRouter>
    </StoreProviders>
  );
};

export default App;
