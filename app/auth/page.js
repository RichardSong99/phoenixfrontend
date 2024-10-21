"use client"

import React, { useState, useEffect } from "react";
import RegisterPanel from "./register/registerpanel";
import LoginPanel from "./login/loginpanel";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

export default function Landing() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="">
                <Tabs aria-label="Options">
                    <Tab title="Signup">
                    <Card>
                        <RegisterPanel />
                    </Card>  
                    </Tab>
                    <Tab title="Login">
                    <Card>
                        <LoginPanel />
                    </Card>  
                    </Tab>
                </Tabs>
            </div>
        </div>

    );



}