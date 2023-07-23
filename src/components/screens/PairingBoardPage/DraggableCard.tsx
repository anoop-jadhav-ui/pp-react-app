import { Box, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import styles from "./DraggableCard.module.css";
import {
  calculateContrastRatioHex,
  cssColorNameToHex,
} from "../../../utils/colorUtils";

interface CardProps {
  index: number;
  isSelected: boolean;
  selectCard?: (name: string) => void;
  title: string;
  color?: string;
}

const DraggableCard = ({
  isSelected,
  index,
  selectCard,
  title,
  color = "khaki",
}: CardProps) => {
  const ccrRatio = calculateContrastRatioHex(
    cssColorNameToHex("black"),
    cssColorNameToHex(color)
  );

  let textColor = "black";
  if (ccrRatio < 7) {
    textColor = "white";
  }

  return (
    <Draggable draggableId={`draggable-${index}`} index={index}>
      {(provided) => (
        <Box
          component="div"
          className={`${styles.card} ${isSelected ? styles.selected : ""}`}
          ref={provided.innerRef}
          onClick={() => selectCard?.(title)}
          {...{
            ...provided.draggableProps,
            style: {
              ...provided.draggableProps.style,
              background: color,
              color: textColor,
            },
          }}
          {...provided.dragHandleProps}
          draggable
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
