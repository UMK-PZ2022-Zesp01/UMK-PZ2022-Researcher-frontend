import styles from './Forum.module.css';
import { GrClose } from 'react-icons/gr';
import React, { useState } from 'react';

const QuestionEditPopUp = ({ visibilityEdit, handleQuestionCall, updateRequest }) => {
    const handleQuestionContent = content => {
        setQuestionContent(content);
    };
    const [questionContent, setQuestionContent] = useState('');
    return (
        <div className={visibilityEdit ? styles.AnswerDiv : styles.AnswerDivHidden}>
            <div className={styles.NewQuestionBoxTitle}>Edytuj swoje pytanie</div>
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
                    updateRequest(questionContent);
                    setQuestionContent('');
                }}
            >
                Zapisz pytanie
            </button>
            <button
                onClick={() => {
                    handleQuestionCall();
                    setQuestionContent('');
                }}
                className={styles.closeBtn}
            >
                <GrClose />
            </button>
        </div>
    );
};
export { QuestionEditPopUp };