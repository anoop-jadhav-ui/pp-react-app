import { Box, Container, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import { getListStyle } from "../../../utils/dragAndDropUtils";
import DraggableCard from "./DraggableCard";
import DroppablePair from "./DroppablePair";
import styles from "./PairingBoard.module.css";
import PairingBoardHeader from "./PairingBoardHeader";
import { usePairingStore } from "../../../contexts/PairingStoreProvider";
import { useTeamMemberStore } from "../../../contexts/TeamMembersStoreProvider";

const PairingBoard = observer(() => {
  const pairingStore = usePairingStore();
  const { teamMemberList } = useTeamMemberStore();

  const { teamMemberPool, selectedTeamMembers, pairList } = pairingStore;

  const dragEngHandler: OnDragEndResponder = (result) => {
    pairingStore.onDragEnd(result, teamMemberList);
  };

  return (
    <DragDropContext onDragEnd={dragEngHandler}>
      <Container maxWidth="lg" className={styles.boardWrapper}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <PairingBoardHeader
              clearPairingBoard={pairingStore.clearPairingBoard}
              addPairToBoard={pairingStore.addPairToBoard}
              addRandomPairsToBoard={pairingStore.addRandomPairsToBoard}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              alignItems="center"
              spacing={2}
              justifyContent="space-between"
            >
              <Grid item xs={12} position="relative">
                <Typography
                  variant="subtitle2"
                  fontSize={18}
                  className={styles.teamMemberTitle}
                >
                  Team Members
                </Typography>
                <Droppable droppableId="defaultDropArea" direction="horizontal">
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      padding={4}
                      className={styles.cardContainer}
                      gap={4}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                      component="div"
                    >
                      {teamMemberPool.map((colleague) => {
                        const isColleagueSelected =
                          selectedTeamMembers.findIndex(
                            (item) => item.name === colleague.name
                          ) !== -1;
                        return (
                          <DraggableCard
                            key={colleague.id}
                            title={colleague.name}
                            index={colleague.id}
                            selectCard={pairingStore.selectCardForPairing}
                            isSelected={isColleagueSelected}
                            color={colleague.color}
                            toolTipText="Click to select"
                          />
                        );
                      })}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              className={styles.board}
              justifyContent="flex-start"
              position="relative"
              alignContent="flex-start"
            >
              <Typography
                variant="subtitle2"
                fontSize={18}
                className={styles.boardTitle}
              >
                Pairing Board
              </Typography>
              {pairList.map((pair) => {
                return (
                  <Grid item key={pair.id}>
                    <DroppablePair
                      key={pair.id}
                      pairItem={pair}
                      index={pair.id}
                      removeDroppablePair={pairingStore.removeDroppablePair}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </DragDropContext>
  );
});

export default PairingBoard;
