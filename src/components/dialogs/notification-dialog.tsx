import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
} from "@mui/material";
import { getToken } from "firebase/messaging";
import { useNavigate } from "react-router-dom";
import { messaging, vapidKey } from "../../firebase";

interface NotificationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NotificationDialog = ({ open, setOpen }: NotificationDialogProps) => {
  const navigate = useNavigate();

  return (
    <Paper>
      <DialogTitle>Enable notifications?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          In order to use the app, you need to enable notifications.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={async () => {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              navigate("/app");
            }
          }}
        >
          Turn notifications on
        </Button>
      </DialogActions>
    </Paper>
  );
};

export default NotificationDialog;
