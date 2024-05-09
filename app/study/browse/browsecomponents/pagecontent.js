// PageContent.js
import React from 'react';
import styles from './practice.module.css';
import { QuestionGridLayout, QuestionTableLayout } from './questionlayout';
import { StandardButton } from '@/app/helper/components/basecomponents/buttons/mybuttons';

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