import React, { useState, useEffect } from 'react';
import styles from './objectsidenav.module.css';
import { StandardButton } from '@/app/components/buttons/mybuttons';
import CorrectIcon from '@/app/assets/components/Correct.svg';
import IncorrectIcon from '@/app/assets/components/Incorrect.svg';
import Image from 'next/image';
import { ProgressBar } from "react-bootstrap";
import FlaggedIcon from '@/app/assets/components/Flagged.svg';
import { CriteriaElement } from '@/app/components/criteriabox/criteriabox';
import { Chip } from "@nextui-org/react";


export const ObjectSideNav = ({
    mode,
    objectList,
    activeObjectIndex,
    handleObjectClick,
    handleClose,
    mainTitle,
    subTitle,
    numTotal,
    numCompleted,
    percentCompleted,
    numCorrect,
    percentCorrect,
    numIncorrect,
    numOmitted,
    numUnattempted,
    label,
    userResponseArray,
    markReviewArray,
    reviewMode

}) => {
    // Component logic goes here

    return (
        // JSX code for the component goes here
        <div className={styles.questionSideNav}>
            {/* Content of the QuestionSideNav component */}
            {/* <div>
                <StandardButton text="Back" onClick={() => handleClose()} />

            </div> */}


            <div className={styles.infoSection}>
                <span style={{ fontSize: "20px", color: "black", fontWeight: "700" }}>{label}</span>

                {mode !== "test" && <div className={styles.progressDiv}>
                    <ProgressBar now={percentCompleted} style={{ height: '7px', width: '100%' }} />
                    <div className={styles.progressTextDiv}>
                        <span style={{ fontSize: "13px", color: "black" }}>Completed</span>
                        <span style={{ fontSize: "13px", color: "black" }}>{numCompleted}/{numTotal}</span>

                    </div>
                </div>}
                {mode === "practiceQuestions" || reviewMode && (
                    <div className={styles.statusPanelWrapper}>
                        {/* <div className = {styles.viewSelector}>
                            <div className = {styles.viewElement}>All</div>
                            <div className = {styles.viewElement}>Score</div>
                            <div className = {styles.viewElement}>Difficulty</div>
                            <div className = {styles.viewElement}>Bookmarked</div>

                        </div>  */}
                        <div className={styles.statusPanel}>
                            {/* <span style={{ fontSize: '15px', color: '#838080' }}>Score</span>
                        <span style={{ fontSize: '18px', color: '#1387F2', fontWeight: '700' }}>{percentCorrect}%</span>
                        <span style={{ fontSize: '14px', color: '#838080' }}>Correct</span> */}
                            <div className={styles.statusOption}><span>Correct </span> <span>{numCorrect}</span></div>
                            <div className={styles.statusOption}><span>Incorrect</span> <span>{numIncorrect}</span> </div>
                            <div className={styles.statusOption}><span>Omitted</span> <span>{numOmitted}</span> </div>
                            <div className={styles.statusOption}><span>Unattempted</span> <span>{numUnattempted}</span> </div>
                        </div>
                    </div>
                )}
            </div>
            {objectList && <div className={styles.questionLinkSection}>
                {objectList.map((object, index) => {
                    return (
                        <ObjectLink
                            key={index}
                            type={object.type}
                            title={object.title}
                            objectIndex={index}
                            isActiveObject={index === activeObjectIndex}
                            handleObjectClick={handleObjectClick}
                            showDifficulty={object.type === "question" && !(mode === "test" && !reviewMode)}
                            difficulty={object.type === "question" && object.questionData?.Question?.Difficulty}
                            isOmitted={object.type === "question" && object.questionData?.Engagement?.Status === "omitted"}
                            isCorrect={object.type === "question" && object.questionData?.Engagement?.Status === "correct"}
                            isIncorrect={object.type === "question" && object.questionData?.Engagement?.Status === "incorrect"}
                            responseEntered={object.type === "question" && !object.questionData?.Engagement && userResponseArray[index]}
                            markedReview={object.type === "question" && markReviewArray[index]}
                            watched={object.type === "video" && object.videoData.Watched}
                        />
                    );
                })}
            </div>}

        </div>
    );
};

export const ObjectLink = ({
    type,
    title,
    objectIndex,
    isActiveObject,
    handleObjectClick,
    isOmitted,
    isCorrect,
    isIncorrect,
    responseEntered,
    watched,
    markedReview,
    showDifficulty,
    difficulty
}) => {
    // Component logic goes here

    const className = isActiveObject ? "active" : "inactive";

    return (
        // JSX code for the component goes here
        <div
            className={`p-3 rounded-md w-full flex items-center justify-between cursor-pointer ${isActiveObject ? "bg-blue-500 text-white" : "bg-gray-200 "}`}
            onClick={() => handleObjectClick({ index: objectIndex })}
        >
            <span className={`font-semibold text-sm`}>
                {title}
            </span>


            <div className={styles.statusIconDiv}>
                {showDifficulty && <Chip size="sm" variant = "bordered" className = "bg-white" color={difficulty === "easy" ? "success" : (difficulty === "medium" ? "warning" : "danger")}>{difficulty}</Chip>}
                {markedReview && <Image src={FlaggedIcon} alt="marked review" width={15} />}
                {responseEntered && <div className={styles.responseEntered}></div>}
                {isOmitted && <div className={styles.omitted}></div>}
                {isCorrect && <Image src={CorrectIcon} alt="correct" width={15} />}
                {isIncorrect && <Image src={IncorrectIcon} alt="incorrect" width={15} />}
                {watched && <Image src={CorrectIcon} alt="correct" width={15} />}
            </div>
            {/* Content of the QuestionLink component */}
        </div>
    );
}
