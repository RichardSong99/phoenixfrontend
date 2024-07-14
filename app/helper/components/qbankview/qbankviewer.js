import React, { useEffect, useState, useContext } from 'react';
import { fetchMaskedQuestions, fetchFullQuestionById, getQuestions, deleteQuestion as deleteQuestionService } from '@/app/helper/apiservices/questionservice';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { parseLatexString } from '../latexrender/latexrender';
import renderMarkdownWithLaTeX from '../latexrender/markdownwlatex';
import { ChevronDownIcon } from '../../assets/components/ChevronDownIcon';
import { CustomCheckbox } from '../../assets/components/CustomCheckbox';
import { CustomCheckboxThick } from '../../assets/components/CustomCheckboxThick';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    CheckboxGroup,
    Checkbox,
    Divider,
    Accordion,
    AccordionItem,
    RadioGroup,
    Radio
} from "@nextui-org/react";

import { useUser } from '@/app/helper/context/usercontext';
import { useData } from '@/app/helper/context/datacontext';

const QBankViewer = () => {

    const [questions, setQuestions] = useState([]);
    const { questionsUpdated, setQuestionsUpdated } = useContext(QuestionContext);
    const { editQuestion, setEditQuestion } = useContext(QuestionContext); // State for the question being edited
    const { activeViewQuestion, setActiveViewQuestion, onOpen } = useContext(QuestionContext); // State for the question being viewed

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [activeSubjectButton, setActiveSubjectButton] = useState("Math"); // Default to 'Math'
    const [activeSubject, setActiveSubject] = useState("math"); // Default to 'Math'
    const [filterValue, setFilterValue] = useState("");

    const { isAuthenticated } = useUser();


    const [selectedDifficulties, setSelectedDifficulties] = useState(new Set(["easy", "medium", "hard", "extreme"]));
    const [selectedAnswerTypes, setSelectedAnswerTypes] = useState(new Set(["multipleChoice", "freeResponse"]));
    const [selectedAnswerStatuses, setSelectedAnswerStatuses] = useState(new Set(["unattempted", "correct", "incorrect", "omitted"]));

    const algebraTopics = ["Algebra", "Linear equations in 1 variable", "Linear equations in 2 variables", "Linear functions", "Systems of 2 linear equations in 2 variables", "Linear inequalities in 1 or 2 variables"];
    const advancedMathTopics = ["Advanced math", "Equivalent expressions", "Nonlinear equations in 1 variable", "Systems of equations in 2 variables", "Nonlinear functions"];
    const problemSolvingTopics = ["Problem solving and data analysis", "Ratios, rates, proportional relationships, and units", "Percentages", "One-variable data: distributions and measures of center and spread", "Two-variable data: models and scatterplots", "Probability and conditional probability", "Inference from sample statistics and margin of error", "Evaluating statistical claims: observational studies and experiments"];
    const geometryTopics = ["Geometry and trigonometry", "Area and volume formulas", "Lines, angles, and triangles", "Right triangles and trigonometry", "Circles"];

    const [algebraSelectedTopics, setAlgebraSelectedTopics] = useState(algebraTopics);
    const [advancedMathSelectedTopics, setAdvancedMathSelectedTopics] = useState(advancedMathTopics);
    const [problemSolvingSelectedTopics, setProblemSolvingSelectedTopics] = useState(problemSolvingTopics);
    const [geometrySelectedTopics, setGeometrySelectedTopics] = useState(geometryTopics);


    const handleCheckboxGroupChange = (value, setGroupSelectedTopics, allTopics) => {
        if (value.includes(allTopics[0])) {
            if (value.length === 1) {
                setGroupSelectedTopics([]);
            } else {
                setGroupSelectedTopics(allTopics);
            }
        } else {
            setGroupSelectedTopics(value);
        }
    };


    async function loadQuestions() {
        try {
            const data = await getQuestions({
                unattempted: true,
                incorrect: true,
                omitted: true,
                correct: true,
                flagged: true,
                page: page,
                subject: activeSubject
            });
            setQuestions(data.data);
            setPage(data.currentPage);
            setLastPage(data.lastPage);
            setIsFetching(false);
        } catch (error) {
            console.error('Could not fetch questions:', error);
        }
    }



    useEffect(() => {

        loadQuestions();
    }, [questionsUpdated, page, activeSubject]);

    const deleteQuestion = async (questionId) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            // Your delete logic goes here
            try {
                await deleteQuestionService(questionId);
                setQuestionsUpdated(!questionsUpdated);
            } catch (error) {
                console.error('Could not delete question:', error);
            }

        }
    }

    const handleEdit = async (questionId) => {
        try {
            const question = await fetchFullQuestionById(questionId);
            setEditQuestion(question);
        } catch (error) {
            console.error('Could not fetch full question:', error);
        }
    }



    const viewQuestion = async (questionId) => {
        try {
            const viewQuestion = await fetchFullQuestionById(questionId);
            setActiveViewQuestion(viewQuestion);
            onOpen();
        } catch (error) {
            console.error('Could not fetch full question:', error);
        }
    }

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    return (
        <div className="flex flex-col gap-y-4 p-2">
            {/* Your component code goes here */}
            <div>
                <h3>Question Bank Database</h3>
            </div>

            {/* <SubjectButton
                activeSubject={activeSubject}
                handleSubjectChange={setActiveSubject}
            /> */}

            {/* <QBankFilter /> */}

            {/* <QbankTable/> */}
            <div className="relative flex justify-start items-center gap-2">
                <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[44%]",
                        inputWrapper: "border-1",
                    }}
                    placeholder="Search by name..."
                    // size="sm"
                    // startContent={<SearchIcon className="text-default-300" />}
                    value={filterValue}
                    variant="bordered"
                    onClear={() => setFilterValue("")}
                    onValueChange={onSearchChange}
                />

                {/* <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            endContent={<ChevronDownIcon className="text-small" />}
                            variant="bordered"
                            color="primary"
                        >
                            Difficulty
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Multiple selection example"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"

                        selectedKeys={selectedDifficulties}
                        onSelectionChange={setSelectedDifficulties}
                    >
                        <DropdownItem key="easy">Easy</DropdownItem>
                        <DropdownItem key="medium">Medium</DropdownItem>
                        <DropdownItem key="hard">Hard</DropdownItem>
                        <DropdownItem key="extreme">Extreme</DropdownItem>

                    </DropdownMenu>
                </Dropdown>



                <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            endContent={<ChevronDownIcon className="text-small" />}
                            variant="bordered"
                            color="primary"
                        >
                            Answer Type
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Multiple selection example"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"

                        selectedKeys={selectedAnswerTypes}
                        onSelectionChange={setSelectedAnswerTypes}
                    >
                        <DropdownItem key="multipleChoice">Multiple Choice</DropdownItem>
                        <DropdownItem key="freeResponse">Free Response</DropdownItem>

                    </DropdownMenu>
                </Dropdown>


                <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            // endContent={<ChevronDownIcon className="text-small" />}
                            variant="bordered"
                            color="primary"
                            endContent={<ChevronDownIcon className="text-small" />}

                        >
                            Answer Status
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Multiple selection example"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"

                        selectedKeys={selectedAnswerStatuses}
                        onSelectionChange={setSelectedAnswerStatuses}
                    >
                        <DropdownItem key="unattempted">Unattempted</DropdownItem>
                        <DropdownItem key="correct">Correct</DropdownItem>
                        <DropdownItem key="incorrect">Incorrect</DropdownItem>
                        <DropdownItem key="omitted">Omitted</DropdownItem>

                    </DropdownMenu>
                </Dropdown>




                <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            // endContent={<ChevronDownIcon className="text-small" />}
                            variant="bordered"
                            color="primary"
                            endContent={<ChevronDownIcon className="text-small" />}

                        >
                            Topics
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Multiple selection example"
                        closeOnSelect={false}

                    >
                        <DropdownItem key="Algebra" className="flex justify-between">

                            <div className="flex row gap-2">

                                <div className="flex col gap-5  ">

                                    <CustomCheckboxThick value="Algebra">Algebra</CustomCheckboxThick>



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

                                    <CustomCheckboxThick value="Advanced math">Advanced math</CustomCheckboxThick>

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


                                    <CustomCheckboxThick value="Problem solving and data analysis">Problem solving and data analysis</CustomCheckboxThick>

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


                                    <CustomCheckboxThick value="Geometry and trigonometry">Geometry and trigonometry</CustomCheckboxThick>

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
                        </DropdownItem>


                    </DropdownMenu>
                </Dropdown> */}

            </div>

            <Accordion isCompact variant="shadow">
                <AccordionItem title="Filter by Topic">


                    <div className="flex row gap-2 p-2">

                        <div className="flex col gap-2  ">
                            <Button color="primary" variant="ghost">Reset filters</Button>
                            <Button color="primary" variant="ghost">Review mode</Button>
                            <Button color="primary" variant="ghost">Unanswered questions</Button>

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
                            <CustomCheckboxThick value="Algebra">All</CustomCheckboxThick>



                            <CheckboxGroup
                                className="gap-1 "
                                orientation="horizontal"
                            // value={algebraSelectedTopics}
                            // onChange={setAlgebraSelectedTopics}
                            >
                                <CustomCheckbox value="easy">Easy</CustomCheckbox>
                                <CustomCheckbox value="medium">Medium</CustomCheckbox>
                                <CustomCheckbox value="hard">Hard</CustomCheckbox>

                            </CheckboxGroup>

                        </div>

                        <Divider orientation='horizontal' />

                        <div className="flex col gap-5  ">
                            <CustomCheckboxThick value="Algebra">All</CustomCheckboxThick>



                            <CheckboxGroup
                                className="gap-1 "
                                orientation="horizontal"
                            // value={algebraSelectedTopics}
                            // onChange={setAlgebraSelectedTopics}
                            >
                                <CustomCheckbox value="easy">Multiple Choice</CustomCheckbox>
                                <CustomCheckbox value="medium">Free Response</CustomCheckbox>

                            </CheckboxGroup>

                        </div>

                        <Divider orientation='horizontal' />

                        <div className="flex col gap-5  ">
                            <CustomCheckboxThick value="Algebra">All</CustomCheckboxThick>



                            <CheckboxGroup
                                className="gap-1 "
                                orientation="horizontal"
                            // value={algebraSelectedTopics}
                            // onChange={setAlgebraSelectedTopics}
                            >
                                <CustomCheckbox value="easy">Unattempted</CustomCheckbox>
                                <CustomCheckbox value="medium">Correct</CustomCheckbox>
                                <CustomCheckbox value="medium">Incorrect</CustomCheckbox>
                                <CustomCheckbox value="medium">Omitted</CustomCheckbox>


                            </CheckboxGroup>

                        </div>

                        <Divider orientation='horizontal' />



                        <div className="flex row gap-2 p-2">

                            <div className="flex col gap-5  ">

                                <CustomCheckboxThick value="Algebra">Algebra</CustomCheckboxThick>



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

                                <CustomCheckboxThick value="Advanced math">Advanced math</CustomCheckboxThick>

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


                                <CustomCheckboxThick value="Problem solving and data analysis">Problem solving and data analysis</CustomCheckboxThick>

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


                                <CustomCheckboxThick value="Geometry and trigonometry">Geometry and trigonometry</CustomCheckboxThick>

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
                </AccordionItem>
            </Accordion>







            {/* <PageNavigation currentPage={currentPage} lastPage={lastPage} pageSelectHandler={pageSelectHandler} /> */}
            <Pagination total={lastPage} initialPage={page} onChange={(page) => setPage(page)} showControls />


            {/* <div className={styles.questionsContainer}> */}
            <Table removeWrapper >
                <TableHeader>
                    <TableColumn>Action</TableColumn>
                    <TableColumn>Prompt</TableColumn>
                    <TableColumn>Topic</TableColumn>
                    <TableColumn>Difficulty</TableColumn>
                    <TableColumn>Access Option</TableColumn>
                    <TableColumn>Answer Type</TableColumn>
                    <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody>
                    {questions.map((question, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex space-x-2">

                                    <Button color="danger" onClick={() => deleteQuestion(question.id)}>Delete</Button>
                                    <Button color="secondary" onClick={() => handleEdit(question.id)}>Edit</Button>
                                    <Button color="primary" onClick={() => viewQuestion(question.id)}>View</Button>

                                </div>
                            </TableCell>
                            <TableCell>{renderMarkdownWithLaTeX(question.Prompt)}</TableCell>
                            <TableCell>{question.Topic}</TableCell>
                            <TableCell><Chip color={
                                question.Difficulty === 'easy' ? 'success' : question.Difficulty === 'medium' ? 'warning' : 'danger'
                            }>{question.Difficulty}</Chip></TableCell>
                            <TableCell>{question.AccessOption}</TableCell>
                            <TableCell>{question.AnswerType}</TableCell>
                            <TableCell><Chip
                                color={
                                    question.Status === 'correct' ? 'success' : question.Status === 'incorrect' ? 'danger' : question.Status === 'omitted' ? 'warning' : 'default'
                                }>
                                {isAuthenticated ? question.Status : "Unattempted"}</Chip></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* </div> */}


        </div >

    );
}

export default QBankViewer;