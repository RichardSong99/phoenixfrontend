"use client"

import React, { useState, useEffect, useContext } from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // Update import

import { QuestionContext } from '@/app/helper/context/questioncontext';
import ContentViewer from '@/app/helper/components/newquestionview/contentviewer';

export default function Page() {
    const router = useRouter(); // Update variable name
    const pathname = usePathname(); // Update variable name
    const searchParams = useSearchParams(); // Update variable name
    // const [quizID, activeIndex] = pathname.split('/').slice(-2).map(part => decodeURI(part));
    const search = searchParams.get('review');
    const quizID = searchParams.get('quizid');
    const mode = searchParams.get('mode');

    console.log(search, "search")

    const handleClose = () => {
        router.push(`/study/myquizzes/`);
    }

    const {
        setupActiveQuizMode, 
        setupReviewQuizMode,
        setupAdaptiveQuizMode,
    } = useContext(QuestionContext);

    useEffect(() => {
        if (search === "true") {
            setupReviewQuizMode(quizID);
        } else {
            if(mode === "adaptive"){
                setupAdaptiveQuizMode(quizID);
            } else {
                setupActiveQuizMode(quizID);
            }
        }
    }, []);
    
    return (
        <>
            <ContentViewer
            />
        </>
    );
}




