import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

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
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={onConfirm} autoFocus variant="contained" color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
