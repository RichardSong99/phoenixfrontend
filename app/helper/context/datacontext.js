import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './usercontext';

// import { getDataCube } from '../apiservices/datacubeservice';
import { fetchTopicList } from '../apiservices/parameterdataservice';
import { getQuizzesForUser, fetchQuizUnderlyingById,  fetchQuizzesUnderlyingForUser} from '../apiservices/quizservice';
import { fetchTestsUnderlyingForUser } from '../apiservices/testservice';
import { getTopicListSummary } from '../apiservices/dataservice';

// Create a new context
export const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {

    const {isAuthenticated, loginToggle, user} = useUser();


    const [topicSummaryList, setTopicSummaryList] = useState(null);
    const [userData, setUserData] = useState(null);

    const mathTopicMapping = [
        { topic: "Linear equations in 1 variable", category: "Algebra" },
        { topic: "Linear equations in 2 variables", category: "Algebra" },
        { topic: "Linear functions", category: "Algebra" },
        { topic: "Systems of 2 linear equations in 2 variables", category: "Algebra" },
        { topic: "Linear inequalities in 1 or 2 variables", category: "Algebra" },
        { topic: "Equivalent expressions", category: "Advanced math" },
        { topic: "Nonlinear equations in 1 variable", category: "Advanced math" },
        { topic: "System of equations in 2 variables", category: "Advanced math" },
        { topic: "Nonlinear functions", category: "Advanced math" },
        { topic: "Ratios, rates, proportional relationships, and units", category: "Problem solving and data analysis" },
        { topic: "Percentages", category: "Problem solving and data analysis" },
        { topic: "One-variable data: distributions and measures of center and spread", category: "Problem solving and data analysis" },
        { topic: "Two-variable data: models and scatterplots", category: "Problem solving and data analysis" },
        { topic: "Probability and conditional probability", category: "Problem solving and data analysis" },
        { topic: "Inference from sample statistics and margin of error", category: "Problem solving and data analysis" },
        { topic: "Evaluating statistical claims: observational studies and experiments", category: "Problem solving and data analysis" },
        { topic: "Area and volume formulas", category: "Geometry and trigonometry" },
        { topic: "Lines, angles, and triangles", category: "Geometry and trigonometry" },
        { topic: "Right triangles and trigonometry", category: "Geometry and trigonometry" },
        { topic: "Circles", category: "Geometry and trigonometry" }
    ];

    const getTopicsByCategory = (category) => {
        return mathTopicMapping.filter(topicObj => topicObj.category === category).map(topicObj => topicObj.topic);
    }

    const getCategoryList = () => {
        return Array.from(new Set(mathTopicMapping.map(topicObj => topicObj.category)));
    }

    const [loading, setLoading] = useState(true);
    const [quizUnderlyingList, setQuizUnderlyingList] = useState([]);
    const [quizUnderlyingListQuizType, setQuizUnderlyingListQuizType] = useState([]);
    const [testUnderlyingList, setTestUnderlyingList] = useState([]);



    const loadQuizUnderlyingList = async () => {
        try {
            var quizUnderlyingForUserResponse = await fetchQuizzesUnderlyingForUser()
            setQuizUnderlyingList(quizUnderlyingForUserResponse);
            setQuizUnderlyingListQuizType(quizUnderlyingForUserResponse.filter(quizObj => quizObj?.Quiz?.Type === "quiz"));

        } catch (error) {
            console.log("Error fetching quizzes for user", error);
        }
    }

    const loadTestUnderlyingList = async () => {
        try {
            var testUnderlyingForUserResponse = await fetchTestsUnderlyingForUser()
            console.log("testUnderlyingForUserResponse", testUnderlyingForUserResponse)
            setTestUnderlyingList(testUnderlyingForUserResponse);

        } catch (error) {
            console.log("Error fetching quizzes for user", error);
        }
    }

    const loadTopicSummaryList = async () => {
        try {
            const topicListSummaryResponse = await getTopicListSummary(user.id);
            setTopicSummaryList(topicListSummaryResponse);
        } catch (error) {
            console.log("Error fetching topic list summary", error);
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        loadQuizUnderlyingList();
        loadTestUnderlyingList();
        loadTopicSummaryList();
    }, [isAuthenticated]);

    return (
        <DataContext.Provider value={{ loading, quizUnderlyingList, quizUnderlyingListQuizType, testUnderlyingList, userData, topicSummaryList, mathTopicMapping, getTopicsByCategory, getCategoryList }}>
            {children}
        </DataContext.Provider>
    );
};