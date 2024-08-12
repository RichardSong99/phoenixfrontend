import { useEffect, useState } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import QuestionNavBar from './questionnavbar';
import QuestionModalInterior from './questionmodalinterior';
import { fetchQuiz } from '../../apiservices/quizservice';
import React, {useContext} from 'react';

export default function ContentViewer({ }) {
    const {
        quizID,
    } = useContext(QuestionContext);

    return (
        <div className='custom-font w-screen h-screen bg-appleGray6'>
            <style jsx>{`
                @font-face {
                    font-family: 'SF Pro Display';
                    src: url('/fonts/SFProDisplay-Regular.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
                }

                .custom-font {
                    font-family: 'SF Pro Display', sans-serif;
                }
            `}</style>
            <div className='w-screen h-screen flex flex-row'>
                <QuestionNavBar 
                />
                <QuestionModalInterior 
                    mode={"quiz"}
                    quizName={"Default Quiz"}
                    quizID={quizID}
                />
            </div>
        </div>
    )
}