import React, { useState, useEffect } from 'react';
import styles from './Forum.module.css';
import { SingleQuestion } from './SingleQuestion';
import { NewQuestion } from './NewQuestion';
import useAuth from '../../hooks/useAuth';
import { useUsername } from '../../hooks/useAuth';
import getApiUrl from '../../Common/Api';
import { AnswerPopUp } from './AnswerPopUp';
import { QuestionEditPopUp } from './QuestionEditPopUp';

const SEND_URL = `${getApiUrl()}question/send`;

const Forum = ({ fullName, researchCode, researchOwnerLogin }) => {
    const [newQuestionVisible, setNewQuestionVisible] = useState(false);
    const [isClickedAnswer, setIsClickedAnswer] = useState(false);
    const [isClickedQuestion, setIsClickedQuestion] = useState(false);
    const { username, accessToken } = useAuth().auth;
    const login = useUsername();

    const [questionCode, setQuestionCode] = useState('');

    const handleAnswerCall = () => {
        setIsClickedAnswer(!isClickedAnswer);
    };
    const handleQuestionCall = () => {
        setIsClickedQuestion(!isClickedQuestion);
    };
    const handleExit = () => {
        setNewQuestionVisible(false);
    };

    const updateQuestion = async content => {
        const UPDATE_URL = `${getApiUrl()}question/${questionCode}/update`;
        if (content.length) {
            let putTemplate = {
                answer: content,
            };
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(putTemplate),
            };
            setIsClickedAnswer(false);
            const response = await fetch(UPDATE_URL, requestOptions);
            if (response.ok) {
                // Refetch the question data to update the component
                fetch(getApiUrl() + `question/find/research/${researchCode}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: accessToken,
                        'Content-Type': 'application/json; charset:UTF-8',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        setQuestionData(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                console.error(response.status);
            }
        }
    };

    const updateRequest = async content => {
        console.log(content);
        const UPDATE_URL = `${getApiUrl()}question/${questionCode}/update`;
        if (content.length) {
            let putTemplate = {
                question: content,
            };
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(putTemplate),
            };
            setIsClickedQuestion(false);
            const response = await fetch(UPDATE_URL, requestOptions);
            if (response.ok) {
                // Refetch the question data to update the component
                fetch(getApiUrl() + `question/find/research/${researchCode}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: accessToken,
                        'Content-Type': 'application/json; charset:UTF-8',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        setQuestionData(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                console.error(response.status);
            }
        }
    };
    const handleSend = async content => {
        if (content.length) {
            let putTemplate = {
                researchCode: researchCode,
                researchOwnerLogin: researchOwnerLogin,
                authorLogin: username,
                authorFullName: fullName,
                question: content,
                answer: '',
            };
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(putTemplate),
            };
            setNewQuestionVisible(false);
            const response = await fetch(SEND_URL, requestOptions);
            if (response.ok) {
                // Refetch the question data to update the component
                fetch(getApiUrl() + `question/find/research/${researchCode}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: accessToken,
                        'Content-Type': 'application/json; charset:UTF-8',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        setQuestionData(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                console.error(response.status);
            }
        }
    };
    const [questionData, setQuestionData] = useState([]);
    useEffect(() => {
        fetch(getApiUrl() + `question/find/research/${researchCode}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json; charset:UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                setQuestionData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [setQuestionData]);
    return (
        <div className={styles.ForumContainer}>
            <div
                className={
                    // newQuestionVisible || isClickedAnswer || isClickedQuestion
                    //     ? styles.blurred
                    //     : styles.ForumBox
                    styles.ForumBox
                }
            >
                {username !== researchOwnerLogin && (
                    <button
                        className={styles.QuestionButton}
                        onClick={() => {
                            setNewQuestionVisible(true);
                        }}
                    >
                        Zadaj pytanie
                    </button>
                )}
                <div className={styles.QuestionsBox}>
                    {questionData.map((question, index) => (
                        <div key={index} className={styles.SingleContainer}>
                            <SingleQuestion
                                username={username}
                                question={question}
                                canEdit={login === question.researchOwnerLogin}
                                setQuestionCode={setQuestionCode}
                                handleAnswerCall={handleAnswerCall}
                                handleQuestionCall={handleQuestionCall}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <NewQuestion
                newQuestionVisible={newQuestionVisible}
                handleSend={handleSend}
                handleExit={handleExit}
            />
            <AnswerPopUp
                visibility={isClickedAnswer}
                updateQuestion={updateQuestion}
                handleAnswerCall={handleAnswerCall}
            />
            <QuestionEditPopUp
                visibilityEdit={isClickedQuestion}
                updateRequest={updateRequest}
                handleQuestionCall={handleQuestionCall}
            />
        </div>
    );
};
export { Forum };
