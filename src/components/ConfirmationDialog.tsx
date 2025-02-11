import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  title?: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  itemName?: string;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed?',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  itemName,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {description}
        </DialogContentText>
        {itemName && (
          <Typography
            sx={{
              fontWeight: 'bold',
              marginTop: 1,
            }}
          >
            {itemName}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isLoading}>
          {cancelButtonText}
        </Button>
        <Button
          onClick={onConfirm}
          color="secondary"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            confirmButtonText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
