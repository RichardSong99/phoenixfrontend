import React, { createContext, useState, useRef, useEffect } from "react";
import { postEngagements } from "@/app/helper/apiservices/engagementservice";
import { useDisclosure } from "@nextui-org/react";
import {
    fetchEngagementByQuestionID,
    fetchEngagementByID,
    updateEngagement,
    fetchEngagementsByID,
} from "@/app/helper/apiservices/engagementservice";
import { fetchFullQuestionById, fetchQuestionsById, getAdaptiveQuestion } from "../apiservices/questionservice";
import {
    updateQuizWithQuestionEngagementIDs,
    initializeQuiz,
    fetchQuiz,
} from "../apiservices/quizservice";
import { getResult } from "../data/questionhelpers";
import { create } from "@mui/material/styles/createTransitions";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questionsUpdated, setQuestionsUpdated] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);
    const [activeViewQuestion, setActiveViewQuestion] = useState(null);
    const [activeViewEngagement, setActiveViewEngagement] = useState(null); // {questionID, userID, userAnswer, userScore, userFeedback, userReported, userReportedReason, userReportedDate, userReportedAction, userReportedActionDate, userReportedActionBy}

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {
        isOpen: isFormOpen,
        onOpen: onFormOpen,
        onOpenChange: onFormOpenChange,
    } = useDisclosure();

    const MODEEDIT = "edit";
    const MODENEW = "new";

    const SORTDATEANSWERED = "attemptTime";
    const SORTDATECREATED = "createdTime";
    const SORTDATELASTEDITED = "lastEditedTime";

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
        if (window.confirm("Are you sure you want to delete this question?")) {
            // Your delete logic goes here
            try {
                await deleteQuestionService(questionId);
                setQuestionsUpdated(!questionsUpdated);
            } catch (error) {
                console.error("Could not delete question:", error);
            }
        }
    };

    const handleEditQuestion = async (questionId) => {
        console.log("handleEdit question ID", questionId);

        try {
            const question = await fetchFullQuestionById(questionId);
            setEditQuestion(question);
            onFormOpen();
        } catch (error) {
            console.error("Could not fetch full question:", error);
        }
    };

    const viewQuestionModal = async ({ questionId = null, engagementId = null }) => {
        if (questionId) {
            if (engagementId) {
                setupReviewIndividualMode(questionId, engagementId);
            } else {
                setupActiveIndividualMode(questionId);
            }

            onOpen();
        }
    };


    //=============================================

    const INDIVIDUALMODE = "individual";
    const QUIZMODE = "quiz";

    const ACTIVEMODE = "active";
    const REVIEWMODE = "review";
    const ADAPTIVEMODE = "adaptive";
    const REGULARMODE = "regular";

    const [quizID, setQuizID] = useState(null);

    const [indquizMode, setIndQuizMode] = useState(INDIVIDUALMODE);
    const [activeReviewMode, setActiveReviewMode] = useState(null);
    const [adaptiveRegularMode, setAdaptiveRegularMode] = useState(null);

    // Quiz methods and states ==> for active quiz
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [adaptiveQuestionIndex, setAdaptiveQuestionIndex] = useState(0);
    const [questionIDArray, setQuestionIDArray] = useState([]);
    const [questionData, setQuestionData] = useState({});

    useEffect(() => {
        setActiveQuestionIndex(adaptiveQuestionIndex);
    }, [adaptiveQuestionIndex]);

    const [userResponseData, setUserResponseData] = useState({});

    // engagementIDs
    const [engagementIDData, setEngagementIDData] = useState({});
    const [engagementData, setEngagementData] = useState({});

    // initialize as false for all questions
    const [isFlaggedData, setIsFlaggedData] = useState({});
    const [isStarredData, setIsStarredData] = useState({});
    const [wasReviewedData, setWasReviewedData] = useState({});

    // initialize as zero for all questions
    const [timeSpentData, setTimeSpentData] = useState({});
    const [startTime, setStartTime] = useState(Date.now());
    const timerRef = useRef(null);

    // new questionview components
    const [continueTimer, setContinueTimer] = useState(true);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [currentSeconds, setCurrentSeconds] = useState(0);

    const changeTimer = () => {
        setContinueTimer(!continueTimer);
    }

    const setupActiveIndividualMode = async (questionID) => {
        resetAllVars();
        const QEIDCombos = convertToQEIDComboArray([questionID]);

        setActiveReviewMode(ACTIVEMODE);
        setIndQuizMode(INDIVIDUALMODE);

        initializeEngagementStates(QEIDCombos);
    };

    const resetAllVars = () => {
        setQuizID(null);
        setQuestionIDArray([]);
        setQuestionData({});
        setUserResponseData({});
        setEngagementIDData({});
        setEngagementData({});
        setIsFlaggedData({});
        setIsStarredData({});
        setWasReviewedData({});
        setTimeSpentData({});
        setStartTime(Date.now());
    }

    const createQuiz = async () => {
        resetAllVars();
        const exampleQuestionIDs = ["65bae13d08992ac645d86bc6", "65bae26b08992ac645d86bc7", "65bb0c5c08992ac645d86bcf", "65bb137608992ac645d86bd5", "65bb16e208992ac645d86bd6"];
        const response = await initializeQuiz({ questionIDs: exampleQuestionIDs, quizType : "quiz" });
        setupActiveQuizMode(response.quizID);
        console.log("quizID initialized", response.quizID);
        return response.quizID;
    };

    const setupActiveQuizMode = async (quizID) => {
        resetAllVars();
        var QEIDCombos = [];

        // fetch the quiz
        try {
            const response = await fetchQuiz({ quizID: quizID });
            console.log("response", response.question_engagement_id_combos);
            setQuizID(quizID);
            QEIDCombos = response.question_engagement_id_combos;
        } catch (error) {
            console.error("Could not fetch quiz:", error);
        }

        setActiveReviewMode(ACTIVEMODE);
        setIndQuizMode(QUIZMODE);

        initializeEngagementStates(QEIDCombos);
    };

    const setupReviewIndividualMode = async (questionID, engagementID) => {
        resetAllVars();
        const QEIDCombos = [{ question_id: questionID, engagement_id: engagementID }];

        setActiveReviewMode(REVIEWMODE);
        setIndQuizMode(INDIVIDUALMODE);

        initializeEngagementStates(QEIDCombos);
    };

    const createAdaptiveQuiz = async () => {
        resetAllVars();
        var quizID = null;
        try{
            const data = await getAdaptiveQuestion({
                selectedTopics: selectedTopics,
                selectedDifficulties: selectedDifficulties,
                selectedAnswerStatuses: selectedAnswerStatuses,
                selectedAnswerTypes: selectedAnswerTypes,
            });
            const first_question_array = [data.data[0].Question.id];
            const response = await initializeQuiz({ questionIDs: first_question_array, quizType : "quiz" });
            setupAdaptiveQuizMode(response.quizID);
            quizID = response.quizID;
        } catch (error) {
            console.error("Could not start adaptive quiz:", error);
        }

        return quizID;
    };

    const setupAdaptiveQuizMode = async (quizID) => {
        resetAllVars();
        var QEIDCombos = [];

        try {
            const response = await fetchQuiz({ quizID: quizID });
            console.log("response", response.question_engagement_id_combos);
            setQuizID(quizID);
            QEIDCombos = response.question_engagement_id_combos;
        } catch (error) {
            console.error("Could not start adaptive quiz:", error);
        }

        setActiveReviewMode(ACTIVEMODE);
        setAdaptiveRegularMode(ADAPTIVEMODE);

        initializeEngagementStates(QEIDCombos);
    };

    const handleAdaptiveSubmit = async () => {
        let engagementsArray = [];
        let questionEngagementID = [];
        const result = getResult({question: questionData[questionIDArray[adaptiveQuestionIndex]], userResponse: userResponseData[questionIDArray[adaptiveQuestionIndex]]});
        const difficulty = questionData[questionIDArray[adaptiveQuestionIndex]].difficulty;
        const difficultyArray = [difficulty];
        console.log("user response", userResponseData);
        console.log("current difficulty", difficulty);
        engagementsArray.push({
            question_id: questionIDArray[adaptiveQuestionIndex],
            user_answer: userResponseData[questionIDArray[adaptiveQuestionIndex]],
            status: result, 
            flagged: isFlaggedData[questionIDArray[adaptiveQuestionIndex]],
            starred: isStarredData[questionIDArray[adaptiveQuestionIndex]],
            duration: timeSpentData[questionIDArray[adaptiveQuestionIndex]],
        });
        console.log("engagementsArray", engagementsArray);
        try {
            const response = await postEngagements(engagementsArray);
            questionEngagementID = response.question_engagement_ids;

            if (adaptiveRegularMode === ADAPTIVEMODE) {
                await updateQuizWithQuestionEngagementIDs(
                    quizID,
                    questionEngagementID
                );
            }
        } catch (error) {
            console.error("Could not submit engagements:", error);
        }

        resetAllVars();
        let numCorrect = 0;
        let numIncorrect = 0;
        if(result == "correct"){
            numCorrect = 1;
        } else{
            numIncorrect = 1;
        }
        let next_question = null;
        try {
            next_question = await getAdaptiveQuestion({
                selectedTopics: selectedTopics,
                selectedDifficulties: difficultyArray,
                selectedAnswerStatuses: selectedAnswerStatuses,
                selectedAnswerTypes: selectedAnswerTypes,
                numIncorrect: numIncorrect,
                numCorrect: numCorrect,
            });
        } catch (error) {
            console.error("Could not add to adaptive quiz:", error);
        }

        const QEIDCombo = [{ question_id: next_question.data[0].Question.id, engagement_id: null }];

        try {
            await updateQuizWithQuestionEngagementIDs(quizID, QEIDCombo);
        } catch (error) {
            console.error("Could not update quiz with next question:", error);
        }

        try {
            await setupAdaptiveQuizMode(quizID);
        } catch (error) {
            console.error("Could not refetch the quiz:", error);
        }

        setAdaptiveQuestionIndex(adaptiveQuestionIndex + 1);

        return next_question.data[0].Question.id;
    };

    const setupReviewQuizMode = async (quizID) => {
        resetAllVars();
        var QEIDCombos = [];

        // fetch the quiz
        try {
            const response = await fetchQuiz({ quizID: quizID });
            setQuizID(quizID);
            QEIDCombos = response.question_engagement_id_combos;
        } catch (error) {
            console.error("Could not fetch quiz:", error);
        }

        setActiveReviewMode(REVIEWMODE);
        setIndQuizMode(QUIZMODE);

        initializeEngagementStates(QEIDCombos);
    };

    const convertToQEIDComboArray = (questionIDs) => {
        return questionIDs.map((questionID) => {
            return { question_id: questionID, EngagementID: null };
        });
    };

    const initializeEngagementStates = async (QEIDCombos) => {
        // ================== Initialize user response, flag status, star status, time spent ==================
        console.log("QEIDCombos", QEIDCombos);
        // the QEIDCombos is an array of {QuestionID, EngagementID} objects
        // const questionIDs = QEIDCombos.map((QEIDCombo) => QEIDCombo.question_id);
        var questionIDs = [];
        for (let i = 0; i < QEIDCombos.length; i++) {
            const QEIDCombo = QEIDCombos[i];
            console.log("Processing QEIDCombo:", QEIDCombo);
            questionIDs.push(QEIDCombo.question_id);
        }
        setQuestionIDArray(questionIDs);
        console.log("ids", questionIDs);
        // fetch the questions for the questionIDs, then populate the questionData object
        const newQuestionData = {};
        try {
            const response = await fetchQuestionsById({ questionIdList: questionIDs });
            response.forEach((question) => {
                newQuestionData[question.id] = question;
            });
        } catch (error) {
            console.error("Could not fetch questions by ID:", error);
        }
        setQuestionData(newQuestionData);

        // populate the engagementIDData object
        const newEngagementIDData = {};
        QEIDCombos.forEach((QEIDCombo) => {
            newEngagementIDData[QEIDCombo.question_id] = QEIDCombo.engagement_id;
        });
        setEngagementIDData(newEngagementIDData);
        console.log(newEngagementIDData);

        // fetch the engagements for the questionIDs, if they exist
        const newEngagementData = {};
        // loop through the engagementIDData and fetch the engagements, if they exist
        for (const questionID in newEngagementIDData) {
            if (newEngagementIDData[questionID]) {
                try {
                    const response = await fetchEngagementByID({
                        engagementID: newEngagementIDData[questionID],
                    });
                    newEngagementData[questionID] = response;
                } catch (error) {
                    console.error("Could not fetch engagement by ID:", error);
                }
            }
        }

        setEngagementData(newEngagementData);

        console.log("newEngagementData", newEngagementData);
        // for each questionID, the initial user response is null
        const newUserResponseData = {};
        questionIDs.forEach((questionID) => {
            // Check if newEngagementIDData and the corresponding entry for questionID exist
            if (
                newEngagementData[questionID] && newEngagementData[questionID].user_answer
            ) {
                newUserResponseData[questionID] = newEngagementData[questionID].user_answer;
            } else {
                newUserResponseData[questionID] = null;
            }
        });
        setUserResponseData(newUserResponseData);

        // for each questionID, the initial flag status is false
        const newIsFlaggedData = {};
        questionIDs.forEach((questionID) => {
            if (
                newEngagementData[questionID] &&
                newEngagementData[questionID].flagged
            ) {
                newIsFlaggedData[questionID] = newEngagementData[questionID].flagged;
            } else {
                newIsFlaggedData[questionID] = false;
            }
        });

        setIsFlaggedData(newIsFlaggedData);

        // for each questionID, the initial star status is false
        const newIsStarredData = {};
        questionIDs.forEach((questionID) => {
            if (
                newEngagementData[questionID] &&
                newEngagementData[questionID].starred
            ) {
                newIsStarredData[questionID] = newEngagementData[questionID].starred;
            } else {
                newIsStarredData[questionID] = false;
            }
        });

        setIsStarredData(newIsStarredData);

        // for each questionID, the initial review status is false
        const newWasReviewedData = {};
        questionIDs.forEach((questionID) => {
            if (
                newEngagementData[questionID] && newEngagementData[questionID].reviewed
            ) {
                newWasReviewedData[questionID] = newEngagementData[questionID].reviewed;
            } else {
                newWasReviewedData[questionID] = false;
            }
        });

        setWasReviewedData(newWasReviewedData);

        // for each questionID, the initial time spent is zero
        const newTimeSpentData = {};
        questionIDs.forEach((questionID) => {
            if (newEngagementData[questionID] && newEngagementData[questionID].duration) {
                newTimeSpentData[questionID] = newEngagementData[questionID].duration;
            } else {
                newTimeSpentData[questionID] = 0;
            }
        });

        setTimeSpentData(newTimeSpentData);

        setStartTime(Date.now());
        console.log("engagementData", newEngagementIDData);
    };

    const handleNextQuestion = () => {
        if (activeQuestionIndex < questionIDArray.length - 1) {
            setActiveQuestionIndex(activeQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (activeQuestionIndex > 0) {
            setActiveQuestionIndex(activeQuestionIndex - 1);
        }
    };

    const jumpToQuestion = (index) => {
        // console.log("jumping to question", index);
        // if (index >= 0 && index < questionIDArray.length) {
        //     console.log("jumping to question inside if", index);
        //     setActiveQuestionIndex(index);
        // }
        setActiveQuestionIndex(index);
    };

    const handleFlagQuestion = async (questionID) => {
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
                await updateEngagement({
                    engagementID: engagementIDData[questionID],
                    update: { flagged: newIsFlaggedData[questionID] },
                });
            } catch (error) {
                console.error("Could not update engagement:", error);
            }
            return;
        }
    };

    const handleStarQuestion = async (questionID) => {
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
                await updateEngagement({
                    engagementID: engagementIDData[questionID],
                    update: { starred: newIsStarredData[questionID] },
                });
            } catch (error) {
                console.error("Could not update engagement:", error);
            }
            return;
        }
    };

    const handleReportUserResponse = (response, questionID) => {
        if (activeReviewMode === ACTIVEMODE) {
            const newUserResponseData = { ...userResponseData };
            newUserResponseData[questionID] = response;
            setUserResponseData(newUserResponseData);
            return;
        }
    };

    const handleUpdateTimeSpentData = (questionID) => {
        if (activeReviewMode === ACTIVEMODE) {
            // const currentTime = Date.now();
            // const timeSpent = (currentTime - startTime) / 1000; // in seconds

            const newTimeSpentData = { ...timeSpentData };
            newTimeSpentData[questionID] = currentSeconds + timeSpentData[questionID];

            setTimeSpentData(newTimeSpentData);

            // setStartTime(currentTime);
            return;
        }
    };

    const prevActiveQuestionIndexRef = useRef();

    useEffect(() => {
        // This will run after activeQuestionIndex has changed
        if (prevActiveQuestionIndexRef.current !== undefined) {
            handleUpdateTimeSpentData(questionIDArray[prevActiveQuestionIndexRef.current]);
        }

        // Update the ref with the current activeQuestionIndex
        prevActiveQuestionIndexRef.current = activeQuestionIndex;
        setCurrentSeconds(timeSpentData[questionIDArray[activeQuestionIndex]] || 0);
    }, [activeQuestionIndex]);

    const updateTotalTimer = () => {
        if (activeReviewMode === ACTIVEMODE && continueTimer) {
            const interval = setInterval(() => {
                setTotalSeconds(prevSeconds => prevSeconds + 1);
                setCurrentSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
    
            return interval;
        }
        return null;
    };

    const handleMarkReviewQuestion = async (questionID) => {
        if (activeReviewMode === REVIEWMODE) {
            // flip the review status for the question for which questionID is passed
            const newWasReviewedData = { ...wasReviewedData };
            newWasReviewedData[questionID] = !newWasReviewedData[questionID];
            setWasReviewedData(newWasReviewedData);

            // update the engagement with the new review status
            try {
                await updateEngagement({
                    engagementID: engagementIDData[questionID],
                    update: { reviewed: newWasReviewedData[questionID] },
                });
            } catch (error) {
                console.error("Could not update engagement:", error);
            }
            return;
        }
    };

    const handleSubmitEngagements = async () => {
        if (activeReviewMode === ACTIVEMODE) {
            let engagementsArray = [];
            let questionEngagementIDs = [];
            questionIDArray.forEach((questionID) => {
                engagementsArray.push({
                    question_id: questionID,
                    user_answer: userResponseData[questionID],
                    status: getResult({question: questionData[questionID], userResponse: userResponseData[questionID]}), 
                    flagged: isFlaggedData[questionID],
                    starred: isStarredData[questionID],
                    duration: timeSpentData[questionID],
                });
            });
            console.log("engagementsArray", engagementsArray);
            try {
                const response = await postEngagements(engagementsArray);
                questionEngagementIDs = response.question_engagement_ids;

                if (indquizMode === QUIZMODE) {
                    await updateQuizWithQuestionEngagementIDs(
                        quizID,
                        questionEngagementIDs
                    );
                }
            } catch (error) {
                console.error("Could not submit engagements:", error);
            }

            setTotalSeconds(0);
        }
    };

    const handleSubmitSingleEngagement = async () => {
        if (activeReviewMode === ACTIVEMODE) {
            let engagementsArray = [];
            let questionEngagementID = [];
            engagementsArray.push({
                question_id: questionIDArray[activeQuestionIndex],
                user_answer: userResponseData[activeQuestionIndex],
                status: getResult({question: questionData[questionIDArray[activeQuestionIndex]], userResponse: userResponseData[questionIDArray[activeQuestionIndex]]}), 
                flagged: isFlaggedData[questionIDArray[activeQuestionIndex]],
                starred: isStarredData[questionIDArray[activeQuestionIndex]],
                duration: timeSpentData[questionIDArray[activeQuestionIndex]],
            });
            console.log("engagementsArray", engagementsArray);
            try {
                const response = await postEngagements(engagementsArray);
                questionEngagementID = response.question_engagement_ids;

                if (indquizMode === QUIZMODE) {
                    await updateQuizWithQuestionEngagementIDs(
                        quizID,
                        questionEngagementID
                    );
                }
            } catch (error) {
                console.error("Could not submit engagements:", error);
            }
        }
    };

    return (
        <QuestionContext.Provider
            value={{
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
                questionData,
                userResponseData,
                engagementIDData,
                engagementData,
                isFlaggedData,
                isStarredData,
                wasReviewedData,
                timeSpentData,
                startTime,
                continueTimer,
                totalSeconds,
                currentSeconds,
                adaptiveRegularMode,
                adaptiveQuestionIndex,
                createAdaptiveQuiz,
                setupAdaptiveQuizMode,
                handleAdaptiveSubmit,
                createQuiz,
                resetAllVars,
                changeTimer,
                updateTotalTimer,
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
                handleSubmitSingleEngagement,
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};
