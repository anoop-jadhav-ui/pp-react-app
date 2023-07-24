import { Box, Container, Grid } from "@mui/material";
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
import { getListStyle } from "../../../utils/dragAndDropUtils";
import DraggableCard from "./DraggableCard";
import DroppablePair from "./DroppablePair";
import styles from "./PairingBoard.module.css";
import PairingBoardHeader from "./PairingBoardHeader";

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

    const sourcePairId = Number(sourceId.split("-")[1]);
    const targetPairId = Number(targetId.split("-")[1]);

    const draggedTeamMemberId = Number(result.draggableId.split("-")[1]);
    const draggedTeamMember = teamMemberList.find(
      (member) => member.id === draggedTeamMemberId
    );

    if (source) {
      if (sourceId.includes("pairDropArea") && targetId === "defaultDropArea") {
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
        setPairList(cleanUpPairList(updatedPairList));
        if (draggedTeamMember) {
          setTeamMemberPoolList([...teamMemberPool, draggedTeamMember]);
        }
      } else if (
        sourceId === "defaultDropArea" &&
        targetId.includes("pairDropArea")
      ) {
        const tempPairList: Pair[] = pairList.map((pair) => {
          if (pair.id === targetPairId) {
            return {
              ...pair,
              items: [...pair.items, draggedTeamMember],
            } as Pair;
          }
          return pair;
        });
        setTeamMemberPoolList(
          teamMemberPool.filter((member) => member.id !== draggedTeamMemberId)
        );
        setPairList(tempPairList);
      } else if (
        sourceId.includes("pairDropArea") &&
        targetId.includes("pairDropArea") &&
        sourceId !== targetId
      ) {
        const tempPairList: Pair[] = pairList.map((pair) => {
          if (pair.id === sourcePairId) {
            return {
              ...pair,
              items: pair.items.filter(
                (item) => item.id !== draggedTeamMemberId
              ),
            } as Pair;
          } else if (pair.id === targetPairId) {
            return {
              ...pair,
              items: [...pair.items, draggedTeamMember],
            } as Pair;
          }
          return pair;
        });
        setPairList(cleanUpPairList(tempPairList));
      }
    }
  };

  const cleanUpPairList = (list: Pair[]) => {
    return list.filter((pair) => pair.items.length > 0);
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
    } else {
      const newPairItem: Pair = {
        id: generateRandomId(),
        items: [],
      };
      setPairList([...pairList, newPairItem]);
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
    setSelectedTeamMembers([]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container maxWidth="lg" className={styles.boardWrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PairingBoardHeader
              clearPairingBoard={clearPairingBoard}
              addPairToBoard={addPairToBoard}
              addRandomPairsToBoard={addRandomPairsToBoard}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              alignItems="center"
              spacing={2}
              justifyContent="space-between"
            >
              <Grid item xs={12}>
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
            >
              {pairList.map((pair) => {
                return (
                  <Grid item>
                    <DroppablePair
                      key={pair.id}
                      pairItem={pair}
                      index={pair.id}
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
