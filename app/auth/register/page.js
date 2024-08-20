"use client"

import React, {useState} from "react";
import RegisterPanel from "./registerpanel";


export default function Register() {

  const [isLoginMode, setIsLoginMode] = useState(false);

  return (
    <div>
      <RegisterPanel />
    </div>
  );
}
