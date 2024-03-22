import React, { useState, useEffect, useRef } from 'react';
import styles from './summarypanel.module.css';
import { CriteriaElement } from '@/app/components/criteriabox/criteriabox';
import FlaggedIcon from '@/app/assets/components/Flagged.svg';
import UnflaggedIcon from '@/app/assets/components/Unflagged.svg';
import Image from 'next/image';
import CorrectIcon from '@/app/assets/components/Correct.svg';
import IncorrectIcon from '@/app/assets/components/Incorrect.svg';
import { useRouter } from 'next/navigation'; // Update import
import { createQueryString } from '../../data/utility';


const SummaryPanel = ({ questionEngagements, quizID }) => {

    const router = useRouter(); // Update variable name


    // flag question ============================================================

    const onFlagQuestion = (index) => {
        const updatedArray = [...questionFlaggedArray];
        updatedArray[index] = !updatedArray[index];
        setQuestionFlaggedArray(updatedArray);
    };

    const onClickQuestion = (index) => {

        router.push(`/study/activequiz/${quizID}/${index}?${createQueryString('review', 'true')}`);    };



    return (
        <div className={styles.summaryPanel}>


                <table className={styles.summarytable}>
                    <thead>
                        <tr>
                            <th >Result</th>
                            <th >Question</th>
                            <th >Subject</th>
                            <th >Difficulty</th>
                            <th >Time</th>
                            <th >Flag Question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionEngagements.map((questionEngagement, index) => (
                            <tr onClick = {() => onClickQuestion(index)} key = {index}>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {(questionEngagement?.Engagement?.Status === "omitted" || questionEngagement?.Engagement?.Status == null) && <div className={styles.omitted}></div>}
                                        {questionEngagement?.Engagement?.Status === "correct" && <Image src={CorrectIcon} alt="correct" width={25} />}
                                        {questionEngagement?.Engagement?.Status === "incorrect" && <Image src={IncorrectIcon} alt="incorrect" width={25} />}
                                    </div>
                                </td>
                                <td>
                                    {index + 1}
                                </td>
                                <td>{questionEngagement.Question.Topic}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <CriteriaElement text={questionEngagement?.Question?.Difficulty} />
                                    </div>
                                </td>
                                <td>{questionEngagement?.Engagement?.Duration}</td>
                                <td>

                                    <Image
                                        src={questionEngagement?.Engagement?.Flagged ? FlaggedIcon : UnflaggedIcon}
                                        onClick={() => onFlagQuestion(index)}
                                        className={styles.flagIcon}
                                    />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

        </div>
    );
};

export default SummaryPanel;