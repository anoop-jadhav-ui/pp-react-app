import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePairingStore } from "../../../contexts/PairingStoreProvider";
import { useTeamMemberStore } from "../../../contexts/TeamMembersStoreProvider";
import DeleteDialog from "../../atoms/DeleteDialog/DeleteDialog";

const AddedBuddyList = observer(() => {
  const navigate = useNavigate();
  const teamMemberStore = useTeamMemberStore();
  const { teamMemberList } = teamMemberStore;

  const pairingStore = usePairingStore();

  const [isOpen, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);
  const openDialog = () => setOpen(true);

  const [deletedItem, setDeletedItem] = useState("");

  const removeItem = () => {
    if (teamMemberList.find((item) => item.name === deletedItem)) {
      teamMemberStore.setTeamMemberList(
        teamMemberList.filter((ele) => ele.name !== deletedItem)
      );
    }
    closeDialog();
  };

  const openDeleteConfirmationModal = (itemToBeDeleted: string) => {
    setDeletedItem(itemToBeDeleted);
    openDialog();
  };

  const startPairingHandler = () => {
    pairingStore.setTeamMemberPoolList(teamMemberList);
    navigate("/pairing-board");
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        pb={2}
        justifyContent="space-between"
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography
                variant="h6"
                component="h3"
                fontWeight="bold"
                sx={{ mr: 1.5 }}
              >
                Added Colleagues List
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={teamMemberList.length}
                color="secondary"
                variant="filled"
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            color="error"
            onClick={teamMemberStore.clearTeamMemberList}
          >
            Clear All
          </Button>
        </Grid>
      </Grid>
      <Paper variant="outlined">
        <Grid className="list">
          <List>
            {teamMemberList.map((colleague) => {
              return (
                <ListItem key={colleague.name} sx={{ p: 0 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={colleague.name} />
                    <IconButton
                      aria-label="delete"
                      size="medium"
                      onClick={() =>
                        openDeleteConfirmationModal(colleague.name)
                      }
                    >
                      <DeleteIcon fontSize="inherit" color="error" />
                    </IconButton>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <DeleteDialog
            onClose={closeDialog}
            isOpen={isOpen}
            onConfirm={removeItem}
            deletedItem={deletedItem}
          />
        </Grid>
      </Paper>
      <Box textAlign="center" component="div" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={startPairingHandler}
          sx={{ padding: "0.8125rem 2rem" }}
        >
          Start Pairing
        </Button>
      </Box>
    </>
  );
});

export default AddedBuddyList;
