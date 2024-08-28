"use client"

import React, {useState} from "react";
import LoginPanel from "./login/loginpanel";
import RegisterPanel from "./register/registerpanel";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";


export default function Landing() {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div className="h-[71%] w-[25%] rounded-[20px] border-[1px] border-appleGray5 pt-[30px] shadow-custom">
            <div className="h-full w-full p-[20px] flex-col justify-center items-center">
                <Tabs aria-label="Options" className="ml-[100px]">
                    <Tab title="Log in">
                        <LoginPanel /> 
                    </Tab>
                    <Tab title="Sign up">
                        <RegisterPanel />
                    </Tab>
                </Tabs>
            </div>
        </div>
    </div>
  );
}
