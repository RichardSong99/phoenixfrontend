import React, { createContext, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { fetchEngagementByQuestionID, fetchEngagementByID } from '@/app/helper/apiservices/engagementservice';
import { fetchFullQuestionById } from '../apiservices/questionservice';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questionsUpdated, setQuestionsUpdated] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);
    const [activeViewQuestion, setActiveViewQuestion] = useState(null);
    const [activeViewEngagement, setActiveViewEngagement] = useState(null); // {questionID, userID, userAnswer, userScore, userFeedback, userReported, userReportedReason, userReportedDate, userReportedAction, userReportedActionDate, userReportedActionBy}

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { isOpen: isFormOpen, onOpen: onFormOpen, onOpenChange: onFormOpenChange } = useDisclosure();

    // filter and sort parameters
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [selectedAnswerStatuses, setSelectedAnswerStatuses] = useState([]);
    const [selectedAnswerTypes, setSelectedAnswerTypes] = useState([]); // ["MC", "TF", "FIB", "SA", "ESSAY"]
    const [sortOption, setSortOption] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");

    const MODEEDIT = "edit";
    const MODENEW = "new";


    const viewQuestionModal = async ({ questionId, engagementId = null }) => {

        try {
            const fetchedQuestion = await fetchFullQuestionById(questionId);
            setActiveViewQuestion(fetchedQuestion);

            if (engagementId) {
                try {
                    const fetchedEngagement = await fetchEngagementByID({ engagementID: engagementId });
                    setActiveViewEngagement(fetchedEngagement);
                } catch (error) {
                    setActiveViewEngagement(null);
                }
            } else {
                try {
                    const fetchedEngagement = await fetchEngagementByQuestionID({ questionID: questionId });
                    setActiveViewEngagement(fetchedEngagement);
                } catch (error) {
                    setActiveViewEngagement(null);
                }
            }

        } catch (error) {
            // setActiveViewQuestion(null);
        }
        console.log("activeViewQuestion", activeViewQuestion);
        console.log("activeViewEngagement", activeViewEngagement);

        onOpen();
    }

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
            setSortDirection,
            viewQuestionModal,
            activeViewEngagement,
            MODEEDIT,
            MODENEW,
            isFormOpen,
            onFormOpen,
            onFormOpenChange
            
        }}>
            {children}
        </QuestionContext.Provider>
    );
};