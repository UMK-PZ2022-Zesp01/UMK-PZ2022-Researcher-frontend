import "./LoginRegisterPage.css"
import BannerWhite from "./BannerWhite";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Alert} from "@mui/material";
import React, {useEffect} from "react";


function LoginRegisterPage(){
    const [alert, setAlert] = React.useState({
        alertType: 0,
        alertText: ''
    });

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setAlert({
    //             alertType: 0,
    //             alertText: ''
    //         })
    //     },5000)
    // },[alert])

    function showAlert(){
        switch (alert.alertType){
            case 0:
                return (<div/>)
            case 201:
                return(<Alert severity="success">{alert.alertText}</Alert>)
            default:
                return(<Alert severity="error">{alert.alertText}</Alert>)
        }

    }

    return(
        <div className="loginRegisterPage">

            {showAlert()}

            <div className="loginRegisterPanel">
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