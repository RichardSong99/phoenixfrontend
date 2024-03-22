"use client"

import { usePathname } from "next/navigation";
import React, { useState, useEffect , useContext} from "react";
import { SelectionBar } from "../../components/selectionbar/selectionbar";
import { LessonContainer } from "../../components/topicpage/lessoncontainer";
import { fetchTopicContentList } from "@/app/services/parameterdataservice";
import { ContentViewer } from "../../components/contentviewer/contentviewer";
import styles from './topicpage.module.css';
import { NavBarContext } from "@/app/context/navbarcontext";

export default function TopicPage() {

    const [activeTab, setActiveTab] = useState("lessons");
    const [activeMode , setActiveMode] = useState("lessons");
    const pathname = usePathname();
    const lastPathPart = pathname.split('/').pop();

    const [topicName, setTopicName] = useState("Topic Name");
    const [lessonNames, setLessonNames] = useState([]);
    const [PQNames, setPQNames] = useState([]);

    const [activeGroupName, setActiveGroupName] = useState("");

    const [showContentViewer, setShowContentViewer] = useState(false);

    const {setIsStudyNavBarVisible, setIsTopNavBarVisible} = useContext(NavBarContext);

    console.log("lastpathpart", lastPathPart)

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    const onStartClick = ({
        type,
        groupName,
    }) => {
        setActiveGroupName(groupName);
        setActiveMode(type);
        setShowContentViewer(true);
        setIsStudyNavBarVisible(false);
        setIsTopNavBarVisible(false);
    }

    const handleContentViewerClose = () => {
        setShowContentViewer(false);
        setIsStudyNavBarVisible(true);
        setIsTopNavBarVisible(true);
    }



    const topicNames = [
        {
            "Path": "Algebra",
            "Name": "Algebra",
            "LessonNames": [
                "Linear equations in 1 variable",
                "Linear equations in 2 variables",
                "Linear functions",
                "Systems of 2 linear equations in 2 variables",
                "Linear inequalities in 1 or 2 variables"
            ],
            "PQNames": [
                "Linear equations in 1 variable",
                "Linear equations in 2 variables",
                "Linear functions",
                "Systems of 2 linear equations in 2 variables",
                "Linear inequalities in 1 or 2 variables"
            ]
        },
        {
            "Path": "Advanced-math",
            "Name": "Advanced math",
            "LessonNames": [
                "Equivalent expressions",
                "Nonlinear equations in 1 varaible",
                "Systems of equations in 2 variables",
                "Nonlinear functions",
            ],
            "PQNames": [
                "Equivalent expressions",
                "Nonlinear equations in 1 varaible",
                "Systems of equations in 2 variables",
                "Nonlinear functions",
            ]
        },
        {
            "Path": "Problem-solving-and-data-analysis",
            "Name": "Problem solving and data analysis",
            "LessonNames": [
                "Ratios, rates, proportional relationships, and units",
                "Percentages",
                "One-variable data: distributions and measures of center and spread",
                "Two-variable data: models and scatterplots",
                "Probability and conditional probability",
                "Inference from sample statistics and margin of error",
                "Evaluating statistical claims: observational studies and experiments"
            ],
            "PQNames": [
                "Ratios, rates, proportional relationships, and units",
                "Percentages",
                "One-variable data: distributions and measures of center and spread",
                "Two-variable data: models and scatterplots",
                "Probability and conditional probability",
                "Inference from sample statistics and margin of error",
                "Evaluating statistical claims: observational studies and experiments"
            ]
        },
        {
            "Path": "Geometry-and-trigonometry",
            "Name": "Geometry and trigonometry",
            "LessonNames": [
                "Area and volume formulas",
                "Lines, angles, and triangles",
                "Right triangles and trigonometry",
                "Circles",
            ],
            "PQNames": [
                "Area and volume formulas",
                "Lines, angles, and triangles",
                "Right triangles and trigonometry",
                "Circles",
            ]
        }
    ]

    useEffect(() => {
        const topic = topicNames.find(topic => topic.Path.toLowerCase() === lastPathPart.toLowerCase());
        if (topic) {
            setTopicName(topic.Name);
            setLessonNames(topic.LessonNames);
            setPQNames(topic.PQNames);
        }

    }, [lastPathPart]);



    return (
        <div className = {styles.parentDiv}>

            {!showContentViewer && <div className={styles.topicContainer}>
                <SelectionBar activeTab={activeTab} handleTabChange={handleTabChange} />

                {activeTab === "lessons" && (
                    <div className={styles.groupContainer}>
                        {lessonNames.map((group, index) => {
                            return (
                                <LessonContainer
                                    key={index}
                                    groupNum={index + 1}
                                    groupName={group}
                                    type="lessons"
                                    tier="free"
                                    onStartClick={onStartClick}
                                // tier={group.tier}
                                />
                            );
                        })}
                    </div>
                )}

                {activeTab === "practiceQuestions" && (
                    <div className={styles.groupContainer}>
                        {
                            // Fix: Use the correct variable name 'topicContentList' instead of 'topicName'
                            PQNames.map((group, index) => {
                                return (
                                    <LessonContainer
                                        key={index}
                                        groupNum={index + 1}
                                        groupName={group}
                                        type="practiceQuestions"
                                        tier="free"
                                        onStartClick={onStartClick}
                                    />
                                );
                            })
                        }

                    </div>
                )}
            </div>}

            {showContentViewer && (
                <ContentViewer
                    groupName={activeGroupName}
                    handleClose={handleContentViewerClose}
                    mode = {activeMode}
                />
            )}

        </div>
    );
}