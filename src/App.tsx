import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import "./App.css";
import AddUserForm from "./components/AddUserForm/AddUserForm";
import AddedBuddyList from "./components/AddedBuddyList/AddedBuddyList";
import Header from "./components/Header/Header";
import { useFormContext } from "./contexts/formContext";

function Intro() {
  return (
    <Box display="flex" justifyContent="center">
      <Text fontSize="xl" width="xl" textAlign="center">
        This is a pair programming assist tool to collaborate, conquer
        challenges, and code together seamlessly.
      </Text>
    </Box>
  );
}
function App() {
  const { nameList } = useFormContext();

  // useEffect(() => {
  //   setNameList([
  //     "Anoop Jadhav",
  //     "Harshada Raut",
  //     "Akshay Jadhav",
  //     "Rishab Baid",
  //     "Srujan Keskar",
  //   ]);
  // });

  return (
    <Box>
      <Grid alignContent="start">
        <GridItem>
          <Header />
        </GridItem>
        <GridItem pt={8}>
          <Intro />
        </GridItem>
        <GridItem pt={16}>
          <AddUserForm />
        </GridItem>
        {nameList?.length > 0 && (
          <>
            <GridItem>
              <AddedBuddyList />
            </GridItem>
            {/* <GridItem>
            <PairingBoard />
          </GridItem> */}
          </>
        )}
      </Grid>
    </Box>
  );
}

export default App;
