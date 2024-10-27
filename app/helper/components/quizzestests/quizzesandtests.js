"use client"

import React, { useState } from "react";

import { QuizTable } from "@/app/study/myquizzes/reviewquiz/quiztable";
import { TestTable } from "@/app/study/mytests/reviewtest/testtable";
import {Tabs, Tab} from "@nextui-org/react";

 const QuizzesAndTests = () => {
    return (
        <div className = "w-full">
            <Tabs>
                <Tab title="Quizzes">
                <QuizTable />
                </Tab>
                <Tab title="Tests">
                <TestTable />
                </Tab>

            </Tabs>
    
          
        </div>
    );
}

export default QuizzesAndTests;