import React, { useState } from 'react';
import { BannerWhite } from '../Banner/BannerWhite';
import { LoginForm } from '../Form/LoginRegisterForm/LoginForm';
import { RegisterForm } from '../Form/LoginRegisterForm/RegisterForm';
import { Helmet } from 'react-helmet';
import { Alert } from '../Alert/Alert';
import { Popup } from '../Popup/Popup';

import styles from './LoginRegisterPage.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function LoginRegisterPage() {
    const { pathname } = useLocation();

    const [alert, setAlert] = useState({
        alertOpen: false,
        alertType: 0,
        alertText: '',
    });

    const [loginRegister, setLoginRegister] = useState(pathname === '/register');

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

    // const renderLoginOrRegister = () => {
    //     return loginRegister ? (
    //         <RegisterForm setters={setAlert} change={setLoginRegister} r />
    //     ) : (
    //         <LoginForm setters={setAlert} change={setLoginRegister} />
    //     );
    // };

    return (
        <div className={styles.loginRegisterPage}>
            <Helmet>
                <title>Zaloguj się | JustResearch</title>
            </Helmet>
            {/*<div className={styles.loginRegisterPanel}>*/}
            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>
            <Link to="/" className={styles.header}>
                <BannerWhite />
            </Link>

            <main className={styles.main}>
                <div className={`${styles.carousel} ${loginRegister ? '' : styles.alternative}`}>
                    <LoginForm setters={setAlert} change={() => setLoginRegister(!loginRegister)} />
                    <RegisterForm
                        setters={setAlert}
                        change={() => setLoginRegister(!loginRegister)}
                    />
                </div>
                {/*{renderLoginOrRegister()}*/}
            </main>
            {/*</div>*/}
        </div>
    );
}
