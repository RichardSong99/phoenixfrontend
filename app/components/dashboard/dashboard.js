import React, { useContext, useState, useEffect } from 'react';
import { MyPieChart, MyBarChart } from '@/app/components/charts/charts';
import styles from './dashboard.module.css';
import { DataContext, useData } from '@/app/context/datacontext';
import { useUser } from '@/app/context/usercontext';
import { Switch } from '../switch/switch';
import { SecondaryButton, NumberChoiceButtons } from '../buttons/buttons';
import { Dashboard } from '@mui/icons-material';
import { displayNumber, safeAccess } from '@/app/study/data/utility';
import { ProgressBar } from 'react-bootstrap';

export const DashboardTile = ({ children }) => {
    return (
        <div className={styles.dashboardTile}>
            {children}
        </div>
    )
}



function getColor(value) {
    //value from 0 to 1
    if (value === 0) {
        return {
            backgroundColor: '#D0DBDE',
            color: 'white'
        };
    }

    var hue = (value * 120).toString(10);
    var fontColor = hue < 45 ? 'white' : 'black';
    return {
        backgroundColor: ["hsl(", hue, ",100%,50%)"].join(""),
        color: fontColor
    };
}



export const DashboardContents = ({ activeSubject }) => {

    const { datacube, loading, getTopicList } = useData();
    const { isAuthenticated } = useUser();

    const [mathData, setMathData] = useState([]);
    const [readingData, setReadingData] = useState([]);
    const [mathUnattempted, setMathUnattempted] = useState(0);
    const [readingUnattempted, setReadingUnattempted] = useState(0);
    const [loadingHere, setLoadingHere] = useState(true);

    let mathTopics = ["Math", "Algebra", "Advanced math", "Problem solving and data analysis", "Geometry and trigonometry"]
    let readingTopics = ["Reading", "Information and ideas", "Craft and structure", "Expression of ideas", "Standard English conventions"]


    console.log(datacube, "datacube")


    useEffect(() => {
        let newMathData = [];
        let newReadingData = [];
        let newMathUnattempted = 0;
        let newReadingUnattempted = 0;

        for (let topic of mathTopics) {
            let used = 0;
            let accuracy = 0;
            if (datacube) {
                try {
                    let usedRaw = datacube?.Rows?.[topic]["Cells"]["usage"]["Values"]["total"];
                    let accuracyRaw = datacube?.Rows?.[topic]["Cells"]["accuracy"]["Values"]["total"];

                    used = usedRaw ? usedRaw : 0;
                    accuracy = accuracyRaw ? accuracyRaw : 0;
                } catch {
                    used = 0;
                    accuracy = 0;
                }
            }
            newMathData.push({ "name": topic, "used": used, "accuracy": accuracy });
        }

        for (let topic of readingTopics) {
            let used = 0;
            let accuracy = 0;
            if (datacube) {
                try {
                    let usedRaw = datacube?.Rows?.[topic]["Cells"]["usage"]["Values"]["total"];
                    let accuracyRaw = datacube?.Rows?.[topic]["Cells"]["accuracy"]["Values"]["total"];

                    used = usedRaw ? usedRaw : 0;
                    accuracy = accuracyRaw ? accuracyRaw : 0;
                } catch {
                    used = 0;
                    accuracy = 0;
                }
            }
            newReadingData.push({ "name": topic, "used": used, "accuracy": accuracy });
        }

        if (datacube) {
            try {
                let mathUnattemptedRaw = datacube?.Rows?.["Math"]["Cells"]["unattempted"]["Values"]["total"];
                let readingUnattemptedRaw = datacube?.Rows?.["Reading"]["Cells"]["unattempted"]["Values"]["total"];

                newMathUnattempted = mathUnattemptedRaw ? mathUnattemptedRaw : 0;
                newReadingUnattempted = readingUnattemptedRaw ? readingUnattemptedRaw : 0;
            } catch {
                newMathUnattempted = 0;
                newReadingUnattempted = 0;
            }
        }

        setMathData(newMathData);
        setReadingData(newReadingData);
        setMathUnattempted(newMathUnattempted);
        setReadingUnattempted(newReadingUnattempted);
        setLoadingHere(false);
    }, [datacube]);


    return (
        <div className={styles.container}>
            <div className={styles.topPanel}>
                <div className={styles.titleText}>Questions Remaining</div>
                <div className={styles.subTopPanel}>
                    <div className={styles.tile}>
                        <div className={styles.bigText}>{loadingHere ? 0 : (mathUnattempted + readingUnattempted)}</div>
                        <div className={styles.smallText}>Total</div>
                    </div>
                    <div className={styles.tile}>
                        <div className={styles.bigText}>{loadingHere ? 0 : mathUnattempted}</div>
                        <div className={styles.smallText}>Math</div>
                    </div>
                    <div className={styles.tile}>
                        <div className={styles.bigText}>{loadingHere ? 0 : readingUnattempted}</div>
                        <div className={styles.smallText}>Reading</div>
                    </div>
                </div>
            </div>

            <div/>
            <div className = {styles.progressWrapper}>
                Your progress
            <ProgressBar animated now = {60} style={{ height: '20px', width: '100%' }} />
            </div>

            <div/>
            <div/>
            <div/>
            <div/>

            <div className={styles.topicPanel}>

                <div className={styles.legend}>
                    <div className={styles.usedLabel}>% Question bank used</div>
                    <div className={styles.correctLabel}>% accuracy</div>

                </div>

                {/* <StatPanel topic="All" used={"80%"} accuracy={"80%"} /> */}

                <div className={styles.subTopicPanel}>
                    <div className={styles.halfPanel}>
                        <StatPanel topic="Math" used={loadingHere ? 0 : mathData.find(data => data.name === "Math")?.used} accuracy={loadingHere ? 0 : mathData.find(data => data.name === "Math")?.accuracy} />
                        {mathData.map((data, index) => (
                            data.name !== "Math" && (
                                <NormStatPanel key={index} topic={data.name} used={loadingHere ? 0 : data.used} accuracy={loadingHere ? 0 : data.accuracy} />
                            )
                        ))}
                    </div>
                    <div className={styles.halfPanel}>
                        <StatPanel topic="Reading" used={loadingHere ? 0 : readingData.find(data => data.name === "Reading").used} accuracy={loadingHere ? 0 : readingData.find(data => data.name === "Reading").accuracy} />
                        {readingData.map((data, index) => (
                            data.name !== "Reading" && (
                                <NormStatPanel key={index} topic={data.name} used={loadingHere ? 0 : data.used} accuracy={loadingHere ? 0 : data.accuracy} />
                            )
                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
}

export const StatPanel = ({ topic, used, accuracy }) => {
    return (
        <div className={styles.statPanel}>
            <div className={styles.topicLabel}>{topic}</div>
            <div className={styles.usedLabel}>{Math.round(used * 100)}%</div>
            <div className={styles.correctLabel}>{Math.round(accuracy * 100)}%</div>
        </div>
    )
}


export const NormStatPanel = ({ topic, used, accuracy }) => {
    return (
        <div className={styles.statPanel} style={{ backgroundColor: "white" }}>
            <div className={styles.topicLabelNorm}>{topic}</div>
            <div className={styles.usedLabelNorm}>{Math.round(used * 100)}%</div>
            <div className={styles.correctLabelNorm}>{Math.round(accuracy * 100)}%</div>
        </div>
    )
}

