import getApiUrl from "../Common/GetApiUrl.js"
import React from 'react';
import "./Form.css"


function LoginForm(){
    const [login, setLogin] = React.useState("")
    const [password, setPassword] = React.useState("")

    //z tablicy ogloszen, do gruntownej zmiany
    // function SubmitButtonClicked(event){
    //     event.preventDefault()
    //     fetch(getApiUrl()+ "?login=" + login + "&password=" + password, {
    //         method: "GET",
    //         credentials: "include"
    //     }).then(response => {
    //         try{
    //             response.json().then(result => props.userSetter(result))
    //         }catch (err){
    //             console.log("error",err)
    //         }
    //     })
    // }

    function SubmitButtonClicked(event){
        event.preventDefault()

    }

    return(
        <div className="loginFormBox">
            <div className="hBox">
                <h2>Zaloguj się</h2>
            </div>
            <form onSubmit={(event)=>SubmitButtonClicked(event)} className="loginForm">
                <input
                    id="login"
                    type="text"
                    placeholder="Login lub adres email"
                    className="textInput"
                    required
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    className="textInput"
                    required
                />
                <a href="/" className="aPurple">Nie pamiętam hasła</a>
                <button type="submit" className="submitButton">ZALOGUJ</button>
                <div className="orLoginWith"><span>lub</span></div>
                <div className="flexRow">
                    <button className="loginWith">Zaloguj z G</button>
                    <button className="loginWith">Zaloguj z FB</button>
                </div>

            </form>
        </div>
    )
}

export default LoginForm;