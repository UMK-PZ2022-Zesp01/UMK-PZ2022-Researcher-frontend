import React from 'react';
import FormStyle from './FormStyle';
import getApiUrl from '../../Common/Api.js';
import { useRef } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

const REGISTER_URL = getApiUrl() +'user/register';

function RegisterForm(props) {
  const styles = FormStyle();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordScore, setPasswordScore] = React.useState(0);
  const [gender, setGender] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [agreement, setAgreement] = React.useState(false);

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const setAlert = props.setters;

  let currentTime = new Date().toISOString().split('T')[0];

  let user = {
    login: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
    email: email,
    birthDate: birthDate,
    gender: gender,
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

  function SubmitButtonClicked(event) {
    event.preventDefault();

    try {
      fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset:UTF-8',
        },
        body: JSON.stringify(user),
      })
        .then(response => {
          if (response.ok) {
            //OK or CREATED
            let text;
            switch (response.status) {
              case 201:
                text = 'Rejestracja przebiegła pomyślnie.';
                break;
              case 299:
                text = 'Ten email jest już zajęty.';
                break;
              case 298:
                text = 'Ta nazwa użytkownika jest już zajęta.';
                break;
              default:
                text = 'Co to się stanęło?';
            }
            setAlert({
              alertOpen: true,
              alertType: response.status,
              alertText: text,
            });
          } else {
            console.log(response.status);
          }
        })
        .catch(() => {
          setAlert({
            alertOpen: true,
            alertType: 999,
            alertText: 'Coś poszło nie tak.',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.registerFormBox}>
      <div className={styles.hBox}>
        <div className={styles.h3}>Nie posiadasz konta?</div>
        <div className={styles.h2}>Zarejestruj się</div>
      </div>
      <form onSubmit={event => SubmitButtonClicked(event)} className={styles.registerForm}>
        <div className={styles.flexRow}>
          <input
            onChange={event => handleFirstNameChanged(event)}
            id="firstName"
            type="text"
            placeholder="Imię"
            className={styles.textInput}
            maxLength={32}
            required
          />
          <div className={styles.flexColumnSep}></div>
          <input
            onChange={event => handleLastNameChanged(event)}
            id="lastName"
            type="text"
            placeholder="Nazwisko"
            className={styles.textInput}
            maxLength={32}
            required
          />
        </div>
        <div className={styles.flexRow}>
          <input
            onChange={event => handleUsernameChanged(event)}
            id="usernameReg"
            type="text"
            placeholder="Nazwa użytkownika"
            className={styles.textInput}
            maxLength={32}
            required
          />
          <div className={styles.flexColumnSep}></div>
          <input
            onChange={event => handleEmailChanged(event)}
            id="email"
            type="email"
            placeholder="Adres e-mail"
            className={styles.textInput}
            maxLength={64}
            required
          />
        </div>
        <div className={styles.flexRow}>
          <input
            onChange={event => handlePasswordChanged(event)}
            id="password"
            type="password"
            placeholder="Hasło"
            className={styles.textInput}
            required
            maxLength={32}
            ref={el => (passwordRef.current = el)}
          />
          <div className={styles.flexColumnSep}></div>
          <input
            onChange={event => handleConfirmPasswordChanged(event)}
            id="confirmPassword"
            type="password"
            placeholder="Potwierdź hasło"
            className={styles.textInput}
            required
            maxLength={32}
            ref={el => (confirmPasswordRef.current = el)}
          />
        </div>
        <div className={styles.flexRow}>
          <PasswordStrengthBar
            onChangeScore={(score, feedback) => handleScoreChanged(score, feedback)}
            setPasswordScore={setPasswordScore}
            className={styles.fullWidth}
            password={password}
            scoreWords={['Słabe', 'Słabe', 'Ok', 'Silne', 'Bardzo Silne']}
            shortScoreWord={'Zbyt krótkie'}
          ></PasswordStrengthBar>
        </div>
        <div className={styles.flexRow}>
          <select
            onChange={event => handleGenderChanged(event)}
            id="gender"
            className={styles.select}
            defaultValue="Wybierz płeć:"
            required
          >
            <option className={styles.option} value="Wybierz płeć:" hidden disabled>
              Wybierz płeć:
            </option>
            <option className={styles.option} value="female">
              Kobieta
            </option>
            <option className={styles.option} value="male">
              Mężczyzna
            </option>
            <option className={styles.option} value="other">
              Inna
            </option>
          </select>
          <div className={styles.flexColumnSep}></div>
          <input
            onChange={event => handleBirthDateChanged(event)}
            id="birthdate"
            type="date"
            className={styles.textInput}
            min="1900-01-01"
            max={currentTime}
            required
          />
        </div>

        <div className={styles.agreementBox}>
          <input
            onChange={() => handleAgreementChanged()}
            id="agreement"
            type="checkbox"
            className={styles.checkboxInput}
            required
          />
          <label htmlFor="agreement">Wyrażam zgodę na przetwarzanie moich danych osobowych.</label>
        </div>
        <button onClick={validatePassword} type="submit" className={styles.submitButton}>
          ZAREJESTRUJ
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
