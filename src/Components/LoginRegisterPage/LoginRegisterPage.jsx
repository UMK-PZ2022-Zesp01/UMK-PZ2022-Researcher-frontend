import React from 'react';
import { BannerWhite } from '../Banner/BannerWhite';
import { LoginForm } from '../Form/LoginRegisterForm/LoginForm';
import { RegisterForm } from '../Form/LoginRegisterForm/RegisterForm';
import { Helmet } from 'react-helmet';
import { Alert } from '../Alert/Alert';
import { Popup } from '../Popup/Popup';

import styles from './LoginRegisterPage.module.css';

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
                    <Alert onClose={() => closeAlert()} type="success">
                        {alert.alertText}
                    </Alert>
                );
            case 298:
            case 299:
                return (
                    <Alert onClose={() => closeAlert()} type="warning">
                        {alert.alertText}
                    </Alert>
                );
            default:
                return (
                    <Alert onClose={() => closeAlert()} type="error">
                        {alert.alertText}
                    </Alert>
                );
        }
    }

    return (
        <div className={styles.loginRegisterPage}>
            <Helmet>
                <title>Zaloguj się | Researcher</title>
            </Helmet>
            <div className={styles.loginRegisterPanel}>
                <div className={styles.alertOverlay}>
                    <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
                </div>
                <div className={styles.header}>
                    <BannerWhite />
                </div>
                <main className={styles.main}>
                    <LoginForm setters={setAlert} />
                    <div className={styles.separator} />
                    <RegisterForm setters={setAlert} />
                </main>
            </div>
        </div>
    );
}
