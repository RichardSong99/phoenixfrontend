import React, { createContext, useState, useRef } from 'react';
import { postEngagements } from '@/app/helper/apiservices/engagementservice';
import { useDisclosure } from '@nextui-org/react';
import { fetchEngagementByQuestionID, fetchEngagementByID, updateEngagement, fetchEngagementsByID } from '@/app/helper/apiservices/engagementservice';
import { fetchFullQuestionById } from '../apiservices/questionservice';
import { updateQuizWithQuestionEngagementIDs, initializeQuiz, fetchQuiz } from '../apiservices/quizservice';

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

    //====================================================================================================

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

    //=============================================

    const INDIVIDUALMODE = "individual";
    const QUIZMODE = "quiz";

    const ACTIVEMODE = "active";
    const REVIEWMODE = "review";

    const [quizID, setQuizID] = useState(null);

    const [indquizMode, setIndQuizMode] = useState(INDIVIDUALMODE);
    const [activeReviewMode, setActiveReviewMode] = useState(ACTIVEMODE);

    // Quiz methods and states ==> for active quiz
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [questionIDArray, setQuestionIDArray] = useState([]);
    const [userResponseData, setUserResponseData] = useState({});

    // engagementIDs
    const [engagementIDData, setEngagementIDData] = useState({});

    // initialize as false for all questions
    const [isFlaggedData, setIsFlaggedData] = useState({});
    const [isStarredData, setIsStarredData] = useState({});
    const [wasReviewedData, setWasReviewedData] = useState({});

    // initialize as zero for all questions
    const [timeSpentData, setTimeSpentData] = useState({});
    const [startTime, setStartTime] = useState(Date.now());
    const timerRef = useRef(null);



    const setupActiveIndividualMode = async (questionID) => {
        QEIDCombos = convertToQEIDComboArray([questionID]);

        initializeEngagementStates(QEIDCombos);
    }

    const setupActiveQuizMode = async (questionIDs) => {
        const QEIDCombos = convertToQEIDComboArray(questionIDs);

        // Initialize the quiz, set the quizID ========================================
        try {
            const response = await initializeQuiz({});
            setQuizID(response.quizID);
        } catch (error) {
            console.error('Could not initialize quiz:', error);
        }

        initializeEngagementStates(QEIDCombos);
    }

    const setupReviewIndividualMode = async (questionID, engagementID) => {
        const QEIDCombos = [{ QuestionID: questionID, EngagementID: engagementID }];

        initializeEngagementStates(QEIDCombos);
    }

    const setupReviewQuizMode = async (quizID) => {

        var QEIDCombos = [];
        
        // fetch the quiz 
        try {
            const response = await fetchQuiz({quizID: quizID});
            setQuizID(quizID);
            QEIDCombos = response.QuestionEngagementIDCombos;
        } catch (error) {
            console.error('Could not fetch quiz:', error);
        }
        
        initializeEngagementStates(QEIDCombos);
    }

    const convertToQEIDComboArray = (questionIDs) => {
        return questionIDs.map(questionID => {
            return { QuestionID: questionID, EngagementID: null };
        });
    }

    const initializeEngagementStates = (QEIDCombos) => {
        // ================== Initialize user response, flag status, star status, time spent ==================

        // the QEIDCombos is an array of {QuestionID, EngagementID} objects
        const questionIDs = QEIDCombos.map(QEIDCombo => QEIDCombo.QuestionID);
        setQuestionIDArray(questionIDs);

        // populate the engagementIDData object
        const newEngagementIDData = {};
        QEIDCombos.forEach(QEIDCombo => {
            newEngagementIDData[QEIDCombo.QuestionID] = QEIDCombo.EngagementID;
        });
        setEngagementIDData(newEngagementIDData);

        // for each questionID, the initial user response is null
        const newUserResponseData = {};
        questionIDs.forEach(questionID => {
            // Check if newEngagementIDData and the corresponding entry for questionID exist
            if (newEngagementIDData[questionID] && newEngagementIDData[questionID].UserAnswer) {
                newUserResponseData[questionID] = newEngagementIDData[questionID].UserAnswer;
            } else {
                newUserResponseData[questionID] = null;
            }
        });
        setUserResponseData(newUserResponseData);

        // for each questionID, the initial flag status is false
        const newIsFlaggedData = {};
        questionIDs.forEach(questionID => {
            if(newEngagementIDData[questionID] && newEngagementIDData[questionID].Flagged){
                newIsFlaggedData[questionID] = newEngagementIDData[questionID].Flagged;
            } else {
                newIsFlaggedData[questionID] = false;
            }
        });

        setIsFlaggedData(newIsFlaggedData);

        // for each questionID, the initial star status is false
        const newIsStarredData = {};
        questionIDs.forEach(questionID => {
            if(newEngagementIDData[questionID] && newEngagementIDData[questionID].Starred){
                newIsStarredData[questionID] = newEngagementIDData[questionID].Starred;
            } else {
                newIsStarredData[questionID] = false;
            }
        });

        setIsStarredData(newIsStarredData);

        // for each questionID, the initial review status is false
        const newWasReviewedData = {};
        questionIDs.forEach(questionID => {
            if(newEngagementIDData[questionID] && newEngagementIDData[questionID].Reviewed){
                newWasReviewedData[questionID] = newEngagementIDData[questionID].Reviewed;
            }else{
                newWasReviewedData[questionID] = false;
            }
        });

        setWasReviewedData(newWasReviewedData);

        // for each questionID, the initial time spent is zero
        const newTimeSpentData = {};
        questionIDs.forEach(questionID => {
            if(newEngagementIDData[questionID] && newEngagementIDData[questionID].Duration){
                newTimeSpentData[questionID] = newEngagementIDData[questionID].Duration;
            }else{
                newTimeSpentData[questionID] = 0;
            }
        });

        setTimeSpentData(newTimeSpentData);

        setStartTime(Date.now());
    }

    const handleNextQuestion = () => {
        if (activeQuestionIndex < questionIDArray.length - 1) {
            setActiveQuestionIndex(activeQuestionIndex + 1);
        }
    }

    const handlePreviousQuestion = () => {
        if (activeQuestionIndex > 0) {
            setActiveQuestionIndex(activeQuestionIndex - 1);
        }
    }

    const jumpToQuestion = (index) => {
        if (index >= 0 && index < questionIDArray.length) {
            setActiveQuestionIndex(index);
        }
    }



    const handleFlagQuestion = async ({ questionID, engagementID }) => {
        if (activeReviewMode === ACTIVEMODE) {
            // flip the flag status for the question for which questionID is passed
            const newIsFlaggedData = { ...isFlaggedData };
            newIsFlaggedData[questionID] = !newIsFlaggedData[questionID];
            setIsFlaggedData(newIsFlaggedData);
            return;
        } else if (activeReviewMode === REVIEWMODE) {
            // flip the flag status for the question for which questionID is passed
            const newIsFlaggedData = { ...isFlaggedData };
            newIsFlaggedData[questionID] = !newIsFlaggedData[questionID];
            setIsFlaggedData(newIsFlaggedData);
            // update the engagement with the new flag status
            try {
                await updateEngagement({ engagementID: engagementID, update: { Flagged: newIsFlaggedData[questionID] } });
            } catch (error) {
                console.error('Could not update engagement:', error);
            }
            return;
        }

    }

    const handleStarQuestion = async ({ questionID, engagementID }) => {
        if (activeReviewMode === ACTIVEMODE) {
            // flip the star status for the question for which questionID is passed
            const newIsStarredData = { ...isStarredData };
            newIsStarredData[questionID] = !newIsStarredData[questionID];
            setIsStarredData(newIsStarredData);
            return;
        } else if (activeReviewMode === REVIEWMODE) {
            // flip the star status for the question for which questionID is passed
            const newIsStarredData = { ...isStarredData };
            newIsStarredData[questionID] = !newIsStarredData[questionID];
            setIsStarredData(newIsStarredData);
            // update the engagement with the new star status
            try {
                await updateEngagement({ engagementID: engagementID, update: { Starred: newIsStarredData[questionID] } });
            } catch (error) {
                console.error('Could not update engagement:', error);
            }
            return;
        }
    }

    const handleReportUserResponse = (response, questionID) => {
        if (activeReviewMode === ACTIVEMODE) {
            const newUserResponseData = { ...userResponseData };
            newUserResponseData[questionID] = response;
            setUserResponseData(newUserResponseData);
            return;
        }
    }

    const handleUpdateTimeSpentData = (questionID) => {
        if (activeReviewMode === ACTIVEMODE) {
            const currentTime = Date.now();
            const timeSpent = (currentTime - startTime) / 1000; // in seconds

            const newTimeSpentData = { ...timeSpentData };
            newTimeSpentData[questionID] = timeSpent + timeSpentData[questionID];

            setTimeSpentData(newTimeSpentData);

            setStartTime(currentTime);
            return;
        }
    }

    const handleMarkReviewQuestion = async ({ questionID, engagementID }) => {
        if (activeReviewMode === REVIEWMODE) {

            // flip the review status for the question for which questionID is passed
            const newWasReviewedData = { ...wasReviewedData };
            newWasReviewedData[questionID] = !newWasReviewedData[questionID];
            setWasReviewedData(newWasReviewedData);

            // update the engagement with the new review status
            try {
                await updateEngagement({ engagementID: engagementID, update: { Reviewed: newWasReviewedData[questionID] } });
            } catch (error) {
                console.error('Could not update engagement:', error);
            }
            return;
        }
    }

    const handleSubmitEngagements = async () => {
        if(activeReviewMode === ACTIVEMODE){
            const engagementData = [];
            let questionEngagementIDs = [];

            questionIDArray.forEach(questionID => {
                engagementData.push({
                    QuestionID: questionID,
                    UserAnswer: userResponseData[questionID],
                    Flagged: isFlaggedData[questionID],
                    Starred: isStarredData[questionID],
                    Duration: timeSpentData[questionID],
                });
            });

            try {
                const response = await postEngagements(engagementData);
                questionEngagementIDs = response.questionEngagementIDs;

                if (indquizMode === QUIZMODE) {
                    await updateQuizWithQuestionEngagementIDs(quizID, questionEngagementIDs);
                }

            } catch (error) {
                console.error('Could not submit engagements:', error);
            }
        }
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
            handleEditQuestion,

            // Quiz states and methods
            quizID, 
            indquizMode,
            activeReviewMode,
            activeQuestionIndex,
            questionIDArray,
            userResponseData,
            engagementIDData,
            isFlaggedData,
            isStarredData,
            wasReviewedData,
            timeSpentData,
            startTime,
            setupActiveIndividualMode,
            setupActiveQuizMode,
            setupReviewIndividualMode,
            setupReviewQuizMode,
            handleNextQuestion,
            handlePreviousQuestion,
            jumpToQuestion,
            handleFlagQuestion,
            handleStarQuestion,
            handleReportUserResponse,
            handleUpdateTimeSpentData,
            handleMarkReviewQuestion,
            handleSubmitEngagements,

        }}>
            {children}
        </QuestionContext.Provider>
    );
};