"use client"

import { usePathname } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { SelectionBar } from "../components/selectionbar/selectionbar";
import { LessonContainer } from "../components/topicpage/lessoncontainer";
import styles from './page.module.css';
import { NavBarContext } from "@/app/context/navbarcontext";
import { Header } from "../components/header/header";
import { useRouter } from "next/navigation";
import { fetchLessonModule } from "@/app/services/parameterdataservice";
import { fetchVideosById } from "@/app/services/videoservice";

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
        router.push(`/study/lessonmodule/${formattedGroupName}/${activeIndex}`);
    }

    useEffect(() => {
        setIsStudyNavBarVisible(true);
        setIsTopNavBarVisible(true);
        loadObjectList();
    }, [])

    const pmIDs = [
        "Linear equations in 1 variable",
        "Linear equations in 2 variables",
    ]

    const loadObjectList = async () => {
        let tempObjectList = [...objectList];

        for (let group of pmIDs) {
            let tempObject = {};
            tempObject.name = group;

            try{
                const response = await fetchLessonModule({ name: group})
                tempObject.total = response.VideoIDs.length;
                const fullResponse = await fetchVideosById({ videoIDList: response.VideoIDs });
                tempObject.completed = fullResponse.numWatched;
            }catch (error) {
                tempObject.total = 0;
                tempObject.completed = 0;
            }

            tempObjectList.push(tempObject);
        }
        setObjectList(tempObjectList);
    }


    return (
        <div className={styles.outerDiv}>
            <div className={styles.mainPanel}>
                {/* <Header text={"Lesson Modules"} /> */}
                <div className={styles.banner}>
                    <h3>LESSON MODULES</h3>
                    <span>Curated lessons to help you ace the real test!</span>
                </div>


                <div className={styles.topicContainer}>
                    {/* <SelectionBar activeTab={activeTab} handleTabChange={handleTabChange} /> */}



                    <div className={styles.groupContainer}>
                        {
                            // Fix: Use the correct variable name 'topicContentList' instead of 'topicName'
                            objectList.map((object, index) => {
                                return (
                                    <LessonContainer
                                        key={index}
                                        groupNum={index + 1}
                                        groupName={object.name}
                                        type="lessons"
                                        tier="free"
                                        onStartClick={onStartClick}
                                        numCompleted={object.completed}
                                        numTotal={object.total}
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