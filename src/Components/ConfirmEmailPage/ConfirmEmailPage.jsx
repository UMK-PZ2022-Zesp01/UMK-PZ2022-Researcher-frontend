import React, { useEffect } from 'react';
import styles from './ConfirmEmailPage.module.css';
import ConfirmEmailPageStyle from './ConfirmEmailPageStyle';
import { useNavigate, useParams } from 'react-router-dom';
import getApiUrl from '../../Common/Api';
import { Loading } from '../Loading/Loading';

const CONFIRM_URL = getApiUrl() + 'user/confirm';

export default function ConfirmEmailPage() {
    const navigate = useNavigate();
    const { token } = useParams();

    const [isLoading, setIsLoading] = React.useState(true);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [text, setText] = React.useState('Aktywacja konta w toku...');

    const sendToken = async () => {
        try {
            const response = await fetch(`${CONFIRM_URL}?token=${token}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset:UTF-8',
                },
            });
            switch (response?.status) {
                case 201: //CREATED, account activated
                    setIsSuccessful(true);
                    setText('Pomyślnie aktywowano. Możesz zalogować się na swoje konto.');
                    break;
                case 204:
                    setIsSuccessful(true);
                    setText('To konto jest już aktywowane. Możesz zalogować się na swoje konto.');
                    break;
                case 401:
                    setIsSuccessful(false);
                    setText('Aktywacja nie powiodła się. Niepoprawny token.');
                    break;
                default:
                    console.log(response);
                    setIsSuccessful(false);
                    setText(
                        'Aktywacja konta nie powiodła się. Prosimy spróbować ponownie później.'
                    );
            }
        } catch (e) {
            console.log(e);
            setIsSuccessful(false);
            setText('Aktywacja konta nie powiodła się. Prosimy spróbować ponownie później.');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        sendToken();
    }, [token]);

    const onTryAgainButtonClicked = () => {
        sendToken();
    };

    const onGoBackButtonClicked = () => {
        navigate('/login', { replace: true });
    };

    return (
        <div className={styles.confirmEmailPanel}>
            <Loading isLoading={isLoading} isSuccessful={isSuccessful} />
            <header className={styles.h2}>{text}</header>
            <div className={styles.flexRow}>
                {!isSuccessful && (
                    <button className={styles.button} onClick={onTryAgainButtonClicked}>
                        Spróbuj ponownie
                    </button>
                )}
                <button className={styles.button} onClick={onGoBackButtonClicked}>
                    Wróć do ekranu logowania
                </button>
            </div>
        </div>
    );
}
