"use client"

import React, {useState} from "react";
import LoginPanel from "../login/loginpanel";


export default function Register() {

  const [isLoginMode, setIsLoginMode] = useState(false);

  return (
    <div>
      <LoginPanel 
        isLoginMode = {isLoginMode}
        setIsLoginMode = {setIsLoginMode}
      />
    </div>
  );
}
