import React, { createContext, useState } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questionsUpdated, setQuestionsUpdated] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);

    return (
        <QuestionContext.Provider value={{ questionsUpdated, setQuestionsUpdated, editQuestion, setEditQuestion }}>
            {children}
        </QuestionContext.Provider>
    );
};