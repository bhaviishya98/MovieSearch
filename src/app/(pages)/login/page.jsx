"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/firebase";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
} from "@/lib/features/userSlice";

import {
  getRequestToken,
  authenticateRequestToken,
  createSessionId,
  getAccountDetails,
} from "@/lib/tmdbAuth";
import {  signInWithPopup } from "firebase/auth";


const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);

        // TMDB Session Setup
        try {
          const requestToken = await getRequestToken();
          await authenticateRequestToken(requestToken);
          const sessionId = await createSessionId(requestToken);
          const accountDetails = await getAccountDetails(sessionId);

          localStorage.setItem("sessionId", sessionId);
          localStorage.setItem("accountId", accountDetails.id);

          router.push("/home");
        } catch (error) {
          console.error("TMDB Auth Error:", error);
        }
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, [dispatch, router]);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const handleFirebaseLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Firebase login succeeded; TMDB handled in onAuthStateChanged
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <section className="h-screen flex flex-col text-center relative overflow-hidden">
      {/* Content */}
      <div className="flex flex-col justify-center items-center h-full px-10 py-20 relative z-10">
        <div className="max-w-xl w-full flex flex-col items-center">
          <img
            src="/images/cta-logo-one.svg"
            alt="Logo One"
            className="mb-3 w-full max-w-lg"
          />
          <button
            onClick={handleFirebaseLogin}
            className="w-full bg-[#0063e5] text-white font-bold py-4 text-lg rounded hover:bg-[#0483ee] transition duration-200 mb-3 tracking-wide"
          >
            Get Started with Google
          </button>
          <p className="text-gray-200 text-xs mb-6 tracking-wide leading-5">
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $1.
          </p>
          <img
            src="/images/cta-logo-two.png"
            alt="Logo Two"
            className="w-full max-w-lg"
          />
        </div>
      </div>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/login-background.jpg')" }}
      />
    </section>
  );
};

export default Login;
