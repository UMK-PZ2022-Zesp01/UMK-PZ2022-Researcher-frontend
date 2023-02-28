import React, {useEffect} from "react";
import ConfirmEmailPageStyle from "./ConfirmEmailPageStyle";
import {Navigate, useLocation, useParams} from "react-router-dom";
import getApiUrl from "../../Common/Api";

const CONFIRM_URL=getApiUrl() + "user/confirm"

export default function ConfirmEmailPage(){
    const styles=ConfirmEmailPageStyle()

    const location = useLocation()
    const {token} = useParams()

    const [chungusClass, setChungusClass] = React.useState(styles.chungusLoad)
    const [text, setText] = React.useState("Aktywacja konta w toku...")

    useEffect(()=>{
        const sendToken = () =>{
            fetch(`${CONFIRM_URL}?token=${token}`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset:UTF-8',
                },
            }).then((response)=>{
                if(response.ok){
                    setChungusClass(styles.chungusCheck)
                    setText("Pomyślnie aktywowano. Możesz zalogować się na swoje konto.")
                }
                else{
                    setChungusClass(styles.chungusCross)
                    setText("Aktywacja konta nie powiodła się. Prosimy spróbować ponownie.")
                }
            }).catch((reason)=>{
                console.log(reason)
                setChungusClass(styles.chungusCross)
                setText("Aktywacja konta nie powiodła się. Prosimy spróbować ponownie później.")
            })
        }

        sendToken()
    },[token])


    // const getChungusAndMsg = (isLoading, isSuccessful) => {
    //     let a = isLoading
    //         ? [styles.chungusLoad,"Aktywacja konta w toku..."]
    //         : (isSuccessful
    //             ? [styles.chungusCheck, "Pomyślnie aktywowano"]
    //             : styles.chungusCross)
    // }


    return(
        <div className={styles.confirmEmailPanel}>
                <div className={`${styles.chungus} ${chungusClass}`}></div>
                <article>
                    <header className={styles.h2}>{text}</header>
                </article>
            </div>
        )
}