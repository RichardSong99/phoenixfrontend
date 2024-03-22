import React, { useState, useEffect } from "react";
import styles from "./qbankfilter.module.css";

export default function QBankFilter() {
    const [responseType, setResponseType] = useState(["multipleChoice", "freeResponse"]);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState(["easy", "medium", "hard"]);
    const [sort, setSort] = useState("all");

    const handleCheckboxChange = (event, setState, allValues) => {
        if (event.target.value === "all") {
            if (event.target.checked) {
                setState(allValues);
            } else {
                setState([]);
            }
        } else {
            if (event.target.checked) {
                setState(prevState => [...prevState, event.target.value]);
            } else {
                setState(prevState => prevState.filter(value => value !== event.target.value));
            }
        }
    };

    useEffect(() => {
        if (responseType.length === 2) {
            document.getElementById("allResponseType").checked = true;
        } else {
            document.getElementById("allResponseType").checked = false;
        }

        if (difficulty.length === 3) {
            document.getElementById("allDifficulty").checked = true;
        } else {
            document.getElementById("allDifficulty").checked = false;
        }
    }, [responseType, difficulty]);

    return (
        <div className={styles.formcontainer}>
            <form className={styles.qbankfilter}>
            <label className={styles.label}>
                    Category
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
                </label>
                <div className={styles.dropdown}>
                    <button className={styles.dropbtn}>Response Type</button>
                    <div className={styles.dropdownContent}>
                        <label>
                            <input type="checkbox" id="allResponseType" value="all" onChange={e => handleCheckboxChange(e, setResponseType, ["multipleChoice", "freeResponse"])} />
                            All
                        </label>
                        <label>
                            <input type="checkbox" value="multipleChoice" checked={responseType.includes("multipleChoice")} onChange={e => handleCheckboxChange(e, setResponseType)} />
                            Multiple Choice
                        </label>
                        <label>
                            <input type="checkbox" value="freeResponse" checked={responseType.includes("freeResponse")} onChange={e => handleCheckboxChange(e, setResponseType)} />
                            Free Response
                        </label>
                    </div>
                </div>
               
                <div className={styles.dropdown}>
                    <button className={styles.dropbtn}>Difficulty</button>
                    <div className={styles.dropdownContent}>
                        <label>
                            <input type="checkbox" id="allDifficulty" value="all" onChange={e => handleCheckboxChange(e, setDifficulty, ["easy", "medium", "hard"])} />
                            All
                        </label>
                        <label>
                            <input type="checkbox" value="easy" checked={difficulty.includes("easy")} onChange={e => handleCheckboxChange(e, setDifficulty)} />
                            Easy
                        </label>
                        <label>
                            <input type="checkbox" value="medium" checked={difficulty.includes("medium")} onChange={e => handleCheckboxChange(e, setDifficulty)} />
                            Medium
                        </label>
                        <label>
                            <input type="checkbox" value="hard" checked={difficulty.includes("hard")} onChange={e => handleCheckboxChange(e, setDifficulty)} />
                            Hard
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
}