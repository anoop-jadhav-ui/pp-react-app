import CloseIcon from "@mui/icons-material/Close";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
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
          component="div"
          ref={provided.innerRef}
          className={styles.pairOnBoard}
          {...provided.droppableProps}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">{`Pair ${pairItem.id}`}</Typography>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Grid>
          {pairItem.items.length === 0 && (
            <Grid
              item
              component="div"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              <Stack justifyContent="center" alignItems="center" spacing={1}>
                <FlipToFrontIcon color="primary" fontSize="large" />
                <Typography variant="body2">Drop here</Typography>
              </Stack>
            </Grid>
          )}
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              {pairItem.items.map((item) => {
                return (
                  <Grid item key={item.id}>
                    <DraggableCard
                      key={item.id}
                      title={item.name}
                      index={item.id}
                      isSelected={false}
                      color={item.color}
                    />
                  </Grid>
                );
              })}
              {provided.placeholder}
            </Grid>
          </Grid>
        </Box>
      )}
    </Droppable>
  );
};

export default DroppablePair;
