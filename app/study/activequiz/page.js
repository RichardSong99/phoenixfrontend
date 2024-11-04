"use client";

import React, { useEffect, useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import ContentViewer from '@/app/helper/components/newquestionview/contentviewer';
import { useData } from '@/app/helper/context/datacontext';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize `action` and `quizID` from search parameters once
    const [action, setAction] = useState(searchParams.get("action"));
    const [quizID, setQuizID] = useState(searchParams.get("quizid"));

    const handleClose = () => {
        router.push(`/study/myquizzes/`);
    };

    const { setGlobalLoading } = useData();
    const {
        setupActiveQuizMode, 
        setupReviewQuizMode,
        setupAdaptiveQuizMode,
        resumeTestQuiz,
        NEWADAPTIVEQUIZACTION,
        NEWTESTACTION,
        RESUMEACTION,
        REVIEWACTION,
    } = useContext(QuestionContext);

    useEffect(() => {
        const initializeContentViewer = async () => {
            console.log("Initializing ContentViewer with action:", action, "and quizID:", quizID);

            // setGlobalLoading(true);

            try {
                if (action === NEWADAPTIVEQUIZACTION) {
                    await setupAdaptiveQuizMode(quizID);
                } else if (action === NEWTESTACTION) {
                    // Add logic here if needed
                } else if (action === RESUMEACTION) {
                    await resumeTestQuiz(quizID);
                } else if (action === REVIEWACTION) {
                    await setupReviewQuizMode(quizID);
                }
            } catch (error) {
                console.error("Error initializing quiz:", error);
            } finally {
                // setGlobalLoading(false);
                console.log("ContentViewer initialization complete.");
            }
        };

        

        // Only initialize when `action` and `quizID` are defined
        if (action && quizID) {
            initializeContentViewer();
        }
    }, []);

    

    return (
        <ContentViewer />
    );
}
