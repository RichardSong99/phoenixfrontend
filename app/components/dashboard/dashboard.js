import React, { useContext, useState, useEffect } from 'react';
import { MyPieChart, MyBarChart } from '@/app/components/charts/charts';
import styles from './dashboard.module.css';
import { DataContext, useData } from '@/app/context/datacontext';
import { useUser } from '@/app/context/usercontext';
import { Switch } from '../switch/switch';
import { SecondaryButton, NumberChoiceButtons } from '../buttons/mybuttons';
import { Dashboard } from '@mui/icons-material';
import { displayNumber, safeAccess } from '@/app/data/utility';
import { ProgressBar } from 'react-bootstrap';
import { Tabs, Tab, Card, CardBody, CardFooter, CardHeader, Progress, Divider } from "@nextui-org/react";

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
                    let usedRaw = datacube?.Rows?.[topic]["Cells"]["unattempted"]["Values"]["total"];
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
                    let usedRaw = datacube?.Rows?.[topic]["Cells"]["unattempted"]["Values"]["total"];
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
            

            <div className="flex gap-10 w-full justify-center">
                <Card className="w-80 mx-2 my-2 rounded-lg shadow-md">
                    <CardHeader className="bg-blue-800 text-white font-semibold text-sm py-2 text-center justify-center">Math</CardHeader>
                    <CardBody className="py-3 text-center"> {/* Increased py value */}
                        <div className="flex flex-col gap-2">
                            <div className="text-3xl font-bold text-blue-800 mt-1">{loadingHere ? 0 : mathUnattempted}</div> {/* Added mt-2 class for margin-top */}
                            <Divider />
                            {mathData.map((data) => (
                                data.name !== "Math" && (
                                    <div className="flex justify-between">
                                        <div className="text-xs">{data.name}</div>
                                        <div className="text-sm font-bold text-blue-800">{loadingHere ? 0 : data.used}</div>
                                    </div>
                                )
                            ))}
                        </div>
                    </CardBody>
                </Card>

                <Card className="w-80 mx-2 my-2 rounded-lg shadow-md">
                    <CardHeader className="bg-blue-800 text-white font-semibold text-sm py-2 text-center justify-center">Reading</CardHeader>
                    <CardBody className="py-3 text-center"> {/* Increased py value */}
                        <div className="flex flex-col gap-2">
                            <div className="text-3xl font-bold text-blue-800 mt-1">{loadingHere ? 0 : readingUnattempted}</div> {/* Added mt-2 class for margin-top */}
                            <Divider />
                            {readingData.map((data) => (
                                data.name !== "Reading" && (
                                    <div className="flex justify-between">
                                        <div className="text-xs">{data.name}</div>
                                        <div className="text-sm font-bold text-blue-800">{loadingHere ? 0 : data.used}</div>
                                    </div>
                                )
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>


    )
}


