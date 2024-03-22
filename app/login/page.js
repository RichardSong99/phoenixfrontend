"use client"

import React, {useState} from "react";
import LoginPanel from "./loginpanel";


export default function Login() {

  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <main>
      <LoginPanel 
        isLoginMode = {isLoginMode}
        setIsLoginMode = {setIsLoginMode}
      />
    </main>
  );
}
