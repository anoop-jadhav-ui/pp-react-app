import { Box, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import styles from "./DraggableCard.module.css";

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
          className={`${styles.card} ${isSelected ? styles.selected : ""}`}
          ref={provided.innerRef}
          draggable
          onClick={() => selectCard?.(title)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
