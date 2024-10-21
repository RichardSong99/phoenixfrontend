import React, { useState, useEffect } from "react";

import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Spinner size="lg" />
        </div>
    );
}