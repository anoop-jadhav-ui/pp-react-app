import { Draggable } from "react-beautiful-dnd";
import styles from "./DraggableCard.module.css";
import { Box, Typography } from "@mui/material";

interface CardProps {
  index: number;
  isSelected: boolean;
  selectCard?: (name: string) => void;
  title: string;
}
const DraggableCard = ({ isSelected, index, selectCard, title }: CardProps) => {
  return (
    <Draggable draggableId={`draggable-${index}`} index={index}>
      {(provided) => (
        <Box
          component="div"
          ref={provided.innerRef}
          className={`${styles.card} ${isSelected ? styles.selected : ""}`}
          draggable
          onClick={() => selectCard?.(title)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            backgroundColor: "#ffff88",
          }}
        >
          <Typography variant="subtitle2" className={styles.cardHeader}>
            {title}
          </Typography>
        </Box>
      )}
    </Draggable>
  );
};

export default DraggableCard;
