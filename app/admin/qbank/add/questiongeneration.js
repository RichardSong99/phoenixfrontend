import React, { useState, useEffect, useContext } from 'react';
import { Slider, Select, SelectItem, Button, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Spinner, Input } from "@nextui-org/react";
import { useData } from '@/app/helper/context/datacontext';
import QBankForm from '../../../helper/components/qbank/qbankform/qbankform';
import { getGeneratedQuestions, visionAITester } from '@/app/helper/apiservices/questiongenerationservice';
import { createNewQuestion } from '@/app/helper/data/questionhelpers';
import { ImageUpload } from '@/app/helper/components/form/formcomponents';
import { QuestionContext } from '@/app/helper/context/questioncontext';

const QuestionGeneration = () => {

    const { topicMapping, loading, datacube, getCategoryList, getTopicsByCategory } = useData();

    const [subject, setSubject] = useState("Math");
    const [generalCategory, setGeneralCategory] = useState(topicMapping[0].category);
    const [specificTopic, setSpecificTopic] = useState(topicMapping[0].topic);
    const [numEasy, setNumEasy] = useState(1);
    const [numMedium, setNumMedium] = useState(0);
    const [numHard, setNumHard] = useState(0);
    const [questionResponseArray, setQuestionResponseArray] = useState([]);
    const [questionArray, setQuestionArray] = useState([]);
    const [images, setImages] = useState([]);
    const [questionDescription, setQuestionDescription] = useState("");

    const questionTemplates = [
        "MATH_SIMPLE", 
        "MATH_GRAPHIC",
        "RW_BLANK",
        "RW_SINGLE_PASSAGE",
        "RW_DOUBLE_PASSAGE",
        "RW_BULLETED_TEXT",
        "RW_GRAPHIC",
    ]

    useEffect(() => {
        if(specificTopic !== ""){
            setQuestionDescription(specificTopic);
        }
    }, [specificTopic])

    const [questionTemplate, setQuestionTemplate] = useState(questionTemplates[0]);


    const [generationLoading, setGenerationLoading] = useState(false);

    const { MODENEW } = useContext(QuestionContext);

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
            setGenerationLoading(true);
            const data = await getGeneratedQuestions({ description: questionDescription, numEasy: numEasy, numMedium: numMedium, numHard: numHard, images: images, questionTemplate: questionTemplate });
            console.log("Generated Questions", data);
            setQuestionResponseArray(data);
            for (let i = 0; i < data.length; i++) {
                const question = createNewQuestion({
                    prompt: data[i].prompt,
                    text1: data[i].text1,
                    text2: data[i].text2,
                    text1Description: data[i].text1_description,
                    text2Description: data[i].text2_description,
                    graphicLatex: data[i].graphic_latex,
                    graphicDescription: data[i].graphic_description,
                    // graphic SVG -- to be added later
                    answerType: 'multipleChoice',
                    difficulty: data[i].difficulty,
                    subject: subject,
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

            setGenerationLoading(false);
            
        } catch (error) {
            console.error("Error generating questions", error);
            setGenerationLoading(false);
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
                    <Select label="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="max-w-xs">
                        <SelectItem key="Math" value="Math">Math</SelectItem>
                        <SelectItem key="Reading & Writing" value="Reading & Writing">Reading & Writing</SelectItem>

                    </Select>
                    
                    <Select label="General Category" value={generalCategory} onChange={e => setGeneralCategory(e.target.value)} className="max-w-xs">
                        {getCategoryList(subject).map(item => (
                            <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                    </Select>
                    {generalCategory && (
                        <Select label="Specific Topic" value={specificTopic} onChange={e => setSpecificTopic(e.target.value)} className="max-w-xs">
                            {getTopicsByCategory(generalCategory).map(topic => (
                                <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                            ))}
                        </Select>
                    )}
                    <Select label = "Question Template" value = {questionTemplate} onChange={e => setQuestionTemplate(e.target.value)} className="max-w-xs">
                        {questionTemplates.map(item => (
                            <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                    </Select>
                    <Input label = "Question description to AI" placeholder="Enter question description" value = {questionDescription} onChange = {e => setQuestionDescription(e.target.value)} className="max-w-xs" />
                </div>
                
                <ImageUpload onChangeLocalImages={updateImages}/>


                <Slider
                    size="md"
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
                    size="md"
                    step={1}
                    label="Medium"
                    showSteps={true}
                    maxValue={10}
                    minValue={0}
                    defaultValue={0}
                    className="max-w-md"
                    onChangeEnd={(value) => handleChangeNumMedium(value)}
                />

                <Slider
                    size="md"
                    step={1}
                    label="Hard"
                    showSteps={true}
                    maxValue={10}
                    minValue={0}
                    defaultValue={0}
                    className="max-w-md"
                    onChangeEnd={(value) => handleChangeNumHard(value)}
                />

                <div className="flex items-center space-x-4">
                <Button color="primary" onPress={handleGenerateQuestions} >
                    Generate
                </Button>

                {generationLoading && (
                    <Spinner color="primary" />
                )}

                </div>

                {/* <Button color="success" onPress={imageAITester} >
                    Image Tester
                </Button> */}



            </div>

            <Divider className="my-4" />


            <div>
                {questionArray.map((question, index) => (
                    <div key = {index}>
                        <Card key={index} className="w-full">
                            <CardHeader>
                                <h4>Question {index + 1}</h4>
                            </CardHeader>
                            <CardBody>
                                <QBankForm inputQuestion={question} mode = {MODENEW} initialSubject = {subject} initialGeneralCategory = {generalCategory} initialSpecificTopic= {specificTopic} />
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
                            <QBankForm mode = {MODENEW} initialSubject = {subject} initialGeneralCategory = {generalCategory} initialSpecificTopic= {specificTopic}/>
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

