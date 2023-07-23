import { Box, Grid, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import { Pair } from "../../../store/pairingStore";
import { getListStyle } from "../../../utils/dragAndDropUtils";
import DraggableCard from "./DraggableCard";
import styles from "./DroppablePair.module.css";

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
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="subtitle2">{`Pair ${pairItem.id}`}</Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {pairItem.items.map((item) => {
                  return (
                    <Grid item key={item.id}>
                      <DraggableCard
                        key={item.id}
                        title={item.name}
                        index={item.id}
                        isSelected={false}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              {provided.placeholder}
            </Grid>
          </Grid>
        </Box>
      )}
    </Droppable>
  );
};

export default DroppablePair;
