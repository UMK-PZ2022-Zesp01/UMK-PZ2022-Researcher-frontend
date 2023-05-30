import styles from './AcceptCookies.module.css';
import getApiUrl from '../../Common/Api';
import useAuth from '../../hooks/useAuth';

const EDIT_URL = `${getApiUrl()}user/current/update`;

const AcceptCookies = ({open, onClose}) => {
    const {accessToken} = useAuth().auth;

    const updateCookies = async () => {
        try {
            await fetch(EDIT_URL, {
                method: 'PUT',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({acceptedCookies: true}),
            });
        } catch (error) {
            console.error(error);
        }
    };

    return open ? (
        <div className={styles.overlay}>
            <div
                className={styles.popupContainer}
            >
                <h1>Używamy pliki cookie</h1>
                <h3>Wykorzystujemy pliki cookie do usprawnienia działania
                    naszego serwisu. Chcąc zapewnić jak najlepsze doświadczenie
                    dla naszych użytkowników, przed przejściem dalej wymagane jest
                    ich zaakceptowanie. </h3>
                <div>

                    <button className={styles.profileBtn} onClick={onClose}>
                        AKCEPTUJĘ
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export {AcceptCookies};