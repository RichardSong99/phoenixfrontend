import React, { useState, useEffect, useContext } from "react";
import styles from "./questionview.module.css";
// import MainQuestionView from "./mainquestionview";
import renderMarkdownWithLaTeX from "../../latexrender/markdownwlatex";
import { QuestionContext } from "@/app/helper/context/questioncontext";
import classNames from 'classnames';
import { QuestionHeader, ButtonNavPanel } from '@/app/helper/components/question/questionpieces/questionpieces';
import { QuestionChoiceArea } from '@/app/helper/components/question/questionpieces/questionpieces';

const QuestionView = ({
    question,
    userResponse,
    isFlagged,
    isStarred,
    wasReviewed,
    timeElapsed,
    activeReviewMode,
}) => {
    const {
        handleFlagQuestion,
        handleStarQuestion,
        handleReviewQuestion,
        handleReportUserResponse,
        handleMarkReviewQuestion,
    } = useContext(QuestionContext);


    const handleInputChange = (userFreeAnswer) => {
        handleReportUserResponse(userFreeAnswer, question.id);
    };

    const handleChoiceClick = (choiceLetter) => {
        handleReportUserResponse(choiceLetter, question.id);
    };

    const textareaClass = classNames({
        [styles.questionTextArea]: !showAnswer,
        [styles.questionTextAreaShowAnswerCorrect]: showAnswer && result,
        [styles.questionTextAreaShowAnswerIncorrect]: showAnswer && !result,
    });

    return (
        <div className={styles.questionView}>
            <div className={styles.questionPanel}>
                <QuestionHeader
                    handleFlagButtonClick={() => handleFlagQuestion(question.id)}
                    questionFlagged={isFlagged}
                    // fix this one -- we should be showing time counting up as well
                    timeLeft={timeLeft}
                />

                <div className={styles.questionContentContainer}>
                    {
                        question.Text && question.Text !== "" && <div className={styles.questionTextContainer}>
                            {renderMarkdownWithLaTeX(question.Text)}
                        </div>
                    }

                    <div className={styles.questionRHS}>
                        <div className={styles.questionPrompt}>
                            {question.Images && question.Images[0] &&
                                <img src={question.Images[0].Url} alt="Question" className={styles.image} />}

                            {renderMarkdownWithLaTeX(question.Prompt)}
                        </div>
                        <div className={styles.responseArea}>
                            {question.AnswerType === 'freeResponse' ? (
                                <textarea
                                    className={textareaClass}
                                    rows="1"
                                    maxLength="6"
                                    value={userResponse || ''}
                                    placeholder="Enter your response here..."
                                    onChange={(event) => {
                                        // Remove all characters that are not digits, a negative sign, or a period
                                        event.target.value = event.target.value.replace(/[^0-9.-]/g, '');

                                        // If there's more than one negative sign, remove all occurrences
                                        if ((event.target.value.match(/-/g) || []).length > 1) {
                                            event.target.value = event.target.value.replace(/-/g, '');
                                        }

                                        // If there's more than one decimal point, remove all but the first
                                        if ((event.target.value.match(/\./g) || []).length > 1) {
                                            event.target.value = event.target.value.replace(/(?!^)\./g, '');
                                        }

                                        // If the negative sign is not at the beginning, move it to the beginning
                                        if (event.target.value.indexOf('-') > 0) {
                                            event.target.value = '-' + event.target.value.replace(/-/g, '');
                                        }

                                        handleInputChange(event.target.value);
                                    }}
                                    disabled={showAnswer}
                                />
                            ) : (
                                <QuestionChoiceArea
                                    answerChoiceArray={question.AnswerChoices}
                                    correctAnswer={question.CorrectAnswerMultiple}
                                    showAnswer={showAnswer}
                                    userAnswer={userResponse}
                                    setUserAnswer={handleChoiceClick}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showAnswer && (
                <div className={styles.answersection}>
                    <div>
                        {question.AnswerType === "freeResponse" ? (
                            <div>
                                <p>
                                    Correct Answer:{" "}
                                    <span>
                                        {renderMarkdownWithLaTeX(`$${question.CorrectAnswerFree}$`)}
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p>Correct Answer: {question.CorrectAnswerMultiple}</p>
                            </div>
                        )}
                    </div>

                    <div>{renderMarkdownWithLaTeX(question.Explanation)}</div>
                </div>
            )}
        </div>
    );
};

export default QuestionView;
