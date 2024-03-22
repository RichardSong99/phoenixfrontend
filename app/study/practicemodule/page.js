"use client"

import { usePathname } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { SelectionBar } from "../components/selectionbar/selectionbar";
import { LessonContainer } from "../components/topicpage/lessoncontainer";
import { fetchPracticeModule } from "@/app/services/parameterdataservice";
import {fetchQuiz, fetchQuizUnderlyingById} from "@/app/services/quizservice";
import styles from './page.module.css';
import { NavBarContext } from "@/app/context/navbarcontext";
import { Header } from "../components/header/header";
import { useRouter } from "next/navigation";

export default function TopicPage() {


    const { setIsStudyNavBarVisible, setIsTopNavBarVisible } = useContext(NavBarContext);
    const [activeTab, setActiveTab] = useState("Math");
    const [objectList, setObjectList] = useState([]);

    const router = useRouter();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    const onStartClick = ({ groupName }) => {
        const activeIndex = 0;
        const formattedGroupName = encodeURIComponent(groupName);
        router.push(`/study/practicemodule/${formattedGroupName}/${activeIndex}`);
    }

    useEffect(() => {
        setIsStudyNavBarVisible(true);
        setIsTopNavBarVisible(true);
        loadObjectList();
        

    }, [])

    const loadObjectList = async () => {
        let tempObjectList = [...objectList];
    
        for (let group of pmIDs) {
            let tempObject = {};
            tempObject.name = group;
    
            try {
                const response = await fetchQuiz({ quizName: group });
                const fullResponse = await fetchQuizUnderlyingById({ quizID: response.id });
                tempObject.total = fullResponse.NumTotal;
                tempObject.completed = fullResponse.NumAnswered;
            } catch (error) {
                // if there's an error, then we need to create a quiz with this set of questions
                try{
                    const response = await fetchPracticeModule({ name: group });
                    // create the quiz
                    tempObject.total = response.QuestionIDs.length;
                    tempObject.completed = 0;
                } catch (error) {
                    console.log("error", error)
                }
            }
            tempObjectList.push(tempObject);
        }
        setObjectList(tempObjectList);
    }

    const pmIDs = [
        "Linear equations in 1 variable",
        "Linear equations in 2 variables",
        "Linear functions",
        "Systems of 2 linear equations in 2 variables",
        "Linear inequalities in 1 or 2 variables"
    ]


    return (
        <div className = {styles.outerDiv}>
            <div className={styles.mainPanel}>
                {/* <Header text={"Practice Modules"} /> */}
                <div className = {styles.banner}>
                    <h3>PRACTICE MODULES</h3>
                    <span>Curated practice questions to help you ace the real test!</span>
                </div>

                <div className={styles.topicContainer}>
                    {/* <SelectionBar activeTab={activeTab} handleTabChange={handleTabChange} /> */}



                    <div className={styles.groupContainer}>
                        {
                            // Fix: Use the correct variable name 'topicContentList' instead of 'topicName'
                            objectList.length > 0 && objectList.map((object, index) => {
                                return (
                                    <LessonContainer
                                        key={index}
                                        groupNum={index + 1}
                                        groupName={object.name}
                                        type="practiceQuestions"
                                        tier="free"
                                        onStartClick={onStartClick}
                                        numCompleted = {object.completed}
                                        numTotal = {object.total}
                                    />
                                );
                            })
                        }

                    </div>

                </div>
            </div>


        </div>
    );
}