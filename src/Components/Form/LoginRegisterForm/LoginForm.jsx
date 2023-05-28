import React, { useEffect, useState } from 'react';
import styles from './LoginRegisterForm.module.css';
import getApiUrl from '../../../Common/Api.js';
import { useAuth } from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import jwtDecode from 'jwt-decode';

const apiUrl = getApiUrl();
const LOGIN_URL = getApiUrl() + 'login';

function LoginForm(props) {
    const { setAuth } = useAuth();
    const setAlert = props.setters;
    const changeForm = props.change;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // const styles = FormStyle();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberDevice, setRememberDevice] = useState(false);

    async function handleGoogleResponse(response) {
        const decodedInfo = jwtDecode(response.credential);

        const loginWithGoogle = async decoded => {
            try {
                const res = await fetch(apiUrl + 'google/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json; charset:UTF-8',
                    },
                    body: JSON.stringify({ email: decoded.email, jwt: response.credential }),
                });
                const json = await res.json();

                setAuth(() => json);
                // navigate(from ? from : '/', { replace: true });
            } catch (e) {
                console.log(e);
            }
        };

        // console.log(decodedInfo)
        if (decodedInfo !== null) {
            try {
                const res = await fetch(apiUrl + 'user/email/check', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json; charset:UTF-8',
                    },
                    body: JSON.stringify(decodedInfo.email),
                });
                // console.log(res.status);
                if (res.status === 299) {
                    navigate('/user/fill', {
                        replace: false,
                        state: {
                            decodedInfo: decodedInfo,
                            jwt: response.credential,
                            // loginWithGoogle: () => loginWithGoogle(decodedInfo),
                        },
                    });
                } else if (res.status === 298) {
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText: 'Email jest już wykorzystywany przez inne konto',
                    });
                } else {
                    await loginWithGoogle(decodedInfo);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_LOGIN_API_GOOGLE,
            callback: handleGoogleResponse,
        });
        google.accounts.id.renderButton(document.getElementById('googleButton'), {});
    }, []);

    async function SubmitButtonClicked(event) {
        event.preventDefault();

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset:UTF-8',
                },
                body: JSON.stringify({
                    login: username,
                    password: password,
                    rememberDevice: rememberDevice,
                }),
            });

            switch (response?.status) {
                case 201:
                    const json = await response.json();
                    const accessToken = json.accessToken;
                    setAuth({ username, accessToken });
                    setUsername('');
                    setPassword('');
                    // navigate(from, { replace: true });
                    break;
                case 401:
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText:
                            'Logowanie nie powiodło się, sprawdź poprawność loginu oraz hasła',
                    });
                    break;
                case 403:
                    setUsername('');
                    setPassword('');
                    navigate('/registeredSuccessfully', { replace: false, state: { username } });
                    break;
                default:
                    setAlert({
                        alertOpen: true,
                        alertType: 404,
                        alertText:
                            'Logowanie nie powiodło się. Prosimy spróbować ponownie później.',
                    });
            }
        } catch (error) {
            setAlert({
                alertOpen: true,
                alertType: 404,
                alertText: 'Logowanie nie powiodło się. Prosimy spróbować ponownie później.',
            });
        }
    }

    const handleUsernameChanged = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChanged = event => {
        setPassword(event.target.value);
    };

    const handleRememberDeviceChanged = () => {
        setRememberDevice(!rememberDevice);
    };

    return (
        <article className={styles.loginFormBox}>
            <header className={styles.hBox}>
                <div className={styles.h2}>Zaloguj się</div>
            </header>

            <form onSubmit={event => SubmitButtonClicked(event)} className={styles.loginForm}>
                <div className={styles.inputContainer}>
                    <label htmlFor="usernameLog">Login</label>
                    <input
                        onChange={event => handleUsernameChanged(event)}
                        autoFocus
                        id="usernameLog"
                        type="text"
                        placeholder="Login lub adres e-mail"
                        className={styles.textInput}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor={'loginPassword'}>Hasło</label>
                    <input
                        id={'loginPassword'}
                        type="password"
                        placeholder="Hasło"
                        onChange={event => handlePasswordChanged(event)}
                        className={styles.textInput}
                        required
                    />
                </div>

                <a href="/resetPwd" className={styles.aPurple}>
                    Nie pamiętam hasła
                </a>
                <div className={styles.checkboxRow}>
                    <input
                        id={'rememberDevice'}
                        type="checkbox"
                        defaultChecked={rememberDevice}
                        onChange={handleRememberDeviceChanged}
                        className={styles.checkboxInput}
                    />
                    <label htmlFor={'rememberDevice'}>Zapamiętaj to urządzenie</label>
                </div>
                <div className={styles.loginButtons}>
                    <button type="submit" className={styles.submitButton}>
                        ZALOGUJ
                    </button>
                    <button id="googleButton" className={styles.submitButton}>
                        <FontAwesomeIcon icon={faGoogle} />
                    </button>
                </div>
                <span className={styles.lightlyTopPadded}>
                    Nie posiadasz konta?
                    <span onClick={changeForm} className={styles.panelChange}>
                        Zarejestruj się!
                    </span>
                </span>

                {/*<div className={styles.orLoginWith}>*/}
                {/*    <span>lub</span>*/}
                {/*</div>*/}
                {/*<div className={styles.flexRow}>*/}
                {/*    <button className={styles.loginWith}>Zaloguj z G</button>*/}
                {/*    <button className={styles.loginWith}>Zaloguj z FB</button>*/}
                {/*</div>*/}
            </form>
        </article>
    );
}

export { LoginForm };
