// QuestionNavigation.js
import styles from './questionview.module.css';


export const QuestionNavigation = ({ openQuestionNav, goBackToSummary, isSessionOver, showMainQuestionView }) => (
    <div className={styles.centralbutton}>
        {showMainQuestionView && (
            <div>
                <button onClick={openQuestionNav} className={styles.sleekButton}>
                    View Questions
                </button>
            </div>
        )}

        {isSessionOver && showMainQuestionView && (
            <div>
                <button onClick={goBackToSummary} className={styles.sleekButton}>Back to Summary</button>
            </div>
        )}
    </div>
);