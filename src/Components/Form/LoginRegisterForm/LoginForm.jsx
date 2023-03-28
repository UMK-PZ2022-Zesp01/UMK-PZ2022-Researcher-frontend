import React from 'react';
import FormStyle from './FormStyle';
import getApiUrl from '../../../Common/Api.js';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const LOGIN_URL = getApiUrl() + 'login';

function LoginForm(props) {
    const { setAuth } = useAuth();
    const setAlert = props.setters;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const styles = FormStyle();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

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
                    console.log(response);
                    setAlert({
                        alertOpen: true,
                        alertType: 404,
                        alertText:
                            'Logowanie nie powiodło się. Prosimy spróbować ponownie później.',
                    });
            }
        } catch (error) {
            console.log(error);
            setAlert({
                alertOpen: true,
                alertType: 404,
                alertText: 'Logowanie nie powiodło się. Prosimy spróbować ponownie później.',
            });
        }

        //   try {
        //     await fetch(LOGIN_URL, {
        //       method: 'POST',
        //       credentials: 'include',
        //       headers: {
        //         'Content-Type': 'application/json; charset:UTF-8',
        //       },
        //       body: JSON.stringify({
        //         login: username,
        //         password: password,
        //       }),
        //     })
        //       .then(response => {
        //         response.ok
        //           ? response.json().then(result => {
        //               const accessToken = result.accessToken;
        //               setAuth({ username, accessToken });
        //               setUsername('');
        //               setPassword('');
        //               navigate(from, { replace: true });
        //             })
        //           : setAlert({
        //               alertOpen: true,
        //               alertType: response.status,
        //               alertText: 'Logowanie nie powiodło się, sprawdź poprawność loginu oraz hasła',
        //             });
        //       })
        //       .catch(reason => {
        //         console.log(reason);
        //         setAlert({
        //           alertOpen: true,
        //           alertType: 404,
        //           alertText: 'Logowanie nie powiodło się. Prosimy spróbować ponownie później.',
        //         });
        //       });
        //   } catch (error) {
        //     if (!error.response) {
        //       console.log('No server response.');
        //     } else if (error.response?.status === 400) {
        //       console.log('Missing username or password.');
        //     } else if (error.response?.status === 401) {
        //       console.log('Unauthorized.');
        //     }
        //     console.log(error);
        //   }
    }

    const handleUsernameChanged = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChanged = event => {
        setPassword(event.target.value);
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
                    placeholder="Login lub adres email"
                    className={styles.textInput}
                    required
                />
                <input
                    onChange={event => handlePasswordChanged(event)}
                    type="password"
                    placeholder="Hasło"
                    className={styles.textInput}
                    required
                />
                <a href="/" className={styles.aPurple}>
                    Nie pamiętam hasła
                </a>
                <button type="submit" className={styles.submitButton}>
                    ZALOGUJ
                </button>
                <div className={styles.orLoginWith}>
                    <span>lub</span>
                </div>
                <div className={styles.flexRow}>
                    <button className={styles.loginWith}>Zaloguj z G</button>
                    <button className={styles.loginWith}>Zaloguj z FB</button>
                </div>
            </form>
        </article>
    );
}

export default LoginForm;
