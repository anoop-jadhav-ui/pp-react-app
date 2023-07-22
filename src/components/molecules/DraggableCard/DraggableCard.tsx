import { Card, CardHeader } from "@chakra-ui/react";
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
				<Card
					ref={provided.innerRef}
					className={`${styles.card} ${isSelected ? styles.selected : ""}`}
					backgroundColor="#ffff88"
					draggable
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					onClick={() => selectCard?.(title)}
				>
					<CardHeader className={styles.cardHeader}>{title}</CardHeader>
				</Card>
			)}
		</Draggable>
	);
};

export default DraggableCard;
