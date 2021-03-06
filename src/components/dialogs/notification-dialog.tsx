import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { isSupported } from "firebase/analytics";
import { getToken } from "firebase/messaging";
import { useNavigate } from "react-router-dom";
import { messaging, vapidKey } from "../../firebase";
import { isPushSupported } from "../../util/is-push-supported";

interface NotificationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NotificationDialog = ({ open, setOpen }: NotificationDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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
            if (isPushSupported()) {
              const permission = await Notification.requestPermission();
              if (permission === "granted") {
                navigate("/app");
              }
            }
          }}
        >
          Turn notifications on
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;
