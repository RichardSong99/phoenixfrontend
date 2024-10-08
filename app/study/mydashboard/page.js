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

import { QuizTable } from "../myquizzes/reviewquiz/quiztable";
import QBankViewer from "@/app/helper/components/qbank/qbankview/qbankviewer";
import TopicModules from "./dashboardcomponents/topicmodules/topicmodules";
import { Topic } from "@mui/icons-material";
import { TotalDashboard } from "./dashboardcomponents/totaldashboard/totaldashboard";

export default function MyDashboard() {

  const router = useRouter();


  return (
    <div className="flex flex-col w-full justify-center p-10 gap-4">
      <div className="flex flex-row w-full justify-center landing-section">
        <Card
          className="bg-blue-500 rounded-lg shadow-md p-4"
          style={{ width: "100%" }}
        >
          <CardHeader>
            <h1 className="text-2xl font-bold text-white">Welcome, Richard</h1>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-row w-full justify-between items-center">
            <div>
              <h5 className="font-bold text-large">My Dashboard</h5>
              </div>
          </div>
        </CardHeader>
        <CardBody>
          <TotalDashboard />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-row w-full justify-between items-center">
            <div>
              <h5 className="font-bold text-large">Practice Questions</h5>
              </div>
              <div className = "flex flex-row gap-4">
              <Button
                // className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full"
                // onPress={onOpen}
                color = "secondary"
              >
                Custom Practice
              </Button>

              <Button
                onClick={() => router.push("/study/browse")}
                color="primary"
                // className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-0.5 px-4 rounded-full"
              >
                Browse all Questions
              </Button>
              </div>
          </div>
        </CardHeader>
        <CardBody>
            <TopicModules />
        </CardBody>
      </Card>

    </div>
  );
}
