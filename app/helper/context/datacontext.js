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

    const topicMapping = [
        { topic: "Linear equations in 1 variable", category: "Algebra", subject : "Math" },
        { topic: "Linear equations in 2 variables", category: "Algebra" , subject : "Math"},
        { topic: "Linear functions", category: "Algebra", subject : "Math" },
        { topic: "Systems of 2 linear equations in 2 variables", category: "Algebra" , subject : "Math"},
        { topic: "Linear inequalities in 1 or 2 variables", category: "Algebra" , subject : "Math"},
        { topic: "Equivalent expressions", category: "Advanced math" , subject : "Math"},
        { topic: "Nonlinear equations in 1 variable", category: "Advanced math" , subject : "Math"},
        { topic: "System of equations in 2 variables", category: "Advanced math", subject : "Math" },
        { topic: "Nonlinear functions", category: "Advanced math", subject : "Math" },
        { topic: "Ratios, rates, proportional relationships, and units", category: "Problem solving and data analysis", subject : "Math"},
        { topic: "Percentages", category: "Problem solving and data analysis", subject : "Math" },
        { topic: "One-variable data: distributions and measures of center and spread", category: "Problem solving and data analysis", subject : "Math" },
        { topic: "Two-variable data: models and scatterplots", category: "Problem solving and data analysis" , subject : "Math"},
        { topic: "Probability and conditional probability", category: "Problem solving and data analysis", subject : "Math" },
        { topic: "Inference from sample statistics and margin of error", category: "Problem solving and data analysis", subject : "Math" },
        { topic: "Evaluating statistical claims: observational studies and experiments", category: "Problem solving and data analysis", subject : "Math" },
        { topic: "Area and volume formulas", category: "Geometry and trigonometry", subject : "Math" },
        { topic: "Lines, angles, and triangles", category: "Geometry and trigonometry", subject : "Math" },
        { topic: "Right triangles and trigonometry", category: "Geometry and trigonometry", subject : "Math" },
        { topic: "Circles", category: "Geometry and trigonometry", subject : "Math" },
        { topic: "Main purpose", category: "Information and ideas", subject: "Reading & Writing"},
        { topic: "Main idea", category: "Information and ideas", subject: "Reading & Writing"},
        { topic: "Most likely response", category: "Information and ideas", subject: "Reading & Writing"},
        { topic: "Based on the text", category: "Information and ideas", subject: "Reading & Writing"},
        { topic: "Support or weaken statement", category: "Information and ideas", subject: "Reading & Writing"},
        { topic: "Best illustrates the claim", category: "Information and ideas", subject: "Reading & Writing"},
        { topic: "Relevant information from the notes", category: "Information and ideas", subject: "Reading & Writing"},
        { topic: "Data from graphic", category: "Information and ideas", subject: "Reading & Writing"},
        { topic: "Logically completes text", category: "Craft and structure", subject: "Reading & Writing"},
        { topic: "Function of the sentence", category: "Craft and structure", subject: "Reading & Writing"},
        { topic: "Overall structure of the text", category: "Craft and structure", subject: "Reading & Writing"},
        { topic: "Subject-verb agreement", category: "Standard English conventions", subject: "Reading & Writing"},
        { topic: "Pronoun-antecedent agreement", category: "Standard English conventions", subject: "Reading & Writing"},
        { topic: "Plurals and possessives", category: "Standard English conventions", subject: "Reading & Writing"},
        { topic: "Verb forms", category: "Standard English conventions", subject: "Reading & Writing"},
        { topic: "Subject-modifier placement", category: "Standard English conventions", subject: "Reading & Writing"},
        { topic: "Linking clauses", category: "Standard English conventions", subject: "Reading & Writing"},
        { topic: "Punctuation", category: "Standard English conventions", subject: "Reading & Writing"},
        { topic: "Other conventions", category: "Standard English conventions", subject: "Reading & Writing"},
    ];

    const [loading, setLoading] = useState(true);
    const [quizList, setQuizList] = useState([]);
    const [quizListQuizType, setQuizListQuizType] = useState([]);
    const [testUnderlyingList, setTestUnderlyingList] = useState([]);

    const getTopicsByCategory = (category) => {
        return topicMapping.filter(topicObj => topicObj.category === category).map(topicObj => topicObj.topic);
    }

    const getCategoryList = (subject) => {
        if (subject) {
            return Array.from(new Set(topicMapping.filter(topicObj => topicObj.subject === subject).map(topicObj => topicObj.category)));
        }
        return Array.from(new Set(topicMapping.map(topicObj => topicObj.category)));
    }

        // Create a lookup map for topic order
    const topicOrderLookup = topicMapping.reduce((acc, item, index) => {
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
        <DataContext.Provider value={{ loading, quizList, quizListQuizType, testUnderlyingList, userData, topicSummaryList, topicMapping, getTopicsByCategory, getCategoryList, filterTopicSummaryList, getTopicSummaryElement }}>
            {children}
        </DataContext.Provider>
    );
};