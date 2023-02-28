import React from "react";
import RegisteredSuccessfullyPageStyle from "./RegisteredSuccessfullyPageStyle";
import {Navigate, useLocation} from "react-router-dom";
import getApiUrl from "../../Common/Api";


const RESEND_URL = `${getApiUrl()}user/resendVerificationMail`

export default function RegisteredSuccessfullyPage(){
    const styles=RegisteredSuccessfullyPageStyle()

    const location = useLocation()
    // const email= React.useState("owszemniebotak@gmail.com")

    const email = location?.state?.email
    const username = location?.state?.username

    // return<div className={styles.registeredSuccessfullyPanel}>
    //         <div className={styles.chungusCheck}></div>
    //         <article>
    //             <header className={styles.h2}>Rejestracja przebiegła pomyślnie</header>
    //             <section>
    //                 <h3 className={styles.h3}>Wysłaliśmy do Ciebie wiadomość z linkiem aktywacyjnym na adres: {email}.</h3>
    //                     <h3 className={styles.h3}>Kliknij link w wiadomości, aby potwierdzić adres email.</h3>
    //             </section>
    //             <br/>
    //             <section>
    //                 Wiadomość nie dotarła? <button className={styles.button}>Wyślij ponownie</button>
    //             </section>
    //         </article>
    //     </div>

    const sendVerificationMail = async () =>{
        const response = await fetch(`${RESEND_URL}?username:${username}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset:UTF-8',
            }
        })
        const result = response.ok
    }




    const handleResendButtonClicked = () => {

    }

    return email ? (
        <div className={styles.registeredSuccessfullyPanel}>
                <div className={styles.chungusCheck}></div>
                <article>
                    <header className={styles.h2}>Rejestracja przebiegła pomyślnie</header>
                    <section>
                        <h3 className={styles.h3}>Wysłaliśmy do Ciebie wiadomość z linkiem aktywacyjnym na adres: {email}.</h3>
                            <h3 className={styles.h3}>Kliknij link w wiadomości, aby potwierdzić adres email.</h3>
                    </section>
                    <br/>
                    <section>
                        Wiadomość nie dotarła?
                        <button className={styles.button} onClick={handleResendButtonClicked}>Wyślij ponownie</button>
                    </section>
                </article>
            </div>
        ) : (
            <Navigate to={'/'} state={{ from: location }} replace/>
    )

}