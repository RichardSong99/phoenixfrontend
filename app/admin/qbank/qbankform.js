import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import styles from './qbankform.module.css';
import { uploadQuestion, updateQuestion } from '@/app/helper/apiservices/questionservice';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import Dropzone from '../../helper/components/basecomponents/filehandlers/dropzone'
import FileService from '@/app/helper/apiservices/fileservice';
import { TextAreaInput, FormInput, ImageUpload, SelectInput } from '@/app/helper/components/form/formcomponents';
import { difficultyData } from '../../helper/data/data';
import { useData } from '@/app/helper/context/datacontext';

const QBankForm = ({ question, setQuestion, setIsModalOpen, uploadQuestionHandler }) => {

    const {getTopicList, loading, datacube} = useData();

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
    const { editQuestion, setEditQuestion } = useContext(QuestionContext); // State for the question being edited
    const [imageCounter, setImageCounter] = useState(1);
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
    const fileInputRef = useRef();
    const [replaceIndex, setReplaceIndex] = useState(null);
    const [topicsData, setTopicsData] = useState([]);
    const [subject, setSubject] = useState('math');

    const [generalCategory, setGeneralCategory] = useState("");
    const [specificTopic, setSpecificTopic] = useState("");


    const [isFocused, setIsFocused] = useState(false);


    const handleChangeSubject = async(subject) => {
        setSubject(subject);
        const topicsData = await getTopicList(subject);
        setTopicsData(topicsData);
        if (topicsData && topicsData.length > 0){
            setGeneralCategory(topicsData[0].Name);
            setSpecificTopic(topicsData[0].Children[0].Name);
        }
    }

    const handleRemoveImage = (index) => {
        if (window.confirm('Are you sure you want to remove ths image?')) {
            setUploadedImageUrls((prevUrls) => {
                const newUrls = [...prevUrls];
                newUrls.splice(index, 1);
                return newUrls;
            });
        }
    };
    
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

    const handleReplaceImage = async (index) => {
        // Store the index of the image to replace
        setReplaceIndex(index);

        // Trigger the file upload logic
        fileInputRef.current.click();
    };

    // Add this function to handle file upload
    const handleFileUpload = async (input) => {
        let file;
        if (input && input.target) {
            // Called from file input's onChange event
            file = input.target.files[0];
        } else {
            // Called from Dropzone with a file
            file = input;
        }

        console.log(file);

        // Name the image
        const imageName = `IMG${imageCounter}`;

        // Increment imageCounter
        setImageCounter(imageCounter + 1);

        try {
            const url = await FileService.uploadFile(file);
            console.log(`File uploaded successfully. URL: ${url}`);

            if (replaceIndex !== null) {
                // Replace the image URL at the given index
                setUploadedImageUrls((prevUrls) => {
                    const newUrls = [...prevUrls];
                    newUrls[replaceIndex] = url;
                    return newUrls;
                });

                // Reset replaceIndex
                setReplaceIndex(null);
            } else {
                // Add the new image URL to the array
                setUploadedImageUrls([...uploadedImageUrls, url]);
            }

            return url;
        } catch (error) {
            console.error('File upload failed:', error);
            // Handle the error
        }
    };





    useEffect(() => {
        if (editQuestion) {
            setAnswerType(editQuestion.AnswerType);
            setDifficulty(editQuestion.Difficulty);
            setSubject(editQuestion.Subject);
            setTopic(editQuestion.Topic);
            setPrompt(editQuestion.Prompt);
            setText(editQuestion.Text);
            if (editQuestion.AnswerType === 'multipleChoice') {
                setAnswerA(editQuestion.AnswerChoices[0]);
                setAnswerB(editQuestion.AnswerChoices[1]);
                setAnswerC(editQuestion.AnswerChoices[2]);
                setAnswerD(editQuestion.AnswerChoices[3]);
                setCorrectAnswerMultiple(editQuestion.CorrectAnswerMultiple);

            }
            setCorrectAnswerFree(editQuestion.CorrectAnswerFree);
            setExplanation(editQuestion.Explanation);
            setAccessOption(editQuestion.AccessOption);

            // Add the image data
            if (editQuestion.Images) {
                const imageUrls = editQuestion.Images.map(image => image.Url);
                setUploadedImageUrls(imageUrls);
            }

        }
    }, [editQuestion]);

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

        setEditQuestion(null);

    };


    const createNewQuestion = () => {

        console.log("speciifc topic", specificTopic);

        const newQuestion = {
            Prompt: prompt,
            Text: text,
            AnswerType: answerType,
            Difficulty: difficulty,
            Subject: subject,
            Topic: specificTopic,
            AnswerChoices: [answerA, answerB, answerC, answerD],
            Explanation: explanation,
            AccessOption: accessOption
        };
    
        if (answerType === 'multipleChoice') {
            newQuestion.CorrectAnswerMultiple = correctAnswerMultiple;
        } else {
            newQuestion.CorrectAnswerFree = correctAnswerFree;
        }
    
        newQuestion.Images = uploadedImageUrls.map((url, index) => ({
            Filename: `IMG${index}`,
            Url: url
        }));
    
        return newQuestion;
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
    
        const newQuestion = createNewQuestion();
    
        setQuestion(newQuestion);
    
        setIsModalOpen(true);
    }
    
    const handleUpload = async () => {
        const newQuestion = createNewQuestion();
    
        // post the question to the server
        try {
            if (editQuestion) {
                // If editQuestion is not null, update the question
                await updateQuestion(editQuestion.id, newQuestion);
                console.log('Question updated successfully');
                alert('Question updated successfully');
    
                setEditQuestion(null);
    
            } else {
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
        <div className={styles.container}>
            {!loading && generalCategory!== "" && specificTopic!=="" &&
            <div className={styles.qbankform}>
                <h1>Input Question Details</h1>
                <form onSubmit={handleSubmit} className={styles.gridForm}>
                    <div>
                        <TextAreaInput label="Question Stem" value={prompt} onChange={e => setPrompt(e.target.value)} required />
                        {subject === 'reading' && (
                            <TextAreaInput label="Text / Passage" value={text} onChange={e => setText(e.target.value)} required />)    
                        }
                        <SelectInput label="Answer Type" value={answerType} onChange={e => setAnswerType(e.target.value)} options={["multipleChoice", "freeResponse"]} required />
                        {answerType === 'multipleChoice' && (
                            <>
                                <TextAreaInput label="Answer A" value={answerA} onChange={e => setAnswerA(e.target.value)} required />
                                <TextAreaInput label="Answer B" value={answerB} onChange={e => setAnswerB(e.target.value)} required />
                                <TextAreaInput label="Answer C" value={answerC} onChange={e => setAnswerC(e.target.value)} required />
                                <TextAreaInput label="Answer D" value={answerD} onChange={e => setAnswerD(e.target.value)} required />
                                <SelectInput label="Correct Choice" value={correctAnswerMultiple} onChange={e => setCorrectAnswerMultiple(e.target.value)} options={["A", "B", "C", "D"]} required />
                            </>
                        )}
                        {answerType === 'freeResponse' && (
                            <FormInput label="Correct Answer" value={correctAnswerFree} onChange={e => setCorrectAnswerFree(e.target.value)} required />
                        )}
                    </div>
                    <div>
                        <SelectInput label="Difficulty Level" value={difficulty} onChange={e => setDifficulty(e.target.value)} options={difficultyData.map(item => item.Name)} required />
                        <SelectInput label="Subject" value={subject} onChange={e => handleChangeSubject(e.target.value)} options={["math", "reading"]} required />

                        <SelectInput label="General Category" value={generalCategory} onChange={e => setGeneralCategory(e.target.value)} options={topicsData.map(topic => topic.Name)} required />
                        <SelectInput label="Specific Topic" value={specificTopic} onChange={e => setSpecificTopic(e.target.value)} options={topicsData.find(topic => topic.Name === generalCategory).Children.map(child => child.Name)} required />
                        <TextAreaInput label="Answer Explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />
                        <SelectInput label="Access Option" value={accessOption} onChange={e => setAccessOption(e.target.value)} options={["free", "paid"]} required />
                    </div>
                    <button type="submit">Render</button>
                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={
                            !difficulty ||
                            !specificTopic ||
                            !accessOption ||
                            (answerType === 'multipleChoice' && (!answerA || !answerB || !answerC || !answerD || !correctAnswerMultiple)) ||
                            (answerType === 'freeResponse' && !correctAnswerFree)
                        }
                    >
                        {editQuestion ? 'Edit Question' : 'Upload'}
                    </button>
                    <button onClick={clearForm}>Clear Form</button>
                </form>
                <div className={styles.horizontalBar} />  {/* Here is the horizontal bar */}
                <ImageUpload
                    onFileDrop={handleFileUpload}
                    handleFileUpload={handleFileUpload}
                    fileInputRef={fileInputRef}
                    uploadedImageUrls={uploadedImageUrls}
                    handleReplaceImage={handleReplaceImage}
                    handleRemoveImage={handleRemoveImage}
                />
            </div>}
        </div>


    );
}

export default QBankForm;