import React from "react";
import styles from "./startscreen.module.css";

export const StartScreen = ({startHandler}) => {
    return (
        <div className = {styles.overallDiv}>
            <div className = {styles.startPanel}>
                <div style={{ color: "#716E6E", fontSize: "25px", fontWeight: "600" }}> Practice Test</div>
                <div>
                    <TextGroup title="Time" text="60 minutes" />
                    <TextGroup title="Number of Questions" text="60" />
                    <TextGroup title="Sections" text="3" />
                </div>
                <div onClick = {() => startHandler()} className = {styles.startButton}>
                    Start Test
                </div>
            </div>
        </div>
    );
}

export const TextGroup = ({ title, text }) => {
    return (
        <div>
            <div> {title} </div>

            <div> {text} </div>
        </div>
    );
}