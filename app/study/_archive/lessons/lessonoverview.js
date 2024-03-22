import React from 'react';
import styles from './lessonoutline.module.css';

const LessonOverview = ({ lessonObject, goToVideo, goToLessonText, goToPractice }) => {

    if (!lessonObject) return (<div>Select a lesson</div>)

    return (
        <div>
            <div className = {styles.title}>{lessonObject.title}</div>
            <div>
                <h2>Learn It</h2>
                <div>
                    {lessonObject.video.map((video) => (
                        <div onClick={() => goToVideo(video)} className = {styles.link}>
                            Watch Video
                        </div>
                    ))}
                </div>

                <div>
                    {lessonObject.textLesson.map((text) => (
                        <div onClick={() => goToLessonText(text)} className = {styles.link} > 
                            Read Lesson
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <h2>Practice It</h2>
                {lessonObject.practice.map((questions) => (
                    <div onClick={() => goToPractice(questions)} className = {styles.link}>
                        Practice questions
                    </div>
                ))}

            </div>


            <div>
                <h2>Master It</h2>
                {lessonObject.quiz.map((questions) => (
                    <div className = {styles.link}>
                        Quiz questions
                    </div>
                ))}

            </div>
        </div>
    );
}

export default LessonOverview;