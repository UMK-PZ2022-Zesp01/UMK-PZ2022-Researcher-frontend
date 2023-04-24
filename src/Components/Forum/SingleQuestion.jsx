import styles from './Forum.module.css';
import React from 'react';

const SingleQuestion = ({username, question, canEdit, handleAnswerCall, setQuestionCode,handleQuestionCall }) => {
    return (
        <div className={styles.div100}>
            {!canEdit ? (
                <div className={styles.SingleQuestionContainer}>
                    <div className={styles.QuestionTitle}>
                        {question.authorLogin}:  {question.question}
                    </div>
                    <div className={styles.QuestionAnswer}>

                        {}
                        {question.answer.length > 0 ? question.answer : username===question.authorLogin?<button
                            className={styles.BtnToAddAnswer}
                            onClick={async () => {
                                handleQuestionCall();
                                setQuestionCode(question.questionCode);
                            }}
                        >
                            Edytuj pytanie
                        </button>:"Nie udzielono odpowiedzi"}
                    </div>
                </div>
            ) : (
                <div className={styles.SingleQuestionContainer}>
                    <div className={styles.QuestionTitle}>
                        {question.researchOwnerLogin}:  {question.question}
                    </div>
                    {question.answer.length > 0 ? (
                        <div className={styles.QuestionAnswer}>{question.answer}</div>
                    ) : (
                        <div className={styles.QuestionAddAnswer}>
                            <button
                                className={styles.BtnToAddAnswer}
                                onClick={async () => {
                                    handleAnswerCall();
                                    setQuestionCode(question.questionCode);
                                }}
                            >
                                Odpowiedz na pytanie
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export { SingleQuestion };