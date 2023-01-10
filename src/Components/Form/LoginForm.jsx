import getApiUrl from "../../Common/Api.js"
import React from 'react';
import FormStyle from "./FormStyle"


function LoginForm(){
    const styles=FormStyle()
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
        <div className={styles.loginFormBox}>
            <div className={styles.hBox}>
                <div className={styles.h2}>Zaloguj się</div>
            </div>
            <form onSubmit={(event)=>SubmitButtonClicked(event)} className={styles.loginForm}>
                <input
                    id="login"
                    type="text"
                    placeholder="Login lub adres email"
                    className={styles.textInput}
                    required
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    className={styles.textInput}
                    required
                />
                <a href="/" className={styles.aPurple}>Nie pamiętam hasła</a>
                <button type="submit" className={styles.submitButton}>ZALOGUJ</button>
                <div className={styles.orLoginWith}><span>lub</span></div>
                <div className={styles.flexRow}>
                    <button className={styles.loginWith}>Zaloguj z G</button>
                    <button className={styles.loginWith}>Zaloguj z FB</button>
                </div>

            </form>
        </div>
    )
}

export default LoginForm;