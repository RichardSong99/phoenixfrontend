"use client"

import React, { useState, useEffect } from "react";
import RegisterPanel from "./register/registerpanel";
import LoginPanel from "./login/loginpanel";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { useUser } from "../helper/context/usercontext";
import AuthLoading from "./loading/authloading";

export default function AuthPanel({initialSelectedTab}) {

    const [selectedTab, setSelectedTab] = useState(initialSelectedTab);
    const {authLoading} = useUser();

    if(authLoading) {
            return (
                <AuthLoading message = "Welcome! Taking you to your study room!"/>
            );
    }
        
        


    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 animate-gradient">
            <div className="">
                <Tabs aria-label="Options" selectedKey = {selectedTab} onSelectionChange={setSelectedTab}>
                    <Tab title="Signup" key = "Signup">
                    <Card>
                        <RegisterPanel />
                    </Card>  
                    </Tab>
                    <Tab title="Login" key = "Login">
                    <Card>
                        <LoginPanel />
                    </Card>  
                    </Tab>
                </Tabs>
            </div>

            {/* <style jsx>{`
                .animate-gradient {
                    background: linear-gradient(90deg, #1e3a8a, #3b82f6, #38bdf8, #1e3a8a);
                    background-size: 400% 400%;
                    animation: gradientAnimation 8s ease infinite;
                }

                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style> */}

        </div>

    );



}