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
import { useRouter } from 'next/navigation';
import Chatbot from '../chatbot/chatbot';

import { QuestionContext } from '../../context/questioncontext';

export function ContentViewer({
    groupName,
    mode,
    // activeIndex,
    handleClose,
    // objectList,
    // numTotal,
    // numCompleted,
    // percentCompleted,
    // numCorrect,
    // percentCorrect,
    // numIncorrect,
    // numOmitted,
    // numUnattempted,
    // refreshObjectList,
    // quizID,
    // onNext,
    // timeLimit,
    // reviewMode
}) {
    const router = useRouter();

    const {
        questionIDArray,
        activeQuestionIndex,
        questionData,
        userResponseData,
        isFlaggedData,
        isStarredData,
        wasReviewedData,
        timeSpentData,
        activeReviewMode,
        handleNextQuestion, 
        handlePreviousQuestion,
        handleSubmitEngagements,

    } = useContext(QuestionContext);


    const { setIsStudyNavBarVisible, setIsTopNavBarVisible } = useContext(NavBarContext);
    // userResponseArray should be of length objectList.length

    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);




    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        setIsStudyNavBarVisible(false);
        setIsTopNavBarVisible(false);
    }, []);


    const handleExit = () => {
        router.back();
    }

    return (

        <div className="flex flex-col h-screen w-full overflow-hidden" style={{ overflowY: "hidden" }}>
            <div className="flex h-14 items-center px-4 border-b dark:border-gray-800">
                <Button color="secondary" onClick={() => handleExit()}>
                    Back
                </Button>

            </div>
            <div className="flex-1 flex overflow-hidden">
                <nav className="flex flex-col w-72 border-r">
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        {/* <ObjectSideNav
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
                        /> */}
                    </div>

                </nav>
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    {/* <header className="flex h-16 items-center border-b px-4 md:px-6">
                        
                    </header> */}
                    <div className="flex-1 flex flex-col min-h-0 overflow-auto">
                        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto py-6 md:py-8 px-4 md:px-6  items-center" style={{ overflowY: 'scroll', marginTop: '20px' }}>
                                {/* {objectList[activeObjectIndex].type === "question" ? ( */}
                                <QuestionView
                                    question={questionData[questionIDArray[activeQuestionIndex]]}
                                    userResponse={userResponseData[questionIDArray[activeQuestionIndex]]}
                                    isFlagged={isFlaggedData[questionIDArray[activeQuestionIndex]]}
                                    isStarred={isStarredData[questionIDArray[activeQuestionIndex]]}
                                    wasReviewed={wasReviewedData[questionIDArray[activeQuestionIndex]]}
                                    timeElapsed={timeSpentData[questionIDArray[activeQuestionIndex]]}
                                    activeReviewMode={activeReviewMode}

                                />
                            </div>
                        </div>
                    </div>

                    <footer className="flex items-center h-14 border-t gap-4">
                        <div className="flex flex-row w-full justify-between p-3 "            >
                            <div className={styles.nextPrevGroup}>
                                
                                <Button className = "bg-themeDarkGray" onClick={() => handleSubmitEngagements()} > Finish Section </Button>
                                <Button className = "bg-themeDarkGray" onClick={() => handlePause()} > {isPaused ? "Unpause Timer" : "Pause Timer"}</Button>
                            </div>
                            <ButtonGroup color="#95959B" variant="bordered">
                                <Button onClick={() => handlePreviousQuestion()}>Back</Button>
                                <Button onClick={() => handleNextQuestion()}>Next</Button>
                            </ButtonGroup>
                        </div>
                    </footer>
                </div>
                <Chatbot
                    question={objectList[activeObjectIndex].questionData.Question}
                ></Chatbot>
            </div>
        </div>


    )
}


