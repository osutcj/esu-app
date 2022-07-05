import {
  BottomNavigation,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { messaging, vapidKey } from "../firebase";
import NotificationDialog from "../components/dialogs/notification-dialog";
import { isPushSupported } from "../util/is-push-supported";

const NotificationsConfirm = () => {
  const [value, setValue] = useState("recents");
  const [open] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isPushSupported()) {
      if (Notification.permission !== "granted") {
        // do nothing
      } else {
        navigate("/");
      }
    } else {
      navigate("/app");
    }
  }, []);

  return <NotificationDialog open={true} setOpen={() => {}} />;
};

export default NotificationsConfirm;
