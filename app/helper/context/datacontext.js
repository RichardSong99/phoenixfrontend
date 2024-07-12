import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './usercontext';

import { getDataCube } from '../apiservices/datacubeservice';
import { fetchTopicList } from '../apiservices/parameterdataservice';
import { getQuizzesForUser, fetchQuizUnderlyingById,  fetchQuizzesUnderlyingForUser} from '../apiservices/quizservice';
import { fetchTestsUnderlyingForUser } from '../apiservices/testservice';

// Create a new context
export const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [datacube, setDatacube] = useState(null);
    const [mathTopics, setMathTopics] = useState([]);
    const [readingTopics, setReadingTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizUnderlyingList, setQuizUnderlyingList] = useState([]);
    const [quizUnderlyingListQuizType, setQuizUnderlyingListQuizType] = useState([]);
    const [testUnderlyingList, setTestUnderlyingList] = useState([]);

    const {isAuthenticated} = useUser();

    const fetchDataCube = async () => {
        try {
            const data = await getDataCube({compute:true});
            setDatacube(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const initializeTopicList = async () => {
        try {
            const mathTopics = await fetchTopicList({subject: 'math'});
            const readingTopics = await fetchTopicList({subject:'reading'});
            setMathTopics(mathTopics);
            setReadingTopics(readingTopics);
        } catch (err) {
            setError(err.message);
        }
    };

    const loadQuizUnderlyingList = async () => {
        try {
            // let response = await getQuizzesForUser();
            // let quizIds = response.filter(quiz => quiz.Type === "quiz").map(quiz => quiz.id);
            // let quizData = await Promise.all(quizIds.map(quizID => fetchQuizUnderlyingById({ quizID: quizID })));
            // setQuizUnderlyingList(quizData);
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


    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        fetchDataCube();
        initializeTopicList();
        loadQuizUnderlyingList();
        loadTestUnderlyingList();
    }, [isAuthenticated]);

    // useEffect(() => {
    //     if (datacube && mathTopics.length > 0 && readingTopics.length > 0) {
    //         console.log(readingTopics, "readingTopics");
    //         setLoading(false);
    //     }
    // }, [datacube, mathTopics, readingTopics]);

  

    const getTopicList = (subject = 'math') => {
        if (subject === 'math') {
            return mathTopics;
        } else {
            return readingTopics;
        }
    };

    return (
        <DataContext.Provider value={{ loading, datacube, getTopicList, error, quizUnderlyingList, refetch: fetchDataCube, quizUnderlyingListQuizType, testUnderlyingList }}>
            {children}
        </DataContext.Provider>
    );
};