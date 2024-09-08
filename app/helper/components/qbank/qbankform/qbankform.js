import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { uploadQuestion, updateQuestion } from '@/app/helper/apiservices/questionservice';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { ImageUpload } from '@/app/helper/components/form/formcomponents';
import { difficultyData } from '../../../data/data';
import { useData } from '@/app/helper/context/datacontext';
import { Input, Button, Select, SelectItem, Textarea, Divider, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { createNewQuestion } from '@/app/helper/data/questionhelpers';
import { getSVGFromLatex } from '@/app/helper/apiservices/latexservice';
import { iterateQuestionGeneration } from '@/app/helper/apiservices/questiongenerationservice';

const QBankForm = ({ questionKey, inputQuestion, mode, initialSubject, initialGeneralCategory, initialSpecificTopic, initialAnswerType, handleUploadQGenMain, }) => {

    const { topicMapping, loading, datacube, getTopicsByCategory, getCategoryList } = useData();

    const [answerType, setAnswerType] = useState(initialAnswerType || 'multipleChoice');
    const [difficulty, setDifficulty] = useState('easy');

    const [prompt, setPrompt] = useState('');
    const [text1, setText1] = useState(''); // For reading questions
    const [text2, setText2] = useState(''); // For reading questions
    const [text1Description, setText1Description] = useState(''); // For reading questions
    const [text2Description, setText2Description] = useState(''); // For reading questions

    const [equation1, setEquation1] = useState(''); // For math questions
    const [equation2, setEquation2] = useState(''); // For math questions

    const [graphicLatex, setGraphicLatex] = useState(null); // For graphic questions
    const [graphicSVG, setGraphicSVG] = useState(null); // For graphic questions
    const [graphicDescription, setGraphicDescription] = useState(''); // For graphic questions

    const [choiceA, setChoiceA] = useState(null);
    const [choiceB, setChoiceB] = useState(null);
    const [choiceC, setChoiceC] = useState(null);
    const [choiceD, setChoiceD] = useState(null);
    const [correctAnswerMultiple, setCorrectAnswerMultiple] = useState('A');
    const [correctAnswerFree, setCorrectAnswerFree] = useState('');
    const [explanation, setExplanation] = useState('');

    // previous versions of these variables
    const [promptPrev, setPromptPrev] = useState('');
    const [text1Prev, setText1Prev] = useState(''); // For reading questions
    const [text2Prev, setText2Prev] = useState(''); // For reading questions
    const [text1DescriptionPrev, setText1DescriptionPrev] = useState(''); // For reading questions
    const [text2DescriptionPrev, setText2DescriptionPrev] = useState(''); // For reading questions
    const [equation1Prev, setEquation1Prev] = useState('');
    const [equation2Prev, setEquation2Prev] = useState('');
    const [graphicLatexPrev, setGraphicLatexPrev] = useState(null);
    const [graphicSVGPrev, setGraphicSVGPrev] = useState(null);
    const [graphicDescriptionPrev, setGraphicDescriptionPrev] = useState('');
    const [choiceAPrev, setChoiceAPrev] = useState(null);
    const [choiceBPrev, setChoiceBPrev] = useState(null);
    const [choiceCPrev, setChoiceCPrev] = useState(null);
    const [choiceDPrev, setChoiceDPrev] = useState(null);
    const [correctAnswerMultiplePrev, setCorrectAnswerMultiplePrev] = useState('A');
    const [correctAnswerFreePrev, setCorrectAnswerFreePrev] = useState('');
    const [explanationPrev, setExplanationPrev] = useState('');

    // loading indicators
    const [isLoadingGraphicSVG, setIsLoadingGraphicSVG] = useState(false);
    const [isLoadingCheckQuestion, setIsLoadingCheckQuestion] = useState(false);


    const [accessOption, setAccessOption] = useState('free');
    const { activeViewQuestion, setActiveViewQuestion, onOpen, MODEEDIT, MODENEW, setEditQuestion, questionsUpdated, setQuestionsUpdated } = useContext(QuestionContext); // State for the question being viewed
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

    const [subject, setSubject] = useState(initialSubject || 'math');
    const [generalCategory, setGeneralCategory] = useState(initialGeneralCategory || topicMapping[0].category);
    const [specificTopic, setSpecificTopic] = useState(initialSpecificTopic || topicMapping[0].topic);




    const [isFocused, setIsFocused] = useState(false);



    const setFormFields = (question) => {
        if (question.prompt !== undefined && question.Prompt !== null) setPrompt(question.prompt);
        if (question.text1 !== undefined && question.text1 !== null) setText1(question.text1);
        if (question.text2 !== undefined && question.text2 !== null) setText2(question.text2);
        if (question.text1_description !== undefined && question.text1_description !== null) setText1Description(question.text1_description);
        if (question.text2_description !== undefined && question.text2_description !== null) setText2Description(question.text2_description);
        if (question.equation1 !== undefined && question.equation1 !== null) setEquation1(question.equation1);
        if (question.equation2 !== undefined && question.equation2 !== null) setEquation2(question.equation2);
        if (question.graphic_latex !== undefined && question.graphic_latex !== null) setGraphicLatex(question.graphic_latex);
        if (question.graphic_svg !== undefined && question.graphic_svg !== null) setGraphicSVG(question.graphic_svg);
        if (question.graphic_description !== undefined && question.graphic_description !== null) setGraphicDescription(question.graphic_description);

        if (question.answer_type !== undefined && question.answer_type !== null) setAnswerType(question.answer_type);
        if (question.difficulty !== undefined && question.difficulty !== null) setDifficulty(question.difficulty);
        if (question.subject !== undefined && question.subject !== null) setSubject(question.subject);
        if (question.topic !== undefined && question.topic !== null) setSpecificTopic(question.topic);
        if (question.answer_choices !== undefined && question.answer_choices!== null && question.answer_choices[0] !== undefined && question.answer_choices[0] !== null) setChoiceA(question.answer_choices[0]);
        if (question.answer_choices !== undefined && question.answer_choices!== null && question.answer_choices[1] !== undefined && question.answer_choices[1] !== null) setChoiceB(question.answer_choices[1]);
        if (question.answer_choices !== undefined && question.answer_choices!== null && question.answer_choices[2] !== undefined && question.answer_choices[2] !== null) setChoiceC(question.answer_choices[2]);
        if (question.answer_choices !== undefined && question.answer_choices!== null && question.answer_choices[3] !== undefined && question.answer_choices[3] !== null) setChoiceD(question.answer_choices[3]);
        if (question.correct_answer_multiple !== undefined && question.correct_answer_multiple !== null) setCorrectAnswerMultiple(question.correct_answer_multiple);
        if (question.correct_answer_free !== undefined && question.correct_answer_free !== null) setCorrectAnswerFree(question.correct_answer_free);
        if (question.explanation !== undefined && question.explanation !== null) setExplanation(question.explanation);
        if (question.access_option !== undefined && question.access_option !== null) setAccessOption(question.access_option);
        if (question.images !== undefined && question.images !== null) setUploadedImageUrls(question.images.map(image => image.url));
    }

    const clearForm = () => {
        setAnswerType('multipleChoice');
        setDifficulty('easy');
        setSubject('math');
        setSpecificTopic('');
        setPrompt('');
        setText1('');
        setText2('');
        setText1Description('');
        setText2Description('');
        setEquation1('');
        setEquation2('');
        setGraphicLatex(null);
        setGraphicSVG(null);
        setGraphicDescription('');
        setChoiceA('');
        setChoiceB('');
        setChoiceC('');
        setChoiceD('');
        setCorrectAnswerMultiple('');
        setCorrectAnswerFree('');
        setExplanation('');
        setAccessOption('free');
        setGeneralCategory(topicMapping[0].category);
        setSpecificTopic(topicMapping[0].topic);
        setReplaceIndex(null);
        setUploadedImageUrls([]);
    };

    useEffect(() => {
        const refreshCategoryAndTopic = async () => {
            if (initialSubject) {
                setSubject(initialSubject);
            }
            if (initialGeneralCategory) {
                setGeneralCategory(initialGeneralCategory);
            }
            if (initialSpecificTopic) {
                setSpecificTopic(initialSpecificTopic);
            }
            if (initialAnswerType) {
                setAnswerType(initialAnswerType);
            }
        };

        refreshCategoryAndTopic();

        if (inputQuestion) {
            setFormFields(inputQuestion);
        }

    }, [inputQuestion, mode, initialSubject, initialGeneralCategory, initialSpecificTopic, initialAnswerType]);


    // renders question
    const handleSubmit = (event) => {
        event.preventDefault();

        const newQuestion = createNewQuestion({
            prompt,
            text1,
            text1Description,
            text2,
            text2Description,
            equation1,
            equation2,
            graphicLatex: graphicLatex,
            graphicSVG: graphicSVG,
            graphicDescription: graphicDescription,
            answerType,
            difficulty,
            subject,
            specificTopic,
            answerChoices: [choiceA, choiceB, choiceC, choiceD],
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
            text1,
            text1Description,
            text2,
            text2Description,
            equation1,
            equation2,
            graphicLatex: graphicLatex,
            graphicSVG: graphicSVG,
            graphicDescription: graphicDescription,
            answerType,
            difficulty,
            subject,
            specificTopic,
            answerChoices: [choiceA, choiceB, choiceC, choiceD],
            explanation,
            accessOption,
            correctAnswerMultiple,
            correctAnswerFree,
            uploadedImageUrls
        });

        console.log('newQuestion', newQuestion);

        // post the question to the server
        try {
            if (mode === MODEEDIT) {
                // If editQuestion is not null, update the question
                await updateQuestion(inputQuestion.id, newQuestion);
                console.log('Question updated successfully');
                alert('Question updated successfully');

                setEditQuestion(null);

            } else if (mode === MODENEW) {
                // If editQuestion is null, create a new question
                await uploadQuestion(newQuestion);
                alert('Question uploaded successfully');
                console.log('Question uploaded successfully');

                handleUploadQGenMain(questionKey);
            }
        } catch (error) {
            console.error('Failed to upload question:', error);
        }

        setQuestionsUpdated(!questionsUpdated);
    }

    const handleSVGRefresh = async () => {
        if (graphicLatex) {
            setIsLoadingGraphicSVG(true);
            try {

                console.log("Rendering SVG from latex...")
                const response = await getSVGFromLatex(graphicLatex);
                setGraphicSVG(response.svg);
                setIsLoadingGraphicSVG(false);
            } catch (error) {
                console.error('Failed to render SVG:', error);
                setIsLoadingGraphicSVG(false);
            }
        }
    }

    const handleCheckButtonClicked = async () => {
        setIsLoadingCheckQuestion(true);

        var originalQuestion = {
            prompt,
            text1,
            text1Description,
            text2,
            text2Description,
            equation1,
            equation2,
            graphicLatex: graphicLatex,
            graphicSVG: graphicSVG,
            graphicDescription: graphicDescription,
            // answerType,
            // difficulty,
            // subject,
            // specificTopic,
            answerChoices: [choiceA, choiceB, choiceC, choiceD],
            explanation,

            correctAnswerMultiple,
            correctAnswerFree,
        }

        try{
            const response = await iterateQuestionGeneration(originalQuestion);

            console.log(    "response in qgenform", response);

            if(response){
                alert("Question checked successfully");

                if(response.prompt !== undefined && response.prompt !== null){
                    setPromptPrev(prompt);
                    setPrompt(response.prompt);  
                }
                if(response.text1 !== undefined && response.text1 !== null){
                    setText1Prev(text1);
                    setText1(response.text1);
                }
                if(response.text2 !== undefined && response.text2 !== null){
                    setText2Prev(text2);
                    setText2(response.text2);
                }
                if(response.text1_description !== undefined && response.text1_description !== null){
                    setText1DescriptionPrev(text1Description);
                    setText1Description(response.text1_description);
                }
                if(response.text2_description !== undefined && response.text2_description !== null){
                    setText2DescriptionPrev(text2Description);
                    setText2Description(response.text2_description);
                }
                if(response.equation1 !== undefined && response.equation1 !== null){
                    setEquation1Prev(equation1);
                    setEquation1(response.equation1);
                }
                if(response.equation2 !== undefined && response.equation2 !== null){
                    setEquation2Prev(equation2);
                    setEquation2(response.equation2);
                }
                if(response.graphic_latex !== undefined && response.graphic_latex !== null){
                    setGraphicLatexPrev(graphicLatex);
                    setGraphicLatex(response.graphic_latex);
                }
                if(response.graphic_svg !== undefined && response.graphic_svg !== null){
                    setGraphicSVGPrev(graphicSVG);
                    setGraphicSVG(response.graphic_svg);
                }
                if(response.graphic_description !== undefined && response.graphic_description !== null){
                    setGraphicDescriptionPrev(graphicDescription);
                    setGraphicDescription(response.graphic_description);
                }
                // if(response.answer_type !== undefined && response.answer_type !== null){
                //     setAnswerType(response.answer_type);
                // }
                // if(response.difficulty !== undefined && response.difficulty !== null){
                //     setDifficulty(response.difficulty);
                // }
                // if(response.subject !== undefined && response.subject !== null){
                //     setSubject(response.subject);
                // }
                // if(response.topic !== undefined && response.topic !== null){
                //     setSpecificTopic(response.topic);
                // }
                if(response.choiceA !== undefined && response.choiceA !== null){
                    setChoiceAPrev(choiceA);
                    setChoiceA(response.choiceA);
                }
                if(response.choiceB !== undefined && response.choiceB !== null){
                    setChoiceBPrev(choiceB);
                    setChoiceB(response.choiceB);
                }
                if(response.choiceC !== undefined && response.choiceC !== null){
                    setChoiceCPrev(choiceC);
                    setChoiceC(response.choiceC);
                }
                if(response.choiceD !== undefined && response.choiceD !== null){
                    setChoiceDPrev(choiceD);
                    setChoiceD(response.choiceD);
                }
                if(response.correct_answer_multiple !== undefined && response.correct_answer_multiple !== null){
                    setCorrectAnswerMultiplePrev(correctAnswerMultiple);
                    setCorrectAnswerMultiple(response.correct_answer_multiple);
                }
                if(response.correct_answer_free !== undefined && response.correct_answer_free !== null){
                    setCorrectAnswerFreePrev(correctAnswerFree);
                    setCorrectAnswerFree(response.correct_answer_free);
                }
                if(response.explanation !== undefined && response.explanation !== null){
                    setExplanationPrev(explanation);
                    setExplanation(response.explanation);
                }
                setIsLoadingCheckQuestion(false);
            }
            else{
                setIsLoadingCheckQuestion(false);
            }


        } catch (error) {
            console.error('Failed to check question:', error);
            setIsLoadingCheckQuestion(false);
        }
    }

    const handleRevertButtonClicked = async () => {
        setPrompt(promptPrev);
        setText1(text1Prev);
        setText2(text2Prev);
        setText1Description(text1DescriptionPrev);
        setText2Description(text2DescriptionPrev);
        setEquation1(equation1Prev);
        setEquation2(equation2Prev);
        setGraphicLatex(graphicLatexPrev);
        setGraphicSVG(graphicSVGPrev);
        setGraphicDescription(graphicDescriptionPrev);
        setChoiceA(choiceAPrev);
        setChoiceB(choiceBPrev);
        setChoiceC(choiceCPrev);
        setChoiceD(choiceDPrev);
        setCorrectAnswerMultiple(correctAnswerMultiplePrev);
        setCorrectAnswerFree(correctAnswerFreePrev);
        setExplanation(explanationPrev);
    }
        



    return (
        <div >

            <div >
                <h4>Input Question Details</h4>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="space-y-4">
                        <Textarea label="Question Stem" value={prompt} onChange={e => setPrompt(e.target.value)} isRequired={true} />
                        {subject === 'Reading & Writing' && (
                            <>
                                <Divider />
                                <Input label="Text 1 Description" value={text1Description} onChange={e => setText1Description(e.target.value)} />
                                <Textarea label="Text / Passage 1" value={text1} onChange={e => setText1(e.target.value)} isRequired={true} />
                                <Divider />

                                <Input label="Text 2 Description" value={text2Description} onChange={e => setText2Description(e.target.value)} />
                                <Textarea label="Text / Passage 2" value={text2} onChange={e => setText2(e.target.value)} isRequired={true} />

                            </>
                        )}
                        <Divider />
                        {subject === 'Math' && (
                            <>
                                <Input label="Equation 1" value={equation1} onChange={e => setEquation1(e.target.value)} />
                                <Input label="Equation 2" value={equation2} onChange={e => setEquation2(e.target.value)} />
                            </>
                        )}

                        <Input label="Graphic Description" value={graphicDescription} onChange={e => setGraphicDescription(e.target.value)} />
                        <Textarea label="Graphic (Latex)" value={graphicLatex} onChange={e => setGraphicLatex(e.target.value)} />
                        <div className="flex flex-row gap-2">
                            <Button onPress={handleSVGRefresh} isLoading={isLoadingGraphicSVG}>Refresh Graphic SVG</Button>
                            <Button onPress={() => setIsLoadingGraphicSVG(false)}>Stop</Button>
                        </div>
                        <Textarea label="Graphic (SVG)" value={graphicSVG} onChange={e => setGraphicSVG(e.target.value)} />

                        {/* <Select label="Answer Type" value={answerType} onChange={e => setAnswerType(e.target.value)} defaultSelectedKeys={[answerType]}>
                            {["multipleChoice", "freeResponse"].map(item => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                        </Select> */}
                        <Autocomplete label="Answer Type" selectedKey={answerType} onSelectionChange={setAnswerType} >
                            {["multipleChoice", "freeResponse"].map(item => (
                                <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>
                            ))}
                        </Autocomplete>

                        {answerType === 'multipleChoice' && (
                            <>
                                <Input label="Answer A" value={choiceA} onChange={e => setChoiceA(e.target.value)} isRequired={true} />
                                <Input label="Answer B" value={choiceB} onChange={e => setChoiceB(e.target.value)} isRequired={true} />
                                <Input label="Answer C" value={choiceC} onChange={e => setChoiceC(e.target.value)} isRequired={true} />
                                <Input label="Answer D" value={choiceD} onChange={e => setChoiceD(e.target.value)} isRequired={true} />
                                <Select label="Correct Choice" selectedKeys={[correctAnswerMultiple]} onChange={e => setCorrectAnswerMultiple(e.target.value)} defaultSelectedKeys={[correctAnswerMultiple]} isRequired={true}>
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
                        <Select label="Difficulty Level" selectedKeys={[difficulty]} onChange={e => setDifficulty(e.target.value)} defaultSelectedKeys={[difficulty]}>
                            {["easy", "medium", "hard"].map(item => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                        </Select>
                        {/* <Select label="Subject" value={subject} onChange={e => handleChangeSubject(e.target.value)} defaultSelectedKeys={[subject]}>
                                {["math", "reading"].map(item => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}
                            </Select>
                            <Select label="General Category" value={generalCategory} onChange={e => setGeneralCategory(e.target.value)} defaultSelectedKeys={[generalCategory]}>
                                {getCategoryList().map(item => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}
                            </Select>
                            {generalCategory && (
                                <Select label="Specific Topic" value={specificTopic} onChange={e => setSpecificTopic(e.target.value)} defaultSelectedKeys={[specificTopic]}>
                                    {getTopicsByCategory(generalCategory).map(topic => (
                                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                                    ))}
                                </Select>
                            )} */}
                        <Input label="Subject" value={subject} onValueChange={setSubject} />
                        <Input label="General Category" value={generalCategory} onValueChange={setGeneralCategory} />
                        <Input label="Specific Topic" value={specificTopic} onValueChange={setSpecificTopic} />


                        <Textarea label="Answer Explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />
                        <Select label="Access Option" value={accessOption} onChange={e => setAccessOption(e.target.value)} defaultSelectedKeys={[accessOption]}>
                            {["free", "paid"].map(item => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex space-x-4">
                        <Button color="default" type="submit">Render</Button>
                        <Button
                            onPress={handleUpload}
                            color = "primary"
                            disabled={
                                !difficulty ||
                                !specificTopic ||
                                !accessOption ||
                                (answerType === 'multipleChoice' && (!choiceA || !choiceB || !choiceC || !choiceD || !correctAnswerMultiple)) ||
                                (answerType === 'freeResponse' && !correctAnswerFree)
                            }
                        >
                            {mode === MODEEDIT ? 'Save Question' : 'Upload'}
                        </Button>
                        <Button onPress = {handleCheckButtonClicked} isLoading = {isLoadingCheckQuestion}>Check Question</Button>
                        <Button onPress = {handleRevertButtonClicked} >Revert</Button>
                        <Button onPress={clearForm}>Clear Form</Button>
                    </div>
                </form>



                <Divider />  {/* Here is the horizontal bar */}
                <ImageUpload
                    uploadedImageUrls={uploadedImageUrls}
                    setUploadedImageUrls={setUploadedImageUrls}
                />
            </div>
        </div>


    );
}

export default QBankForm;