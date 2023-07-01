import { Box, Card, CardHeader } from "@chakra-ui/react";
import { useFormContext } from "../../../contexts/formContext";
import styles from "./PairingBoard.module.css";

const PairingBoard = () => {
  const { nameList } = useFormContext();

  return (
    <Box className={styles.boardWrapper}>
      <Box padding={4} className={styles.cardContainer} display="flex" gap={2}>
        {nameList.map((name) => {
          return (
            <Card
              className={styles.card}
              key={name}
              backgroundColor="#ffff88"
              draggable
            >
              <CardHeader className={styles.cardHeader}>{name}</CardHeader>
            </Card>
          );
        })}
      </Box>
      <Box className={styles.board}></Box>
    </Box>
  );
};

export default PairingBoard;
