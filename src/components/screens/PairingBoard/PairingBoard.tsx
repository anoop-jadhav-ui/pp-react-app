import { Tag } from "@mui/icons-material";
import { Box, Button, Grid, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { Pair, usePairingStore } from "../../../store/pairingStore";
import { TeamMember } from "../../../store/teamMembersStore";
import { getListStyle, reorder } from "../../../utils/dragAndDropUtils";
import DraggableCard from "../../molecules/DraggableCard/DraggableCard";
import styles from "./PairingBoard.module.css";
import { generateRandomId, getRandomPair } from "../../../utils/commonUtils";

const DroppablePair = ({ pairItem }: { pairItem: Pair; index: number }) => {
  return (
    <Droppable
      droppableId={`pairDropArea-${pairItem.id.toString()}`}
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          className={styles.pairOnBoard}
          {...provided.droppableProps}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <Tag>{pairItem.id}</Tag>
          {pairItem.items.map((item) => {
            return (
              <DraggableCard
                key={item.id}
                title={item.name}
                index={item.id}
                isSelected={false}
              />
            );
          })}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

const PairingBoard = observer(() => {
  const {
    teamMemberPool,
    setTeamMemberPoolList,
    pairList,
    setPairList,
    clearPairingBoard,
  } = usePairingStore();
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

    console.log(result);

    if (source) {
      if (sourceId === "defaultDropArea") {
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
      <Box className={styles.boardWrapper}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
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
          <Grid item>
            <Stack spacing={1}>
              <Button
                variant="contained"
                onClick={addPairToBoard}
                disabled={selectedTeamMemberss.length === 0}
              >
                Add Pair
              </Button>
              <Button
                variant="outlined"
                onClick={addRandomPairsToBoard}
                disabled={teamMemberPool.length === 0}
              >
                Pair Randomly
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={clearPairingBoard}
              >
                Clear Board
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Box className={styles.board}>
          {pairList.map((pair) => {
            return (
              <DroppablePair key={pair.id} pairItem={pair} index={pair.id} />
            );
          })}
        </Box>
      </Box>
    </DragDropContext>
  );
});

export default PairingBoard;
