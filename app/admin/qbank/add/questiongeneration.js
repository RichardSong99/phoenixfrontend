import React, { useState, useEffect, useContext } from 'react';
import { Slider, Select, SelectItem, Button, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Spinner, Input, Autocomplete, AutocompleteItem,  } from "@nextui-org/react";
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
    const [numMedium, setNumMedium] = useState(2);
    const [numHard, setNumHard] = useState(2);
    const [questionResponseArray, setQuestionResponseArray] = useState([]);
    const [questionArray, setQuestionArray] = useState([]);
    const [images, setImages] = useState([]);
    const [questionDescription, setQuestionDescription] = useState("");
    const [answerType, setAnswerType] = useState("multipleChoice");
    const questionTemplates = [
        "MATH_SIMPLE",
        "MATH_EQUATION1_PROMPT",
        "MATH_EQUATION2_PROMPT",
        "MATH_GRAPHIC",
        "MATH_FREE_SINGLE",
        "MATH_FREE_MULTIPLE",
        "Main purpose",
        "Main idea",
        "Most likely response",
        "Based on the text",
        "Support or weaken argument",
        "Best illustrates the claim",
        "Relevant information from the notes",
        "Data from the graphic",
        "Logically completes text",
        "Function of the sentence",
        "Overall structure of the text",
        "Standard English conventions",
        // "SEC_Verb forms",
        // "SEC_Linking clauses",
    ]
    const [questionTemplate, setQuestionTemplate] = useState(questionTemplates[0]);
    const [generationLoading, setGenerationLoading] = useState(false);
    const { MODENEW } = useContext(QuestionContext);

    const [sourcePracticeTest, setSourcePracticeTest] = useState("CBPT 1");
    const  [sourceModule, setSourceModule] = useState("M1");
    const [sourceQuestion, setSourceQuestion] = useState("1");

    useEffect(() => {
        if (specificTopic !== "") {
            setQuestionDescription(specificTopic);
        }

        if (subject === "Reading & Writing") {
            if (generalCategory === "Standard English conventions") {
                setQuestionTemplate("Standard English conventions");
            }
            else {
                setQuestionTemplate(specificTopic);
            }
        }


    }, [specificTopic, generalCategory, subject])





    useEffect(() => {
        if (questionTemplate === "MATH_FREE_SINGLE" || questionTemplate === "MATH_FREE_MULTIPLE") {
            setAnswerType("freeResponse");
        }
        else {
            setAnswerType("multipleChoice");
        }
    }, [questionTemplate])

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
                    equation1: data[i].equation1,
                    equation2: data[i].equation2,
                    graphicLatex: data[i].graphic_latex,
                    graphicDescription: data[i].graphic_description,
                    // graphic SVG -- to be added later
                    answerType: answerType,
                    difficulty: data[i].difficulty,
                    subject: subject,
                    specificTopic: specificTopic,
                    answerChoices: answerType === 'freeResponse' ? null : [data[i].choiceA, data[i].choiceB, data[i].choiceC, data[i].choiceD],
                    explanation: data[i].explanation,
                    accessOption: "free",
                    correctAnswerMultiple: data[i].correct_answer_multiple,
                    correctAnswerFree: answerType === 'freeResponse' ? data[i].correct_answer_free : null,
                    questionImageURL: null,
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

    const handleRemoveAllQuestions = () => {
        setQuestionArray([]);
    }

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const imageAITester = async () => {
        console.log("Image AI Tester", images)

        try {
            const data = await visionAITester({ images });
            console.log("Image AI Tester", data);
        } catch (error) {
            console.error("Error testing images", error);
        }
    }

    const handleUploadQGenMain = (index) => {
        // remove the key-th question from questionArray
        handleRemoveQuestion(index);
    }




    return (
        <div>
            {/* Your component code goes here */}

            {/* <AIPrompt /> */}

            <div className="space-y-4">
                <h3>Generate Questions</h3>


                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Autocomplete
                        label="Subject"
                        selectedKey={subject}
                        onSelectionChange={setSubject}
                        className="max-w-xs"
                    >
                        <AutocompleteItem key="Math" value="Math">Math</AutocompleteItem>
                        <AutocompleteItem key="Reading & Writing" value="Reading & Writing">Reading & Writing</AutocompleteItem>
                    </Autocomplete>

                    <Autocomplete
                        label="General Category"
                        selectedKey={generalCategory}
                        onSelectionChange={setGeneralCategory}
                        className="max-w-xs"
                    >
                        {getCategoryList(subject).map(item => (
                            <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>
                        ))}
                    </Autocomplete>

                    {generalCategory && (
                        <Autocomplete
                            label="Specific Topic"
                            selectedKey={specificTopic}
                            onSelectionChange={setSpecificTopic}
                            className="max-w-xs"
                        >
                            {getTopicsByCategory(generalCategory).map(topic => (
                                <AutocompleteItem key={topic} value={topic}>{topic}</AutocompleteItem>
                            ))}
                        </Autocomplete>
                    )}

                    <Divider orientation = "vertical"/>

                    <Autocomplete
                        label="Question Template"
                        selectedKey={questionTemplate}
                        onSelectionChange={setQuestionTemplate}
                        className="max-w-xs"
                    >
                        {questionTemplates.map(item => (
                            <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>
                        ))}
                    </Autocomplete>

                    <Input label="Question description to AI" placeholder="Enter question description" value={questionDescription} onChange={e => setQuestionDescription(e.target.value)} className="max-w-xs" />
                    <Divider orientation = "vertical"/>
                    <Autocomplete
                        label="Source Practice Test"
                        selectedKey={sourcePracticeTest}
                        onSelectionChange={setSourcePracticeTest}
                        className="w-40"
                    >
    {Array.from({ length: 6 }, (_, index) => `CBPT ${index + 1}`).map(item => (
                            <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>
                        ))}
                    </Autocomplete>
                    <Autocomplete
                        label="Source Module"
                        selectedKey={sourceModule}
                        onSelectionChange={setSourceModule}
                        className="w-40"
                    >
                        {["M1", "M2", "RW1", "RW2"].map(item => (
                            <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>
                        ))}
                    </Autocomplete>
                    <Autocomplete
                        label="Source Question"
                        selectedKey={sourceQuestion}
                        onSelectionChange={setSourceQuestion}
                        className="w-40"
                    >
                        {Array.from({ length: 40 }, (_, index) => String(index + 1)).map(item => (
                            <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>
                        ))}
                    </Autocomplete>

                </div>

                <ImageUpload onChangeLocalImages={updateImages} />


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
                    defaultValue={2}
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
                    defaultValue={2}
                    className="max-w-md"
                    onChangeEnd={(value) => handleChangeNumHard(value)}
                />

                <div className="flex items-center space-x-4">
                    <Button color="primary" onPress={handleGenerateQuestions} isLoading={generationLoading} >
                        Generate
                    </Button>

                    <Button color="danger" onPress={() => handleRemoveAllQuestions()} >
                        Remove All
                    </Button>


                </div>

                {/* <Button color="success" onPress={imageAITester} >
                    Image Tester
                </Button> */}



            </div>

            <Divider className="my-4" />


            <div>
                {questionArray.map((question, index) => (
                    <div key={index}>
                        <Card key={index} className="w-full">
                            <CardHeader>
                                <h4>Question {index + 1}</h4>
                            </CardHeader>
                            <CardBody>
                                <QBankForm questionKey={index} inputQuestion={question} mode={MODENEW} initialSubject={subject} initialGeneralCategory={generalCategory} initialSpecificTopic={specificTopic} handleUploadQGenMain={handleUploadQGenMain} initialAnswerType={answerType} initialQuestionTemplate={questionTemplate} initialSourcePracticeTest={sourcePracticeTest} initialSourceModule={sourceModule} initialSourceQuestion={sourceQuestion}

                                />
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
                            <QBankForm mode={MODENEW} initialSubject={subject} initialGeneralCategory={generalCategory} initialSpecificTopic={specificTopic} initialAnswerType={answerType} initialQuestionTemplate={questionTemplate} initialSourcePracticeTest={sourcePracticeTest} initialSourceModule={sourceModule} initialSourceQuestion={sourceQuestion} />
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

