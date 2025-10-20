import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { SparklesCore } from "@/components/ui/sparkles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "@/features/auth/authThunks";


const LoginPage = () => {
 const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error ,token,user} = useSelector((state) => state.auth);

  useEffect(()=>{
    console.log(token)
    if(token){
      navigate("/dashboard")
    }
  },[token])

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    const resultAction = await dispatch(loginWithGoogle(idToken));

    if (loginWithGoogle.fulfilled.match(resultAction)) {
      console.log("Login success:", resultAction.payload);
      navigate("/dashboard");
      
    } else {
      console.error("Login failed:", resultAction.payload);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white z-10">
        Welcome Back
      </h1>
      <p className="text-white/70 text-lg md:text-xl max-w-md text-center z-10">
        Sign in with Google to continue using our Collaborative board.
      </p>

      <div className="z-10 mt-6">
        {loading ? (
          <p className="text-white">Signing in...</p>
        ) : (
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
