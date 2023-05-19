import React from 'react';
import styles from './LoginRegisterForm.module.css';
import getApiUrl from '../../../Common/Api.js';
import { useAuth } from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const LOGIN_URL = getApiUrl() + 'login';

function LoginForm(props) {
    const { setAuth } = useAuth();
    const setAlert = props.setters;
    const changeForm = props.change;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // const styles = FormStyle();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberDevice, setRememberDevice] = React.useState(false);

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
                    navigate(from, { replace: true });
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
                <input
                    onChange={event => handleUsernameChanged(event)}
                    autoFocus
                    id="usernameLog"
                    type="text"
                    placeholder="Login lub adres e-mail"
                    className={styles.textInput}
                    required
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    onChange={event => handlePasswordChanged(event)}
                    className={styles.textInput}
                    required
                />

                <a href="/" className={styles.aPurple}>
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
                <button type="submit" className={styles.submitButton}>
                    ZALOGUJ
                </button>
                <span className={styles.lightlyTopPadded}>
                    Nie posiadasz konta?
                    <span onClick={() => changeForm(true)} className={styles.panelChange}>
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
