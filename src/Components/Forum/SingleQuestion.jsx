import styles from "./Forum.module.css";
import React from "react";


const SingleQuestion = ({question, canEdit,handleAnswerCall,setQuestionId}) => {
    return (
        <div className={styles.div100}>
            {!canEdit ?
                <div className={styles.SingleQuestionContainer}>
                    <div className={styles.QuestionTitle}>{question.question} {question.researchOwnerLogin}</div>
                    <div
                        className={styles.QuestionAnswer}>{question.answer.length > 0 ? question.answer : "Nie udzielono odpowiedzi"}</div>
                </div>
                :
                <div className={styles.SingleQuestionContainer}>
                    <div className={styles.QuestionTitle}>{question.question} {question.researchOwnerLogin}</div>
                    {question.answer.length > 0 ? <div className={styles.QuestionAnswer}>{question.answer}</div> :
                        <div className={styles.QuestionAddAnswer}>
                            <button className={styles.BtnToAddAnswer} onClick={async ()=>{
                                handleAnswerCall()
                                setQuestionId(question._id)
                            }}>Odpowiedz na pytanie</button>
                        </div>}
                </div>
            }
        </div>
    )
}

export {SingleQuestion};