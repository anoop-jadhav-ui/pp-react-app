import { Container } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { usePairingStore } from "../../../store/pairingStore";
import { useTeamMemberStore } from "../../../store/teamMembersStore";
import PairingBoard from "./PairingBoard";

const PairingBoardPage = observer(() => {
  const { setTeamMemberPoolList, clearPairingBoard } = usePairingStore();
  const { teamMemberList } = useTeamMemberStore();

  useEffect(() => {
    clearPairingBoard();
    setTeamMemberPoolList(teamMemberList);
  }, []);

  return (
    <Container maxWidth="lg">
      <PairingBoard />
    </Container>
  );
});

export default PairingBoardPage;
