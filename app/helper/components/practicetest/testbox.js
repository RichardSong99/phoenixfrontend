import React, {useState, useEffect} from 'react';
import { fetchTestByName } from '@/app/apiservices/testservice';
import styles from './testbox.module.css';

export const TestBox = ({ testName, onStartTest, onReviewTest }) => {
    const [isTestTaken, setIsTestTaken] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadTest = async () => {
        try {
            let response = await fetchTestByName({ testName: testName });
            setIsTestTaken(response.Completed);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTest();
    }, []);

    return (
        <>
            {!loading && <div className={styles.testBox}>
                <div className={styles.testBoxTitle}>
                    {testName}
                </div>
                <div className={styles.testBoxButtonContainer}>
                    {!isTestTaken && <button className={styles.testBoxButton} onClick={() => onStartTest()}>
                        Start Test
                    </button>}
                    {isTestTaken &&
                        <button className={styles.testBoxButton} onClick={() => onReviewTest()} >
                            Review Test
                        </button>
                    }
                </div>
            </div>}
        </>
    );
}
