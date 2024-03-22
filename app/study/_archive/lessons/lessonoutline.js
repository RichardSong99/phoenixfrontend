import React from 'react';
import styles from './lessonmain.module.css';

const LessonOutline = ({ allLessons, lessonOutlineArray, selectedLessonId, setSelectedLessonId, showLessonOverview, setShowLessonOverview }) => {

    const handleLessonSelectionId = (lesson) => {
        console.log('Lesson selected: ', lesson.title);
        setShowLessonOverview(true);
        setSelectedLessonId(lesson);
    }

    return (
        <div className={styles.outline}>
            {lessonOutlineArray.map((item, index) => (
                // item.title is the week number, for example "Week 1"
                <details key={index} >
                    <summary className={styles.summaryItem}>
                        {item.title}
                    </summary>

                    {/* item.lessonGroup is an array of lessons, for example "Lesson 1A" and "Lesson 1B"*/}
                    {item.lessonGroupIds.map((lessonId, subIndex) => (
                        <div onClick={() => handleLessonSelectionId(lessonId)} className={`${styles.outlineItem} ${selectedLessonId === lessonId ? styles.selected : ''}`} key={subIndex}>
                            <p>
                                {allLessons.find(element => element.id === lessonId).title}
                            </p>
                        </div>
                    ))}
                </details>
            ))}
        </div>
    );
};

export default LessonOutline;