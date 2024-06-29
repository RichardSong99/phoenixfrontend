import React, { useState, useEffect } from 'react';
import AIPrompt from '@/app/helper/components/questionbank/ai/aiprompt';
import { Slider, Select, SelectItem, Button } from "@nextui-org/react";
import { useData } from '@/app/helper/context/datacontext';
import QBankForm from './qbankform';
import { getGeneratedQuestions } from '@/app/helper/apiservices/questiongenerationservice';

const QuestionGeneration = () => {

    const [topicsData, setTopicsData] = useState([]);
    const [generalCategory, setGeneralCategory] = useState("");
    const [specificTopic, setSpecificTopic] = useState("");
    const [numEasy, setNumEasy] = useState(1);
    const [numMedium, setNumMedium] = useState(1);
    const [numHard, setNumHard] = useState(1);
    const [questionResponseArray, setQuestionResponseArray] = useState([]);

    const { getTopicList, loading, datacube } = useData();


    const handleChangeSubject = async (subject) => {
        setSubject(subject);
        const topicsData = await getTopicList(subject);
        setTopicsData(topicsData);
        if (topicsData && topicsData.length > 0) {
            setGeneralCategory(topicsData[0].Name);
            setSpecificTopic(topicsData[0].Children[0].Name);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTopicList("math");
            setTopicsData(result);

            if (result && result.length > 0) {
                console.log("topicsData", result);
                setGeneralCategory(result[0].Name);
                setSpecificTopic(result[0].Children[0].Name);
            }
        };

        fetchData();
    }, []);

    const handleChangeNumEasy = (value) => {
        setNumEasy(value);
    }

    const handleChangeNumMedium = (value) => {
        setNumMedium(value);
    }

    const handleChangeNumHard = (value) => {
        setNumHard(value);
    }

    const handleGenerateQuestions = async () => {
        console.log("Generate Questions");
        try {
            const data = await getGeneratedQuestions({ topic: specificTopic, numEasy, numMedium, numHard });
            console.log("Generated Questions", data);
            setQuestionResponseArray(data);
        } catch (error) {
            console.error("Error generating questions", error);
        }
    }
    

    return (
        <div>
            {/* Your component code goes here */}
            
            {/* <AIPrompt /> */}

            <div className="space-y-4">
                <h3>Generate Questions</h3>


                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select label="General Category" value={generalCategory} onChange={e => setGeneralCategory(e.target.value)} className="max-w-xs">
                        {topicsData.map(item => (
                            <SelectItem key={item.Name} value={item.Name}>{item.Name}</SelectItem>
                        ))}
                    </Select>
                    {generalCategory && (
                        <Select label="Specific Topic" value={specificTopic} onChange={e => setSpecificTopic(e.target.value)} className="max-w-xs">
                            {topicsData.find(topic => topic.Name === generalCategory).Children.map(child => (
                                <SelectItem key={child.Name} value={child.Name}>{child.Name}</SelectItem>
                            ))}
                        </Select>
                    )}
                </div>



                <Slider
                    size="lg"
                    step={1}
                    label="Easy"
                    showSteps={true}
                    maxValue={10}
                    minValue={0}
                    defaultValue={1}
                    className="max-w-md"
                    onChangeEnd={(value) => handleChangeNumEasy(value)}
                />

                <Slider
                    size="lg"
                    step={1}
                    label="Medium"
                    showSteps={true}
                    maxValue={10}
                    minValue={0}
                    defaultValue={1}
                    className="max-w-md"
                    onChangeEnd={(value) => handleChangeNumMedium(value)}
                />

                <Slider
                    size="lg"
                    step={1}
                    label="Hard"
                    showSteps={true}
                    maxValue={10}
                    minValue={0}
                    defaultValue={1}
                    className="max-w-md"
                    onChangeEnd={(value) => handleChangeNumHard(value)}
                />

                <Button color="primary" onPress = {handleGenerateQuestions} >
                    Generate
                </Button>



            </div>

            <QBankForm />


        </div>


    );
}

export default QuestionGeneration;

