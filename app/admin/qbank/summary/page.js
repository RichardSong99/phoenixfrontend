"use client"

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
  Button,
} from "@nextui-org/react";

import { useRouter } from 'next/navigation';
import { UserProvider } from "@/app/helper/context/usercontext";
import QBankSummaryTable from "./qbanksummarytable";

export default function QBankSummary() {

  const router = useRouter();


  return (
    <UserProvider>
      <div className="flex flex-col w-full justify-center p-10 gap-4">
        <div className="flex flex-row w-full justify-center landing-section">
          <Card
            className="bg-blue-500 rounded-lg shadow-md p-4"
            style={{ width: "100%" }}
          >
            <CardHeader>
              <h1 className="text-2xl font-bold text-white">Question Bank Summary</h1>
            </CardHeader>
          </Card>
        </div>

        

        <Card>
          <CardHeader>
            <div className="flex flex-row w-full justify-between items-center">
              <div>
                <h5 className="font-bold text-large">Question Bank</h5>
              </div>
              {/* <Button color = "primary">Review all</Button> */}
            </div>
          </CardHeader>
          <CardBody>
            <QBankSummaryTable />
          </CardBody>
        </Card>
      </div>
    </UserProvider>
  );
}