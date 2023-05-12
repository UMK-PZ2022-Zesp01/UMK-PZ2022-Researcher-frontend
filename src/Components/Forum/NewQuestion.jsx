import styles from './Forum.module.css';
import { GrClose } from 'react-icons/gr';
import React, { useState } from 'react';

const NewQuestion = ({ newQuestionVisible, handleSend, handleExit }) => {
    const [questionContent, setQuestionContent] = useState('');
    const handleQuestionContent = content => {
        setQuestionContent(content);
    };
    return (
        <div className={newQuestionVisible ? styles.NewQuestionBox : styles.hidden}>
            <div className={styles.NewQuestionBoxTitle}>Coś cię nurtuje? Zadaj pytanie!</div>
            <textarea
                value={questionContent}
                onChange={event => {
                    handleQuestionContent(event.target.value);
                }}
                className={styles.QuestionArea}
            />
            <button
                className={styles.QuestionButtonSend}
                onClick={() => {
                    handleSend(questionContent);
                    setQuestionContent('');
                }}
            >
                Wyślij pytanie
            </button>
            <button
                onClick={() => {
                    handleExit();
                    setQuestionContent('');
                }}
                className={styles.closeBtn}
            >
                <GrClose />
            </button>
        </div>
    );
};
export { NewQuestion };
