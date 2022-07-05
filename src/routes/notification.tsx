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

const NotificationsConfirm = () => {
  const [value, setValue] = useState("recents");

  const navigate = useNavigate();

  useEffect(() => {
    if (Notification.permission !== "granted") {
      // do nothing
    } else {
      navigate("/");
    }
  }, []);

  return <NotificationDialog open setOpen={() => {}} />;
};

export default NotificationsConfirm;
