import React, { useEffect, useState, useContext } from 'react';
import {
    Button,
    CheckboxGroup,
    Checkbox,
    Divider,
    RadioGroup,
    Radio
} from "@nextui-org/react";

import { CustomCheckbox } from '../../assets/components/CustomCheckbox';
import { CustomCheckboxThick } from '../../assets/components/CustomCheckboxThick';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { useRouter } from "next/navigation";


const QuestionFilterSort = ({ page }) => {

    const algebraTopics = ["Algebra", "Linear equations in 1 variable", "Linear equations in 2 variables", "Linear functions", "Systems of 2 linear equations in 2 variables", "Linear inequalities in 1 or 2 variables"];
    const advancedMathTopics = ["Advanced math", "Equivalent expressions", "Nonlinear equations in 1 variable", "Systems of equations in 2 variables", "Nonlinear functions"];
    const problemSolvingTopics = ["Problem solving and data analysis", "Ratios, rates, proportional relationships, and units", "Percentages", "One-variable data: distributions and measures of center and spread", "Two-variable data: models and scatterplots", "Probability and conditional probability", "Inference from sample statistics and margin of error", "Evaluating statistical claims: observational studies and experiments"];
    const geometryTopics = ["Geometry and trigonometry", "Area and volume formulas", "Lines, angles, and triangles", "Right triangles and trigonometry", "Circles"];

    const [algebraSelectedTopics, setAlgebraSelectedTopics] = useState(algebraTopics);
    const [advancedMathSelectedTopics, setAdvancedMathSelectedTopics] = useState(advancedMathTopics);
    const [problemSolvingSelectedTopics, setProblemSolvingSelectedTopics] = useState(problemSolvingTopics);
    const [geometrySelectedTopics, setGeometrySelectedTopics] = useState(geometryTopics);

    const [allAlgebraSelected, setAllAlgebraSelected] = useState(true);
    const [allAdvancedMathSelected, setAllAdvancedMathSelected] = useState(true);
    const [allProblemSolvingSelected, setAllProblemSolvingSelected] = useState(true);
    const [allGeometrySelected, setAllGeometrySelected] = useState(true);

    const difficulties = ["easy", "medium", "hard", "extreme"];
    const answerTypes = ["multipleChoice", "freeResponse"];
    const answerStatuses = ["unattempted", "correct", "incorrect", "omitted"];

    const [allDifficultySelected, setAllDifficultySelected] = useState(true);
    const [allAnswerTypesSelected, setAllAnswerTypesSelected] = useState(true);
    const [allAnswerStatusesSelected, setAllAnswerStatusesSelected] = useState(true);

    const {
        selectedDifficulties,
        setSelectedDifficulties,
        selectedAnswerTypes,
        setSelectedAnswerTypes,
        selectedAnswerStatuses,
        setSelectedAnswerStatuses,
        selectedTopics,
        setSelectedTopics,
        SORTDATEANSWERED,
        SORTDATECREATED,
        SORTDATELASTEDITED,
        sortOption,
        setSortOption,
        sortDirection,
        setSortDirection,
        SORTASCENDING,
        SORTDESCENDING,
        createQuiz,
        quizID,
    } = useContext(QuestionContext);

    const handleCheckAll = ({
        allChoices,
        allChoicesSelected,
        selectedChoices,
        setSelectedChoices,
        required = false
    }) => {
        if (allChoicesSelected) {
            if (!required) {
                setSelectedChoices([]);
            }
        } else {
            setSelectedChoices(allChoices);
        }
    };

    const handlePassiveCheckboxChange = () => {
        setAllAlgebraSelected(algebraSelectedTopics.length === algebraTopics.length);
        setAllAdvancedMathSelected(advancedMathSelectedTopics.length === advancedMathTopics.length);
        setAllProblemSolvingSelected(problemSolvingSelectedTopics.length === problemSolvingTopics.length);
        setAllGeometrySelected(geometrySelectedTopics.length === geometryTopics.length);
        setAllDifficultySelected(selectedDifficulties.length === difficulties.length);
        setAllAnswerTypesSelected(selectedAnswerTypes.length === answerTypes.length);
        setAllAnswerStatusesSelected(selectedAnswerStatuses.length === answerStatuses.length);
    };

    useEffect(() => {
        handlePassiveCheckboxChange();
        setSelectedTopics([...algebraSelectedTopics, ...advancedMathSelectedTopics, ...problemSolvingSelectedTopics, ...geometrySelectedTopics]);
        console.log("Selected topics: ", selectedTopics)
    }, [algebraSelectedTopics, advancedMathSelectedTopics, problemSolvingSelectedTopics, geometrySelectedTopics, selectedDifficulties, selectedAnswerTypes, selectedAnswerStatuses]);

    const router = useRouter();

    const handleQuizClick = async () => {
        const response = await createQuiz();
        router.push(`/study/activequiz?quizid=${response}&review=false`);
        console.log(quiz, "quiz");
    }

    return (
        <div className="flex row gap-2 p-2">
            

            <Divider orientation='horizontal' />
            <div className="flex col gap-20">

                <RadioGroup label="Sort by" orientation="horizontal" value={sortOption} onValueChange={setSortOption}>
                    <Radio value={SORTDATECREATED}>Time created</Radio>
                    <Radio value={SORTDATELASTEDITED}>Time last edited</Radio>
                    <Radio value={SORTDATEANSWERED}>Time attempted</Radio>

                </RadioGroup>

                <RadioGroup label="Sort by" orientation="horizontal" value={sortDirection} onValueChange={setSortDirection}>
                    <Radio value={SORTDESCENDING}>Descending</Radio>
                    <Radio value={SORTASCENDING}>Ascending</Radio>
                </RadioGroup>
            </div>

            <Divider orientation='horizontal' />

            <div className="flex col gap-5">
                <CustomCheckboxThick
                    value="all difficulty"
                    isSelected={allDifficultySelected}
                    onValueChange={() =>
                        handleCheckAll({
                            allChoices: difficulties,
                            allChoicesSelected: allDifficultySelected,
                            selectedChoices: selectedDifficulties,
                            setSelectedChoices: setSelectedDifficulties,
                            required: true,
                        })
                    }
                >
                    All
                </CustomCheckboxThick>
                <CheckboxGroup className="gap-1" orientation="horizontal" value={selectedDifficulties} onChange={setSelectedDifficulties}>
                    <CustomCheckbox value="easy">Easy</CustomCheckbox>
                    <CustomCheckbox value="medium">Medium</CustomCheckbox>
                    <CustomCheckbox value="hard">Hard</CustomCheckbox>
                </CheckboxGroup>
            </div>

            <Divider orientation='horizontal' />

            <div className="flex col gap-5">
                <CustomCheckboxThick
                    value="all answer types"
                    isSelected={allAnswerTypesSelected}
                    onValueChange={() =>
                        handleCheckAll({
                            allChoices: answerTypes,
                            allChoicesSelected: allAnswerTypesSelected,
                            selectedChoices: selectedAnswerTypes,
                            setSelectedChoices: setSelectedAnswerTypes,
                            required: true,
                        })
                    }
                >
                    All
                </CustomCheckboxThick>
                <CheckboxGroup className="gap-1" orientation="horizontal" value={selectedAnswerTypes} onChange={setSelectedAnswerTypes}>
                    <CustomCheckbox value="multipleChoice">Multiple Choice</CustomCheckbox>
                    <CustomCheckbox value="freeResponse">Free Response</CustomCheckbox>
                </CheckboxGroup>
            </div>

            <Divider orientation='horizontal' />

            <div className="flex col gap-5">
                <CustomCheckboxThick
                    value="all answer statuses"
                    isSelected={allAnswerStatusesSelected}
                    onValueChange={() =>
                        handleCheckAll({
                            allChoices: answerStatuses,
                            allChoicesSelected: allAnswerStatusesSelected,
                            selectedChoices: selectedAnswerStatuses,
                            setSelectedChoices: setSelectedAnswerStatuses,
                            required: true,
                        })
                    }
                >
                    All
                </CustomCheckboxThick>
                <CheckboxGroup className="gap-1" orientation="horizontal" value={selectedAnswerStatuses} onChange={setSelectedAnswerStatuses}>
                    <CustomCheckbox value="unattempted">Unattempted</CustomCheckbox>
                    <CustomCheckbox value="correct">Correct</CustomCheckbox>
                    <CustomCheckbox value="incorrect">Incorrect</CustomCheckbox>
                    <CustomCheckbox value="omitted">Omitted</CustomCheckbox>
                </CheckboxGroup>
            </div>

            <Divider orientation='horizontal' />

            <div className="flex row gap-2 p-2">
                <div className="flex col gap-5">
                    <CustomCheckboxThick
                        value="Algebra"
                        isSelected={allAlgebraSelected}
                        onValueChange={() =>
                            handleCheckAll({
                                allChoices: algebraTopics,
                                allChoicesSelected: allAlgebraSelected,
                                selectedChoices: algebraSelectedTopics,
                                setSelectedChoices: setAlgebraSelectedTopics,
                            })
                        }
                    >
                        Algebra
                    </CustomCheckboxThick>

                    <CheckboxGroup className="gap-1" orientation="horizontal" value={algebraSelectedTopics} onChange={setAlgebraSelectedTopics}>
                        <CustomCheckbox value="Linear equations in 1 variable">Linear equations in 1 variable</CustomCheckbox>
                        <CustomCheckbox value="Linear equations in 2 variables">Linear equations in 2 variables</CustomCheckbox>
                        <CustomCheckbox value="Linear functions">Linear functions</CustomCheckbox>
                        <CustomCheckbox value="Systems of 2 linear equations in 2 variables">Systems of 2 linear equations in 2 variables</CustomCheckbox>
                        <CustomCheckbox value="Linear inequalities in 1 or 2 variables">Linear inequalities in 1 or 2 variables</CustomCheckbox>
                    </CheckboxGroup>
                </div>

                <Divider orientation='horizontal' />

                <div className="flex col gap-5">
                    <CustomCheckboxThick
                        value="Advanced math"
                        isSelected={allAdvancedMathSelected}
                        onValueChange={() =>
                            handleCheckAll({
                                allChoices: advancedMathTopics,
                                allChoicesSelected: allAdvancedMathSelected,
                                selectedChoices: advancedMathSelectedTopics,
                                setSelectedChoices: setAdvancedMathSelectedTopics,
                            })
                        }
                    >
                        Advanced math
                    </CustomCheckboxThick>

                    <CheckboxGroup className="gap-1" orientation="horizontal" value={advancedMathSelectedTopics} onChange={setAdvancedMathSelectedTopics}>
                        <CustomCheckbox value="Equivalent expressions">Equivalent expressions</CustomCheckbox>
                        <CustomCheckbox value="Nonlinear equations in 1 variable">Nonlinear equations in 1 variable</CustomCheckbox>
                        <CustomCheckbox value="Systems of equations in 2 variables">Systems of equations in 2 variables</CustomCheckbox>
                        <CustomCheckbox value="Nonlinear functions">Nonlinear functions</CustomCheckbox>
                    </CheckboxGroup>
                </div>

                <Divider orientation='horizontal' />

                <div className="flex col gap-5">
                    <CustomCheckboxThick
                        value="Problem solving and data analysis"
                        isSelected={allProblemSolvingSelected}
                        onValueChange={() =>
                            handleCheckAll({
                                allChoices: problemSolvingTopics,
                                allChoicesSelected: allProblemSolvingSelected,
                                selectedChoices: problemSolvingSelectedTopics,
                                setSelectedChoices: setProblemSolvingSelectedTopics,
                            })
                        }
                    >
                        Problem solving and data analysis
                    </CustomCheckboxThick>

                    <CheckboxGroup className="gap-1" orientation="horizontal" value={problemSolvingSelectedTopics} onChange={setProblemSolvingSelectedTopics}>
                        <CustomCheckbox value="Ratios, rates, proportional relationships, and units">Ratios, rates, proportional relationships, and units</CustomCheckbox>
                        <CustomCheckbox value="Percentages">Percentages</CustomCheckbox>
                        <CustomCheckbox value="One-variable data: distributions and measures of center and spread">One-variable data: distributions and measures of center and spread</CustomCheckbox>
                        <CustomCheckbox value="Two-variable data: models and scatterplots">Two-variable data: models and scatterplots</CustomCheckbox>
                        <CustomCheckbox value="Probability and conditional probability">Probability and conditional probability</CustomCheckbox>
                        <CustomCheckbox value="Inference from sample statistics and margin of error">Inference from sample statistics and margin of error</CustomCheckbox>
                        <CustomCheckbox value="Evaluating statistical claims: observational studies and experiments">Evaluating statistical claims: observational studies and experiments</CustomCheckbox>
                    </CheckboxGroup>
                </div>

                <Divider orientation='horizontal' />

                <div className="flex col gap-5">
                    <CustomCheckboxThick
                        value="Geometry and trigonometry"
                        isSelected={allGeometrySelected}
                        onValueChange={() =>
                            handleCheckAll({
                                allChoices: geometryTopics,
                                allChoicesSelected: allGeometrySelected,
                                selectedChoices: geometrySelectedTopics,
                                setSelectedChoices: setGeometrySelectedTopics,
                            })
                        }
                    >
                        Geometry and trigonometry
                    </CustomCheckboxThick>

                    <CheckboxGroup className="gap-1" orientation="horizontal" value={geometrySelectedTopics} onChange={setGeometrySelectedTopics}>
                        <CustomCheckbox value="Area and volume formulas">Area and volume formulas</CustomCheckbox>
                        <CustomCheckbox value="Lines, angles, and triangles">Lines, angles, and triangles</CustomCheckbox>
                        <CustomCheckbox value="Right triangles and trigonometry">Right triangles and trigonometry</CustomCheckbox>
                        <CustomCheckbox value="Circles">Circles</CustomCheckbox>
                    </CheckboxGroup>
                </div>
            </div>
            {page === "quizzes" && <div className='w-full flex flex-row justify-center mt-[50px]'>
                <Button className='rounded-[20px] bg-appleBlue text-white' onClick={handleQuizClick}>
                    Start Quiz
                </Button>
            </div>}
        </div>
    );
};

export default QuestionFilterSort;