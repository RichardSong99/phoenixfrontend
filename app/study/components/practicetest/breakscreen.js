import React, { useState, useEffect } from 'react';
import styles from './breakscreen.module.css';

export const BreakScreen = ({ timeLimit, onNext }) => {
    const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert minutes to seconds

    useEffect(() => {
        if (timeLeft <= 0) {
            onNext();
            return;
        }

        const timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId); // Clean up on unmount
    }, [timeLeft, onNext]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className={styles.overallDiv}>
            <div className={styles.internalDiv}>
                <div className={styles.leftDiv}>
                    <div style={{ color: "white", fontWeight: "600", fontSize: "14px" }}> Remaining Break Time:</div>
                    <div style={{ color: "white", fontWeight: "700", fontSize: "40px" }}> {minutes}:{seconds < 10 ? '0' : ''}{seconds} </div>
                    <div onClick={() => onNext()} className={styles.resumeButton}>
                        Resume Test
                    </div>
                </div>
                <div className={styles.rightDiv}>
                    <div style={{ color: "white", fontWeight: "600", fontSize: "14px" }}>Practice Test Break</div>
                    <div>You can resume this practice test as soon as you're ready to move on.</div>

                </div>
            </div>
        </div>
    );
}