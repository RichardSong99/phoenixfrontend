import React, { useEffect, useState } from 'react';
import { CriteriaElement } from '@/app/components/criteriabox/criteriabox';
import styles from './parameterspanel.module.css';
import { ViewToggle } from '../../study/browse/viewtoggle';
import UpIcon from '@/app/assets/components/Up-icon.svg';
import DownIcon from '@/app/assets/components/Down-icon.svg';
import Image from 'next/image';
import { Switch } from '@/app/components/switch/switch';
import { FilterChip } from './filtercomponents';
import { capitalizeFirstLetter } from '@/app/study/data/utility';
import { equalContainsArrays } from '@/app/study/data/utility';
import { useData } from '@/app/context/datacontext';

export default function ParametersPanel({
    checkedTopics,
    checkedAnsStatus,
    checkedDifficulty,
    setCheckedTopics,
    setCheckedAnsStatus,
    setCheckedDifficulty,
    onSortChange,
    sortOption,
    displayMode,
    onDisplayModeChange
}) {
    const [isExpanded, setIsExpanded] = useState(true);
    const { getTopicList, datacube } = useData();

    const allAnsStatus = ["Unattempted", "Answered Incorrectly", "Omitted", "Answered Correctly"];
    const allDifficulty = ["easy", "medium", "hard", "extreme"];

    const allMathTopicsBackend = getTopicList("math");
    const allReadingTopicsBackend = getTopicList("reading");
    const allMathTopicsDisplay = allMathTopicsBackend.map((item, index) => (item.Name));
    const allReadingTopicsDisplay = allReadingTopicsBackend.map((item, index) => (item.Name));

    const [checkedMathTopicsDisplay, setCheckedMathTopicsDisplay] = useState(allMathTopicsDisplay);
    const [checkedReadingTopicsDisplay, setCheckedReadingTopicsDisplay] = useState(allReadingTopicsDisplay);

    const [loadingTotalsArray, setLoadingTotalsArray] = useState(true);

    const [totalsArray, setTotalsArray] = useState([]);

    useEffect(() => {
        if (datacube && allMathTopicsDisplay && allReadingTopicsDisplay && allDifficulty && allAnsStatus) {
            let newTotalsArray = [];

            for (let i = 0; i < allMathTopicsDisplay.length; i++) {
                let topic = allMathTopicsDisplay[i];
                console.log("topic", topic)
                let total = 0;
                try {
                    total = datacube?.Rows?.[topic]?.["Cells"]["total"]["Values"]["total"]
                } catch (e) {
                    console.log(e);
                    total = 0;
                }
                newTotalsArray.push({ "name": topic, "total": total });
            }

            console.log("totalsArray", totalsArray);


            for (let i = 0; i < allReadingTopicsDisplay.length; i++) {
                let topic = allReadingTopicsDisplay[i];
                let total = 0;
                try {
                    total = datacube?.Rows?.[topic]?.["Cells"]["total"]["Values"]["total"]
                } catch (e) {
                    console.log(e);
                    total = 0;

                }
                newTotalsArray.push({ "name": topic, "total": total });
            }

            //loop over allDifficulty
            for (let i = 0; i < allDifficulty.length; i++) {
                let difficulty = allDifficulty[i];
                let total = 0;
                try {
                    total = datacube?.Rows?.["Total"]["Cells"]["total"]["Values"][difficulty]
                } catch (e) {
                    console.log(e);
                    total = 0;

                }
                newTotalsArray.push({ "name": difficulty, "total": total });
            }

            //loop over allAnsStatus
            for (let i = 0; i < allAnsStatus.length; i++) {
                let ansStatus = allAnsStatus[i];

                let backendAnsStatus = "";
                if (ansStatus === "Answered Incorrectly") {
                    backendAnsStatus = "incorrect";
                } else if (ansStatus === "Answered Correctly") {
                    backendAnsStatus = "correct";
                } else if (ansStatus === "Unattempted") {
                    backendAnsStatus = "unattempted";
                } else if (ansStatus === "Omitted") {
                    backendAnsStatus = "omitted";
                }


                let total = 0;
                try {
                    total = datacube?.Rows?.["Total"]["Cells"][backendAnsStatus]?.["Values"]["total"]
                } catch (e) {
                    console.log(e);
                }
                newTotalsArray.push({ "name": ansStatus, "total": total });
            }

            console.log("totalsArray", totalsArray);
            setTotalsArray(newTotalsArray);
            setLoadingTotalsArray(false);
        }
    }
    , [datacube]);

    useEffect(() => {
        console.log("allMathTopicsBackend", allMathTopicsBackend, "allReadingTopicsBackend");

        const mathTopics = allMathTopicsBackend
            .filter(item => checkedMathTopicsDisplay.includes(item.Name))
            .flatMap(item => item.Children.map(child => child.Name));
        const readingTopics = allReadingTopicsBackend
            .filter(item => checkedReadingTopicsDisplay.includes(item.Name))
            .flatMap(item => item.Children.map(child => child.Name));
        console.log("mathTopics", mathTopics, "readingTopics", readingTopics)
        setCheckedTopics([...mathTopics, ...readingTopics]);
    }, [checkedMathTopicsDisplay, checkedReadingTopicsDisplay, allMathTopicsBackend, allReadingTopicsBackend]);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const addCheckedAnsStatus = (label) => {
        if (label === "All") {
            setCheckedAnsStatus(allAnsStatus);
            return;
        }

        if (checkedAnsStatus.includes(label)) {
            setCheckedAnsStatus(checkedAnsStatus.filter(item => item !== label));
        } else {
            setCheckedAnsStatus([...checkedAnsStatus, label]);
        }
    }

    const addCheckedDifficulty = (label) => {
        if (label === "All") {
            setCheckedDifficulty(allDifficulty);
            return;
        }

        if (checkedDifficulty.includes(label)) {
            setCheckedDifficulty(checkedDifficulty.filter(item => item !== label));
        } else {
            setCheckedDifficulty([...checkedDifficulty, label]);
        }
    }



    const addMathTopics = (label) => {
        if (label === "All") {
            setCheckedMathTopicsDisplay(allMathTopicsDisplay);
        } else {
            if (checkedMathTopicsDisplay.includes(label)) {
                setCheckedMathTopicsDisplay(checkedMathTopicsDisplay.filter(item => item !== label));
            } else {
                setCheckedMathTopicsDisplay([...checkedMathTopicsDisplay, label]);
            }
        }
    }




    const addReadingTopics = (label) => {
        if (label === "All") {
            setCheckedReadingTopicsDisplay(allReadingTopicsDisplay);
            return;
        }
        if (checkedReadingTopicsDisplay.includes(label)) {
            setCheckedReadingTopicsDisplay(checkedReadingTopicsDisplay.filter(item => item !== label));
        } else {
            setCheckedReadingTopicsDisplay([...checkedReadingTopicsDisplay, label]);
        }
    }


    return (
        <>{!loadingTotalsArray && (<div className={styles.parametersPanel}>
            <div onClick={toggleExpansion} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Image src={isExpanded ? UpIcon : DownIcon} className={styles.scrollUp} alt="Toggle expansion" />
                {!isExpanded && <span style={{ marginLeft: '10px', color: '#73B8F7' }}>Filter Questions</span>}
            </div>

            <div className={`${styles.expandableSection} ${isExpanded ? '' : styles.collapsed}`}>
                {isExpanded && (<React.Fragment>


                    <div className={styles.criteriaSection}>
                        <h2>Selected Math Topics</h2>
                        <div className={styles.criteriaContainer}>
                            <FilterChip label={"All"} selected={equalContainsArrays(checkedMathTopicsDisplay, allMathTopicsDisplay)} onClick={() => addMathTopics("All")} />

                            {allMathTopicsBackend.map((item, index) => {
                                const foundElement = totalsArray.find(element => element.name === item.Name);
                                const total = foundElement ? foundElement.total : 0;
                                return (
                                    <FilterChip
                                        key={index}
                                        label={item.Name + " (" + total + ")"}
                                        selected={checkedMathTopicsDisplay.includes(item.Name)}
                                        onClick={() => addMathTopics(item.Name)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <hr className={styles.divider} />

                    <div className={styles.criteriaSection}>
                        <h2>Selected Reading Topics</h2>
                        <div className={styles.criteriaContainer}>
                            <FilterChip label={"All"} selected={equalContainsArrays(checkedReadingTopicsDisplay, allReadingTopicsDisplay)} onClick={() => addReadingTopics("All")} />

                            {allReadingTopicsBackend.map((item, index) => {
                                const foundElement = totalsArray.find(element => element.name === item.Name);
                                const total = foundElement ? foundElement.total : 0;
                                return (
                                    <FilterChip
                                        key={index}
                                        label={item.Name + " (" + total + ")"}
                                        selected={checkedReadingTopicsDisplay.includes(item.Name)}
                                        onClick={() => addReadingTopics(item.Name)} />
                                );
                            })}
                        </div>
                    </div>



                    <hr className={styles.divider} />
                    <div className={styles.criteriaSection}>
                        <h2>Selected Answer Status</h2>
                        <div className={styles.criteriaContainer}>
                            <FilterChip label={"All"} selected={equalContainsArrays(checkedAnsStatus, allAnsStatus)} onClick={() => addCheckedAnsStatus("All")} />

                            {allAnsStatus.map((item, index) => {
                                const foundElement = totalsArray.find(element => element.name === item);
                                const total = foundElement ? foundElement.total : 0;
                                return (
                                    <FilterChip
                                        key={index}
                                        label={item + " (" + total + ")"}
                                        selected={checkedAnsStatus.includes(item)}
                                        onClick={() => addCheckedAnsStatus(item)} />)
                            })}
                        </div>
                    </div>
                    <hr className={styles.divider} />
                    <div className={styles.criteriaSection}>
                        <h2>Selected Difficulty</h2>
                        <div className={styles.criteriaContainer}>
                            <FilterChip label={"All"} selected={equalContainsArrays(checkedDifficulty, allDifficulty)} onClick={() => addCheckedDifficulty("All")} />
                            {allDifficulty.map((item, index) => {
                                const foundElement = totalsArray.find(element => element.name === item);
                                const total = foundElement ? foundElement.total : 0;
                                return (

                                    <FilterChip
                                        key={index}
                                        label={capitalizeFirstLetter(item) + " (" + total + ")"}
                                        selected={checkedDifficulty.includes(item)}
                                        onClick={() => addCheckedDifficulty(item)} />
                                )
                            })}
                        </div>
                    </div>
                </React.Fragment>
                )}
            </div>

        </div>)}
        </>
    );
}