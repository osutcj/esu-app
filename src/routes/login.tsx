import { Button, styled } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithApple,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { auth } from "../firebase";
// import styled from 'styled-components';
import esulogo from "../static/ESULogo.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // console.log("asd");
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithApple, appleUser, appleLoading, appleError] =
    useSignInWithApple(auth);

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
          className="!bg-[#ea4335]"
        >
          Sign in with Google
        </Button>
        {/* <Button
          variant="contained"
          startIcon={<AppleIcon />}
          onClick={() => signInWithApple()}
          size="large"
          className="!bg-[#050708]"
        >
          Sing in with Apple
        </Button> */}
      </div>
    </div>
  );
};

export default Login;
