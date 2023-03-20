import React from 'react';
import LoginRegisterPageStyle from './LoginRegisterPageStyle';
import BannerWhite from '../Banner/BannerWhite';
import LoginForm from '../Form/LoginForm';
import RegisterForm from '../Form/RegisterForm';
import { Helmet } from 'react-helmet';
import { Alert } from '../Alert/Alert';
import { Popup } from '../Popup/Popup';

export default function LoginRegisterPage() {
  const styles = LoginRegisterPageStyle();

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
          <Alert onClose={closeAlert} type={'Success'} text={alert.alertText}>
            {alert.alertText}
          </Alert>
        );
      case 298:
      case 299:
        return (
          <Alert onClose={closeAlert} type={'Warning'} text={alert.alertText}>
            {alert.alertText}
          </Alert>
        );
      default:
        return (
          <Alert onClose={closeAlert} type={'Error'} text={alert.alertText}>
            {alert.alertText}
          </Alert>
        );
    }
  }

  return (
    <div className={styles.loginRegisterPage}>
      <Helmet>
        <title>Researcher | Logowanie</title>
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
