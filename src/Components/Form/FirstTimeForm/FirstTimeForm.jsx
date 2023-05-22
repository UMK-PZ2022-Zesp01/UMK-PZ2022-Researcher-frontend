import { GrClose } from 'react-icons/gr';
import styles from './FirstTimeForm.module.css';
import { Link } from 'react-router-dom';
import getApiUrl from '../../../Common/Api';
import useAuth from '../../../hooks/useAuth';
const EDIT_URL = `${getApiUrl()}user/current/update`;

const FirstTimeForm = ({ open, onClose }) => {
    const { accessToken } = useAuth().auth;

    const loginUpdate = async () => {
        try {
            await fetch(EDIT_URL, {
                method: 'PUT',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lastLoggedIn: true }),
            });
        } catch (error) {
            console.error(error);
        }
    };

    return open ? (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.popupContainer}
                onClick={async e => {
                    e.stopPropagation();
                    await loginUpdate();
                }}
            >
                <GrClose
                    onClick={async () => {
                        onClose();
                        await loginUpdate();
                        window.document.body.style.overflowY = `visible`;
                    }}
                    className={styles.closeBtn}
                />
                <h1>Dziękujemy, że jesteś z nami!</h1>
                <h3>Aby ułatwić innym kontakt z tobą, dodaj do swojego profilu dane kontaktowe.</h3>
                <h3>Możesz zrobić to w każdej chwili z poziomu profilu użytkownika</h3>
                <div>
                    <Link to={`/profile`}>
                        <button className={styles.profileBtn} onClick={onClose}>
                            PROFIL UŻYTKOWNIKA
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export { FirstTimeForm };
