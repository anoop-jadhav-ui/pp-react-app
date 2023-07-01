import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useFormContext } from "../../../contexts/formContext";
import { reorder } from "../../../utils/dragAndDropUtils";
import styles from "./PairingBoard.module.css";

const PairingBoard = () => {
  const { nameList, setNameList } = useFormContext();
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder<string>(
      nameList,
      result.source.index,
      result.destination.index
    );
    setNameList(items);
  };

  const selectCardForPairing = (clickedName: string) => {
    setSelectedList((list: string[]) => {
      if (list.includes(clickedName)) {
        return list.filter((item) => item !== clickedName);
      } else {
        return [...list, clickedName];
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className={styles.boardWrapper}>
        <Grid gridTemplateColumns="1fr auto" alignItems="center">
          <GridItem>
            <Droppable droppableId="cardDefaultDropArea" direction="horizontal">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  padding={4}
                  className={styles.cardContainer}
                  display="flex"
                  gap={4}
                  {...provided.droppableProps}
                >
                  {nameList.map((name, i) => {
                    const isCardSelected = selectedList.includes(name);
                    return (
                      <Draggable
                        draggableId={`draggable-${name}`}
                        index={i}
                        key={name}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            className={`${styles.card} ${
                              isCardSelected ? styles.selected : ""
                            }`}
                            key={name}
                            backgroundColor="#ffff88"
                            draggable
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => selectCardForPairing(name)}
                          >
                            <CardHeader className={styles.cardHeader}>
                              {name}
                            </CardHeader>
                          </Card>
                        )}
                      </Draggable>
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
            >
              Pair
            </Button>
          </GridItem>
        </Grid>

        <Droppable droppableId="board">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              className={styles.board}
              {...provided.droppableProps}
            ></Box>
          )}
        </Droppable>
      </Box>
    </DragDropContext>
  );
};

export default PairingBoard;
