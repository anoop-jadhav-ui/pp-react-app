import { Box, Tooltip, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import {
  calculateContrastRatioHex,
  cssColorNameToHex,
} from "../../../utils/colorUtils";
import styles from "./DraggableCard.module.css";

interface CardProps {
  index: number;
  isSelected: boolean;
  selectCard?: (id: number) => void;
  title: string;
  color?: string;
  toolTipText?: string;
}

const DraggableCard = ({
  isSelected,
  index,
  selectCard,
  title,
  color = "khaki",
  toolTipText,
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
        <Tooltip title={toolTipText}>
          <Box
            component="div"
            className={`${styles.card} ${isSelected ? styles.selected : ""}`}
            ref={provided.innerRef}
            onClick={() => selectCard?.(index)}
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
        </Tooltip>
      )}
    </Draggable>
  );
};

export default DraggableCard;
