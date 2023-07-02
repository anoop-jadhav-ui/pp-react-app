import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/screens/LandingPage/LandingPage";
import PairingBoard from "./components/screens/PairingBoard/PairingBoard";
import { useFormContext } from "./contexts/formContext";

function App() {
  const { setColleagueList } = useFormContext();

  useEffect(() => {
    setColleagueList([
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
    ]);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/pairing-board" Component={PairingBoard} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
