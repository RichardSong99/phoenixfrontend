"use client"

import React, {useState} from "react";
import LoginPanel from "../login/loginpanel";


export default function Register() {

  const [isLoginMode, setIsLoginMode] = useState(false);

  return (
    <main>
      <LoginPanel 
        isLoginMode = {isLoginMode}
        setIsLoginMode = {setIsLoginMode}
      />
    </main>
  );
}
