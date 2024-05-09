import React from 'react';
import { RoundButton } from '@/app/helper/components/buttons/mybuttons';
import styles from './pagenavigation.module.css';

const PageNavigation = ({ currentPage, lastPage, pageSelectHandler }) => {
    const pageButtons = [];
    for (let i = 1; i <= lastPage; i++) {
        pageButtons.push(
            <RoundButton
                key={i}
                text={i}
                onClick={() => pageSelectHandler(i)}
                isActive={i === currentPage}
            />
        );
    }

    return (
        <div className={styles.pageButtonsContainer}>
            {pageButtons}
        </div>
    );
};

export default PageNavigation;