import "./LoginRegisterPage.css"
import BannerWhite from "./BannerWhite";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Alert, Collapse} from "@mui/material";
import React from "react";


function LoginRegisterPage(){
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
                return(<Alert onClose={()=>closeAlert()} severity="error">Nieznany błąd.</Alert>)
        }
    }

    return(
        <div className="loginRegisterPage">

            <div className="loginRegisterPanel">
                <div className="alertOverlay">
                    <Collapse in={alert.alertOpen}>
                        {showAlert()}
                    </Collapse>
                </div>
                <div className="header">
                    <BannerWhite/>
                </div>
                <div className="main">
                    <LoginForm setters={setAlert}/>
                    <div className="separator"/>
                    <RegisterForm setters={setAlert}/>
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterPage;