"use client"

import React, {useState} from "react";
import LoginPanel from "./loginpanel";


export default function Login() {

  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div>
      <LoginPanel 
        isLoginMode = {isLoginMode}
        setIsLoginMode = {setIsLoginMode}
      />
    </div>
  );
}
