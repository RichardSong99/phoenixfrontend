import React, { useEffect, useState } from 'react';
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

const QuestionFilterSort = ({ }) => {


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

    const [selectedDifficulties, setSelectedDifficulties] = useState(difficulties);
    const [selectedAnswerTypes, setSelectedAnswerTypes] = useState(answerTypes);
    const [selectedAnswerStatuses, setSelectedAnswerStatuses] = useState(answerStatuses);

    const [allDifficultySelected, setAllDifficultySelected] = useState(true);
    const [allAnswerTypesSelected, setAllAnswerTypesSelected] = useState(true);
    const [allAnswerStatusesSelected, setAllAnswerStatusesSelected] = useState(true);

    const handleCheckAll = ({
        allChoices, 
        allChoicesSelected,
        selectedChoices,
        setSelectedChoices,
        required = false
    }) => {

        if(allChoicesSelected) {
            if(! required) {
                setSelectedChoices([]);
                return;
            }else{
                return;
            }
        }else {
            setSelectedChoices(allChoices);
            return;
        }
    };

    const handlePassiveCheckboxChange = () => {
        if(algebraSelectedTopics.length === algebraTopics.length) {
            setAllAlgebraSelected(true);
        } else {
            setAllAlgebraSelected(false);
        }

        if(advancedMathSelectedTopics.length === advancedMathTopics.length) {
            setAllAdvancedMathSelected(true);
        } else {
            setAllAdvancedMathSelected(false);
        }

        if(problemSolvingSelectedTopics.length === problemSolvingTopics.length) {
            setAllProblemSolvingSelected(true);
        } else {
            setAllProblemSolvingSelected(false);
        }

        if(geometrySelectedTopics.length === geometryTopics.length) {
            setAllGeometrySelected(true);
        } else {
            setAllGeometrySelected(false);
        }

        if(selectedDifficulties.length === difficulties.length) {
            setAllDifficultySelected(true);
        } else {
            setAllDifficultySelected(false);
        }

        if(selectedAnswerTypes.length === answerTypes.length) {
            setAllAnswerTypesSelected(true);
        } else {
            setAllAnswerTypesSelected(false);
        }

        if(selectedAnswerStatuses.length === answerStatuses.length) {
            setAllAnswerStatusesSelected(true);
        } else {
            setAllAnswerStatusesSelected(false);
        }
    }

    useEffect(() => {
        handlePassiveCheckboxChange();
    }, [algebraSelectedTopics, advancedMathSelectedTopics, problemSolvingSelectedTopics, geometrySelectedTopics, selectedDifficulties, selectedAnswerTypes, selectedAnswerStatuses]);



    const handleResetFilters = () => {
        console.log("Reset filters");
        handleCheckAll({allChoices: difficulties, selectedChoices: selectedDifficulties, setSelectedChoices: setSelectedDifficulties});
        handleCheckAll({allChoices: answerTypes, selectedChoices: selectedAnswerTypes, setSelectedChoices: setSelectedAnswerTypes});
        handleCheckAll({allChoices: answerStatuses, selectedChoices: selectedAnswerStatuses, setSelectedChoices: setSelectedAnswerStatuses});
        handleCheckAll({allChoices: algebraTopics, selectedChoices: algebraSelectedTopics, setSelectedChoices: setAlgebraSelectedTopics});
        handleCheckAll({allChoices: advancedMathTopics, selectedChoices: advancedMathSelectedTopics, setSelectedChoices: setAdvancedMathSelectedTopics});
        handleCheckAll({allChoices: problemSolvingTopics, selectedChoices: problemSolvingSelectedTopics, setSelectedChoices: setProblemSolvingSelectedTopics});
        handleCheckAll({allChoices: geometryTopics, selectedChoices: geometrySelectedTopics, setSelectedChoices: setGeometrySelectedTopics});
    }

    const handleSetReviewMode = () => {
        console.log("Review mode");
        handleCheckAll({allChoices: difficulties, selectedChoices: selectedDifficulties, setSelectedChoices: setSelectedDifficulties});
        handleCheckAll({allChoices: answerTypes, selectedChoices: selectedAnswerTypes, setSelectedChoices: setSelectedAnswerTypes});
        // handleCheckAll({allChoices: answerStatuses, selectedChoices: selectedAnswerStatuses, setSelectedChoices: setSelectedAnswerStatuses});
        handleCheckAll({allChoices: algebraTopics, selectedChoices: algebraSelectedTopics, setSelectedChoices: setAlgebraSelectedTopics});
        handleCheckAll({allChoices: advancedMathTopics, selectedChoices: advancedMathSelectedTopics, setSelectedChoices: setAdvancedMathSelectedTopics});
        handleCheckAll({allChoices: problemSolvingTopics, selectedChoices: problemSolvingSelectedTopics, setSelectedChoices: setProblemSolvingSelectedTopics});
        handleCheckAll({allChoices: geometryTopics, selectedChoices: geometrySelectedTopics, setSelectedChoices: setGeometrySelectedTopics});

        setSelectedAnswerStatuses(["correct", "incorrect", "omitted"]);
    }

    const handleSetUnansweredMode = () => {
        console.log("Review mode");
        handleCheckAll({allChoices: difficulties, selectedChoices: selectedDifficulties, setSelectedChoices: setSelectedDifficulties});
        handleCheckAll({allChoices: answerTypes, selectedChoices: selectedAnswerTypes, setSelectedChoices: setSelectedAnswerTypes});
        // handleCheckAll({allChoices: answerStatuses, selectedChoices: selectedAnswerStatuses, setSelectedChoices: setSelectedAnswerStatuses});
        handleCheckAll({allChoices: algebraTopics, selectedChoices: algebraSelectedTopics, setSelectedChoices: setAlgebraSelectedTopics});
        handleCheckAll({allChoices: advancedMathTopics, selectedChoices: advancedMathSelectedTopics, setSelectedChoices: setAdvancedMathSelectedTopics});
        handleCheckAll({allChoices: problemSolvingTopics, selectedChoices: problemSolvingSelectedTopics, setSelectedChoices: setProblemSolvingSelectedTopics});
        handleCheckAll({allChoices: geometryTopics, selectedChoices: geometrySelectedTopics, setSelectedChoices: setGeometrySelectedTopics});

        setSelectedAnswerStatuses(["unattempted"]);
    }


    return (
        <div className="flex row gap-2 p-2">

            <div className="flex col gap-2  ">
                <Button color="primary" variant="ghost" onPress = {handleResetFilters}>Reset filters</Button>
                <Button color="primary" variant="ghost" onPress = {handleSetReviewMode}>Review mode</Button>
                <Button color="primary" variant="ghost" onPress = {handleSetUnansweredMode}>Unanswered questions</Button>

            </div>

            <Divider orientation='horizontal' />

            <RadioGroup
                label="Sort  by"
                orientation="horizontal"
            >
                <Radio value="buenos-aires">Time entered</Radio>
                <Radio value="sydney">Time attempted</Radio>
                <Radio value="san-francisco">Topic</Radio>
                <Radio value="london">Difficulty</Radio>
                <Radio value="london">Answer status</Radio>

            </RadioGroup>

            <Divider orientation='horizontal' />



            <div className="flex col gap-5  ">
                <CustomCheckboxThick value="all difficulty" isSelected = {allDifficultySelected} onValueChange={ () => handleCheckAll({allChoices: difficulties, allChoicesSelected: allDifficultySelected, selectedChoices: selectedDifficulties, setSelectedChoices: setSelectedDifficulties, required :true}) }>All</CustomCheckboxThick>
                <CheckboxGroup
                    className="gap-1 "
                    orientation="horizontal"
                    value={selectedDifficulties}
                    onChange={setSelectedDifficulties}
                >
                    <CustomCheckbox value="easy">Easy</CustomCheckbox>
                    <CustomCheckbox value="medium">Medium</CustomCheckbox>
                    <CustomCheckbox value="hard">Hard</CustomCheckbox>

                </CheckboxGroup>

            </div>

            <Divider orientation='horizontal' />

            <div className="flex col gap-5  ">
                <CustomCheckboxThick value="all answer types" isSelected = {allAnswerTypesSelected} onValueChange={() => handleCheckAll({allChoices: answerTypes, allChoicesSelected: allAnswerTypesSelected,selectedChoices: selectedAnswerTypes, setSelectedChoices: setSelectedAnswerTypes, required : true  })}>All</CustomCheckboxThick>
                <CheckboxGroup
                    className="gap-1 "
                    orientation="horizontal"
                    value={selectedAnswerTypes}
                    onChange={setSelectedAnswerTypes}
                >
                    <CustomCheckbox value="multipleChoice">Multiple Choice</CustomCheckbox>
                    <CustomCheckbox value="freeResponse">Free Response</CustomCheckbox>

                </CheckboxGroup>

            </div>

            <Divider orientation='horizontal' />

            <div className="flex col gap-5  ">
                <CustomCheckboxThick value="all answer statuses" isSelected = {allAnswerStatusesSelected} onValueChange={() => handleCheckAll({allChoices: answerStatuses, allChoicesSelected: allAnswerStatusesSelected,selectedChoices: selectedAnswerStatuses, setSelectedChoices: setSelectedAnswerStatuses, required : true  })}>All</CustomCheckboxThick>
                <CheckboxGroup
                    className="gap-1 "
                    orientation="horizontal"
                    value={selectedAnswerStatuses}
                    onChange={setSelectedAnswerStatuses}
                >
                    <CustomCheckbox value="unattempted">Unattempted</CustomCheckbox>
                    <CustomCheckbox value="correct">Correct</CustomCheckbox>
                    <CustomCheckbox value="incorrect">Incorrect</CustomCheckbox>
                    <CustomCheckbox value="omitted">Omitted</CustomCheckbox>

                </CheckboxGroup>

            </div>

            <Divider orientation='horizontal' />



            <div className="flex row gap-2 p-2">

                <div className="flex col gap-5  ">

                    <CustomCheckboxThick value="Algebra" isSelected = {allAlgebraSelected} onValueChange={() => handleCheckAll({allChoices: algebraTopics, allChoicesSelected: allAlgebraSelected, selectedChoices: algebraSelectedTopics, setSelectedChoices: setAlgebraSelectedTopics})}>Algebra</CustomCheckboxThick>

                    <CheckboxGroup
                        className="gap-1 "
                        orientation="horizontal"
                        value={algebraSelectedTopics}
                        onChange={setAlgebraSelectedTopics}
                    >
                        <CustomCheckbox value="Linear equations in 1 variable">Linear equations in 1 variable</CustomCheckbox>
                        <CustomCheckbox value="Linear equations in 2 variables">Linear equations in 2 variables</CustomCheckbox>
                        <CustomCheckbox value="Linear functions">Linear functions</CustomCheckbox>
                        <CustomCheckbox value="Systems of 2 linear equations in 2 variables">Systems of 2 linear equations in 2 variables</CustomCheckbox>
                        <CustomCheckbox value="Linear inequalities in 1 or 2 variables">Linear inequalities in 1 or 2 variables</CustomCheckbox>
                    </CheckboxGroup>

                </div>
                <Divider orientation='horizontal' />

                <div className="flex col gap-5">

                    <CustomCheckboxThick value="Advanced math" isSelected = {allAdvancedMathSelected} onValueChange={() => handleCheckAll({allChoices: advancedMathTopics, allChoicesSelected: allAdvancedMathSelected, selectedChoices: advancedMathSelectedTopics, setSelectedChoices: setAdvancedMathSelectedTopics  })}>Advanced math</CustomCheckboxThick>

                    <CheckboxGroup
                        className="gap-1"
                        orientation="horizontal"
                        value={advancedMathSelectedTopics}
                        onChange={setAdvancedMathSelectedTopics}
                    >
                        <CustomCheckbox value="Equivalent expressions">Equivalent expressions</CustomCheckbox>
                        <CustomCheckbox value="Nonlinear equations in 1 variable">Nonlinear equations in 1 variable</CustomCheckbox>
                        <CustomCheckbox value="Systems of equations in 2 variables">Systems of equations in 2 variables</CustomCheckbox>
                        <CustomCheckbox value="Nonlinear functions">Nonlinear functions</CustomCheckbox>

                    </CheckboxGroup>
                </div>

                <Divider orientation='horizontal' />
                <div className="flex col gap-5">


                    <CustomCheckboxThick value="Problem solving and data analysis" isSelected = {allProblemSolvingSelected} onValueChange={() => handleCheckAll({allChoices: problemSolvingTopics, allChoicesSelected: allProblemSolvingSelected, selectedChoices: problemSolvingSelectedTopics, setSelectedChoices: setProblemSolvingSelectedTopics  })}>Problem solving and data analysis</CustomCheckboxThick>

                    <CheckboxGroup
                        className="gap-1"
                        orientation="horizontal"
                        value={problemSolvingSelectedTopics}
                        onChange={setProblemSolvingSelectedTopics}
                    >
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


                    <CustomCheckboxThick value="Geometry and trigonometry" isSelected = {allGeometrySelected} onValueChange={() => handleCheckAll({allChoices: geometryTopics, allChoicesSelected: allGeometrySelected,selectedChoices: geometrySelectedTopics, setSelectedChoices: setGeometrySelectedTopics  })}>Geometry and trigonometry</CustomCheckboxThick>

                    <CheckboxGroup
                        className="gap-1"
                        orientation="horizontal"
                        value={geometrySelectedTopics}
                        onChange={setGeometrySelectedTopics}
                    >
                        <CustomCheckbox value="Area and volume formulas">Area and volume formulas</CustomCheckbox>
                        <CustomCheckbox value="Lines, angles, and triangles">Lines, angles, and triangles</CustomCheckbox>
                        <CustomCheckbox value="Right triangles and trigonometry">Right triangles and trigonometry</CustomCheckbox>
                        <CustomCheckbox value="Circles">Circles</CustomCheckbox>

                    </CheckboxGroup>
                </div>
            </div>
        </div>
    )
}

export default QuestionFilterSort;