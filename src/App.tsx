import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/screens/LandingPage/LandingPage";
import PairingBoard from "./components/screens/PairingBoard/PairingBoard";
import { useFormContext } from "./contexts/formContext";

function App() {
  const { setNameList } = useFormContext();

  useEffect(() => {
    setNameList([
      "Anoop Jadhav",
      "Harshada Raut",
      "Akshay Jadhav",
      "Rishab Baid",
      "Srujan Keskar",
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
