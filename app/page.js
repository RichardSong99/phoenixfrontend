"use client"

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();

    useEffect(() => {
        router.push("https://www.prepmodo.com");
    }, []);


    return (
        <div>
        </div>
    );
}