import getApiUrl from "../Common/Api.js"
import Alert from "./Alert"
import React from 'react';
import "./Form.css"


function RegisterForm(){
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordRep, setPasswordRep] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [birthDate, setBirthDate] = React.useState("");
    const [agreement, setAgreement] = React.useState(false)

    // const [alertType, setAlertType]=React.useState("")

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

    function SubmitButtonClicked(event){
        event.preventDefault()

        // setAlertType("greenAlert")

        fetch(getApiUrl()+"add", {
                method: "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user)
        }).then(response => {
            try{
                if(response.status===201){
                    
                }
                // response.json().then(result => {
                //     if (result.id != null){
                //         console.log(result)
                //     }
                // })
            }catch (error){
                console.log(error)
            }
        })
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
                            <option value="FEMALE">Kobieta</option>
                            <option value="MALE">Mężczyzna</option>
                            <option value="OTHER">Inna</option>
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
                        onChange={()=>setAgreement(!agreement)}
                        id="agreement"
                        type="checkbox"
                        className="checkboxInput"
                        required
                    />
                    <label htmlFor="agreement">Wyrażam zgodę na przetwarzanie moich danych osobowych.</label>
                </div>
                <button type="submit" className="submitButton">ZAREJESTRUJ</button>
            </form>
            {/*{alertType!=="" && <Alert alertType={alertType} text="Pomyślnie zarejestrowano"/>}*/}
        </div>
    )
}

export default  RegisterForm;