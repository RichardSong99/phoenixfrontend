import React, { use, useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import DownIcon from "@/app/assets/components/Down-icon.svg";
import Image from "next/image";
import styles from "./lessoncontainer.module.css";
import { StandardButton, UpgradeButton } from "@/app/components/buttons/buttons";
// import { fetchTopicContentList } from "@/app/services/parameterdataservice";
// import { fetchVideosById } from "@/app/services/videoservice";
// import { fetchQuestionsById } from "@/app/services/questionservice";
import { getObjectList } from "../../data/objectlist";
import { displayNumber } from "../../data/utility";

export const LessonContainer = ({
    groupNum,
    groupName,
    tier,
    type,
    onStartClick,
    onUpgradeClick,
    numCompleted, 
    numTotal
}) => {


    return (
        <div className={styles.mainPanelContainer}>

            <div className={styles.subTopicName}>{groupName}</div>

            <div className={styles.completionSection}>
                <div className={styles.completionText}>{numCompleted} / {numTotal} {type === "lessons" ? "lessons" : "questions"} completed</div>
            </div>

            {tier === "free" ? (
                <div className={styles.startButton} onClick={() => onStartClick({
                    type: type,
                    groupName: groupName
                })} >
                    START
                </div>
            ) : (
                <UpgradeButton onClick={() => onUpgradeClick()} />
            )}

        </div>
    );
}