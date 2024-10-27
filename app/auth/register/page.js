"use client"

import React, {useState} from "react";
import AuthPanel from "../authpanel";

export default function Register() {

  return (
    <div>
      <AuthPanel initialSelectedTab="Signup" />
    </div>
  );
}
