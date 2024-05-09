"use client"

import React from 'react';
import Lightning from '@/app/assets/components/Lightning.svg';
import Image from 'next/image';
import styles from './mybuttons.module.css'


export const StandardButton = ({ onClick, text, backgroundColor, fontColor }) => {
    const buttonStyle = {
        backgroundColor: backgroundColor || '#1387F2', // replace with your default color
        color: fontColor || '#fff' // replace with your default color
    };

    return (
        <div className={styles.standardButton} style={buttonStyle} onClick={onClick}>
            {text}
        </div>
    );
}

export const SecondaryButton = ({ onClick, text, backgroundColor, fontColor }) => {
    const buttonStyle = {
        backgroundColor: backgroundColor || '#E2F0FD', // replace with your default color
        color: fontColor || '#1387F2' // replace with your default color
    };

    return (
        <div className={styles.secondaryButton} style={buttonStyle} onClick={onClick}>
            {text}
        </div>
    );
}

export const NumberChoiceButtons = ({ buttonTextArray, textLabel = "", activeButton, handleButtonClick, width = "10px" }) => {
    return (
        <div className={styles.numberChoiceButtonGroup}>
            <div className={styles.numberChoiceHeaderText}>
                {textLabel}
            </div>
            <div className={styles.numberChoiceButtonArea}>
                {buttonTextArray.map((text, index) => {
                    let className = styles.numberChoiceButton;
                    if (index === 0) {
                        className += ` ${styles.firstElementVariant}`; // replace with your actual variant class for the first element
                    } else if (index === buttonTextArray.length - 1) {
                        className += ` ${styles.lastElementVariant}`; // replace with your actual variant class for the last element
                    }

                    // add the active class if this button is the active button
                    if (text === activeButton) {
                        className += ` ${styles.active}`; // replace with your actual active class
                    }

                    return <div key = {index} style={{width}} className={className} onClick={() => handleButtonClick(text)}>{text}</div>;
                })}
            </div>
        </div>
    );
}

export const RoundButton = ({ isActive, onClick, text }) => {
    return (
        <button
            className={isActive ? styles.navNumberButtonActive : styles.navNumberButton}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export const SubjectButton = ({ activeSubject, handleSubjectChange }) => {

    const subjectMapping = {
        "Math": "math",
        "Reading & Writing": "reading"
    };
    
    const handleClick = (subjectButtonText) => {
        const internalSubjectName = subjectMapping[subjectButtonText];
        handleSubjectChange(internalSubjectName);
    }
    
    return (
        <NumberChoiceButtons
            buttonTextArray={Object.keys(subjectMapping)}
            activeButton={Object.keys(subjectMapping).find(key => subjectMapping[key] === activeSubject)}
            handleButtonClick={handleClick}
            width="150px"
        />
    );
}

export const UpgradeButton = ({ onClick }) => {
    return (
        <div className={styles.upgradeButton} onClick={onClick}>
            <Image src={Lightning} alt="upgrade" width={18} height={18}/>
            <span className = {styles.upgradeText}>
            Upgrade
            </span>
        </div>
    );
}