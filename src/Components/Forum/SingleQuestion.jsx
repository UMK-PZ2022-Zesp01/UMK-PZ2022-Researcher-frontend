import styles from './Forum.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const SingleQuestion = ({
    username,
    question,
    canEdit,
    handleAnswerCall,
    setQuestionCode,
    handleQuestionCall,
}) => {
    return (
        <div className={styles.div100}>
            {!canEdit ? (
                <div className={styles.SingleQuestionContainer}>
                    <div className={styles.QuestionTitle}>
                        <span>{question.authorFullName}</span>
                        <strong>{question.question}</strong>
                    </div>
                    <div className={styles.QuestionAnswer}>
                        {question.answer.length > 0 ? (
                            question.answer
                        ) : username === question.authorLogin ? (
                            <button
                                className={styles.BtnToAddAnswer}
                                onClick={async () => {
                                    handleQuestionCall();
                                    setQuestionCode(question.questionCode);
                                }}
                            >
                                Edytuj pytanie
                            </button>
                        ) : (
                            'Nie udzielono odpowiedzi'
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.SingleQuestionContainer}>
                    <div className={styles.QuestionTitle}>
                        <span>{question.authorFullName}</span>
                        <strong>{question.question}</strong>
                    </div>
                    {question.answer.length > 0 ? (
                        <div className={styles.AnswerText}>
                            <span>Odpowiedź autora badania:</span>
                            <strong className={styles.QuestionAnswer}>{question.answer}</strong>
                        </div>
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
