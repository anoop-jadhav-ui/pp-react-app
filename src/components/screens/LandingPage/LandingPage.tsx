import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../../atoms/Footer/Footer";
import Header from "../../atoms/Header/Header";
import Intro from "../../atoms/Intro/Intro";
import AddUserForm from "../../organisms/AddUserForm/AddUserForm";
import AddedBuddyList from "../../organisms/AddedBuddyList/AddedBuddyList";
import { observer } from "mobx-react-lite";
import { useTeamMemberStore } from "../../../store/teamMembersStore";

const LandingPage = observer(() => {
	const { teamMemberList } = useTeamMemberStore();
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
			{teamMemberList.length > 0 && (
				<GridItem pt={2}>
					<AddedBuddyList />
				</GridItem>
			)}
			<Footer />
		</Grid>
	);
});

export default LandingPage;
