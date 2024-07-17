import React, { useEffect, useState, useContext } from 'react';
import { fetchMaskedQuestions, fetchFullQuestionById, getQuestions, deleteQuestion as deleteQuestionService } from '@/app/helper/apiservices/questionservice';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import renderMarkdownWithLaTeX from '../helper/components/latexrender/markdownwlatex';

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
    Checkbox
} from "@nextui-org/react";

const QBankBase = () => {

    const [questions, setQuestions] = useState([]);
    const { questionsUpdated, setQuestionsUpdated } = useContext(QuestionContext);
    const { editQuestion, setEditQuestion } = useContext(QuestionContext); // State for the question being edited
    const { activeViewQuestion, setActiveViewQuestion, onOpen } = useContext(QuestionContext); // State for the question being viewed

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [activeSubjectButton, setActiveSubjectButton] = useState("Math"); // Default to 'Math'
    const [activeSubject, setActiveSubject] = useState("math"); // Default to 'Math'
    const [filterValue, setFilterValue] = useState("");

    const [selectedDifficulties, setSelectedDifficulties] = useState(new Set(['easy', 'medium', 'hard', 'extreme']));

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    useEffect(() => {
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
        <div className="flex flex-col gap-y-4">
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

                <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            // endContent={<ChevronDownIcon className="text-small" />}
                            variant="flat"
                        >
                            Topic
                        </Button>
                    </DropdownTrigger>


                </Dropdown>

                <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            // endContent={<ChevronDownIcon className="text-small" />}
                            variant="flat"
                        >
                            Difficulty
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Static Actions"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectedKeys={selectedDifficulties}
                        onSelect={(selected) => setSelectedDifficulties(selected)}
                    >
                        <DropdownItem key="easy">Easy</DropdownItem>
                        <DropdownItem key="medium">Medium</DropdownItem>
                        <DropdownItem key="hard">Hard</DropdownItem>
                        <DropdownItem key="extreme">Extreme</DropdownItem>

                    </DropdownMenu>
                </Dropdown>

                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize"
                        >
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Multiple selection example"
                        variant="flat"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        <DropdownItem key="text">Text</DropdownItem>
                        <DropdownItem key="number">Number</DropdownItem>
                        <DropdownItem key="date">Date</DropdownItem>
                        <DropdownItem key="single_date">Single Date</DropdownItem>
                        <DropdownItem key="iteration">Iteration</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger className="hidden sm:flex">
                        <Button
                            // endContent={<ChevronDownIcon className="text-small" />}
                            variant="flat"
                        >
                            Answer Type
                        </Button>
                    </DropdownTrigger>
                </Dropdown>

                <Dropdown>
                    <DropdownTrigger>
                        <Button>
                            Checkbox
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        {/* <CheckboxGroup
                            label="Select cities"
                            defaultValue={["buenos-aires", "london"]}
                        >
                            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
                            <Checkbox value="sydney">Sydney</Checkbox>
                            <Checkbox value="san-francisco">San Francisco</Checkbox>
                            <Checkbox value="london">London</Checkbox>
                            <Checkbox value="tokyo">Tokyo</Checkbox>
                        </CheckboxGroup> */}
                    </DropdownMenu>
                </Dropdown>
            </div>


            {/* <PageNavigation currentPage={currentPage} lastPage={lastPage} pageSelectHandler={pageSelectHandler} /> */}
            <Pagination color="primary" total={lastPage} initialPage={1} page={page} onChange={setPage} />


            {/* <div className={styles.questionsContainer}> */}
            <Table removeWrapper >
                <TableHeader>
                    <TableColumn>Action</TableColumn>
                    <TableColumn>Prompt</TableColumn>
                    <TableColumn>Topic</TableColumn>
                    <TableColumn>Difficulty</TableColumn>
                    <TableColumn>Access Option</TableColumn>
                    <TableColumn>Answer Type</TableColumn>
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
                            <TableCell>{question.Difficulty}</TableCell>
                            <TableCell>{question.AccessOption}</TableCell>
                            <TableCell>{question.AnswerType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* </div> */}


        </div>

    );
}

export default QBankBase;