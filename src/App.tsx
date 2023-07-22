import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/screens/LandingPage/LandingPage";
import PairingBoard from "./components/screens/PairingBoard/PairingBoard";
import { PairingStoreProvider } from "./store/pairingStore";
import { TeamMemberStoreProvider } from "./store/teamMembersStore";

const dummyData = [
  {
    id: 0,
    name: "Anoop Jadhav",
  },
  {
    id: 1,
    name: "Akshay Jadhav",
  },
  {
    id: 2,
    name: "Harshada Raut",
  },
  {
    id: 3,
    name: "Rishab Baid",
  },
  {
    id: 4,
    name: "Srujan Keskar",
  },
];

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
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/pairing-board" Component={PairingBoard} />
        </Routes>
      </BrowserRouter>
    </StoreProviders>
  );
};

export default App;
