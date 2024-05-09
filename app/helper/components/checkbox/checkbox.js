import React, { useEffect, useState } from "react";
import Image from 'next/image';
import CheckboxChecked from '../../assets/components/Checkbox-checked.svg';
import CheckboxUnchecked from '../../assets/components/Checkbox-unchecked.svg';
import Plus from '../../assets/components/plus.svg';
import Minus from '../../assets/components/minus.svg';
import styles from './checkbox.module.css'; // Import the CSS module
import UpIcon from '../../assets/components/Up-icon.svg';
import DownIcon from '../../assets/components/Down-icon.svg';
import { CSSTransition } from 'react-transition-group';
import { capitalizeFirstLetter } from "@/app/helper/data/utility";
import { CriteriaElement } from "../criteriabox/criteriabox";
import { MyProgressBar } from "../charts/charts";
import { useData } from "@/app/helper/context/datacontext";

export const Checkbox = ({ isChecked, setIsChecked, isChild }) => {
    const size = isChild ? 15 : 17; // Use a smaller size if it's a child checkbox



    return (
        <div className={styles.checkboxRow}>
            <div className={styles.checkboxContainer} onClick={() => setIsChecked(!isChecked)}>
                {isChecked ?
                    <Image src={CheckboxChecked} alt="checked" width={size} height={size} /> :
                    <Image src={CheckboxUnchecked} alt="unchecked" width={size} height={size} />
                }
                {/* <label className={styles.checkboxLabel}>{capitalizeFirstLetter(text)}</label> */}

            </div>

        </div>
    )
}

export const TableRow = ({ option, checkedValues, handleCheckboxChange, hasChildren, toggleChildrenVisibility, isChildrenVisible, mode, subject }) => {
    const { datacube } = useData();

    const size = 17; // Define size variable

    let usage = 0;
    let accuracy = 0;
    let unattempted = 0;

    let subjectName = "";

    switch (subject) {
        case "math":
            subjectName = "Math";
            break;
        case "reading":
            subjectName = "Reading";
            break;
        default:
            subjectName = "Math";
            break;
    }

    try {
        if (mode === "topics") {
            usage = datacube["Rows"][option.Name]["Cells"]["usage"]["Values"]["total"];
        } else if (mode === "difficulty") {
            usage = datacube["Rows"][subjectName]["Cells"]["usage"]["Values"][option.Name];
        }
    } catch (error) {
        usage = 0;
    }

    try {
        if (mode === "topics") {
            accuracy = datacube["Rows"][option.Name]["Cells"]["accuracy"]["Values"]["total"];
        } else if (mode === "difficulty") {
            accuracy = datacube["Rows"][subjectName]["Cells"]["accuracy"]["Values"][option.Name];
        }
    } catch (error) {
        accuracy = 0;
    }

    try {
        if (mode === "topics") {
            unattempted = datacube["Rows"][option.Name]["Cells"]["unattempted"]["Values"]["total"];
        } else if (mode === "difficulty") {
            unattempted = datacube["Rows"][subjectName]["Cells"]["unattempted"]["Values"][option.Name];
        }
    } catch (error) {
        unattempted = 0;
    }

    let unattemptedNum = 0;
    let correctNum = 0;
    let incorrectNum = 0;
    let flaggedNum = 0;
    let omittedNum = 0;

    try {
        unattemptedNum = datacube["Rows"][subjectName]["Cells"]["unattempted"]["Values"]["total"];
        correctNum = datacube["Rows"][subjectName]["Cells"]["correct"]["Values"]["total"];
        incorrectNum = datacube["Rows"][subjectName]["Cells"]["incorrect"]["Values"]["total"];
        // flaggedNum = datacube["Rows"][subjectName]["Cells"]["flagged"]["Values"]["total"];
        omittedNum = datacube["Rows"][subjectName]["Cells"]["omitted"]["Values"]["total"];

    } catch (error) {
        unattemptedNum = 0;
        correctNum = 0;
        incorrectNum = 0;
        flaggedNum = 0;
        omittedNum = 0;
    }

    let statusStat = 0;

    switch (option.Name) {
        case "Unattempted":
            statusStat = unattemptedNum;
            break;
        case "Answered Correctly":
            statusStat = correctNum;
            break;
        case "Answered Incorrectly":
            statusStat = incorrectNum;
            break;
        case "Flagged":
            statusStat = flaggedNum;
            break;
        case "Omitted":
            statusStat = omittedNum;
            break;
        default:
            break;
    }


    return (
        <tr className={styles.tableRow}>
            <td>
                <Checkbox
                    isChecked={checkedValues.includes(option.Name)}
                    setIsChecked={() => handleCheckboxChange(option.Name, false)}
                    isChild={false}
                />
            </td>
            <td >
                {capitalizeFirstLetter(option.Name)}
            </td>
            <td >
                {(mode === "topics" || mode === "difficulty") &&
                    <MyProgressBar
                        value={
                            usage
                        }
                    />
                }
            </td>
            <td>
                {(mode === "topics" || mode === "difficulty") &&
                    <MyProgressBar
                        value={accuracy}
                    />
                }
            </td>
            <td style={{ textAlign: 'center' }}>
                {mode === "ansStatus" ? statusStat : unattempted}
            </td>
            <td style={{ width: '30px' }}>
                {hasChildren &&
                    <div className={styles.iconContainer} onClick={toggleChildrenVisibility}>
                        <Image src={isChildrenVisible ? UpIcon : DownIcon} alt="toggle" width={size} height={size} />
                    </div>
                }
            </td>
        </tr>
    );
};




export const MyTable = ({ title, options, checkedValues, setCheckedValues, mode, subject }) => {


    const [childrenVisibility, setChildrenVisibility] = useState(options.map(() => false));

    const toggleChildrenVisibility = (index) => {
        setChildrenVisibility(childrenVisibility.map((visible, i) => i === index ? !visible : visible));
    };


    const handleCheckboxChange = (value, isChild, parentName) => {
        if (isChild) {
            if (checkedValues.includes(value)) {
                setCheckedValues(checkedValues.filter(checkedValue => checkedValue !== value && checkedValue !== parentName));
            } else {
                const parentOption = options.find(option => option.Name === parentName);
                if (parentOption.Children.every(child => checkedValues.includes(child.Name) || child.Name === value)) {
                    setCheckedValues([...checkedValues, parentName, value]);
                } else {
                    setCheckedValues([...checkedValues, value]);
                }
            }
        } else {
            if (checkedValues.includes(value)) {
                setCheckedValues(checkedValues.filter(checkedValue => checkedValue !== value && (!options.find(option => option.Name === value).Children || !options.find(option => option.Name === value).Children.map(child => child.Name).includes(checkedValue))));
            } else {
                setCheckedValues([...checkedValues, value, ...(options.find(option => option.Name === value).Children || []).map(child => child.Name)]);
            }
        }
    };

    const [isAllSelected, setIsAllSelected] = useState(false);

    const selectAll = (newCheckedState) => {
        const allOptionNames = options.flatMap(option => [option.Name, ...(option.Children || []).map(child => child.Name)]);
        if (newCheckedState) {
            setCheckedValues(allOptionNames);
        } else {
            setCheckedValues([]);
        }
        setIsAllSelected(newCheckedState);
    };

    


    return (
        <div>
            <table className={styles.filterTable}>
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>
                        <Checkbox
                                isChecked={isAllSelected}
                                setIsChecked={selectAll}
                                isChild={false}
                            />
                        </th>
                        <th style = {{textAlign: 'left', width: '300px'}}> {title}</th>
                        <th style={{ width: '100px' }}> {mode === "ansStatus"? "": "Progress"}</th>
                        <th style={{ width: '100px' }}> {mode === "ansStatus"? "": "% Correct"}</th>
                        <th style={{ width: '100px' }}>Questions remaining</th>
                        <th style={{ width: '50px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {options.map((option, index) => (
                        <>
                            <TableRow
                                option={option}
                                checkedValues={checkedValues}
                                handleCheckboxChange={handleCheckboxChange}
                                hasChildren={!!option.Children}
                                toggleChildrenVisibility={() => toggleChildrenVisibility(index)}
                                isChildrenVisible={childrenVisibility[index]}
                                mode={mode}
                                subject = {subject}
                            />
                            {option.Children && childrenVisibility[index] && option.Children.map(child => (
                                <TableRow
                                    key={child.Name}
                                    option={child}
                                    checkedValues={checkedValues}
                                    handleCheckboxChange={(value) => handleCheckboxChange(value, true, option.Name)}
                                    hasChildren={!!child.Children}
                                    mode={mode}
                                    subject = {subject}

                                />
                            ))}
                        </>
                    ))}
                </tbody>
            </table>
            {/* <a href="#" onClick={selectAll} className={styles.selectAll}>Select All</a> */}
        </div>
    );
};

export const CheckboxGroupContainer = ({ options, checkedValues, setCheckedValues, mode }) => {
    return (
                <MyTable options={options} checkedValues={checkedValues} setCheckedValues={setCheckedValues} mode={mode} />
    )
}

