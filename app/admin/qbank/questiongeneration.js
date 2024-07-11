import React, { useState, useEffect } from 'react';
import AIPrompt from '@/app/helper/components/questionbank/ai/aiprompt';
import { Slider, Select, SelectItem, Button, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { useData } from '@/app/helper/context/datacontext';
import QBankForm from './qbankform';
import { getGeneratedQuestions, visionAITester } from '@/app/helper/apiservices/questiongenerationservice';
import { createNewQuestion } from '@/app/helper/data/questionhelpers';
import { ImageUpload } from '@/app/helper/components/form/formcomponents';

const QuestionGeneration = () => {

    const [topicsData, setTopicsData] = useState([]);
    const [generalCategory, setGeneralCategory] = useState("");
    const [specificTopic, setSpecificTopic] = useState("");
    const [numEasy, setNumEasy] = useState(1);
    const [numMedium, setNumMedium] = useState(1);
    const [numHard, setNumHard] = useState(1);
    const [questionResponseArray, setQuestionResponseArray] = useState([]);
    const [questionArray, setQuestionArray] = useState([]);
    const [images, setImages] = useState([]);

    const { getTopicList, loading, datacube } = useData();


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
            const data = await getGeneratedQuestions({ topic: specificTopic, numEasy, numMedium, numHard, images });
            console.log("Generated Questions", data);
            setQuestionResponseArray(data);
            for (let i = 0; i < data.length; i++) {
                const question = createNewQuestion({
                    prompt: data[i].prompt,
                    text: '',
                    answerType: 'multipleChoice',
                    difficulty: data[i].difficulty,
                    subject: "math",
                    specificTopic: specificTopic,
                    answerChoices: [data[i].choiceA, data[i].choiceB, data[i].choiceC, data[i].choiceD],
                    explanation: data[i].explanation,
                    accessOption: "free",
                    correctAnswerMultiple: data[i].answer,
                    correctAnswerFree: '',
                    uploadedImageUrls: []
                });
                setQuestionArray((prev) => [...prev, question]);
            }
        } catch (error) {
            console.error("Error generating questions", error);
        }
    }

    const handleRemoveQuestion = (index) => {
        const newQuestionArray = [...questionArray];
        newQuestionArray.splice(index, 1);
        setQuestionArray(newQuestionArray);
    }

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const imageAITester = async () => {
        console.log("Image AI Tester", images)

        try{
            const data = await visionAITester({images});
            console.log("Image AI Tester", data);
        }catch(error){
            console.error("Error testing images", error);
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
                
                <ImageUpload onChangeLocalImages={updateImages}/>


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

                <Button color="primary" onPress={handleGenerateQuestions} >
                    Generate
                </Button>

                {/* <Button color="success" onPress={imageAITester} >
                    Image Tester
                </Button> */}



            </div>

            <Divider className="my-4" />


            <div>
                {questionArray.map((question, index) => (
                    <div>
                        <Card key={index} className="w-full">
                            <CardHeader>
                                <h4>Question {index + 1}</h4>
                            </CardHeader>
                            <CardBody>
                                <QBankForm question={question} />
                            </CardBody>
                            <CardFooter>
                                <Button color="danger" onPress={() => handleRemoveQuestion(index)} >
                                    Remove
                                </Button>
                            </CardFooter>
                        </Card>
                        <Divider className="my-4" />
                    </div>

                ))}

                {questionArray.length == 0 && (
                    <Card key={0} className="w-full">
                        <CardHeader>
                            <h4>Question {1}</h4>
                        </CardHeader>
                        <CardBody>
                            <QBankForm />
                        </CardBody>
                        <CardFooter>
                            <Button color="danger" onPress={() => handleRemoveQuestion(index)} >
                                Remove
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>

        </div>


    );
}

export default QuestionGeneration;

