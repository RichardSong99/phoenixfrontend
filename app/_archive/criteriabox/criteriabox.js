"use client"

import React from 'react';
import styles from './criteriabox.module.css'
import {colors} from '../../helper/data/colors';

 export const   CriteriaBox = ({ name, elementArray, setActiveStatesArray }) => {



    return (
        <div className = {styles.criteriaBox}>
            <div className = {styles.criteriaHeader}>{name}</div>
            <div className = {styles.criteriaBoxBody}>
                {elementArray.map((element, index) => (
                    <CriteriaElement key = {index} text={element} /> // Assuming `element.key` is unique
                ))}


            </div>
        </div>
    )
}

export const CriteriaElement = ({text, backgroundColor, fontColor, borderColor}) => {
    const color = colors.find(color => typeof text === 'string' && color.name === text.toLowerCase());
    // If a matching color is found, use its value. Otherwise, use a default color.
    const derivedBackgroundColor = backgroundColor || (color ? color.value : '#fff');
    const derivedFontColor = fontColor || (color ? '#fff': '#001947'); // Use the fontColor prop if provided, otherwise set the font color to white
    const derivedBorderColor = borderColor || (color ? color.value : '#E2F0FD'); // Use the borderColor prop if provided, otherwise set the border color to black

    return (
        <div>
            <div className={styles.criteriaElement} style={{backgroundColor: derivedBackgroundColor, color: derivedFontColor, borderColor: derivedBorderColor}}>{text}</div>
        </div>
    )
}