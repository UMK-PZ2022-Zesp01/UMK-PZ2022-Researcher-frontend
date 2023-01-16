import React from 'react';
import {useContext} from "react";
import AuthContext from "../../Common/AuthProvider";
import FormStyle from "./FormStyle"
import getApiUrl from "../../Common/Api.js"

const LOGIN_URL = 'login'

function LoginForm(){
    const {setAuth} = useContext(AuthContext);
    const styles=FormStyle()
    const [username, setUsername] = React.useState("")
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

    async function SubmitButtonClicked(event) {
        event.preventDefault()

        try {
            await fetch(getApiUrl() + LOGIN_URL, {
                method: "POST",
                credentials:"include",
                headers: {
                    'Content-Type': 'application/json; charset:UTF-8',
                },
                body: JSON.stringify({username,password})
            }).then(response => {
                if(response.ok){
                    response.text().then(text=>{
                        console.log(text)
                        // const refreshToken =
                        const accessToken = text;
                        // const roles = response?.data?.roles;
                        setAuth({username,password, accessToken});
                        setUsername('')
                        setPassword('')
                    })
                }
            }).catch((reason)=>{
                console.log(reason)
            })
        } catch (error) {
            if(!error.response){
                console.log('No server response.')
            }else if(error.response?.status === 400 ){
                console.log("Missing username or password.")
            }else if (error.response?.status === 401){
                console.log('Unauthorized.')
            }
            console.log(error)
        }
    }

    const handleUsernameChanged = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChanged = (event) => {
        setPassword(event.target.value)
    }

    return(
        <section className={styles.loginFormBox}>
            <div className={styles.hBox}>
                <div className={styles.h2}>Zaloguj się</div>
            </div>
            <form onSubmit={(event)=>SubmitButtonClicked(event)} className={styles.loginForm}>
                <input
                    onChange={(event)=>handleUsernameChanged(event)}
                    autoFocus
                    id="usernameLog"
                    type="text"
                    placeholder="Login lub adres email"
                    className={styles.textInput}
                    required
                />
                <input
                    onChange={(event)=>handlePasswordChanged(event)}
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
        </section>
    )
}

export default LoginForm;