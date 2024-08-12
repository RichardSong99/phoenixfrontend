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

import { QuizTable } from "./reviewquiz/quiztable";
import QuestionFilterSort from "@/app/helper/components/filter/questionfiltersort";

export default function MyDashboard() {

  const router = useRouter();
  const [createQuiz, setCreateQuiz] = useState(false);

  const createQuizHandler = () => {
    setCreateQuiz(!createQuiz);
  };

  return (
    <div className="flex flex-col w-full justify-center p-10 gap-4">
      <div className="flex flex-row w-full justify-center landing-section">
        <Card
          className="bg-blue-500 rounded-lg shadow-md p-4"
          style={{ width: "100%" }}
        >
          <CardHeader>
            <h1 className="text-2xl font-bold text-white">My Quizzes</h1>
          </CardHeader>
        </Card>
      </div>



      <Card>
        <CardHeader>
          <div className="flex flex-row w-full justify-between items-center">
            <div>
              <h5 className="font-bold text-large">Review Quizzes</h5>
            </div>

            <div className="flex flex-row gap-2">
            <Button color = "primary">Review all</Button>
            <Button color = "primary" onClick={createQuizHandler}>Start new quiz</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <QuizTable />
        </CardBody>
      </Card>

      {createQuiz && 
        <div className="absolute w-[90%] top-[10%] right-[5%] bg-white border-[3px] border-appleGray4 rounded-[20px] z-[10]">
          <QuestionFilterSort />
        </div>
      }
    </div>
  );
}
