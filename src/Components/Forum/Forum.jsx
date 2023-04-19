import React, {useState, useEffect} from 'react';
import styles from './Forum.module.css'
import {SingleQuestion} from "./SingleQuestion";
import {NewQuestion} from "./NewQuestion";
import useAuth from "../../hooks/useAuth";
import {useUsername} from "../../hooks/useAuth";
import getApiUrl from "../../Common/Api";
import {AnswerPopUp} from "./AnswerPopUp";

const SEND_URL = `${getApiUrl()}questions/send`;

const Forum = () => {

    const [newQuestionVisible, setNewQuestionVisible] = useState(false)
    const [isClickedAnswer, setIsClickedAnswer] = useState(false)
    const {username, accessToken} = useAuth().auth;
    const login = useUsername()
    const researchOwnerLogin = "szop"
    const researchCode = "xd"

    const [questionId, setQuestionId] = useState('')

    const handleAnswerCall = () => {
        setIsClickedAnswer(!isClickedAnswer)
    }
    const handleExit = () => {
        setNewQuestionVisible(false)
    }

    const updateQuestion = async (content) => {
        const UPDATE_URL = `${getApiUrl()}questions/sendAnswer/id/${questionId}`
        if (content.length) {
            let putTemplate = {
                answer: content,
            };
            const requestOptions = {
                method: "PUT",
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(putTemplate),
            };
            setIsClickedAnswer(false);
            const response = await fetch(UPDATE_URL, requestOptions);
            if (response.ok) {
                // Refetch the question data to update the component
                fetch(getApiUrl() + `questions/research/code/${researchCode}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: accessToken,
                        "Content-Type": "application/json; charset:UTF-8",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setQuestionData(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.error(response.status);
            }
        }

    }
    const handleSend = async (content) => {
        if (content.length) {
            let putTemplate = {
                researchOwnerLogin: researchOwnerLogin,
                researchCode: researchCode,
                question: content,
                answer: "",
            };
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(putTemplate),
            };
            setNewQuestionVisible(false);
            const response = await fetch(SEND_URL, requestOptions);
            if (response.ok) {
                // Refetch the question data to update the component
                fetch(getApiUrl() + `questions/research/code/${researchCode}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: accessToken,
                        "Content-Type": "application/json; charset:UTF-8",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setQuestionData(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.error(response.status);
            }
        }
    };
    const [questionData, setQuestionData] = useState([])
    useEffect(() => {
        fetch(getApiUrl() + `questions/research/code/${researchCode}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json; charset:UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                setQuestionData(data)
            })
            .catch(error => {
                console.error(error);
            });

    }, [setQuestionData]);
    return (
        <div className={styles.ForumContainer}>
            <div className={newQuestionVisible || isClickedAnswer ? styles.blurred : styles.ForumBox}>
                <button className={styles.QuestionButton} onClick={() => {
                    setNewQuestionVisible(true)
                }}>Zadaj pytanie
                </button>
                <div className={styles.QuestionsBox}>
                    {questionData.map((question, index) => (
                            <div key={index} className={styles.SingleContainer}>
                                <SingleQuestion question={question} canEdit={login === question.researchOwnerLogin}
                                                setQuestionId={setQuestionId} handleAnswerCall={handleAnswerCall}/>
                            </div>
                        )
                    )}

                </div>
            </div>
            <NewQuestion newQuestionVisible={newQuestionVisible} handleSend={handleSend} handleExit={handleExit}/>
            <AnswerPopUp questionId={questionId} visibility={isClickedAnswer} updateQuestion={updateQuestion}
                         handleAnswerCall={handleAnswerCall}/>
        </div>

    )
}
export {Forum};