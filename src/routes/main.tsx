import {
  Alert,
  BottomNavigation,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
} from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FeedIcon from "@mui/icons-material/Feed";
import HouseIcon from "@mui/icons-material/House";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import {
  BrowserRouter,
  NavLink,
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
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

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
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            justifyContent: "space-around",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <BottomNavigationAction
            label="Recents"
            component={() => (
              <NavLink
                className="w-1/3 flex items-center justify-center"
                to="/app/feed"
              >
                {({ isActive }) => (
                  <ButtonBase
                    className="rounded-0"
                    onClick={() => {}}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <FeedIcon
                      sx={{ color: isActive ? "#ffcd29" : "default" }}
                    />
                  </ButtonBase>
                )}
              </NavLink>
            )}
          ></BottomNavigationAction>
          <BottomNavigationAction
            label="Recents"
            component={() => (
              <NavLink
                className="w-1/3 flex items-center justify-center"
                to="/app"
                end
              >
                {({ isActive }) => (
                  <ButtonBase
                    className="rounded-0"
                    onClick={() => {}}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <CalendarIcon
                      sx={{ color: isActive ? "#ffcd29" : "default" }}
                    />
                  </ButtonBase>
                )}
              </NavLink>
            )}
          ></BottomNavigationAction>
          <BottomNavigationAction
            label="Recents"
            component={() => (
              <NavLink
                className="w-1/3 flex items-center justify-center"
                to="/app/houses"
              >
                {({ isActive }) => (
                  <ButtonBase
                    className="rounded-0"
                    onClick={() => {}}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <HouseIcon
                      className="transition-colors"
                      sx={{ color: isActive ? "#ffcd29" : "default" }}
                    />
                  </ButtonBase>
                )}
              </NavLink>
            )}
          ></BottomNavigationAction>
        </BottomNavigation>
      </Paper>
      <Snackbar
        open={showNotification}
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
