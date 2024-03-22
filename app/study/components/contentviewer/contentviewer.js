import React, { useEffect, useState, useContext, useRef } from 'react';

import { ObjectSideNav } from './objectsidenav';
import { postVideoWatched } from '@/app/services/videoengagementservice';
import styles from './contentviewer.module.css';
import QuestionView from '../questionviewcomponents/questionview';
import VideoPlayer from '../videoplayer/videoplayer';
import { getObjectList } from '../../data/objectlist';
import { NavBarContext } from '@/app/context/navbarcontext';
import { handlePostEngagement } from '../../data/questionhelpers';
import { addEngagementToQuiz } from '@/app/services/quizservice';

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
        setIsStudyNavBarVisible(false);
        setIsTopNavBarVisible(false);
        setActiveObjectIndex(activeIndex);
        setUserResponseArray(new Array(objectList.length).fill(null));
        setMarkReviewArray(new Array(objectList.length).fill(false));
        setIsPaused(false);
    }, []);

    useEffect(() => {
        if(objectList[activeObjectIndex].type === "question"){
            if(reviewMode){
                setShowAnswer(true);
                setSubmitButtonEnabled(false);
            }else{
                if(objectList[activeObjectIndex].questionData.Engagement !== null){
                    setShowAnswer(true);
                    setSubmitButtonEnabled(false);
                    console.log("submit button enabled", submitButtonEnabled)
                }else{
                    setShowAnswer(false);
                    if(userResponseArray[activeObjectIndex] !== null){
                        setSubmitButtonEnabled(true);
                    }else{
                        setSubmitButtonEnabled(false);
                    }
                }
            }
        }
    }
    , [activeObjectIndex, userResponseArray, reviewMode]);

    

    useEffect(() => {
        if (timeLeft <= 0) {
            handleCompleteModule();
            return;
        }else if (isPaused) {
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

    const handleCompleteModule = async() => {
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i].type === "question") {
                let response = await handlePostEngagement({ question: objectList[i].questionData.Question, userResponse: userResponseArray[i], mode: mode });
                console.log("response inside handleSubmitAnswer", response);
                const engagementID = response.id;
                response = await addEngagementToQuiz({ quizID: quizID, engagementID: engagementID });
            }
        }
        onNext();
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
        <div className={styles.entirePanel}>
            {(<>
                <div className={styles.objectSideNavPlaceholder} />

                <ObjectSideNav
                    objectList={objectList}
                    activeObjectIndex={activeObjectIndex}
                    handleObjectClick={handleSelectObject}
                    handleClose={handleClose}
                    mode={mode}
                    numTotal = {numTotal}
                    numCompleted = {numCompleted}
                    percentCompleted = {percentCompleted}
                    numCorrect = {numCorrect}
                    percentCorrect = {percentCorrect}
                    numIncorrect = {numIncorrect}
                    numOmitted = {numOmitted}
                    numUnattempted = {numUnattempted}
                    label = {groupName}
                    userResponseArray={userResponseArray}
                    markReviewArray={markReviewArray}
                    reviewMode = {reviewMode}
                />

                <div className={styles.mainPanel}>
                    <div className={styles.headerPanel}>{objectList[activeObjectIndex].title}</div>
                    <div className={`${styles.contentPanel} ${objectList[activeObjectIndex].type === "video" ? styles.videoBackground : ""}`}>
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
                    <div className={styles.bottomNavPanelWrapper}>
                        <BottomNavPanel
                            type={objectList[activeObjectIndex].type}
                            handleSubmitAnswer={handleSubmitAnswer}
                            handleMarkVideoComplete={handleMarkVideoComplete}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            mode={mode}
                            handleFinish={handleCompleteModule}
                            handlePause={handlePause}
                            isPaused = {isPaused}
                            submitButtonEnabled = {submitButtonEnabled}
                        />
                    </div>
                </div>
            </>)}
        </div>
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
    submitButtonEnabled
}) => {
    return (
        <div className={styles.navPanel}>
            <div className = {styles.nextPrevGroup}>
                {type === "question" && mode !== "test" && <button className={styles.navButton} onClick={() => handleSubmitAnswer()} disabled={!submitButtonEnabled}> Submit Answer </button>}
                {type === "question" && mode === "test" && <div className={styles.navButton} onClick={() => handleFinish()} > Finish Section </div>}
                {type === "question" && mode === "test" && <div className={styles.navButton} onClick={() => handlePause()} > {isPaused ? "Unpause Timer": "Pause Timer" }</div>}

                {type === "video" && <div className={styles.navButton} onClick={() => handleMarkVideoComplete()} > Mark as Complete </div>}
            </div>
            <div className={styles.nextPrevGroup}>
                <div className={styles.navButton} onClick={() => handleBack()}>Back</div>
                <div className={styles.navButton} onClick={() => handleNext()}>Next</div>
            </div>
        </div>);
}