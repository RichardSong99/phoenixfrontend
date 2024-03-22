import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './usercontext';

import { getDataCube } from '../services/datacubeservice';
import { fetchTopicList } from '../services/parameterdataservice';

// Create a new context
export const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [datacube, setDatacube] = useState(null);
    const [mathTopics, setMathTopics] = useState([]);
    const [readingTopics, setReadingTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchDataCube();
        initializeTopicList();
    }, [isAuthenticated]);

    useEffect(() => {
        if (datacube && mathTopics.length > 0 && readingTopics.length > 0) {
            console.log(readingTopics, "readingTopics");
            setLoading(false);
        }
    }, [datacube, mathTopics, readingTopics]);

  

    const getTopicList = (subject = 'math') => {
        if (subject === 'math') {
            return mathTopics;
        } else {
            return readingTopics;
        }
    };

    return (
        <DataContext.Provider value={{ loading, datacube, getTopicList, error, refetch: fetchDataCube }}>
            {children}
        </DataContext.Provider>
    );
};