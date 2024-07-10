import React from 'react';
import styles from './loading.module.css';

export const Loading = () => {
    return (
        <div className = {styles.loader}>
            <span>.</span><span>.</span><span>.</span><span>.</span>
        </div>
    );
}