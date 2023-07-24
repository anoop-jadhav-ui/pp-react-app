import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Button, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { usePairingStore } from "../../../store/pairingStore";
import DaySelector from "./DaySelector";

interface PairingBoardHeader {
  clearPairingBoard: () => void;
  addPairToBoard: () => void;
  addRandomPairsToBoard: () => void;
}
const PairingBoardHeader = observer((props: PairingBoardHeader) => {
  const { teamMemberPool, pairList } = usePairingStore();
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <DaySelector />
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={props.clearPairingBoard}
              startIcon={<HighlightOffIcon />}
              disabled={pairList.length === 0}
              size="large"
            >
              Clear Board
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={props.addRandomPairsToBoard}
              disabled={teamMemberPool.length === 0}
              startIcon={<ShuffleIcon />}
              size="large"
            >
              Pair Randomly
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={props.addPairToBoard}
              // disabled={selectedTeamMemberss.length === 0}
              startIcon={<AddIcon />}
              size="large"
            >
              Add Pair
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default PairingBoardHeader;
