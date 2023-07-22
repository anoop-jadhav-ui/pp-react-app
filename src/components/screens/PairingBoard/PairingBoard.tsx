import { Box, Button, Grid, GridItem, Tag } from "@chakra-ui/react";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { getListStyle, reorder } from "../../../utils/dragAndDropUtils";
import DraggableCard from "../../molecules/DraggableCard/DraggableCard";
import styles from "./PairingBoard.module.css";
import { TeamMember } from "../../../store/teamMembersStore";
import { usePairingStore } from "../../../store/pairingStore";

interface Pair {
  id: number;
  items: TeamMember[];
}

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

const PairingBoard = () => {
  const { teamMemberPool, setTeamMemberPoolList } = usePairingStore();
  const [selectedList, setSelectedList] = useState<TeamMember[]>([]);
  const [pairList, setPairList] = useState<Pair[]>([]);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }

    console.log(result);

    if (result.source.droppableId === "defaultDropArea") {
      const items = reorder<TeamMember>(
        teamMemberPool,
        result.source.index,
        result.destination.index
      );
      setTeamMemberPoolList(items);
    }
    if (
      result.source.droppableId.includes("pairDropArea") &&
      result.destination.droppableId.includes("pairDropArea")
    ) {
      const items = reorder<Pair>(
        pairList,
        result.source.index,
        result.destination.index
      );
      setPairList(items);
    }
  };

  const selectCardForPairing = (clickedName: string) => {
    setSelectedList((list: TeamMember[]) => {
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
    const newPairItem: Pair = {
      id: pairList.length,
      items: [...selectedList],
    };
    setPairList([...pairList, newPairItem]);
    setTeamMemberPoolList(
      teamMemberPool.filter((item) => {
        return !selectedList.find((ele) => ele.name === item.name);
      })
    );
    setSelectedList([]);
  };

  console.log(pairList);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className={styles.boardWrapper}>
        <Grid gridTemplateColumns="1fr auto" alignItems="center">
          <GridItem>
            <Droppable droppableId="defaultDropArea" direction="horizontal">
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  padding={4}
                  className={styles.cardContainer}
                  display="flex"
                  gap={4}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {teamMemberPool.map((colleague) => {
                    const isColleagueSelected =
                      selectedList.findIndex(
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
          </GridItem>
          <GridItem>
            <Button
              variant="solid"
              colorScheme="purple"
              className={styles.pairButton}
              onClick={addPairToBoard}
            >
              Pair
            </Button>
          </GridItem>
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
};

export default PairingBoard;
