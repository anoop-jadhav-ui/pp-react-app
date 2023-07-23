import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePairingStore } from "../../../store/pairingStore";
import { useTeamMemberStore } from "../../../store/teamMembersStore";

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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to delete ${deletedItem} ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const AddedBuddyList = observer(() => {
  const navigate = useNavigate();
  const { teamMemberList, setTeamMemberList } = useTeamMemberStore();
  const { setTeamMemberPoolList } = usePairingStore();

  const [isOpen, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);
  const openDialog = () => setOpen(true);

  const [deletedItem, setDeletedItem] = useState("");

  const removeItem = () => {
    if (teamMemberList.find((item) => item.name === deletedItem)) {
      setTeamMemberList(
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
    setTeamMemberPoolList(teamMemberList);
    navigate("/pairing-board");
  };

  return (
    <>
      <Stack spacing={2} direction="row" alignItems="center" pb={2}>
        <Typography variant="h5" component="h3">
          Added Colleague List
        </Typography>
        <Chip
          label={teamMemberList.length}
          color="info"
          variant="outlined"
          size="small"
          sx={{ width: 44 }}
        />
      </Stack>
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
      <Box textAlign="center" component="div" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={startPairingHandler}>
          Start Pairing
        </Button>
      </Box>
    </>
  );
});

export default AddedBuddyList;
