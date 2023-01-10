
import React from 'react';
import FormStyle from "./FormStyle"
import getApiUrl from "../../Common/Api.js"
import {useRef} from "react";
import PasswordStrengthBar from "react-password-strength-bar";

function RegisterForm(props){
    const styles=FormStyle()
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [passwordScore, setPasswordScore] = React.useState(0);
    const [gender, setGender] = React.useState("");
    const [birthDate, setBirthDate] = React.useState("");
    const [agreement, setAgreement] = React.useState(false);

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const setAlert = props.setters

    let currentTime = new Date().toISOString().split("T")[0];

    let user = {
        login: username,
        password: password,
        firstName: name,
        lastName: surname,
        email: email,
        birthDate: birthDate,
        gender: gender
    }


    //SUBMIT BUTTON onClick function
    function validatePassword(){
        let pass = passwordRef.current
        let confirm = confirmPasswordRef.current
        if (passwordScore<1){
            pass.setCustomValidity("Hasło jest za słabe.")
        }else{
            pass.setCustomValidity("")
        }
        if (password!==confirmPassword){
            confirm.setCustomValidity("Hasła się nie zgadzają.")
        }else {
            confirm.setCustomValidity("")
        }
    }

    function SubmitButtonClicked(event){
        event.preventDefault()

        fetch(getApiUrl() + "addUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset:UTF-8'
            },
            body: JSON.stringify(user)
        }).then(response => {
            if(response.ok){ //OK or CREATED
                let text;
                switch(response.status){
                    case 201:
                        text = "Rejestracja przebiegła pomyślnie.";
                        break;
                    case 299:
                        text = "Ten email jest już zajęty.";
                        break;
                    case 298:
                        text = "Ta nazwa użytkownika jest już zajęta.";
                        break;
                    default:
                        text = "Co to się stanęło?"
                }
                setAlert({
                    alertOpen: true,
                    alertType: response.status,
                    alertText: text
                });
            }
        }).catch(()=>{
            setAlert({
                alertOpen: true,
                alertType:999,
                alertText:"Coś poszło nie tak."
            });
        })
    }

    return(
        <div className={styles.registerFormBox}>
            <div className={styles.hBox}>
                <div className={styles.h3}>Nie posiadasz konta?</div>
                <div className={styles.h2}>Zarejestruj się</div>
            </div>
            <form onSubmit={(event)=>SubmitButtonClicked(event)} className={styles.registerForm}>
                <div className={styles.flexRow}>
                    <input
                        onChange={(event)=>setName(event.target.value)}
                        id="name"
                        type="text"
                        placeholder="Imię"
                        className={styles.textInput}
                        required
                    />
                    <div className={styles.flexColumnSep}></div>
                    <input
                        onChange={(event)=>setSurname(event.target.value)}
                        id="surname"
                        type="text"
                        placeholder="Nazwisko"
                        className={styles.textInput}
                        required
                    />
                </div>
                <div className={styles.flexRow}>
                    <input
                        onChange={(event)=>setUsername(event.target.value)}
                        id="username"
                        type="text"
                        placeholder="Nazwa użytkownika"
                        className={styles.textInput}
                        required
                    />
                    <div className={styles.flexColumnSep}></div>
                    <input
                        onChange={(event)=>setEmail(event.target.value)}
                        id="email"
                        type="email"
                        placeholder="Adres e-mail"
                        className={styles.textInput}
                        required
                    />
                </div>
                <div className={styles.flexRow}>
                    <input
                        onChange={(event)=>setPassword(event.target.value)}
                        id="password"
                        type="password"
                        placeholder="Hasło"
                        className={styles.textInput}
                        required
                        ref={el=>passwordRef.current=el}
                    />
                    <div className={styles.flexColumnSep}></div>
                    <input
                        onChange={(event)=> setConfirmPassword(event.target.value)}
                        id="confirmPassword"
                        type="password"
                        placeholder="Potwierdź hasło"
                        className={styles.textInput}
                        required
                        ref={el=>confirmPasswordRef.current=el}
                    />
                </div>
                <div className={styles.flexRow}>
                    <PasswordStrengthBar
                        onChangeScore={(score, feedback)=>setPasswordScore(score)}
                        setPasswordScore={setPasswordScore}
                        className={styles.fullWidth}
                        password={password}
                    ></PasswordStrengthBar>
                </div>
                <div className={styles.flexRow}>
                    <select
                        onChange={(event)=>setGender(event.target.value)}
                        id="gender"
                        className={styles.textInput}
                        defaultValue="Wybierz płeć:"
                        required
                    >
                        <option value="Wybierz płeć:" disabled >Wybierz płeć:</option>
                        <option value="FEMALE">Kobieta</option>
                        <option value="MALE">Mężczyzna</option>
                        <option value="OTHER">Inna</option>
                        </select>
                    <div className={styles.flexColumnSep}></div>
                    <input
                        onChange={(event)=>setBirthDate(event.target.value)}
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
                        onChange={()=>setAgreement(!agreement)}
                        id="agreement"
                        type="checkbox"
                        className={styles.checkboxInput}
                        required
                    />
                    <label htmlFor="agreement">Wyrażam zgodę na przetwarzanie moich danych osobowych.</label>
                </div>
                <button onClick={validatePassword} type="submit" className={styles.submitButton}>ZAREJESTRUJ</button>
            </form>
        </div>
    )
}

export default  RegisterForm;