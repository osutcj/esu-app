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
import CalendarIcon from "@mui/icons-material/CalendarToday";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { messaging, onMessageListener, vapidKey } from "../firebase";
import { useToken } from "react-firebase-hooks/messaging";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Main = () => {
  const [value, setValue] = useState("recents");
  const [token, loading, error] = useToken(messaging, vapidKey);
  const [authState] = useAuthState(auth);

  useEffect(() => {
    //do stuff with user data (authState)
  }, [authState]); // Trebuie pus authState in dependency array ca sa se repete query-ul cand vin datele despre user de la firebase

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
        sx={{
          position: "fixed",
          bottom: 15,
          left: 120,
          right: 120,
          opacity: "80%",
          borderRadius: 15,
        }}
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
            borderRadius: 15,
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
