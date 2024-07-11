import React, { createContext, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questionsUpdated, setQuestionsUpdated] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);
    const [activeViewQuestion, setActiveViewQuestion] = useState(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <QuestionContext.Provider value={{ questionsUpdated, setQuestionsUpdated, editQuestion, setEditQuestion, activeViewQuestion, setActiveViewQuestion, isOpen, onOpen, onOpenChange }}>
            {children}
        </QuestionContext.Provider>
    );
};