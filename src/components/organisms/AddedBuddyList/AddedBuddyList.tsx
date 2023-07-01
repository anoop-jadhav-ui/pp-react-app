import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  Heading,
  ListItem,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "../../../contexts/formContext";
import styles from "./AddedBuddyList.module.css";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function DeleteDialog({
  isOpen,
  onConfirm,
  onClose,
  deletedItem,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deletedItem: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Are you sure you want to delete{" "}
          <Text display="inline" color="purple.600">
            {deletedItem}
          </Text>
          ?
        </ModalHeader>
        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" mr={3} onClick={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function AddedBuddyList() {
  const navigate = useNavigate();
  const { nameList, setNameList } = useFormContext();
  const deleteDialogMethods = useDisclosure();
  const [deletedItem, setDeletedItem] = useState("");

  const removeItem = () => {
    if (nameList.includes(deletedItem)) {
      setNameList((list) => list.filter((ele) => ele !== deletedItem));
    }
    deleteDialogMethods.onClose();
  };

  const openDeleteConfirmationModal = (itemToBeDeleted: string) => {
    setDeletedItem(itemToBeDeleted);
    deleteDialogMethods.onOpen();
  };

  return (
    <Card mt={4} variant="outline">
      <CardHeader pb={0}>
        <Box display="flex" alignItems="center">
          <Heading as="h3" size="md">
            Updated Colleague Roster
          </Heading>
          <Tag size="md" colorScheme="purple" ml="2">
            {nameList.length}
          </Tag>
        </Box>
      </CardHeader>
      <CardBody py={1}>
        <Grid className="list">
          <UnorderedList className={styles.list} listStyleType="none" p="2">
            {nameList.map((name) => {
              return (
                <ListItem key={name}>
                  <Text>{name}</Text>
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    className={styles.removeIcon}
                    onClick={() => openDeleteConfirmationModal(name)}
                    p={0.25}
                    title="delete item"
                  >
                    <DeleteIcon />
                  </Button>
                </ListItem>
              );
            })}
          </UnorderedList>
          <DeleteDialog
            onClose={deleteDialogMethods.onClose}
            isOpen={deleteDialogMethods.isOpen}
            onConfirm={removeItem}
            deletedItem={deletedItem}
          />
        </Grid>
      </CardBody>
      <CardFooter>
        <Button
          colorScheme="purple"
          variant="solid"
          width="100%"
          onClick={() => navigate("/pairing-board")}
        >
          Start Pairing
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddedBuddyList;
