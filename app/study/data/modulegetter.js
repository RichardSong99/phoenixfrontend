"use client"

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import { fetchQuiz, fetchQuizUnderlyingById } from "@/app/services/quizservice";
import { fetchPracticeModule } from "@/app/services/parameterdataservice";
import { fetchLessonModule } from "@/app/services/parameterdataservice";
import { fetchVideosById } from "@/app/services/videoservice";



export const loadPracticeModules = async () => {
    const pmIDs = [
        "Linear equations in 1 variable",
        "Linear equations in 2 variables",
        "Linear functions",
        "Systems of 2 linear equations in 2 variables",
        "Linear inequalities in 1 or 2 variables"
    ];

    const tempPracticeModules = [];

    for (const group of pmIDs) {
        try {
            const response = await fetchQuiz({ quizName: group });
            const fullResponse = await fetchQuizUnderlyingById({ quizID: response.id });
            tempPracticeModules.push({
                name: group,
                total: fullResponse.NumTotal,
                completed: fullResponse.NumAnswered,
                type: "practiceQuestions",
                tier: "free"
            });
        } catch (error) {
            try {
                const response = await fetchPracticeModule({ name: group });
                tempPracticeModules.push({
                    name: group,
                    total: response.QuestionIDs.length,
                    completed: 0,
                    type: "practiceQuestions",
                    tier: "free"
                });
            } catch (error) {
                console.log("Error fetching practice module:", error);
            }
        }
    }

    return tempPracticeModules;
};

export const loadLessonModules = async () => {
    const lessonIDs = [
        "Linear equations in 1 variable",
        "Linear equations in 2 variables",
    ];

    const tempLessonModules = [];

    for (const group of lessonIDs) {
        let tempLessonModule = { name: group };
        try {
            const response = await fetchLessonModule({ name: group });
            tempLessonModule.total = response.VideoIDs.length;
            const fullResponse = await fetchVideosById({ videoIDList: response.VideoIDs });
            tempLessonModule.completed = fullResponse.numWatched;
            tempLessonModule.type = "lessons";
            tempLessonModule.tier = "free";
        } catch (error) {
            tempLessonModule.total = 0;
            tempLessonModule.completed = 0;
            tempLessonModule.type = "lessons";
            tempLessonModule.tier = "free";
        }
        tempLessonModules.push(tempLessonModule);
    }
    return tempLessonModules;
}

export const goToModule = ({ groupName, type }) => {
    const router = useRouter();
    const activeIndex = 0;
    const formattedGroupName = encodeURIComponent(groupName);
    router.push(`/study/${type === 'practiceQuestions' ? 'practicemodule' : 'lessonmodule'}/${formattedGroupName}/${activeIndex}`);
}