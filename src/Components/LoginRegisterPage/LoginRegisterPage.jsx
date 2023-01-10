import React from "react";
import LoginRegisterPageStyle from "./LoginRegisterPageStyle";
import BannerWhite from "../Banner/BannerWhite";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";
import {Alert, Collapse} from "@mui/material";




function LoginRegisterPage(){
    const styles=LoginRegisterPageStyle()

    const [alert, setAlert] = React.useState({
        alertOpen: false,
        alertType: 0,
        alertText: ''
    });

    const closeAlert = () => setAlert({
        alertOpen: false,
        alertType: alert.alertType,
        alertText: alert.alertText
    })


    function showAlert(){
        switch (alert.alertType){
            case 201:
                return(<Alert onClose={()=>closeAlert()} severity="success">{alert.alertText}</Alert>)
            case 298:
            case 299:
                return(<Alert onClose={()=>closeAlert()} severity="warning">{alert.alertText}</Alert>)
            default:
                return(<Alert onClose={()=>closeAlert()} severity="error">{alert.alertText}</Alert>)
        }
    }

    return(
        <div className={styles.loginRegisterPage}>

            <div className={styles.loginRegisterPanel}>
                <div className={styles.alertOverlay}>
                    <Collapse in={alert.alertOpen}>
                        {showAlert()}
                    </Collapse>
                </div>
                <div className={styles.header}>
                    <BannerWhite/>
                </div>
                <div className={styles.main}>
                    <LoginForm setters={setAlert}/>
                    <div className={styles.separator}/>
                    <RegisterForm setters={setAlert}/>
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterPage;