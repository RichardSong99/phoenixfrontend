import React, { useEffect, useState, useContext } from 'react';
import { fetchMaskedQuestions, fetchFullQuestionById, getQuestions, deleteQuestion as deleteQuestionService } from '@/app/helper/apiservices/questionservice';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { parseLatexString } from '../latexrender/latexrender';
import renderMarkdownWithLaTeX from '../latexrender/markdownwlatex';
import { ChevronDownIcon } from '../../assets/components/ChevronDownIcon';
import { QuestionModal } from '@/app/helper/components/question/questionviewcomponents/questionmodal';

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
import { formatDate } from '../../data/utility';

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

    const [mode, setMode] = useState('practice'); // [practice, review, test, checkwork]

    const { selectedTopics, selectedDifficulties, selectedAnswerStatuses, selectedAnswerTypes, sortOption, sortDirection, viewQuestionModal, activeViewEngagement, isOpen, onOpenChange } = useContext(QuestionContext);




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
                    <DropdownMenu closeOnSelect={false} variant="light">
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
                    <TableColumn>Date Answered</TableColumn>

                </TableHeader>
                <TableBody>
                    {questions.map((question, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex space-x-2">

                                    <Button color="danger" onClick={() => deleteQuestion(question.id)}>Delete</Button>
                                    <Button color="secondary" onClick={() => handleEdit(question.id)}>Edit</Button>
                                    <Button color="primary" onClick={() => viewQuestionModal({questionId: question?.question?._id, engagement: question?.question?.engagements[0]?._id})}>View</Button>

                                </div>
                            </TableCell>
                            <TableCell>{renderMarkdownWithLaTeX(question.question.prompt)}</TableCell>
                            <TableCell>{question.question.topic}</TableCell>
                            <TableCell><Chip color={
                                question.question.difficulty === 'easy' ? 'success' : question.question.difficulty === 'medium' ? 'warning' : 'danger'
                            }>{question.question.difficulty}</Chip></TableCell>
                            <TableCell>{question.question.access_option}</TableCell>
                            <TableCell>{question.question.answer_type}</TableCell>
                            <TableCell><Chip
                                color={
                                    question.status === 'correct' ? 'success' : question.status === 'incorrect' ? 'danger' : question.status === 'omitted' ? 'warning' : 'default'
                                }>
                                {isAuthenticated ? question.status : "Unattempted"}</Chip></TableCell>
                            <TableCell>
                                {question.question.engagements[0]?.attempt_time && (
                                    <div>{formatDate(question.question.engagements[0].attempt_time)}</div>
                                )}                            
                                </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
            {/* </div> */}

            {activeViewQuestion &&
                <QuestionModal isOpen={isOpen} onOpenChange = {onOpenChange} question={activeViewQuestion} initialEngagement = {activeViewEngagement} mode={mode} />
            }

        </div >

    );
}

export default QBankViewer;