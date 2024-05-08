import React, { useState } from 'react';
import styles from './controlpanel.module.css';
import { QuizStarter } from '../../components/quizstarter/quizstarter';
import { DashboardContents } from '@/app/components/dashboard/dashboard';
import Image from 'next/image';
import UpIcon from '@/app/assets/components/Up-icon.svg';
import DownIcon from '@/app/assets/components/Down-icon.svg';
import { Filter } from './filter';
import { useData } from '@/app/context/datacontext';
import { ViewSelector } from '../_archive/viewshortcut';

export const ControlPanel = ({ 
    activeNumQuestions, 
    setActiveNumQuestions, 
    numQuestionsAvailable,
     handleStartQuiz, 
     topicsData,
      checkedTopics, 
      setCheckedTopics, 
      ansStatusData, 
      checkedAnsStatus, 
      setCheckedAnsStatus,
       difficultyData, 
       checkedDifficulty, 
       setCheckedDifficulty,
       onSortChange,
       sortOption,
       displayMode,
       onDisplayModeChange,
       subject
     }) => {
    const size = 30;

    const [filterVisible, setFilterVisible] = useState(false);

    const { loading } = useData();

    return (
        <div className={styles.overallPanelContainer}>
            <div className={styles.mainPanelContainer}>
                <div className={styles.singlePanelContainer} >
                    <QuizStarter
                        activeNumQuestions={activeNumQuestions}
                        setActiveNumQuestions={setActiveNumQuestions}
                        numQuestionsAvailable={numQuestionsAvailable}
                        handleStartQuiz={handleStartQuiz}
                    />
                </div>
                <div className={styles.verticalDivider} />
                <div className={styles.singlePanelContainer} >
                    <DashboardContents />
                </div>
                <div className={styles.verticalDivider} />
                   
                <div className={styles.singlePanelContainer} >
                <ViewSelector
                        onSortChange={onSortChange}
                        sortOption={sortOption}
                        displayMode={displayMode}
                        onDisplayModeChange={onDisplayModeChange}
                    />
                     </div>

            </div>
            <div className={styles.filterContainer} >
                <div className = {styles.filterIconGroup}>
                <Image src={filterVisible ? UpIcon : DownIcon} alt="toggle" className = {styles.toggle} width={size} height={size} onClick={() => setFilterVisible(!filterVisible)}/>
                    <span className = {styles.descripText}>Filter</span>
                    </div>
                {filterVisible && !loading &&
                    <Filter
                        topicsData={topicsData}
                        checkedTopics={checkedTopics}
                        setCheckedTopics={setCheckedTopics}
                        ansStatusData={ansStatusData}
                        checkedAnsStatus={checkedAnsStatus}
                        setCheckedAnsStatus={setCheckedAnsStatus}
                        difficultyData={difficultyData}
                        checkedDifficulty={checkedDifficulty}
                        setCheckedDifficulty={setCheckedDifficulty}
                        subject = {subject}
                    />
                }

            </div>
        </div>
    );
}

