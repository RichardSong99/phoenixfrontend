"use client"

import React, { useState, useEffect } from "react";
import RegisterPanel from "./register/registerpanel";
import LoginPanel from "./login/loginpanel";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import AuthPanel from "./authpanel";

export default function Landing() {
    return (
        <AuthPanel initialSelectedTab="Signup" />

    );



}