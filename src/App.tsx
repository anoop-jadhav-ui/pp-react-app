import "./App.css";
import AddUserForm from "./components/AddUserForm/AddUserForm";
import AddedBuddyList from "./components/AddedBuddyList/AddedBuddyList";
import Header from "./components/Header/Header";
import { useFormContext } from "./contexts/formContext";

function Intro() {
  return <Text fontSize="sm">(sm) In love with React & Next</Text>;
}
function App() {
  const { nameList } = useFormContext();
  return (
    <>
      <Header />
      <Intro />
      <AddUserForm />
      {nameList?.length > 0 && <AddedBuddyList />}
    </>
  );
}

export default App;
