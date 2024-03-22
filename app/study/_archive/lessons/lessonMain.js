"use client"

import React, { useState } from 'react';
import styles from './lessonmain.module.css';
import LessonOutline from './lessonoutline';
import LessonContent from './lessoncontent';

const LessonMain = () => {
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [showLessonOverview, setShowLessonOverview] = React.useState(true);


    const [questions] = useState([
        {
            prompt: 'What is 2 + 2?',
            responseType: 'multipleChoice',
            choices: ['3', '4', '5', '6'],
            difficulty: 'Easy',
            attempted: false,
            correctAnswer: 1,
            topic: 'Arithmetic',
        },
        {
            prompt: 'What is 2 + 3?',
            responseType: 'multipleChoice',
            choices: ['3', '4', '5', '6'],
            difficulty: 'Easy',
            attempted: false,
            correctAnswer: 2,
            topic: 'Arithmetic',
        },
        // ... more questions ...
    ]);

   

    const lesson1A = {
        id: '1A', // This is the unique identifier for the lesson, for example '1A
        title: 'Lesson 1A',
        overview: 'This is the ovreview content for Lesson 1A',
        video: ['video1A1',],
        textLesson: ['text1A1',],
        practice: [questions],
        quiz: [questions],
    }

    const lesson1B = {
        id: '1B', // This is the unique identifier for the lesson, for example '1B
        title: 'Lesson 1B',
        overview: 'This is the ovreview content for Lesson 1B',
        video: ['video1B1',],
        textLesson: ['text1B1',],
        practice: [questions],
        quiz: [questions],
    }

    const allLessons = [lesson1A, lesson1B];
    const allVideos = [
        {
            id: 'video1A1',
            title: 'Video 1A1',
            url: 'https://www.youtube.com/embed/3tmd-ClpJxA',
        },
        {
            id: 'video1B1',
            title: 'Video 1A1',
            url: 'https://www.youtube.com/embed/3tmd-ClpJxA',
        }
    ]


    const allLessonText = [
        {
            id: 'text1A1',
            title: 'Text 1A1',
            content: 'This is the text content for Text 1A1',
        },
        {
            id: 'text1B1',
            title: 'Text 1B1',
            content: 'This is the text content for Text 1B1',
        }
    ]


    const lessonOutlineArray = [
        { title: 'Week 1', lessonGroupIds: ["1A", "1B"] },
        
    ]; // Replace with your actual lessonGroup

    return (
        <div className={styles.container}>
            <LessonOutline allLessons = {allLessons} lessonOutlineArray={lessonOutlineArray} selectedLessonId={selectedLessonId} setSelectedLessonId={setSelectedLessonId} showLessonOverview = {showLessonOverview} setShowLessonOverview = {setShowLessonOverview}/>
            <LessonContent allLessons={allLessons} selectedLessonId = {selectedLessonId} allVideos={allVideos} allLessonText={allLessonText} showLessonOverview={showLessonOverview} setShowLessonOverview={setShowLessonOverview}/>
        </div>
    );
};

export default LessonMain;