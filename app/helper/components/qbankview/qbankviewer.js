import React, { useEffect, useState, useContext } from 'react';
import { fetchMaskedQuestions, fetchFullQuestionById, getQuestions, deleteQuestion as deleteQuestionService } from '@/app/helper/apiservices/questionservice';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { parseLatexString } from '../latexrender/latexrender';
import renderMarkdownWithLaTeX from '../latexrender/markdownwlatex';
import { ChevronDownIcon } from '../../assets/components/ChevronDownIcon';
import QuestionFilterSort from '../filter/questionfiltersort';
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

    const { isAuthenticated } = useUser();
    const [filterValue, setFilterValue] = useState("");

    const {selectedTopics, selectedDifficulties, selectedAnswerStatuses, selectedAnswerTypes, sortOption, sortDirection} = useContext(QuestionContext);

    async function loadQuestions() {
        try {
            const data = await getQuestions({
                selectedTopics: selectedTopics,
                selectedDifficulties: selectedDifficulties,
                selectedAnswerStatuses: selectedAnswerStatuses,
                selectedAnswerTypes: selectedAnswerTypes,
                sortOption: sortOption,
                sortDirection: sortDirection,
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
    }, [questionsUpdated, page, selectedTopics, selectedDifficulties, selectedAnswerStatuses, selectedAnswerTypes, sortOption, sortDirection, activeSubject]);

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

                <Dropdown>
                    <DropdownTrigger>
                        <Button color="primary" iconRight={<ChevronDownIcon />}> Filter & Sort </Button>
                    </DropdownTrigger>
                    <DropdownMenu closeOnSelect = {false} variant = "light">
                        <DropdownItem>
                            <QuestionFilterSort />
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>


            </div>








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