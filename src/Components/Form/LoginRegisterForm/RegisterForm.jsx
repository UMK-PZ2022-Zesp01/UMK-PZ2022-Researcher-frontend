import React, { useEffect, useState } from 'react';
import styles from './LoginRegisterForm.module.css';
import getApiUrl from '../../../Common/Api.js';
import { useRef } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';
import { Select } from '../Select/Select';

const REGISTER_URL = getApiUrl() + 'user/register';

function RegisterForm(props) {
    const navigate = useNavigate();
    const changeForm = props.change;

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordScore, setPasswordScore] = React.useState(0);
    const [gender, setGender] = React.useState({ name: '', value: null });
    const [birthDate, setBirthDate] = React.useState('');
    const [agreement, setAgreement] = React.useState(false);

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const setAlert = props.setters;
    const [genderSelectOpen, setGenderSelectOpen] = useState(false);
    const genderOptions = [
        { name: 'Kobieta', value: 'female' },
        {
            name: 'Mężczyzna',
            value: 'male',
        },
        { name: 'Inna', value: 'other' },
    ];

    const currentTime = new Date().toISOString().split('T')[0];

    const user = {
        login: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthDate: birthDate,
        gender: gender?.value,
        isGoogle: false,
    };

    const handleFirstNameChanged = event => {
        setFirstName(event.target.value);
    };
    const handleLastNameChanged = event => {
        setLastName(event.target.value);
    };
    const handleUsernameChanged = event => {
        setUsername(event.target.value);
    };
    const handleEmailChanged = event => {
        setEmail(event.target.value);
    };
    const handlePasswordChanged = event => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChanged = event => {
        setConfirmPassword(event.target.value);
    };
    const handleScoreChanged = (score, feedback) => {
        setPasswordScore(score);
    };
    const handleGenderChanged = event => {
        setGender(event.target.value);
    };
    const handleBirthDateChanged = event => {
        setBirthDate(event.target.value);
    };
    const handleAgreementChanged = () => {
        setAgreement(!agreement);
    };

    //SUBMIT BUTTON onClick function
    function validatePassword() {
        let pass = passwordRef.current;
        let confirm = confirmPasswordRef.current;
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
    }

    async function SubmitButtonClicked(event) {
        event.preventDefault();
        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset:UTF-8',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                //OK or CREATED
                let text;
                switch (response.status) {
                    case 201:
                        text = 'Rejestracja przebiegła pomyślnie.';
                        navigate('/registeredSuccessfully', {
                            replace: false,
                            state: { username },
                        });
                        break;
                    case 299:
                        text = 'Ten email jest już zajęty.';
                        break;
                    case 298:
                        text = 'Ta nazwa użytkownika jest już zajęta.';
                        break;
                    default:
                        throw new Error();
                }
                setAlert({
                    alertOpen: true,
                    alertType: response.status,
                    alertText: text,
                });
            } else {
                throw new Error();
            }
        } catch (error) {
            setAlert({
                alertOpen: true,
                alertType: 999,
                alertText: 'Coś poszło nie tak.',
            });
        }
    }

    return (
        <article className={styles.registerFormBox}>
            <header className={styles.hBox}>
                <div className={styles.h2}>Zarejestruj się</div>
            </header>
            <form onSubmit={event => SubmitButtonClicked(event)} className={styles.registerForm}>
                <div className={styles.flexRow}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="firstName">Imię</label>
                        <input
                            onChange={event => handleFirstNameChanged(event)}
                            id="firstName"
                            type="text"
                            placeholder="Imię"
                            className={styles.textInput}
                            maxLength={32}
                            pattern="^([a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+[,.]?[ ]?|[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+['-]?)+$"
                            title={'Podaj imię'}
                            required
                        />
                    </div>

                    <div className={styles.flexColumnSep}></div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="lastName">Nazwisko</label>
                        <input
                            onChange={event => handleLastNameChanged(event)}
                            id="lastName"
                            type="text"
                            placeholder="Nazwisko"
                            className={styles.textInput}
                            maxLength={32}
                            pattern="^([a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+[,.]?[ ]?|[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+['-]?)+$"
                            title={'Podaj nazwisko'}
                            required
                        />
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="usernameReg">Login</label>
                        <input
                            onChange={event => handleUsernameChanged(event)}
                            id="usernameReg"
                            type="text"
                            placeholder="Nazwa użytkownika"
                            className={styles.textInput}
                            maxLength={32}
                            pattern="^[a-zA-Z][a-zA-Z0-9]*$"
                            title={'Podaj nazwę użytkownika'}
                            required
                        />
                    </div>

                    <div className={styles.flexColumnSep}></div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={event => handleEmailChanged(event)}
                            id="email"
                            type="email"
                            placeholder="Adres e-mail"
                            className={styles.textInput}
                            maxLength={64}
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                            title={'Podaj adres email'}
                            required
                        />
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Hasło</label>
                        <input
                            onChange={event => handlePasswordChanged(event)}
                            id="passwordReg"
                            type="password"
                            placeholder="Hasło"
                            className={styles.textInput}
                            required
                            maxLength={32}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Podaj hasło. Hasło musi mieć przynajmniej 8 znaków, w tym cyfrę, małą oraz wielką literę."
                            ref={el => (passwordRef.current = el)}
                        />
                    </div>

                    <div className={styles.flexColumnSep}></div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="confirmPassword">Powtórz hasło</label>
                        <input
                            onChange={event => handleConfirmPasswordChanged(event)}
                            id="confirmPassword"
                            type="password"
                            placeholder="Potwierdź hasło"
                            className={styles.textInput}
                            required
                            maxLength={32}
                            title={'Potwierdź hasło'}
                            ref={el => (confirmPasswordRef.current = el)}
                        />
                    </div>
                </div>
                <div className={`${styles.flexRow} ${styles.pwdStrengthBar}`}>
                    <PasswordStrengthBar
                        onChangeScore={(score, feedback) => handleScoreChanged(score, feedback)}
                        setPasswordScore={setPasswordScore}
                        className={styles.fullWidth}
                        password={password}
                        scoreWords={['Za słabe', 'Za słabe', 'Ok', 'Silne', 'Bardzo Silne']}
                        shortScoreWord={'Zbyt krótkie'}
                    ></PasswordStrengthBar>
                </div>
                <div className={styles.flexRow}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="gender">Płeć</label>
                        <Select
                            id={'gender'}
                            name={'Płeć'}
                            title={'Wskaż płeć'}
                            options={genderOptions}
                            isOpen={genderSelectOpen}
                            open={setGenderSelectOpen}
                            value={gender?.name}
                            setValue={setGender}
                            placeholder={'Wskaż płeć'}
                        ></Select>
                    </div>

                    <div className={styles.flexColumnSep}></div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="birthdate">Data urodzenia</label>
                        <input
                            onChange={event => handleBirthDateChanged(event)}
                            id="birthdate"
                            type="date"
                            className={styles.textInput}
                            min="1900-01-01"
                            max={currentTime}
                            required
                            title={'Podaj datę urodzenia:'}
                        />
                    </div>
                </div>

                <div className={styles.checkboxRow}>
                    <input
                        id="agreement"
                        type="checkbox"
                        defaultChecked={agreement}
                        onChange={() => handleAgreementChanged()}
                        required
                        className={styles.checkboxInput}
                    />
                    <label htmlFor="agreement">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych.
                    </label>
                </div>
                <div className={styles.loginButtons}>
                    <button
                        onClick={validatePassword}
                        type="submit"
                        className={styles.submitButton}
                    >
                        ZAREJESTRUJ
                    </button>
                </div>

                <span className={styles.lightlyTopPadded}>
                    Posiadasz już konto?
                    <span onClick={changeForm} className={styles.panelChange}>
                        Przejdź do logowania
                    </span>
                </span>
            </form>
        </article>
    );
}

export { RegisterForm };
