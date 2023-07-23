import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { Pair, usePairingStore } from "../../../store/pairingStore";
import {
  TeamMember,
  useTeamMemberStore,
} from "../../../store/teamMembersStore";
import { generateRandomId, getRandomPair } from "../../../utils/commonUtils";
import { getListStyle, reorder } from "../../../utils/dragAndDropUtils";
import DraggableCard from "./DraggableCard";
import DroppablePair from "./DroppablePair";
import styles from "./PairingBoard.module.css";

const PairingBoard = observer(() => {
  const {
    teamMemberPool,
    setTeamMemberPoolList,
    pairList,
    setPairList,
    clearPairingBoard,
  } = usePairingStore();
  const { teamMemberList } = useTeamMemberStore();
  const [selectedTeamMemberss, setSelectedTeamMembers] = useState<TeamMember[]>(
    []
  );

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const target = result.destination;

    const sourceId = source.droppableId;
    const targetId = target.droppableId;

    const draggedTeamMemberId = Number(result.draggableId.split("-")[1]);
    const draggedTeamMember = teamMemberList.find(
      (member) => member.id === draggedTeamMemberId
    );

    console.log(JSON.parse(JSON.stringify(pairList)));
    console.log(result);

    if (source) {
      if (sourceId.includes("pairDropArea") && targetId === "defaultDropArea") {
        const sourcePairId = Number(sourceId.split("-")[1]);
        const updatedPairList = pairList.map((pair) => {
          if (pair.id === sourcePairId) {
            const updatedItems = pair.items.filter(
              (item) => item.id !== draggedTeamMemberId
            );
            return {
              ...pair,
              items: updatedItems,
            };
          }
          return pair;
        });
        setPairList(updatedPairList);
        if (draggedTeamMember) {
          setTeamMemberPoolList([...teamMemberPool, draggedTeamMember]);
        }
      } else if (sourceId === "defaultDropArea") {
        const items = reorder<TeamMember>(
          teamMemberPool,
          result.source.index,
          result.destination.index
        );
        setTeamMemberPoolList(items);
      } else if (
        sourceId.includes("pairDropArea") &&
        targetId.includes("pairDropArea")
      ) {
        const items = reorder<Pair>(
          pairList,
          result.source.index,
          result.destination.index
        );
        setPairList(items);
      }
    }
  };

  const selectCardForPairing = (clickedName: string) => {
    setSelectedTeamMembers((list: TeamMember[]) => {
      const isAlreadySelected = list.find((item) => item.name === clickedName);
      if (isAlreadySelected) {
        return list.filter((item) => item.name !== clickedName);
      } else {
        const selectedItem = teamMemberPool.find(
          (item) => item.name === clickedName
        );
        if (selectedItem) {
          return [...list, selectedItem];
        } else {
          return list;
        }
      }
    });
  };

  const addPairToBoard = () => {
    if (selectedTeamMemberss.length > 0) {
      const newPairItem: Pair = {
        id: generateRandomId(),
        items: [...selectedTeamMemberss],
      };
      setPairList([...pairList, newPairItem]);
      setTeamMemberPoolList(
        teamMemberPool.filter((item) => {
          return !selectedTeamMemberss.find((ele) => ele.name === item.name);
        })
      );
      setSelectedTeamMembers([]);
    }
  };

  const addRandomPairsToBoard = () => {
    let tempItems = [...teamMemberPool];
    let tempPairs = [...pairList];

    const maxPairLimit = 2;
    let currentPairLimit = maxPairLimit;

    while (tempItems.length > 0) {
      if (tempItems.length < maxPairLimit) {
        currentPairLimit = tempItems.length;
      }
      const result = getRandomPair<TeamMember>(tempItems, currentPairLimit);
      const newPairItem: Pair = {
        id: generateRandomId(),
        items: result,
      };
      tempPairs = [...tempPairs, newPairItem];
      for (let i = 0; i < currentPairLimit; i++) {
        tempItems = tempItems.filter((item) => item.id !== result[i].id);
      }
    }

    setTeamMemberPoolList(tempItems);
    setPairList(tempPairs);
  };

  console.log(teamMemberPool);
  console.log(pairList);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container maxWidth="lg" className={styles.boardWrapper}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={10}>
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
                      selectedTeamMemberss.findIndex(
                        (item) => item.name === colleague.name
                      ) !== -1;
                    return (
                      <DraggableCard
                        key={colleague.id}
                        title={colleague.name}
                        index={colleague.id}
                        selectCard={selectCardForPairing}
                        isSelected={isColleagueSelected}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Button
                variant="contained"
                onClick={addPairToBoard}
                disabled={selectedTeamMemberss.length === 0}
                startIcon={<AddIcon />}
              >
                Add Pair
              </Button>
              <Button
                variant="outlined"
                onClick={addRandomPairsToBoard}
                disabled={teamMemberPool.length === 0}
                startIcon={<ShuffleIcon />}
              >
                Pair Randomly
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={clearPairingBoard}
                startIcon={<HighlightOffIcon />}
              >
                Clear Board
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid container className={styles.board} justifyContent="space-between">
          {pairList.map((pair) => {
            return (
              <Grid item>
                <DroppablePair key={pair.id} pairItem={pair} index={pair.id} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </DragDropContext>
  );
});

export default PairingBoard;
