import React, { useState } from 'react';
import styles from './lessonmain.module.css';
import LessonOverview from './lessonoverview';
import LessonText from './lessontext';
import QuestionView from '../../components/questionviewcomponents/questionview';

const Content = ({ allLessons, selectedLessonId, allVideos, allLessonText, showLessonOverview, setShowLessonOverview }) => {

    const [showVideo, setShowVideo] = React.useState(false);
    const [showVideoId, setShowVideoId] = React.useState(null);

    const [showText, setShowText] = React.useState(false);
    const [showTextId, setShowTextId] = React.useState(null);

    const [showPractice, setShowPractice] = React.useState(false);
    const [activePracticeQuestions, setActivePracticeQuestions] = React.useState(null);

    const goToVideo = (videoId) => {
        setShowVideo(true);
        setShowLessonOverview(false);
        setShowVideoId(videoId);
        setShowText(false);
        console.log('videoId', videoId);
    }



    const goToLessonText = (textId) => {
        setShowLessonOverview(false);
        setShowVideo(false);
        setShowVideoId(null);
        setShowText(true);
        setShowTextId(textId);
        console.log('textId', showTextId);
        console.log(allLessonText.find(element => element.id === showTextId).title);

    }

    const goToPractice = (questions) => {
        setShowPractice(true);
        setShowLessonOverview(false);
        setShowVideo(false);
        setShowText(false);
        setActivePracticeQuestions(questions);
    }

    const getTitle = () => {
        if (showText) {
            const textElement = allLessonText.find(element => element.id === showTextId);
            return textElement ? textElement.title : '';
        } else if (showVideo) {
            const videoElement = allVideos.find(element => element.id === showVideoId);
            return videoElement ? videoElement.title : '';
        } else if (showPractice) {
            return 'Practice Questions';
        }
        return '';
    }




    return (
        <div className={styles.content}>

            {showLessonOverview && <LessonOverview
                lessonObject={allLessons.find(element => element.id === selectedLessonId)}
                goToVideo={goToVideo}
                goToLessonText={goToLessonText}
                goToPractice={goToPractice}
            />}





            {!showLessonOverview &&
                (<div className={styles.specificContentPage}>
                    <div className={styles.headerPanel}>
                        <button onClick={() => setShowLessonOverview(true)} className={styles.navButton}>
                            Back to Lesson Overview
                        </button>


                        <div className={styles.nextPrevGroup}>
                            <button className={styles.navButton} >
                                Previous
                            </button>
                            <button className={styles.navButton}>
                                Next
                            </button>
                        </div>
                    </div>

                    {/*Display the title of the video or text lesson here*/}
                    <div className={styles.title}>
                        {getTitle()}
                    </div>


                    {showVideo && (
                        <div className={styles.videoModalContent}>

                            <iframe
                                className={styles.video}
                                src={allVideos.find(element => element.id === showVideoId).url}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                    )}


                    {showText &&
                        (
                            <LessonText lessonText={allLessonText.find(element => element.id === showTextId)} />
                        )}

                    <div height="70%">
                    {showPractice && (<QuestionView questions={activePracticeQuestions} />)}
                    </div>


                </div>)}
        </div>
    );
};

export default Content;