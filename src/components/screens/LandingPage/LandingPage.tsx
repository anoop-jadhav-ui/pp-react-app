import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../../atoms/Footer/Footer";
import Header from "../../atoms/Header/Header";
import Intro from "../../atoms/Intro/Intro";
import AddUserForm from "../../organisms/AddUserForm/AddUserForm";
import AddedBuddyList from "../../organisms/AddedBuddyList/AddedBuddyList";

const LandingPage = () => {
  return (
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
      <GridItem pt={2}>
        <AddedBuddyList />
      </GridItem>
      <Footer />
    </Grid>
  );
};

export default LandingPage;
