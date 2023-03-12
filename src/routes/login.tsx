import { Button } from "@mui/material";
import { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "../firebase";
import esulogo from "../static/ESULogo.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user?.uid) {
        navigate("/notifications");
      }
    }
  }, [user, loading]);

  return (
    <div className="w-screen flex flex-col gap-16 items-center overflow-x-hidden">
      <img src={esulogo} className="w-48 mt-16" />

      <div className="text-4xl w-full text-center font-bold">
        Engineering Summer University
      </div>

      <div className="flex flex-col gap-2 w-80">
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={() => signInWithGoogle()}
          size="large"
          className="!bg-[#ea4335] !text-white"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
