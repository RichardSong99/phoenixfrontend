"use client"

import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";

export default function AuthLoading({message}) {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center text-[25px]">
            {message}
            <Spinner className="mt-[30px]"/>
        </div>

    );



}