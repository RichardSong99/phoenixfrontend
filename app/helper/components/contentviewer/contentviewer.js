import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link';
import { ObjectSideNav } from './objectsidenav';
import { postVideoWatched } from '@/app/helper/apiservices/videoengagementservice';
import styles from './contentviewer.module.css';
import QuestionView from '../question/questionviewcomponents/questionview';
import VideoPlayer from '../videoplayer/videoplayer';
import { getObjectList } from '../../data/objectlist';
import { NavBarContext } from '@/app/helper/context/navbarcontext';
import { handlePostEngagement } from '../../data/questionhelpers';
import { addEngagementToQuiz } from '@/app/helper/apiservices/quizservice';
import { Button, ButtonGroup } from "@nextui-org/react";
import {useRouter} from 'next/navigation';
import ChatbotConversation from '../chatbot/chatbotconversation';
import ChatbotPrompt from '../chatbot/chatbotprompt.js';
import Chatbot from '../chatbot/chatbot';

export function ContentViewer({
    groupName,
    mode,
    activeIndex,
    handleClose,
    objectList,
    numTotal,
    numCompleted,
    percentCompleted,
    numCorrect,
    percentCorrect,
    numIncorrect,
    numOmitted,
    numUnattempted,
    refreshObjectList,
    quizID,
    onNext,
    timeLimit,
    reviewMode
}) {
    const router = useRouter();

    const [activeObjectIndex, setActiveObjectIndex] = useState(activeIndex == null ? 0 : activeIndex);
    const [showAnswer, setShowAnswer] = useState(false);
    const { setIsStudyNavBarVisible, setIsTopNavBarVisible } = useContext(NavBarContext);
    // userResponseArray should be of length objectList.length
    const [userResponseArray, setUserResponseArray] = useState(new Array(objectList.length).fill(null));
    const [markReviewArray, setMarkReviewArray] = useState(new Array(objectList.length).fill(false));
    const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
    const [isPaused, setIsPaused] = useState(false); // Add this line
    const timerId = useRef(null);
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);

    console.log("activeObjectIndex", activeObjectIndex);
    console.log("objectList", objectList);

    useEffect(() => {
        setIsStudyNavBarVisible(false);
        setIsTopNavBarVisible(false);
    }, []);

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    
        setIsStudyNavBarVisible(false);
        setIsTopNavBarVisible(false);
        setActiveObjectIndex(activeIndex);
        setUserResponseArray(new Array(objectList.length).fill(null));
        setMarkReviewArray(new Array(objectList.length).fill(false));
        setIsPaused(false);
    }, []);

    useEffect(() => {
        if (objectList[activeObjectIndex].type === "question") {
            if (reviewMode) {
                setShowAnswer(true);
                setSubmitButtonEnabled(false);
            } else {
                if (objectList[activeObjectIndex].questionData.Engagement !== null) {
                    setShowAnswer(true);
                    setSubmitButtonEnabled(false);
                    console.log("submit button enabled", submitButtonEnabled)
                } else {
                    setShowAnswer(false);
                    if (userResponseArray[activeObjectIndex] !== null) {
                        setSubmitButtonEnabled(true);
                    } else {
                        setSubmitButtonEnabled(false);
                    }
                }
            }
        }
    }
        , [activeObjectIndex, userResponseArray, reviewMode]);


    const handleExit = () => {
        router.back();
    }

    useEffect(() => {
        if (timeLeft <= 0) {
            handleCompleteModule();
            return;
        } else if (isPaused) {
            return;
        }

        timerId.current = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId.current);
    }, [timeLeft, isPaused]);

    const handlePause = () => {
        setIsPaused(prevIsPaused => !prevIsPaused);
    };

    const handleCompleteModule = async () => {
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i].type === "question" && objectList[i].questionData.Engagement === null) {
                let response = await handlePostEngagement({ question: objectList[i].questionData.Question, userResponse: userResponseArray[i], mode: mode });
                console.log("response inside handleSubmitAnswer", response);
                const engagementID = response.id;
                response = await addEngagementToQuiz({ quizID: quizID, engagementID: engagementID });
            }
        }
        if(mode === "quiz") {
            router.push(`/study/mydashboard`);
        } else if (mode === "test") {
            onNext();
        }
    }

    // // set the show answer state
    // useEffect(() => {
    //     if (objectList[activeObjectIndex].type === "question") {
    //         if (objectList[activeObjectIndex].questionData.Engagement !== null) {
    //             console.log("show answer true");
    //             setShowAnswer(true);
    //         } else {
    //             console.log("show answer false");
    //             setShowAnswer(false);
    //         }
    //     }
    // }, [activeObjectIndex]);

    const handleSelectObject = ({ index }) => {
        setActiveObjectIndex(index);
    }

    const handleNext = () => {
        if (activeObjectIndex < objectList.length - 1) {
            setActiveObjectIndex(activeObjectIndex + 1);
        }
    }

    const handleBack = () => {
        if (activeObjectIndex > 0) {
            setActiveObjectIndex(activeObjectIndex - 1);
        }
    }

    const handleSubmitAnswer = async () => {
        let response = await handlePostEngagement({ question: objectList[activeObjectIndex].questionData.Question, userResponse: userResponseArray[activeObjectIndex], mode: mode });
        console.log("response inside handleSubmitAnswer", response);
        const engagementID = response.id;
        response = await addEngagementToQuiz({ quizID: quizID, engagementID: engagementID });
        //next step: call the function that adds this engagement ID to the quiz
        console.log("response after addEngagementToQuiz", response);
        await refreshObjectList();
    }

    const handleMarkVideoComplete = async () => {
        await postVideoWatched({ videoObjId: objectList[activeObjectIndex].videoData.id });
        await refreshObjectList();
        if (activeObjectIndex < objectList.length - 1) {
            setActiveObjectIndex(activeObjectIndex + 1);
        }
    }

    const handleReportUserResponse = (response) => {
        // set the userResponseArray value at the active object index to the response
        let newArray = [...userResponseArray];
        newArray[activeObjectIndex] = response;
        setUserResponseArray(newArray);
    }

    const handleReportMarkedReview = (marked) => {
        let newArray = [...markReviewArray];
        newArray[activeObjectIndex] = marked;
        console.log("newArray", newArray);
        setMarkReviewArray(newArray);
    }



    return (

        <div className="flex flex-col h-screen w-full overflow-hidden" style={{ overflowY: "hidden" }}>
            <div className="flex h-14 items-center px-4 border-b dark:border-gray-800">
                <Button color = "secondary" onClick={() => handleExit()}>
                    Back
                </Button>
                
            </div>
            <div className="flex-1 flex overflow-hidden">
                <nav className="flex flex-col w-72 border-r">
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <ObjectSideNav
                            objectList={objectList}
                            activeObjectIndex={activeObjectIndex}
                            handleObjectClick={handleSelectObject}
                            handleClose={handleClose}
                            mode={mode}
                            numTotal={numTotal}
                            numCompleted={numCompleted}
                            percentCompleted={percentCompleted}
                            numCorrect={numCorrect}
                            percentCorrect={percentCorrect}
                            numIncorrect={numIncorrect}
                            numOmitted={numOmitted}
                            numUnattempted={numUnattempted}
                            label={groupName}
                            userResponseArray={userResponseArray}
                            markReviewArray={markReviewArray}
                            reviewMode={reviewMode}
                        />
                    </div>

                </nav>
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    {/* <header className="flex h-16 items-center border-b px-4 md:px-6">
                        
                    </header> */}
                    <main className="flex-1 flex flex-col min-h-0 overflow-auto">
                        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto py-6 md:py-8 px-4 md:px-6  items-center" style={{ overflowY: 'scroll', marginTop: '20px' }}>
                                {objectList[activeObjectIndex].type === "question" ? (
                                    <QuestionView
                                        question={objectList[activeObjectIndex].questionData.Question}
                                        engagement={objectList[activeObjectIndex].questionData.Engagement}
                                        userResponseParam={userResponseArray[activeObjectIndex]}
                                        markReviewParam={markReviewArray[activeObjectIndex]}
                                        mode={mode}
                                        showAnswer={showAnswer}
                                        handleReportUserResponse={handleReportUserResponse}
                                        timeLeft={timeLeft}
                                        handleReportMarkedReview={handleReportMarkedReview}
                                    />
                                ) : objectList[activeObjectIndex].type === "video" ? (
                                    <VideoPlayer
                                        videoId={objectList[activeObjectIndex].videoData.VideoID}
                                        handleVideoEnd={handleMarkVideoComplete}
                                    />
                                ) : (
                                    <div>Content</div>
                                )}
                            </div>
                        </div>
                    </main>
                    
                    <footer className="flex items-center h-14 border-t gap-4">
                        <BottomNavPanel
                            type={objectList[activeObjectIndex].type}
                            handleSubmitAnswer={handleSubmitAnswer}
                            handleMarkVideoComplete={handleMarkVideoComplete}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            mode={mode}
                            handleFinish={handleCompleteModule}
                            handlePause={handlePause}
                            isPaused={isPaused}
                            submitButtonEnabled={submitButtonEnabled}
                            finishSectionButtonDisabled = {reviewMode}
                        />

                    </footer>
                </div>
                <Chatbot
                    question={objectList[activeObjectIndex].questionData.Question}
                ></Chatbot>
            </div>
        </div>


        // <div className="w-full h-screen flex flex-col">
        // <div className="h-12 bg-gray-800 text-white text-center font-bold shadow-md flex items-center justify-center">
        //   {objectList[activeObjectIndex].title}
        // </div>
        // <div className="flex-1 flex flex-row w-full">

        //   <ObjectSideNav
        //     objectList={objectList}
        //     activeObjectIndex={activeObjectIndex}
        //     handleObjectClick={handleSelectObject}
        //     handleClose={handleClose}
        //     mode={mode}
        //     numTotal={numTotal}
        //     numCompleted={numCompleted}
        //     percentCompleted={percentCompleted}
        //     numCorrect={numCorrect}
        //     percentCorrect={percentCorrect}
        //     numIncorrect={numIncorrect}
        //     numOmitted={numOmitted}
        //     numUnattempted={numUnattempted}
        //     label={groupName}
        //     userResponseArray={userResponseArray}
        //     markReviewArray={markReviewArray}
        //     reviewMode={reviewMode}
        //   />

        //   <div className="flex flex-col w-full flex-grow justify-center items-center">
        //   <div className="flex flex-col h-full overflow-y-auto p-10 flex-grow">
        //       {objectList[activeObjectIndex].type === "question" ? (
        //         <QuestionView
        //           question={objectList[activeObjectIndex].questionData.Question}
        //           engagement={objectList[activeObjectIndex].questionData.Engagement}
        //           userResponseParam={userResponseArray[activeObjectIndex]}
        //           markReviewParam={markReviewArray[activeObjectIndex]}
        //           mode={mode}
        //           showAnswer={showAnswer}
        //           handleReportUserResponse={handleReportUserResponse}
        //           timeLeft={timeLeft}
        //           handleReportMarkedReview={handleReportMarkedReview}
        //         />
        //       ) : objectList[activeObjectIndex].type === "video" ? (
        //         <VideoPlayer
        //           videoId={objectList[activeObjectIndex].videoData.VideoID}
        //           handleVideoEnd={handleMarkVideoComplete}
        //         />
        //       ) : (
        //         <div>Content</div>
        //       )}
        //     </div>

        //     <div className="w-full fixed bottom-0">
        //       <BottomNavPanel
        //         type={objectList[activeObjectIndex].type}
        //         handleSubmitAnswer={handleSubmitAnswer}
        //         handleMarkVideoComplete={handleMarkVideoComplete}
        //         handleBack={handleBack}
        //         handleNext={handleNext}
        //         mode={mode}
        //         handleFinish={handleCompleteModule}
        //         handlePause={handlePause}
        //         isPaused={isPaused}
        //         submitButtonEnabled={submitButtonEnabled}
        //       />
        //     </div>
        //   </div>
        // </div>
        // </div>

    )
}



export const BottomNavPanel = ({
    handleSubmitAnswer,
    handleMarkVideoComplete,
    handleBack,
    handleNext,
    handleFinish,
    handlePause,
    isPaused,
    type,
    mode,
    submitButtonEnabled,
    finishSectionButtonDisabled
}) => {
    return (
        <div className="flex flex-row w-full justify-between p-3 "            >
            <div className={styles.nextPrevGroup}>
                {type === "question" && mode !== "test" && <Button color="primary" onClick={() => handleSubmitAnswer()} isDisabled={!submitButtonEnabled}> Submit Answer </Button>}
                {type === "question" && ["test", "quiz"].includes(mode) && <Button isDisabled = {finishSectionButtonDisabled} color="warning" onClick={() => handleFinish()} > Finish Section </Button>}
                {type === "question" && mode === "test" && <Button color="warning" onClick={() => handlePause()} > {isPaused ? "Unpause Timer" : "Pause Timer"}</Button>}
                {type === "video" && <Button color="primary" variant="bordered" onClick={() => handleMarkVideoComplete()} > Mark as Complete </Button>}
            </div>
            <ButtonGroup color="primary" variant="bordered">
                <Button onClick={() => handleBack()}>Back</Button>
                <Button onClick={() => handleNext()}>Next</Button>
            </ButtonGroup>
        </div>);
}