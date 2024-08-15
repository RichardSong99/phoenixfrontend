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

    const [algebraGraphData, setAlgebraGraphData] = useState(null);
    const [advancedMathGraphData, setAdvancedMathGraphData] = useState(null);
    const [problemSolvingData, setProblemSolvingData] = useState(null);
    const [geometryTrigonometryData, setGeometryTrigonometryData] = useState(null);

    const [reloadDataToggle, setReloadDataToggle] = useState(false);

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

    const [loading, setLoading] = useState(true);
    const [quizList, setQuizList] = useState([]);
    const [quizListQuizType, setQuizListQuizType] = useState([]);
    const [testUnderlyingList, setTestUnderlyingList] = useState([]);

    const getTopicsByCategory = (category) => {
        return mathTopicMapping.filter(topicObj => topicObj.category === category).map(topicObj => topicObj.topic);
    }

    const getCategoryList = () => {
        return Array.from(new Set(mathTopicMapping.map(topicObj => topicObj.category)));
    }

        // Create a lookup map for topic order
    const topicOrderLookup = mathTopicMapping.reduce((acc, item, index) => {
        acc[item.topic] = index;
        return acc;
    }, {});

    const sortTopicSummaryList = (list) => {
        return list.sort((a, b) => topicOrderLookup[a.topic] - topicOrderLookup[b.topic]);
    }

    const filterTopicSummaryList = ( category) => {
        return topicSummaryList.filter(item => item.category === category);
    }

    const getTopicSummaryElement = (topic) => {
        return topicSummaryList.find(item => item.topic === topic);
    }

    const loadQuizList = async () => {
        try {
            var response = await getQuizzesForUser()
            setQuizList(response);
            setQuizListQuizType(response.filter(quizObj => quizObj?.type === "quiz"));

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
            const topicListSummaryResponse = await getTopicListSummary();
            setTopicSummaryList(sortTopicSummaryList(topicListSummaryResponse));



        } catch (error) {
            console.log("Error fetching topic list summary", error);
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("User is not authenticated");
            return;
        }
        loadQuizList();
        // loadTestUnderlyingList();
        loadTopicSummaryList();
    }, [isAuthenticated, loginToggle, reloadDataToggle]);

    return (
        <DataContext.Provider value={{ loading, quizList, quizListQuizType, testUnderlyingList, userData, topicSummaryList, mathTopicMapping, getTopicsByCategory, getCategoryList, filterTopicSummaryList, getTopicSummaryElement }}>
            {children}
        </DataContext.Provider>
    );
};