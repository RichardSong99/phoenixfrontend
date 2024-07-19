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

    const MODEEDIT = "edit";
    const MODENEW = "new";

    const SORTDATEANSWERED = "attemptTime"
    const SORTDATECREATED = "createdTime"
    const SORTDATELASTEDITED = "lastEditedTime"

    const SORTASCENDING = 1;
    const SORTDESCENDING = -1;

    // filter and sort parameters
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [selectedAnswerStatuses, setSelectedAnswerStatuses] = useState([]);
    const [selectedAnswerTypes, setSelectedAnswerTypes] = useState([]); // ["MC", "TF", "FIB", "SA", "ESSAY"]
    const [sortOption, setSortOption] = useState(SORTDATEANSWERED);
    const [sortDirection, setSortDirection] = useState(SORTDESCENDING);

    const handleDeleteQuestion = async (questionId) => {
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

    const handleEditQuestion = async (questionId) => {

        console.log("handleEdit question ID", questionId);

        try {
            const question = await fetchFullQuestionById(questionId);
            setEditQuestion(question);
            onFormOpen();
        } catch (error) {
            console.error('Could not fetch full question:', error);
        }
    }


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
            onFormOpenChange,
            SORTDATEANSWERED,
            SORTDATECREATED,
            SORTDATELASTEDITED,
            SORTASCENDING,
            SORTDESCENDING,
            handleDeleteQuestion,
            handleEditQuestion
            
        }}>
            {children}
        </QuestionContext.Provider>
    );
};