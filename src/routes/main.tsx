import {
  Alert,
  BottomNavigation,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "../routes/login";
import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging, onMessageListener, vapidKey } from "../firebase";
import NotificationDialog from "../components/dialogs/notification-dialog";
import { useToken } from "react-firebase-hooks/messaging";

const Main = () => {
  const [value, setValue] = useState("recents");
  const [open, setOpen] = useState(false);

  const [token, loading, error] = useToken(messaging, vapidKey);

  useEffect(() => {
    if (!loading) {
      console.log(token);
    }
  }, [loading, token]);

  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");

  onMessageListener()
    .then((payload) => {
      console.log(payload);
      setNotification(payload?.notification?.body || "No message.");
      setShowNotification(true);
    })
    .catch(() => {});

  return (
    <>
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setShowNotification(false)} severity="info">
          {notification}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Main;
