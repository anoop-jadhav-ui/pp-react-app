import { Container } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { usePairingStore } from "../../../contexts/PairingStoreProvider";
import { useTeamMemberStore } from "../../../contexts/TeamMembersStoreProvider";
import PairingBoard from "./PairingBoard";

const PairingBoardPage = observer(() => {
  const pairingStore = usePairingStore();
  const { teamMemberList } = useTeamMemberStore();

  useEffect(() => {
    pairingStore.clearPairingBoard();
    pairingStore.setTeamMemberPoolList(teamMemberList);
  }, []);

  return (
    <Container maxWidth="lg">
      <PairingBoard />
    </Container>
  );
});

export default PairingBoardPage;
