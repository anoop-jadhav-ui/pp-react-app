import { Card, CardHeader, Box } from "@chakra-ui/react";
import { useFormContext } from "../../contexts/formContext";
import styles from "./PairingBoard.module.css";

const PairingBoard = () => {
  const { nameList } = useFormContext();
  const size = 800;
  const cardSize = 100;
  const radius = 300;

  return (
    <Box
      padding={4}
      className={styles.cardContainer}
      height={size}
      width={size}
    >
      {nameList.map((name, i) => {
        const center = size / 2 - cardSize / 2;
        const angle = (2 * Math.PI) / nameList.length;
        return (
          <Card
            className={styles.card}
            key={name}
            height={cardSize}
            width={cardSize}
            backgroundColor="#ffff88"
            draggable
            style={{
              top: center + Math.cos(i * angle) * radius,
              left: center + Math.sin(i * angle) * radius,
            }}
          >
            <svg>
              <line id="line1" style={{}} />
            </svg>
            <CardHeader className={styles.cardHeader}>{name}</CardHeader>
          </Card>
        );
      })}
    </Box>
  );
};

export default PairingBoard;
