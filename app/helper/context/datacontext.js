import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './usercontext';

// import { getDataCube } from '../apiservices/datacubeservice';
import { fetchTopicList } from '../apiservices/parameterdataservice';
import { getQuizzesForUser, fetchQuizUnderlyingById,  fetchQuizzesUnderlyingForUser} from '../apiservices/quizservice';
import { fetchTestsUnderlyingForUser } from '../apiservices/testservice';
import { getUserData } from '../apiservices/dataservice';

// Create a new context
export const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {

    const {isAuthenticated, loginToggle, user} = useUser();

    const [globalLoading, setGlobalLoading] = useState(true);


    const [topicSummaryList, setTopicSummaryList] = useState(null);
    const [userData, setUserData] = useState(null);

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
        { topic: "Statistics & probability", category: "Problem solving and data analysis", subject : "Math" },
       
        { topic: "Area and volume formulas", category: "Geometry and trigonometry", subject : "Math" },
        { topic: "Lines, angles, and triangles", category: "Geometry and trigonometry", subject : "Math" },
        { topic: "Right triangles and trigonometry", category: "Geometry and trigonometry", subject : "Math" },
        { topic: "Circles", category: "Geometry and trigonometry", subject : "Math" },
        { topic: "Precise word choice", category: "Rhetorical and structural analysis", subject : "Reading & Writing" },
        { topic: "Understanding structure & purpose", category: "Rhetorical and structural analysis", subject : "Reading & Writing" },
        { topic: "Comparing texts", category: "Rhetorical and structural analysis", subject : "Reading & Writing" },
        { topic: "Main ideas and key details", category: "Interpreting information and ideas", subject : "Reading & Writing" },
        { topic: "Supporting claims with evidence", category: "Interpreting information and ideas", subject : "Reading & Writing" },
        { topic: "Analyzing data in context", category: "Interpreting information and ideas", subject : "Reading & Writing"},
        { topic: "Logical completion", category: "Interpreting information and ideas", subject : "Reading & Writing" },
        { topic: "Sentence boundaries and links", category: "Standard English conventions", subject : "Reading & Writing" },
        { topic: "Grammatical form and function", category: "Standard English conventions", subject : "Reading & Writing" },
        { topic: "Transitions and flow", category: "Effective expression and revision", subject : "Reading & Writing" },
        { topic: "Synthesizing information", category: "Effective expression and revision", subject : "Reading & Writing" },
    ];

    const [loading, setLoading] = useState(true);
    const [quizList, setQuizList] = useState([]);
    const [quizListQuizType, setQuizListQuizType] = useState([]);
    const [testUnderlyingList, setTestUnderlyingList] = useState([]);

    const getTopicsByCategory = (category) => {
        return topicMapping.filter(topicObj => topicObj.category === category).map(topicObj => topicObj.topic);
    }

    const getTopicsBySubject = (subject) => {  
        return topicMapping.filter(topicObj => topicObj.subject === subject).map(topicObj => topicObj.topic);
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

    const filterTopicSummaryListByCategory = ( category) => {
        return topicSummaryList.filter(item => item.category === category);
    }

    const filterTopicSummaryListBySubject = ( subject) => {
        return topicSummaryList.filter(item => item.subject === subject);
    }

    const filterTopicSummaryListBySubjectAll = () => {
        return topicSummaryList.filter(item => item.subject === "Math" || item.subject === "Reading & Writing");
    }

    const getTopicSummaryElement = (topic) => {
        // if(!topicSummaryList){
        //     await loadUserData();
        // }

        console.log("topicSummaryList", topicSummaryList)
        if(topicSummaryList){
            return topicSummaryList.find(item => item.topic === topic);
        }
        return  null;
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

    const getWorstTopics = (subject, count) => {
        const filteredList = topicSummaryList.filter(item => item.subject === subject);
        const sortedList = filteredList.sort((a, b) => a.accuracy - b.accuracy);
        console.log("sortedList", sortedList)

        return sortedList.slice(0, count);
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

    const loadUserData = async () => {
        try {
          const userDataResponse = await getUserData();
          if (userDataResponse?.topic_summary_list) {
            setTopicSummaryList(sortTopicSummaryList(userDataResponse.topic_summary_list));
          } else {
            setTopicSummaryList([]); // Ensure topicSummaryList is always an array
          }
        } catch (error) {
          console.error("Error fetching topic list summary", error);
          setTopicSummaryList([]); // Handle failure gracefully
        }

        setGlobalLoading(false);
      };
    
    useEffect(() => {
        if (!isAuthenticated) {
            console.log("User is not authenticated");
            return;
        }
        loadQuizList();
        // loadTestUnderlyingList();
        loadUserData();
    }, [isAuthenticated, loginToggle, reloadDataToggle]);

    return (
        <DataContext.Provider value={{ loading, quizList, quizListQuizType, testUnderlyingList, userData, topicSummaryList, topicMapping, getTopicsByCategory, getCategoryList, filterTopicSummaryListByCategory, getTopicSummaryElement, filterTopicSummaryListBySubject, filterTopicSummaryListBySubjectAll, getTopicsBySubject, loadUserData, globalLoading, setGlobalLoading, getWorstTopics }}>
            {children}
        </DataContext.Provider>
    );
};