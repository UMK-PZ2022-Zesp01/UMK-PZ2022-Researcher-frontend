import React from 'react';
import './LoginRegisterPage.css';
import BannerWhite from '../Banner/BannerWhite';
import LoginForm from '../Form/LoginForm';
import RegisterForm from '../Form/RegisterForm';
import { Helmet } from 'react-helmet';
import { Alert } from '../Alert/Alert';
import { Popup } from '../Popup/Popup';

export default function LoginRegisterPage() {
    const [alert, setAlert] = React.useState({
        alertOpen: false,
        alertType: 0,
        alertText: '',
    });

    const closeAlert = () =>
        setAlert({
            alertOpen: false,
            alertType: alert.alertType,
            alertText: alert.alertText,
        });

    function showAlert() {
        switch (alert.alertType) {
            case 201:
                return (
                    <Alert onClose={() => closeAlert()} severity="success">
                        {alert.alertText}
                    </Alert>
                );
            case 298:
            case 299:
                return (
                    <Alert onClose={() => closeAlert()} severity="warning">
                        {alert.alertText}
                    </Alert>
                );
            default:
                return (
                    <Alert onClose={() => closeAlert()} severity="error">
                        {alert.alertText}
                    </Alert>
                );
        }
    }

    return (
        <div className="loginRegisterPage">
            <Helmet>
                <title>Zaloguj się | Researcher</title>
            </Helmet>
            <div className="loginRegisterPanel">
                <div className="alertOverlay">
                    <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
                </div>
                <div className="header">
                    <BannerWhite />
                </div>
                <main className="main">
                    <LoginForm setters={setAlert} />
                    <div className="separator" />
                    <RegisterForm setters={setAlert} />
                </main>
            </div>
        </div>
    );
}
