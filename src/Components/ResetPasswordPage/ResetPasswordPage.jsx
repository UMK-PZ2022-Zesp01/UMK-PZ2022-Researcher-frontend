import styles from './ResetPasswordPage.module.css';
import { Helmet } from 'react-helmet';
import React, { useEffect, useRef, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import getApiUrl from '../../Common/Api';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Loading } from '../Loading/Loading';

export const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const apiUrl = getApiUrl();

    const [login, setLogin] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordScore, setPasswordScore] = useState('');

    const [emailSent, setEmailSent] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const [passwordSent, setPasswordSent] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [success, setSuccess] = useState(false);

    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    useEffect(() => {
        const validatePassword = () => {
            const pass = passwordRef.current;
            const confirm = confirmRef.current;

            if (passwordScore < 2) {
                pass.setCustomValidity('Hasło jest za słabe.');
            } else {
                pass.setCustomValidity('');
            }
            if (password !== confirmPassword) {
                confirm.setCustomValidity('Hasła się nie zgadzają.');
            } else {
                confirm.setCustomValidity('');
            }
        };
        validatePassword();
    }, [password, confirmPassword]);

    const handleToLoginPageClicked = () => {
        navigate('/login', { replace: false });
    };

    const handleScoreChanged = (score, feedback) => {
        setPasswordScore(score);
    };

    const handleSendEmailClicked = event => {
        event.preventDefault();

        setWaiting(true);
        const requestResetMail = async () => {
            try {
                const response = await fetch(apiUrl + 'sendPwdResetCode?login=' + login);
                setLogin('');
                setWaiting(false);
                switch (response.status) {
                    case 200:
                        setEmailSent(true);
                        setUserNotFound(false);
                        break;
                    case 204:
                        setEmailSent(false);
                        setUserNotFound(true);
                }
            } catch (e) {
                setEmailSent(false);
                setWaiting(false);
            }
        };

        requestResetMail();
    };

    const handleTryAgainClicked = () => {
        setPasswordSent(false);
        setEmailSent(false);
        setUserNotFound(false);
        setWaiting(false);
        setSuccess(false);
    };

    const handleChangePasswordClicked = event => {
        event.preventDefault();

        const requestPasswordChange = async () => {
            setPasswordSent(true);
            try {
                const response = await fetch(apiUrl + 'resetPwd', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json; charset:UTF-8',
                    },
                    body: JSON.stringify({ token: code, newPassword: password }),
                });
                setCode('');
                setPassword('');
                setConfirmPassword('');

                if (!response.ok) {
                    throw new Error();
                }
                setSuccess(true);
                setWaiting(false);
            } catch (e) {
                setSuccess(false);
                setWaiting(false);
            }
        };

        requestPasswordChange();
    };

    return (
        <div className={styles.resetPasswordPanel}>
            <Helmet>
                <title>Resetowanie hasła | JustResearch</title>
            </Helmet>

            <header>
                <div className={styles.h2}>Odzyskiwanie hasła</div>
            </header>

            <main className={styles.main}>
                <div
                    className={`${styles.carousel} ${
                        emailSent ? (passwordSent ? styles.alternative2 : styles.alternative1) : ''
                    }`}
                >
                    <form onSubmit={handleSendEmailClicked}>
                        <div className={styles.h3}>
                            Podaj nazwę użytkownika, a my wyślemy do Ciebie maila z kodem do zmiany
                            hasła.
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'login'}>Nazwa użytkownika</label>
                            <input
                                id={'login'}
                                title={'Podaj nazwę użytkownika'}
                                type="text"
                                className={styles.textInput}
                                required
                                value={login}
                                onChange={event => {
                                    setUserNotFound(false);
                                    setLogin(event.target.value);
                                }}
                            />
                        </div>
                        <div className={styles.flexRow}>
                            {/*{!isSuccessful && (*/}
                            {/*    <button className={styles.button} onClick={onTryAgainButtonClicked}>*/}
                            {/*        Spróbuj ponownie*/}
                            {/*    </button>*/}
                            {/*)}*/}
                            <button className={styles.button} onClick={handleToLoginPageClicked}>
                                Wróć na stronę logowania
                            </button>
                            <button type={'submit'} className={styles.button}>
                                Wyślij kod
                            </button>
                        </div>
                        {userNotFound && (
                            <div className={styles.h3}>Użytkownik {login} nie istnieje!</div>
                        )}
                    </form>

                    <form onSubmit={handleChangePasswordClicked}>
                        <div className={styles.h3}>
                            Wysłaliśmy do ciebie maila na adres powiązany z twoim kontem. Podaj
                            otrzymany kod, aby zmienić hasło.
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'code'}>Kod</label>
                            <input
                                type="text"
                                title={'Podaj kod z wiadomości'}
                                id={'code'}
                                className={styles.textInput}
                                value={code}
                                onChange={event => setCode(event.target.value)}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'pwd'}>Nowe hasło</label>
                            <input
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                id="Password"
                                type="password"
                                className={styles.textInput}
                                required
                                maxLength={32}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Podaj nowe hasło. Hasło musi mieć przynajmniej 8 znaków, w tym cyfrę, małą oraz wielką literę."
                                ref={passwordRef}
                            />
                        </div>
                        <div className={styles.fullWidth}>
                            <PasswordStrengthBar
                                onChangeScore={(score, feedback) =>
                                    handleScoreChanged(score, feedback)
                                }
                                setPasswordScore={setPasswordScore}
                                password={password}
                                scoreWords={['Za słabe', 'Za słabe', 'Ok', 'Silne', 'Bardzo Silne']}
                                shortScoreWord={'Zbyt krótkie'}
                            ></PasswordStrengthBar>
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor={'confirmPwd'}>Powtórz nowe hasło</label>
                            <input
                                value={confirmPassword}
                                onChange={event => setConfirmPassword(event.target.value)}
                                id="ConfirmPassword"
                                type="password"
                                className={styles.textInput}
                                required
                                maxLength={32}
                                title={'Powtórz nowe hasło'}
                                ref={confirmRef}
                            />
                        </div>
                        <div className={styles.flexRow}>
                            <button className={styles.button}>Zatwierdź</button>
                        </div>
                    </form>
                    <div>
                        <Loading isLoading={waiting} isSuccessful={success} />
                        {waiting ? (
                            ''
                        ) : (
                            <div className={styles.h3}>
                                Zmiana hasła {success ? '' : 'nie'} powiodła się
                            </div>
                        )}

                        <div className={styles.flexRow}>
                            {success ? (
                                <></>
                            ) : (
                                <button className={styles.button} onClick={handleTryAgainClicked}>
                                    Spróbuj ponownie
                                </button>
                            )}

                            <button className={styles.button} onClick={handleToLoginPageClicked}>
                                Wróć na stronę logowania
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
