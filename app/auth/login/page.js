"use client"

import React, {useState} from "react";
import AuthPanel from "../authpanel";

export default function Login() {

  return (
    <div>
      <AuthPanel initialSelectedTab="Login" />
    </div>
  );
}
