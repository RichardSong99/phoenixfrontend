import React, { use, useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import DownIcon from "@/app/assets/components/Down-icon.svg";
import Image from "next/image";
import styles from "./lessoncontainer.module.css";
import { StandardButton } from "@/app/helper/components/basecomponents/buttons/mybuttons";
// import { fetchTopicContentList } from "@/app/services/parameterdataservice";
// import { fetchVideosById } from "@/app/services/videoservice";
// import { fetchQuestionsById } from "@/app/services/questionservice";
import { getObjectList } from "../../data/objectlist";
import { displayNumber } from "../../data/utility";
import { Button } from "@nextui-org/button";

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
    const containerStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        border: "1px solid #e0e0e0",
        background: "#ffffff",
        width: "100%",
        marginBottom: "20px",
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.05)",
        cursor: "pointer",
        transition: "all 0.3s ease"
    };

    const textStyle = {
        color: "#4f4f4f",
        fontSize: "18px",
        fontWeight: "600"
    };

    const completionStyle = {
        color: numCompleted === numTotal ? "#27ae60" : "#828282",
        fontSize: "14px",
        fontWeight: "500"
    };

    const buttonStyle = {
        padding: "10px 20px",
        borderRadius: "50px",
        background: "#2f80ed",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        width: "100px",
        textAlign: "center"
    };

    const startButtonStyle = {
        ...buttonStyle,
        background: "#2f80ed",
    };

    const reviewButtonStyle = {
        ...buttonStyle,
        background: "#27ae60",
    };

    const continueButtonStyle = {
        ...buttonStyle,
        background: "#f2994a",
    };

    return (
        <div style={containerStyle} onClick={type === 'free' ? () => onStartClick({
            type: type,
            groupName: groupName
        }) : onUpgradeClick}>
            <div style={textStyle}>{groupName}</div>
            <div style={completionStyle}>
                {numCompleted} / {numTotal} {type === "lessons" ? "Lessons" : "Questions"} Completed
            </div>
            {tier === "free" ? (
                <div style={(numCompleted === 0 ? startButtonStyle :
                        numCompleted === numTotal ? reviewButtonStyle :
                            continueButtonStyle)} onClick={() => onStartClick({ type, groupName })}>
                    {(numCompleted === 0 ? `START` :
                        numCompleted === numTotal ? `REVIEW` :
                            `CONTINUE`)}
                </div>
            ) : (
                <UpgradeButton onClick={onUpgradeClick} />
            )}

            <Button>Hello</Button>
            
        </div>
    );
};