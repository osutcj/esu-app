import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export enum AppGuardTo {
  Application = "application",
  Authenticate = "authenticate",
  NotificationConfirm = "notification-confirm",
  NotYetAvailable = "not-yet-available",
}

export default function useApplicationGuards(): [boolean, AppGuardTo] {
  const [loading, setLoading] = useState(true);
  const [to, setTo] = useState<AppGuardTo>(AppGuardTo.NotYetAvailable);
  const [user, authLoading, error] = useAuthState(auth);

  useEffect(() => {
    if (!authLoading && user?.email) {
      if (Notification.permission === "granted") {
        setTo(AppGuardTo.Application);
      } else {
        setTo(AppGuardTo.NotificationConfirm);
      }
    } else {
      setTo(AppGuardTo.Authenticate);
    }
  }, [authLoading, user, error]);

  return [loading, to];
}
