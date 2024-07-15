import React, { createContext, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questionsUpdated, setQuestionsUpdated] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);
    const [activeViewQuestion, setActiveViewQuestion] = useState(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // filter and sort parameters
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [selectedAnswerStatuses, setSelectedAnswerStatuses] = useState([]);
    const [selectedAnswerTypes, setSelectedAnswerTypes] = useState([]); // ["MC", "TF", "FIB", "SA", "ESSAY"]
    const [sortOption, setSortOption] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");

    return (
        <QuestionContext.Provider value={{ 
            questionsUpdated, 
            setQuestionsUpdated, 
            editQuestion, 
            setEditQuestion, 
            activeViewQuestion, 
            setActiveViewQuestion, 
            isOpen, 
            onOpen, 
            onOpenChange,
            selectedTopics,
            setSelectedTopics,
            selectedDifficulties,
            setSelectedDifficulties,
            selectedAnswerStatuses,
            setSelectedAnswerStatuses,
            selectedAnswerTypes,
            setSelectedAnswerTypes,
            sortOption,
            setSortOption,
            sortDirection,
            setSortDirection
            }}>
            {children}
        </QuestionContext.Provider>
    );
};