import getApiUrl from "../Common/GetApiUrl.js"
import React from 'react';
import "./Form.css"

function RegisterForm(){
    let currentTime = new Date().toISOString().split("T")[0];

    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordRep, setPasswordRep] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [birthDate, setBirthDate] = React.useState("");
    const [agreement, setAgreement] = React.useState("")

    function SubmitButtonClicked(event){
        event.preventDefault()

    }
    return(
        <div className="registerFormBox">
            <div className="hBox">
                <h3>Nie posiadasz konta?</h3>
                <h2>Zarejestruj się</h2>
            </div>
            <form onSubmit={(event)=>SubmitButtonClicked(event)} className="registerForm">
                <div className="flexRow">
                    <div className="flexColumn">
                        <input
                            onChange={(event)=>setName(event.target.value)}
                            id="name"
                            type="text"
                            placeholder="Imię"
                            className="textInput"
                            required
                        />
                        <input
                            onChange={(event)=>setUsername(event.target.value)}
                            id="username"
                            type="text"
                            placeholder="Nazwa użytkownika"
                            className="textInput"
                            required
                        />
                        <input
                            onChange={(event)=>setPassword(event.target.value)}
                            id="password"
                            type="password"
                            placeholder="Hasło"
                            className="textInput"
                            required
                        />
                        <select
                            onChange={(event)=>setGender(event.target.value)}
                            id="gender"
                            className="textInput"
                            defaultValue="Wybierz płeć:"
                            required
                        >
                            <option value="Wybierz płeć:" disabled >Wybierz płeć:</option>
                            <option value="Kobieta">Kobieta</option>
                            <option value="Mężczyzna">Mężczyzna</option>
                            <option value="Inna">Inna</option>
                            </select>
                    </div>
                    <div className="flexColumnSep"></div>
                    <div className="flexColumn">
                        <input
                            onChange={(event)=>setSurname(event.target.value)}
                            id="surname"
                            type="text"
                            placeholder="Nazwisko"
                            className="textInput"
                            required
                        />
                        <input
                            onChange={(event)=>setEmail(event.target.value)}
                            id="email"
                            type="email"
                            placeholder="Adres e-mail"
                            className="textInput"
                            required
                        />
                        <input
                            onChange={(event)=>setPasswordRep(event.target.value)}
                            id="passwordRep"
                            type="password"
                            placeholder="Powtórz hasło"
                            className="textInput"
                            required
                        />
                        <input
                            onChange={(event)=>setBirthDate(event.target.value)}
                            id="birthdate"
                            type="date"
                            className="textInput"
                            min="1900-01-01"
                            max={currentTime}
                            required
                        />
                    </div>
                </div>
                <div className="agreementBox">
                    <input
                        onChange={()=>setAgreement(true)}
                        id="agreement"
                        type="checkbox"
                        className="checkboxInput"
                        required
                    />
                    <label htmlFor="agreement">Wyrażam zgodę na przetwarzanie moich danych osobowych.</label>
                </div>
                <button type="submit" className="submitButton">ZAREJESTRUJ</button>
            </form>
        </div>
    )
}

export default  RegisterForm;