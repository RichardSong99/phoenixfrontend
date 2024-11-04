import React, { useEffect, useState, useContext, use } from 'react';
import { fetchMaskedQuestions, fetchFullQuestionById, getQuestions, deleteQuestion as deleteQuestionService } from '@/app/helper/apiservices/questionservice';
import { QuestionContext } from '@/app/helper/context/questioncontext';
import { ChevronDownIcon } from '../../../assets/components/ChevronDownIcon';
import NewQBankTable from './newqbanktable';
import { UserProvider } from '@/app/helper/context/usercontext';
import { difficultiesData, statusData } from "./data";
import { Icon } from '@iconify/react';
import { DataContext } from '@/app/helper/context/datacontext';

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
    Select,
    SelectItem,
    CheckboxGroup,
    Avatar,
    Checkbox,
    Divider,
    Accordion,
    AccordionItem,
    RadioGroup,
    Radio,
    Spinner,
} from "@nextui-org/react";


const NewQBankViewer = () => {

    const [questions, setQuestions] = useState([]);

    const mathTopics = [
        "All Math",
        "Algebra",
        "Advanced Math",
        "Problem Solving & Data Analysis",
        "Geometry & Trigonometry",
    ];

    const readingTopics = [
        "All Reading & Writing",
        "Rhetorical & Structural Analysis",
        "Interpreting Information & Ideas",
        "Standard English Conventions",
        "Effective Expression & Revision"
    ];

    const [selectedDifficultyKeys, setSelectedDifficultyKeys] = useState(new Set([]));
    const [selectedAnswerStatusKeys, setSelectedAnswerStatusKeys] = useState(new Set([]));

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isFetching, setIsFetching] = useState(true);

    const [activeSubject, setActiveSubject] = useState("math"); // Default to 'Math'

    const [filterValue, setFilterValue] = useState("");

    const [selectedTopicButton, setSelectedTopicButton] = useState("All Math");

    const [starredFilter, setStarredFilter] = useState(false);

    const [tableLoading, setTableLoading] = useState(false);

    const {
        selectedDifficulties,
        setSelectedDifficulties,
        selectedAnswerTypes,
        setSelectedAnswerTypes,
        selectedAnswerStatuses,
        setSelectedAnswerStatuses,
        selectedTopics,
        setSelectedTopics,
        sortOption,
        sortDirection,
        questionsUpdated,
    } = useContext(QuestionContext);

    const {
        getTopicsByCategory,
        getTopicsBySubject,
    }
        = useContext(DataContext);





    const handleTopicButton = (topic) => {
        setSelectedTopicButton(topic);
    };

    const getTopicButtonStyle = (topic) => ({
        backgroundColor: selectedTopicButton === topic ? '#14BF96' : '#F8F7F7',
        color: selectedTopicButton === topic ? 'white' : '#333333',
    });

    const handleResetFilters = () => {
        setSelectedAnswerTypes([]);
        setSelectedTopicButton("All Math");
        setSelectedDifficultyKeys(new Set([]));
        setSelectedAnswerStatusKeys(new Set([]));
        setFilterValue("");

        setStarredFilter(false);
        setPage(1);
    };

    useEffect(() => {
        if (selectedDifficultyKeys) {
            console.log("selected difficulty keys changed");
            console.log(selectedDifficultyKeys, "selectedDifficultyKeys");

            let updatedSelectedDifficulties = [];
            // If selectedDifficultyKeys contains 1, add "easy" to updatedSelectedDifficulties
            if (selectedDifficultyKeys.has('1')) {
                updatedSelectedDifficulties.push("easy");
            }
            // If selectedDifficultyKeys contains 2, add "medium" to updatedSelectedDifficulties
            if (selectedDifficultyKeys.has('2')) {
                updatedSelectedDifficulties.push("medium");
            }
            // If selectedDifficultyKeys contains 3, add "hard" to updatedSelectedDifficulties
            if (selectedDifficultyKeys.has('3')) {
                updatedSelectedDifficulties.push("hard");
            }
            setSelectedDifficulties(updatedSelectedDifficulties);
        } else {
            // If no keys are selected, reset selected difficulties
            setSelectedDifficulties([]);
        }
    }, [selectedDifficultyKeys, setSelectedDifficulties]);



    useEffect(() => {
        if (selectedAnswerStatusKeys) {
            console.log(selectedAnswerStatusKeys, "selectedAnswerStatusKeys");

            let updatedSelectedAnswerStatuses = [];
            // If selectedDifficultyKeys contains 1, add "easy" to updatedSelectedDifficulties
            if (selectedAnswerStatusKeys.has('1')) {
                updatedSelectedAnswerStatuses.push("unattempted");
            }
            // If selectedDifficultyKeys contains 2, add "medium" to updatedSelectedDifficulties
            if (selectedAnswerStatusKeys.has('2')) {
                updatedSelectedAnswerStatuses.push("correct");
            }
            // If selectedDifficultyKeys contains 3, add "hard" to updatedSelectedDifficulties
            if (selectedAnswerStatusKeys.has('3')) {
                updatedSelectedAnswerStatuses.push("incorrect");
            }
            if (selectedAnswerStatusKeys.has('4')) {
                updatedSelectedAnswerStatuses.push("omitted");
            }
            setSelectedAnswerStatuses(updatedSelectedAnswerStatuses);
        } else {
            // If no keys are selected, reset selected difficulties
            setSelectedAnswerStatuses([]);
        }
    }, [selectedAnswerStatusKeys, setSelectedAnswerStatuses]);


    useEffect(() => {
        if (selectedTopicButton) {
            console.log(selectedTopicButton, "selectedTopicButton");
            if (selectedTopicButton === "All Math") {
                setSelectedTopics(getTopicsBySubject("Math"));
            } else if (selectedTopicButton === "Algebra") {
                setSelectedTopics(getTopicsByCategory("Algebra"));
            } else if (selectedTopicButton === "Advanced Math") {
                setSelectedTopics(getTopicsByCategory("Advanced math"));
            } else if (selectedTopicButton === "Problem Solving & Data Analysis") {
                setSelectedTopics(getTopicsByCategory("Problem solving and data analysis"));
            } else if (selectedTopicButton === "Geometry & Trigonometry") {
                setSelectedTopics(getTopicsByCategory("Geometry and trigonometry"));
            } else if (selectedTopicButton === "All Reading & Writing") {
                setSelectedTopics(getTopicsBySubject("Reading & Writing"));
            } else if (selectedTopicButton === "Rhetorical & Structural Analysis") {
                setSelectedTopics(getTopicsByCategory("Rhetorical and structural analysis"));
            } else if (selectedTopicButton === "Interpreting Information & Ideas") {
                setSelectedTopics(getTopicsByCategory("Interpreting information and ideas"));
            } else if (selectedTopicButton === "Standard English Conventions") {
                setSelectedTopics(getTopicsByCategory("Standard English conventions"));
            } else if (selectedTopicButton === "Effective Expression & Revision") {
                setSelectedTopics(getTopicsByCategory("Effective expression and revision"));
            }


        } else {
            setSelectedTopics([]);
        }

    }, [selectedTopicButton]);


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
                    subject: activeSubject,
                    starred: starredFilter ? "true" : "",
                });
                setQuestions(data.data);
                setPage(data.currentPage);
                setLastPage(data.lastPage);
                setIsFetching(false);
            } catch (error) {
                console.error('Could not fetch questions:', error);
            }
        }
        setTableLoading(true);
        loadQuestions();

        setTableLoading(false);
    }, [questionsUpdated, page, selectedTopics, selectedDifficulties, selectedAnswerStatuses, selectedAnswerTypes, sortOption, sortDirection, activeSubject, starredFilter]);



    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    return (
        <UserProvider>
            <div className="flex flex-col gap-y-4 p-2">
                {/* Your component code goes here */}
                {/* <div>
                    <h3>Question Bank Database</h3>
                </div> */}

                <div className="flex flex-col gap-y-2">

                    <div className="flex flex-row gap-x-4">
                        {mathTopics.map((topic) => (
                            <Button
                                key={topic}
                                radius="full"
                                size="sm"
                                style={getTopicButtonStyle(topic)}
                                onPress={() => handleTopicButton(topic)}
                            >
                                {topic}
                            </Button>
                        ))}
                    </div>

                    <div className="flex flex-row gap-x-4">
                        {readingTopics.map((topic) => (
                            <Button
                                key={topic}
                                radius="full"
                                size="sm"
                                style={getTopicButtonStyle(topic)}
                                onPress={() => handleTopicButton(topic)}
                            >
                                {topic}
                            </Button>
                        ))}
                    </div>
                </div>


                {/* <QbankTable/> */}
                <div className="relative flex justify-start items-center gap-2">

                    <Select
                        items={difficultiesData}
                        label="Difficulty"
                        variant="bordered"
                        isMultiline={true}
                        selectionMode="multiple"
                        placeholder="Select a difficulty"
                        selectedKeys={selectedDifficultyKeys}
                        onSelectionChange={setSelectedDifficultyKeys}
                        labelPlacement="outside"
                        classNames={{
                            label: "flex items-center w-24",
                        }}
                        renderValue={(items) => {
                            return (
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item) => (
                                        <Chip size="sm" key={item.key} color={item.data.backgroundColor} className="text-white">
                                            {item.data.name}
                                        </Chip>
                                    ))}
                                </div>
                            );
                        }}
                    >
                        {(difficulty) => (
                            <SelectItem key={difficulty.id} textValue={difficulty.name}>
                                <div className={`flex gap-2 items-center text-${difficulty.backgroundColor}`}>
                                    {difficulty.name}
                                </div>
                            </SelectItem>
                        )}
                    </Select>

                    <Select
                        items={statusData}
                        label="Status"
                        variant="bordered"
                        isMultiline={true}
                        selectionMode="multiple"
                        placeholder="Select a status"
                        labelPlacement="outside"
                        selectedKeys={selectedAnswerStatusKeys}
                        onSelectionChange={setSelectedAnswerStatusKeys}
                        classNames={{
                            label: "flex items-center w-24",
                            // base: "max-w-xs",
                            // trigger: "min-h-12 py-2",
                        }}
                        renderValue={(items) => {
                            return (
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item) => (
                                        <Chip size="sm" key={item.key} color={item.data.backgroundColor} className='text-white'>{item.data.name}</Chip>
                                    ))}
                                </div>
                            );
                        }}
                    >
                        {(status) => (
                            <SelectItem key={status.id} textValue={status.name}>
                                <div className={`flex gap-2 items-center text-${status.backgroundColor}`}>
                                    {status.name}
                                </div>
                            </SelectItem>
                        )}
                    </Select>

                    {/* <Input
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
                    /> */}

                    <div className = "w-10">

                    {!starredFilter ? (
                        <svg
                            className='h-[30px] w-[30px] fill-[#1865F2] cursor-pointer'
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 256 256"
                            onClick={() => setStarredFilter(true)}
                        >
                            <path d="M243 96a20.33 20.33 0 0 0-17.74-14l-56.59-4.57l-21.84-52.81a20.36 20.36 0 0 0-37.66 0L87.35 77.44L30.76 82a20.45 20.45 0 0 0-11.66 35.88l43.18 37.24l-13.2 55.7A20.37 20.37 0 0 0 79.57 233L128 203.19L176.43 233a20.39 20.39 0 0 0 30.49-22.15l-13.2-55.7l43.18-37.24A20.43 20.43 0 0 0 243 96m-70.47 45.7a12 12 0 0 0-3.84 11.86L181.58 208l-47.29-29.08a12 12 0 0 0-12.58 0L74.42 208l12.89-54.4a12 12 0 0 0-3.84-11.86l-42.27-36.5l55.4-4.47a12 12 0 0 0 10.13-7.38L128 41.89l21.27 51.5a12 12 0 0 0 10.13 7.38l55.4 4.47Z"></path>
                        </svg>
                    ) : (
                        <svg
                            className='h-[30px] w-[30px] fill-[#1865F2] cursor-pointer'
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 256 256"
                            onClick={() => setStarredFilter(false)}
                        >
                            <path d="m234.29 114.85l-45 38.83L203 211.75a16.4 16.4 0 0 1-24.5 17.82L128 198.49l-50.53 31.08A16.4 16.4 0 0 1 53 211.75l13.76-58.07l-45-38.83A16.46 16.46 0 0 1 31.08 86l59-4.76l22.76-55.08a16.36 16.36 0 0 1 30.27 0l22.75 55.08l59 4.76a16.46 16.46 0 0 1 9.37 28.86Z"></path>
                        </svg>
                    )}
                    </div>

                    <Button color="#AAAAAA" isIconOnly variant="ghost" onPress={handleResetFilters}>
                        <Icon icon="ri:reset-right-fill" width="384" height="384" style={{ color: "#AAAAAA" }} />
                    </Button>
                    {/* 
                    <Button color="#AAAAAA" isIconOnly variant="ghost" >
                        <Icon icon="lets-icons:sort-random" width="384" height="384" style={{ color: "#AAAAAA" }} />
                    </Button> */}



                    {/* <div className="flex col gap-2">
                        <Button color="primary" variant="ghost" onPress={handleSetReviewMode}>Review mode</Button>
                    </div> */}
                </div>
                {tableLoading ? 
                    <div className='w-full h-[200px] flex flex-row justify-center items-center'>
                    <Spinner />
                    <div className='ml-[20px]'>Loading...</div>
                </div> :
                <NewQBankTable questionEngagementCombos={questions} />}
                <Pagination aria-label="table-pagination" total={lastPage} page={page} onChange={(newPage) => setPage(newPage)} showControls color="primary" />

            </div >
        </UserProvider>
    );
}

export default NewQBankViewer;