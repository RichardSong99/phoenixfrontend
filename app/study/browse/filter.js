// Filter.js
import React, { useState } from "react";
import { Checkbox, CheckboxGroup, CheckboxGroupContainer, MyTable } from '../../components/checkbox/checkbox';
import styles from './filter.module.css';

export  function Filter({ topicsData, checkedTopics, setCheckedTopics, ansStatusData, checkedAnsStatus, setCheckedAnsStatus, difficultyData, checkedDifficulty, setCheckedDifficulty, subject }) {
 
    return (
        <div >
            <MyTable title="Topics" options={topicsData} checkedValues={checkedTopics} setCheckedValues={setCheckedTopics} mode="topics" subject = {subject} />
            <MyTable title="Difficulty" options={difficultyData} checkedValues={checkedDifficulty} setCheckedValues={setCheckedDifficulty} mode="difficulty" subject = {subject} />
            <MyTable title="Answer Status" options={ansStatusData} checkedValues={checkedAnsStatus} setCheckedValues={setCheckedAnsStatus} mode="ansStatus"  subject = {subject}/>
        </div>
    );
}
