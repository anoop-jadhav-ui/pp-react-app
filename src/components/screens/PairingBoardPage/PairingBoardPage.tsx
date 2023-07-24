import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { usePairingStore } from "../../../store/pairingStore";
import { useTeamMemberStore } from "../../../store/teamMembersStore";
import PairingBoard from "./PairingBoard";
import { Container, Grid } from "@mui/material";
import DaySelector from "./DaySelector";

const PairingBoardPage = observer(() => {
  const { setTeamMemberPoolList, clearPairingBoard } = usePairingStore();
  const { teamMemberList } = useTeamMemberStore();

  useEffect(() => {
    clearPairingBoard();
    setTeamMemberPoolList(teamMemberList);
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DaySelector />
        </Grid>
        <Grid item xs={12}>
          <PairingBoard />
        </Grid>
      </Grid>
    </Container>
  );
});

export default PairingBoardPage;
