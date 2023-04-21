import styles from './Forum.module.css';
import { GrClose } from 'react-icons/gr';
import React, { useState } from 'react';

const AnswerPopUp = ({ visibility, handleAnswerCall, updateQuestion }) => {
    const handleAnswerContent = content => {
        setAnswerContent(content);
    };
    const [answerContent, setAnswerContent] = useState('');
    return (
        <div className={visibility ? styles.AnswerDiv : styles.AnswerDivHidden}>
            <div className={styles.NewQuestionBoxTitle}>Zapisz swoją odpowiedź</div>
            <textarea
                value={answerContent}
                onChange={event => {
                    handleAnswerContent(event.target.value);
                }}
                className={styles.QuestionArea}
            />
            <button
                className={styles.QuestionButtonSend}
                onClick={() => {
                    updateQuestion(answerContent);
                    setAnswerContent('');
                }}
            >
                Zapisz odpowiedź
            </button>
            <button
                onClick={() => {
                    handleAnswerCall();
                    setAnswerContent('');
                }}
                className={styles.closeBtn}
            >
                <GrClose />
            </button>
        </div>
    );
};
export { AnswerPopUp };