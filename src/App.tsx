import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useFixHeight } from "./hooks/use-fix-height";
import Login from "./routes/login";
import NotificationsConfirm from "./routes/notification";
import Main from "./routes/main";
import MainIndex from "./routes/main/index";
import useApplicationGuards, {
  AppGuardTo,
} from "./hooks/use-application-guards";
import { Feed } from "./routes/main/feed";
import { Houses } from "./routes/main/houses";

function App() {
  useFixHeight();
  const [appGuardsLoading, appGuardTo] = useApplicationGuards();

  useEffect(() => {
    if (!appGuardsLoading) {
      console.log(appGuardTo);
    }
  }, [appGuardsLoading, appGuardTo]);

  
  return (
    <div className="w-screen flex flex-col h-screen-fixed">
      <Routes>
        <Route
          path="/"
          element={(() => {
            switch (appGuardTo) {
              case AppGuardTo.Authenticate:
                return <Navigate to="/login" />;
              case AppGuardTo.NotificationConfirm:
                return <Navigate to="/notification" />;
              case AppGuardTo.Application:
                return <Navigate to="/app" />;
              default:
                return <></>;
            }
          })()}
        />
        <Route path="login" element={<Login />} />
        <Route path="notifications" element={<NotificationsConfirm />} />
        <Route path="app" element={<Main />}>
          <Route index element={<MainIndex />} />
          <Route path="feed" element={<Feed />} />
          <Route path="houses" element={<Houses />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
