import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import {
  useSignInWithApple,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Login = () => {
  // console.log("asd");
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithApple, appleUser, appleLoading, appleError] =
    useSignInWithApple(auth);

  return (
    <div>
      <button onClick={() => signInWithGoogle()}>Sign In</button>
    </div>
  );
};

export default Login;
