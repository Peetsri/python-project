import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export default function ErrorDialog(props: ErrorDialogProps) {
  const { open, onClose, message } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
