import React, { useEffect, useState, useContext } from 'react';
import QBankFilter from '../../helper/components/questionbank/qbankfilter';
import { fetchMaskedQuestions, fetchFullQuestionById, getQuestions, deleteQuestion as deleteQuestionService } from '@/app/helper/apiservices/questionservice';
import styles from './qbankbase.module.css';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { parseLatexString } from '../../helper/components/latexrender/latexrender';
import renderMarkdownWithLaTeX from '../../helper/components/latexrender/markdownwlatex';
import PageNavigation from '../../study/browse/browsecomponents/pagenavigation';
import QbankTable from './qbanktable';
import { NumberChoiceButtons, SubjectButton } from '@/app/helper/components/basecomponents/buttons/mybuttons';
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
} from "@nextui-org/react";

const QBankBase = ({ setIsModalOpen, setQuestion }) => {

    const [questions, setQuestions] = useState([]);
    const { questionsUpdated, setQuestionsUpdated } = useContext(QuestionContext);
    const { editQuestion, setEditQuestion } = useContext(QuestionContext); // State for the question being edited
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [activeSubjectButton, setActiveSubjectButton] = useState("Math"); // Default to 'Math'
    const [activeSubject, setActiveSubject] = useState("math"); // Default to 'Math'
    const [filterValue, setFilterValue] = useState("");

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
            setQuestion(viewQuestion);
            setIsModalOpen(true);
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
                            Subject
                        </Button>
                    </DropdownTrigger>
                </Dropdown>


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
                                <button className={styles.deleteButton} onClick={() => deleteQuestion(question.id)}>Delete</button>
                                <button className={styles.button} onClick={() => handleEdit(question.id)}>Edit</button>
                                <button className={styles.button} onClick={() => viewQuestion(question.id)}>View</button>


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