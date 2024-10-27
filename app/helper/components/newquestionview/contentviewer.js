import { useEffect, useState } from 'react';
import { QuestionContext } from '../../context/questioncontext';
import QuestionNavBar from './questionnavbar';
import QuestionModalInterior from './questionmodalinterior';
import { fetchQuiz } from '../../apiservices/quizservice';
import React, { useContext } from 'react';
import {Icon} from '@iconify/react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useData } from '../../context/datacontext';

export default function ContentViewer({ }) {
    const {
        quizID,
        indquizMode,
    } = useContext(QuestionContext);

    const { setGlobalLoading } = useData();

    const router = useRouter();

    const handleGoBack = () => {
        setGlobalLoading(true);
        router.push('/study/mydashboard');
        setGlobalLoading(false);
    }

    // useEffect(() => {
    //     const url = window.location.href;
    //     if (url.includes('activetest') && indquizMode !== 'test') {
    //         return <div className='w-screen h-screen z-[12] absolute top-0 left-0 bg-white flex flex-row justify-center items-center'>
    //             <Spinner />
    //             <div className='ml-[20px]'>Loading Test...</div>
    //         </div>;
    //     }
    // }, []);

    return (
        <div className='custom-font w-screen h-screen bg-appleGray6 z-[10] absolute top-0 left-0'>
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
            <div className='w-screen h-screen flex flex-col'>
                <div className='w-full h-[60px] bg-white shadow-md flex items-center px-4'>
                    <div className='text-lg font-bold text-gray-800'><Button className = "text-gray-800" onPress={handleGoBack} variant = "bordered"> <Icon icon="icon-park-solid:back" width="24" height="24" style={{ color: "#AAAAAA" }} /> Go Back</Button></div>
                </div>
                <div className='w-full h-full flex flex-row'>
                    <QuestionNavBar />
                    <QuestionModalInterior
                        mode={'quiz'}
                        quizName={'Default Quiz'}
                        quizID={quizID}
                    />
                </div>
            </div>
        </div>
    )
}