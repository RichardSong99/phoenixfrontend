import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { uploadQuestion, updateQuestion } from '@/app/helper/apiservices/questionservice';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { ImageUpload } from '@/app/helper/components/form/formcomponents';
import { difficultyData } from '../../../data/data';
import { useData } from '@/app/helper/context/datacontext';
import { Input, Button, Select, SelectItem, Textarea, Divider } from '@nextui-org/react';
import { createNewQuestion } from '@/app/helper/data/questionhelpers';

const QBankForm = ({ inputQuestion, mode }) => {

    const { getTopicList, loading, datacube } = useData();

    const [answerType, setAnswerType] = useState('multipleChoice');
    const [difficulty, setDifficulty] = useState('easy');
    const [topic, setTopic] = useState('');
    const [prompt, setPrompt] = useState('');
    const [text, setText] = useState(''); // For reading questions
    const [answerA, setAnswerA] = useState(null);
    const [answerB, setAnswerB] = useState(null);
    const [answerC, setAnswerC] = useState(null);
    const [answerD, setAnswerD] = useState(null);
    const [correctAnswerMultiple, setCorrectAnswerMultiple] = useState('A');
    const [correctAnswerFree, setCorrectAnswerFree] = useState('');
    const [explanation, setExplanation] = useState('');
    const [accessOption, setAccessOption] = useState('free');
    const { questionsUpdated, setQuestionsUpdated } = useContext(QuestionContext);
    const { activeViewQuestion, setActiveViewQuestion, onOpen, MODEEDIT, MODENEW } = useContext(QuestionContext); // State for the question being viewed
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
    const [topicsData, setTopicsData] = useState([]);
    const [subject, setSubject] = useState('math');

    const [generalCategory, setGeneralCategory] = useState("");
    const [specificTopic, setSpecificTopic] = useState("");


    const [isFocused, setIsFocused] = useState(false);


    const handleChangeSubject = async (subject) => {
        setSubject(subject);
        const topicsData = await getTopicList(subject);
        setTopicsData(topicsData);
        if (topicsData && topicsData.length > 0) {
            setGeneralCategory(topicsData[0].Name);
            setSpecificTopic(topicsData[0].Children[0].Name);
        }
    }

    const refreshCategoryAndTopic = async () => {
        const result = await getTopicList("math");
        setTopicsData(result);

        if (result && result.length > 0) {
            console.log("topicsData", result);
            setGeneralCategory(result[0].Name);
            setSpecificTopic(result[0].Children[0].Name);
        }
    };

    const setFormFields = (question) => {
        if (question.Prompt !== undefined && question.Prompt !== null) setPrompt(question.Prompt);
        if (question.Text !== undefined && question.Text !== null) setText(question.Text);
        if (question.AnswerType !== undefined && question.AnswerType !== null) setAnswerType(question.AnswerType);
        if (question.Difficulty !== undefined && question.Difficulty !== null) setDifficulty(question.Difficulty);
        if (question.Subject !== undefined && question.Subject !== null) setSubject(question.Subject);
        if (question.Topic !== undefined && question.Topic !== null) setTopic(question.Topic);
        if (question.AnswerChoices !== undefined && question.AnswerChoices[0] !== undefined && question.AnswerChoices[0] !== null) setAnswerA(question.AnswerChoices[0]);
        if (question.AnswerChoices !== undefined && question.AnswerChoices[1] !== undefined && question.AnswerChoices[1] !== null) setAnswerB(question.AnswerChoices[1]);
        if (question.AnswerChoices !== undefined && question.AnswerChoices[2] !== undefined && question.AnswerChoices[2] !== null) setAnswerC(question.AnswerChoices[2]);
        if (question.AnswerChoices !== undefined && question.AnswerChoices[3] !== undefined && question.AnswerChoices[3] !== null) setAnswerD(question.AnswerChoices[3]);
        if (question.CorrectAnswerMultiple !== undefined && question.CorrectAnswerMultiple !== null) setCorrectAnswerMultiple(question.CorrectAnswerMultiple);
        if (question.CorrectAnswerFree !== undefined && question.CorrectAnswerFree !== null) setCorrectAnswerFree(question.CorrectAnswerFree);
        if (question.Explanation !== undefined && question.Explanation !== null) setExplanation(question.Explanation);
        if (question.AccessOption !== undefined && question.AccessOption !== null) setAccessOption(question.AccessOption);
        if (question.Images !== undefined && question.Images !== null) setUploadedImageUrls(question.Images.map(image => image.Url));
    }

    const clearForm = () => {
        setAnswerType('multipleChoice');
        setDifficulty('easy');
        setSubject('math');
        setTopic('');
        setPrompt('');
        setText('');
        setAnswerA('');
        setAnswerB('');
        setAnswerC('');
        setAnswerD('');
        setCorrectAnswerMultiple('');
        setCorrectAnswerFree('');
        setExplanation('');
        setAccessOption('free');
        setGeneralCategory(topicsData[0].Name);
        setSpecificTopic(topicsData[0].Children[0].Name);
        setReplaceIndex(null);
        setUploadedImageUrls([]);
    };

    useEffect(() => {

        refreshCategoryAndTopic();

        if(inputQuestion){
            setFormFields(inputQuestion);
        }

    }, [inputQuestion]);





    // renders question
    const handleSubmit = (event) => {
        event.preventDefault();

        const newQuestion = createNewQuestion({
            prompt,
            text,
            answerType,
            difficulty,
            subject,
            specificTopic,
            answerChoices: [answerA, answerB, answerC, answerD],
            explanation,
            accessOption,
            correctAnswerMultiple,
            correctAnswerFree,
            uploadedImageUrls
        });

        setActiveViewQuestion(newQuestion);
        onOpen();
    }


    const handleUpload = async () => {
        const newQuestion = createNewQuestion({
            prompt,
            text,
            answerType,
            difficulty,
            subject,
            specificTopic,
            answerChoices: [answerA, answerB, answerC, answerD],
            explanation,
            accessOption,
            correctAnswerMultiple,
            correctAnswerFree,
            uploadedImageUrls
        });

        // post the question to the server
        try {
            if (mode === MODEEDIT) {
                // If editQuestion is not null, update the question
                await updateQuestion(inputQuestion.id, newQuestion);
                console.log('Question updated successfully');
                alert('Question updated successfully');

                setEditQuestion(null);

            } else if(mode === MODENEW) {
                // If editQuestion is null, create a new question
                await uploadQuestion(newQuestion);
                alert('Question uploaded successfully');
                console.log('Question uploaded successfully');
            }
        } catch (error) {
            console.error('Failed to upload question:', error);
        }

        setQuestionsUpdated(!questionsUpdated);
    }


    return (
        <div >

            {generalCategory !== "" && specificTopic !== "" &&
                <div >
                    <h4>Input Question Details</h4>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        <div className="space-y-4">
                            <Input label="Question Stem" value={prompt} onChange={e => setPrompt(e.target.value)} isRequired={true} />
                            {subject === 'reading' && (
                                <Textarea label="Text / Passage" value={text} onChange={e => setText(e.target.value)} isRequired={true} />
                            )}
                            <Select label="Answer Type" value={answerType} onChange={e => setAnswerType(e.target.value)} defaultSelectedKeys={[answerType]}>
                                {["multipleChoice", "freeResponse"].map(item => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}
                            </Select>
                            {answerType === 'multipleChoice' && (
                                <>
                                    <Input label="Answer A" value={answerA} onChange={e => setAnswerA(e.target.value)} isRequired={true} />
                                    <Input label="Answer B" value={answerB} onChange={e => setAnswerB(e.target.value)} isRequired={true} />
                                    <Input label="Answer C" value={answerC} onChange={e => setAnswerC(e.target.value)} isRequired={true} />
                                    <Input label="Answer D" value={answerD} onChange={e => setAnswerD(e.target.value)} isRequired={true} />
                                    <Select label="Correct Choice" value={correctAnswerMultiple} onChange={e => setCorrectAnswerMultiple(e.target.value)} defaultSelectedKeys={[correctAnswerMultiple]} isRequired={true}>
                                        {["A", "B", "C", "D"].map((choice) => (
                                            <SelectItem key={choice} value={choice}>{choice}</SelectItem>
                                        ))}
                                    </Select>
                                </>
                            )}
                            {answerType === 'freeResponse' && (
                                <Input label="Correct Answer" value={correctAnswerFree} onChange={e => setCorrectAnswerFree(e.target.value)} required />
                            )}
                        </div>
                        <div className="space-y-4">
                            <Select label="Difficulty Level" value={difficulty} onChange={e => setDifficulty(e.target.value)} defaultSelectedKeys={[difficulty]}>
                                {difficultyData.map(item => (
                                    <SelectItem key={item.Name} value={item.Name}>{item.Name}</SelectItem>
                                ))}
                            </Select>
                            <Select label="Subject" value={subject} onChange={e => handleChangeSubject(e.target.value)} defaultSelectedKeys={[subject]}>
                                {["math", "reading"].map(item => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}
                            </Select>
                            <Select label="General Category" value={generalCategory} onChange={e => setGeneralCategory(e.target.value)} defaultSelectedKeys={[generalCategory]}>
                                {topicsData.map(item => (
                                    <SelectItem key={item.Name} value={item.Name}>{item.Name}</SelectItem>
                                ))}
                            </Select>
                            {generalCategory && (
                                <Select label="Specific Topic" value={specificTopic} onChange={e => setSpecificTopic(e.target.value)} defaultSelectedKeys={[specificTopic]}>
                                    {topicsData.find(topic => topic.Name === generalCategory).Children.map(child => (
                                        <SelectItem key={child.Name} value={child.Name}>{child.Name}</SelectItem>
                                    ))}
                                </Select>
                            )}
                            <Textarea label="Answer Explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />
                            <Select label="Access Option" value={accessOption} onChange={e => setAccessOption(e.target.value)} defaultSelectedKeys={[accessOption]}>
                                {["free", "paid"].map(item => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="col-span-1 md:col-span-2 flex space-x-4">
                            <Button type="submit">Render</Button>
                            <Button
                                onPress={handleUpload}
                                disabled={
                                    !difficulty ||
                                    !specificTopic ||
                                    !accessOption ||
                                    (answerType === 'multipleChoice' && (!answerA || !answerB || !answerC || !answerD || !correctAnswerMultiple)) ||
                                    (answerType === 'freeResponse' && !correctAnswerFree)
                                }
                            >
                                {mode === MODEEDIT ? 'Save Question' : 'Upload'}
                            </Button>
                            <Button onPress={clearForm}>Clear Form</Button>
                        </div>
                    </form>



                    <Divider />  {/* Here is the horizontal bar */}
                    <ImageUpload
                        uploadedImageUrls={uploadedImageUrls}
                        setUploadedImageUrls={setUploadedImageUrls}
                    />
                </div>}
        </div>


    );
}

export default QBankForm;