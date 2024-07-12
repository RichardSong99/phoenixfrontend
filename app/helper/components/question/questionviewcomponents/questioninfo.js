// QuestionInfo.js

import styles from './questionview.module.css';

export const QuestionInfo = ({ currentQuestionIndex, questions }) => (
    <div>
        Question {currentQuestionIndex + 1} of {questions.length}
    </div>
);