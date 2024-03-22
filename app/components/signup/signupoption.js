"use client"

import React from 'react';
import styles from './signupoption.module.css'
import { StandardButton } from '../buttons/buttons';

export const SignUpOption = ({}) => {

    return (
        <div className = {styles.optionContainer}>
            <div className = {styles.optionText1}>Standard access</div>
            <div className = {styles.optionText2}>$14.99 per month</div>
            <div className = {styles.optionText3}>Get access to 1,000+ practice questions and over 500 video explanations</div>
            <StandardButton text = "Select" onClick = {() => alert("You clicked me!")} />
        </div>
    )
}