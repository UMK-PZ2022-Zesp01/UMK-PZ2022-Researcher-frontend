import getApiUrl from "../Common/Api.js"
import React from 'react';
import "./Form.css"
import {useRef} from "react";


function RegisterForm(props){
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [birthDate, setBirthDate] = React.useState("");
    const [agreement, setAgreement] = React.useState(false)


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
        let element = confirmPasswordRef.current
        if (password!==confirmPassword){
            element.setCustomValidity("Hasła się nie zgadzają.")
        }else {
            element.setCustomValidity("")
        }
    }

    function SubmitButtonClicked(event){
        event.preventDefault()

        // fetch(getApiUrl() + "add", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // }).then(response => {
        //     try {
        //         switch(response.status){
        //             case 201: //SUCCESS
        //                 setAlert({
        //                     alertType:201,
        //                     alertText:"Rejestracja przebiegła pomyślnie!"
        //                 });
        //
        //                 break;
        //             case 203:
        //                 setAlert({
        //                     alertType:203,
        //                     alertText:"Coś sie zesrało"
        //                 });
        //                 break;
        //             default:
        //                 setAlert({
        //                     alertType:500,
        //                     alertText:"Coś sie zesrało"
        //                 });
        //         }
        //     } catch (error) {
        //         setAlert({
        //             alertType:6969,
        //             alertText:"Nawet nie wiem jaki błąd ma to niby wyłapać"
        //         });
        //     }
        // }).catch((error)=>{
        //     setAlert({
        //         alertType:6969,
        //         alertText:"Serwer sra"
        //     });
        //     console.log("serwer sra")
        // })

        fetch(getApiUrl() + "add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => {
            if(response.ok){
                setAlert({
                    alertType:201,
                    alertText:"Rejestracja przebiegła pomyślnie!"
                });
            }
            else
                setAlert({
                    alertType:response.status,
                    alertText:"Coś sie zesrało"
                });
        }).catch((error)=>{
            setAlert({
                alertType:999,
                alertText:"Serwer sra"
            });
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
                            onChange={(event)=> setConfirmPassword(event.target.value)}
                            id="confirmPassword"
                            type="password"
                            placeholder="Potwierdź hasło"
                            className="textInput"
                            required
                            ref={el=>confirmPasswordRef.current=el}
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
                <button onClick={validatePassword} type="submit" className="submitButton">ZAREJESTRUJ</button>
            </form>
        </div>
    )
}

export default  RegisterForm;