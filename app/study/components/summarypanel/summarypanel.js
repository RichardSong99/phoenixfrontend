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
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    useDisclosure
} from "@nextui-org/react";

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


                <Table removeWrapper aria-label="Example static collection table">
                    <TableHeader>
                            <TableColumn >Result</TableColumn>
                            <TableColumn >Question</TableColumn>
                            <TableColumn >Subject</TableColumn>
                            <TableColumn >Difficulty</TableColumn>
                            <TableColumn >Time</TableColumn>
                            <TableColumn >Flag Question</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {questionEngagements.map((questionEngagement, index) => (
                            <TableRow className="cursor-pointer hover:bg-gray-100" onClick={() => onClickQuestion(index)} key={index}>
                                <TableCell>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {(questionEngagement?.Engagement?.Status === "omitted" || questionEngagement?.Engagement?.Status == null) && <div className={styles.omitted}></div>}
                                        {questionEngagement?.Engagement?.Status === "correct" && <Image src={CorrectIcon} alt="correct" width={25} />}
                                        {questionEngagement?.Engagement?.Status === "incorrect" && <Image src={IncorrectIcon} alt="incorrect" width={25} />}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>{questionEngagement.Question.Topic}</TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <CriteriaElement text={questionEngagement?.Question?.Difficulty} />
                                    </div>
                                </TableCell>
                                <TableCell>{questionEngagement?.Engagement?.Duration}</TableCell>
                                <TableCell style={{ display: 'flex', justifyContent: 'center' }}>

                                    <Image
                                        src={questionEngagement?.Engagement?.Flagged ? FlaggedIcon : UnflaggedIcon}
                                        onClick={() => onFlagQuestion(index)}
                                        className={styles.flagIcon}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

        </div>
    );
};

export default SummaryPanel;