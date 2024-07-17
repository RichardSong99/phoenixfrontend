// PageContent.js
import React from 'react';
import { QuestionGridLayout, QuestionTableLayout } from './questionlayout';
import { StandardButton } from '@/app/_archive/buttons/mybuttons';

const PageContent = ({ questions, currentPage, lastPage, handleOpenModal, userTier, displayMode }) => {
    return (
        <>
            {displayMode === 'grid' ? (
                <QuestionGridLayout questions={questions} />
            ) : (
                <QuestionTableLayout questions={questions} />
            )}


        </>
    );
};

export default PageContent;