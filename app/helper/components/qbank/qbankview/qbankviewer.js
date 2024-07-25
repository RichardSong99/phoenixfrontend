import React, { useEffect, useState, useContext } from 'react';
import { fetchMaskedQuestions, fetchFullQuestionById, getQuestions, deleteQuestion as deleteQuestionService } from '@/app/helper/apiservices/questionservice';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { ChevronDownIcon } from '../../../assets/components/ChevronDownIcon';
import QBankTable from './qbanktable';

import QuestionFilterSort from '../../filter/questionfiltersort';
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


const QBankViewer = () => {

    const [questions, setQuestions] = useState([]);

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isFetching, setIsFetching] = useState(true);

    const [activeSubject, setActiveSubject] = useState("math"); // Default to 'Math'

    const [filterValue, setFilterValue] = useState("");


    const { 
        selectedTopics, 
        selectedDifficulties, 
        selectedAnswerStatuses, 
        selectedAnswerTypes, 
        sortOption, 
        sortDirection, 
        viewQuestionModal, 
        activeViewEngagement, 
        isOpen, 
        onOpenChange, 
        isFormOpen, 
        onFormOpen, 
        onFormOpenChange, 
        editQuestion, 
        setEditQuestion, 
        MODEEDIT, 
        MODENEW,
        questionsUpdated,
        setQuestionsUpdated 
    } = useContext(QuestionContext);




    useEffect(() => {
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

        loadQuestions();
    }, [questionsUpdated, page, selectedTopics, selectedDifficulties, selectedAnswerStatuses, selectedAnswerTypes, sortOption, sortDirection, activeSubject]);



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
            {/* <div>
                <h3>Question Bank Database</h3>
            </div> */}



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

            <Pagination total={lastPage} initialPage={page} onChange={(page) => setPage(page)} showControls />


            <QBankTable questionEngagementCombos = {questions} />

        </div >

    );
}

export default QBankViewer;