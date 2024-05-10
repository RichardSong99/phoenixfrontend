"use client"
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { fetchTestUnderlyingByID } from '@/app/helper/apiservices/testservice';
import { SelectionBar } from '../../../helper/components/basecomponents/selectionbar/selectionbar';
import SummaryPanel from '../../../helper/components/summarypanel/summarypanel';
import styles from './reviewpracticetestslug.module.css';
import { ProgressBar } from "react-bootstrap";
import { NavBarContext } from '@/app/helper/context/navbarcontext';
import { Card, CardHeader, CardBody, CardFooter, Progress, Spacer, Button } from '@nextui-org/react';


export default function Page() {
    const pathname = usePathname(); // Update variable name
    const router = useRouter(); // Update variable name
    const [testID] = pathname.split('/').slice(-1).map(part => decodeURI(part));
    const [activeTab, setActiveTab] = useState(0);

    const { setIsStudyNavBarVisible, setIsTopNavBarVisible } = useContext(NavBarContext);

    useEffect(() => {
        setIsStudyNavBarVisible(true);
        setIsTopNavBarVisible(true);
    }, []);


    const [testObject, setTestObject] = useState(null);

    const moduleNameMapping = [
        { name: "Reading module 1" },
        { name: "Reading module 2" },
        { name: "Math module 1" },
        { name: "Math module 2" },
    ]

    const mathTopics = [
        "Algebra",
        "Advanced math",
        "Problem solving and data analysis",
        "Geometry and trigonometry",
        "Math"
    ]

    const readingTopics = [
        "Information and ideas",
        "Craft and structure",
        "Expression of ideas",
        "Standard English conventions",
        "Reading"
    ]

    const loadTestObject = async () => {
        try {
            const testObject = await fetchTestUnderlyingByID({ testID });
            console.log("testObject", testObject);
            setTestObject(testObject);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        loadTestObject();
    }, []);

    const handleTabChange = (tabNum) => {
        setActiveTab(tabNum);
    }


    return (
        <div >
            <div className="flex h-14 items-center px-4 border-b dark:border-gray-800 w-full">
                <Button color = "secondary" onClick={() => router.back()}>
                    Back
                </Button>
            </div>
            <div className = {styles.outerDiv}>
            {testObject &&
                <div className={styles.mainPanel}>
                    <Card>
                        <CardBody>
                            <div className={styles.scaledScorePanel}>
                                <ScoreTile title={"Overall Score"} score={testObject.totalScaled} range={"400 - 1600"} />
                                <ScoreTile title={"Math"} score={testObject.mathScaled} range={"200 - 800"} />
                                <ScoreTile title={"Reading"} score={testObject.readingScaled} range={"200 - 800"} />
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className={styles.overallStatDiv}>
                                <div className={styles.subStatDiv}>
                                    {mathTopics.map((topic, index) => {
                                        return (
                                            <SubjectBar
                                                key={index}
                                                subject={topic}
                                                correct={testObject?.testStats?.Stats.find(item => item.Name === topic)?.Correct}
                                                total={testObject?.testStats?.Stats.find(item => item.Name === topic)?.Total}
                                            />
                                        )
                                    })}
                                </div>

                                <div className={styles.subStatDiv}>
                                    {readingTopics.map((topic, index) => {
                                        return (
                                            <SubjectBar
                                                key={index}
                                                subject={topic}
                                                correct={testObject?.testStats?.Stats.find(item => item.Name === topic)?.Correct}
                                                total={testObject?.testStats?.Stats.find(item => item.Name === topic)?.Total}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <SelectionBar
                                tabList={moduleNameMapping.map(item => item.name)}
                                activeTab={activeTab}
                                handleTabChange={handleTabChange}
                            />

                            <Spacer y={4} />





                            <SummaryPanel
                                questionEngagements={testObject.quizResults[activeTab].Questions}
                                quizID={testObject?.quizResults[activeTab]?.Quiz?.id}
                            />
                        </CardBody>
                    </Card>

                </div>
            }

        </div>
        </div>
    )

}

export const ScoreTile = ({ title, score, range }) => {
    return (
        <div className={styles.scoreTile}>
            <div className={styles.scoreTitle}>{title}</div>
            <div className={styles.scoreBody}>
                <div style={{ color: "black", fontWeight: "600", fontSize: "23px" }}>{score}</div>
                <div className={styles.scoreDivider} />
                <div style={{ color: "#716E6E", fontSize: "14px" }}>{range}</div>
            </div>
        </div>
    )
}

export const SubjectBar = ({ subject, correct, total }) => {
    return (
        <div className={styles.subjectBar}>
            <div className="flex flex-row" style={{ fontSize: "12px", fontWeight: "700", display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div>{subject}</div>
                <div>{correct}/{total}</div>
            </div>
            <ProgressBar now={100 * correct / total} style={{ height: '8px', width: '100%' }} variant="info" />
        </div>
    )
}