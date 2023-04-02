import React, { useEffect } from 'react';
import styles from './RegisteredSuccessfullyPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import getApiUrl from '../../Common/Api';
import { Loading } from '../Loading/Loading';

const DEMAND_URL = `${getApiUrl()}user/sendVerificationMail`;

export default function RegisteredSuccessfullyPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const username = location?.state?.username;
    const [isLoading, setIsLoading] = React.useState(true);
    const [isSuccessful, setIsSuccessful] = React.useState(false);

    const [header, setHeader] = React.useState('Wczytywanie');
    const [text, setText] = React.useState('');

    const demandVerificationMail = async () => {
        try {
            const response = await fetch(`${DEMAND_URL}?login=${username}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset:UTF-8',
                },
            });

            switch (response?.status) {
                case 201:
                    const json = await response.json();
                    setIsSuccessful(true);
                    setHeader('Rejestracja przebiegła pomyślnie');
                    setText(
                        `Wysłaliśmy do Ciebie wiadomość z linkiem aktywacyjnym na adres: ${json}.
                               \nKliknij link w wiadomości, aby potwierdzić adres email.`
                    );
                    break;
                case 204:
                    setIsSuccessful(false);
                    setHeader('Coś poszło nie tak.');
                    setText('Użytkownik nie istnieje, lub jego konto jest już aktywowane.');
                    break;
                default:
                    setIsSuccessful(false);
                    setHeader('Coś poszło nie tak.');
            }
        } catch (error) {
            setIsSuccessful(false);
            setHeader('Błąd serwera');
            setText('Prosimy spróbować ponownie później');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (username == null) navigate('/', { replace: true });

        demandVerificationMail();
    }, [username]);

    const handleResendButtonClicked = () => {
        setIsLoading(true);
        setIsSuccessful(false);
        setHeader('Wczytywanie');
        setText('');
        setTimeout(() => {
            demandVerificationMail();
        }, 1000);
    };

    return (
        <div className={styles.registeredSuccessfullyPanel}>
            <Loading isLoading={isLoading} isSuccessful={isSuccessful}></Loading>
            <header className={styles.h2}>{header}</header>
            <section>
                <h3 className={styles.h3}>{text}</h3>
            </section>
            <br />
            {!isLoading && (
                <section>
                    Wiadomość nie dotarła?
                    <button className={styles.button} onClick={handleResendButtonClicked}>
                        Wyślij ponownie
                    </button>
                </section>
            )}
        </div>
    );
}
