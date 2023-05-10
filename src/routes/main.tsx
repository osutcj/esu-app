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
import { SyntheticEvent, useEffect, useState } from "react";
import { messaging, onMessageListener, vapidKey } from "../firebase";
import { useToken } from "react-firebase-hooks/messaging";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import UserService from "../services/users.service";
import { DocumentData } from "firebase/firestore";
import { UserType } from "../types/users";
import LinkIcon from "@mui/icons-material/Link";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import logo from "../static/ESUlogomare.png";

const Main = () => {
  const [value, setValue] = useState(0);
  const [token, loading, error] = useToken(messaging, vapidKey);
  const [authState] = useAuthState(auth);
  useEffect(() => {
    console.log("aw");
    //do stuff with user data (authState)
    UserService.getById(authState?.uid).then(
      (response: DocumentData | undefined) => {
        if (response?.data == undefined) {
          UserService.insert({
            id: authState?.uid,
            house: "unassigned",
            score: 0,
          } as UserType);
        }
      }
    );
  }, [authState]); // Trebuie pus authState in dependency array ca sa se repete query-ul cand vin datele despre user de la firebase

  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");

  onMessageListener()
    .then((payload) => {
      console.log(payload);
      setNotification(payload?.notification?.body || "No message.");
      setShowNotification(true);
    })
    .catch(() => {});

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <Paper
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
        elevation={3}
      >
        <div
          className="flex items-center justify-center justify-between w-100% "
          style={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: "#1A1A1A",
          }}
        >
          <div className="p-5">
            <img src={logo} className="w-25"></img>
          </div>
          <div className="">
            <PermIdentityIcon
              sx={{
                fontSize: 40,
                color: "white",
                backgroundColor: "#333333",
                borderRadius: 10,
                padding: 1,
              }}
              className="mr-4"
            />
          </div>
        </div>
      </Paper>
      <Paper
        sx={{
          position: "fixed",
          bottom: 15,
          left: 110,
          right: 110,
          opacity: "80%",
          borderRadius: 15,
          backgroundColor: "#1A1A1A",
        }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          sx={{
            justifyContent: "space-around",
            WebkitTapHighlightColor: "transparent",
            borderRadius: 10,
            backgroundColor: "#1A1A1A",
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
                    <FeedIcon sx={{ color: isActive ? "#ffcd29" : "white" }} />
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
                      sx={{ color: isActive ? "#ffcd29" : "white" }}
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
                      sx={{ color: isActive ? "#ffcd29" : "white" }}
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
                to="/app/links"
              >
                {({ isActive }) => (
                  <ButtonBase
                    className="rounded-0"
                    onClick={() => {}}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <LinkIcon
                      className="transition-colors"
                      sx={{ color: isActive ? "#ffcd29" : "white" }}
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
