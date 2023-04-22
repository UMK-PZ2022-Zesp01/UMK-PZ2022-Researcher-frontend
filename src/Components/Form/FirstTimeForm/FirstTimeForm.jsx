import { GrClose } from 'react-icons/gr';
import styles from './FirstTimeForm.module.css';
import {Link} from 'react-router-dom'

const FirstTimeForm = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.popupContainer}
                onClick={e => {
                    e.stopPropagation();
                    localStorage.setItem("hasLoggedInBefore", true);
                }}
            >
                <GrClose
                    onClick={() => {
                        onClose();
                        localStorage.setItem("hasLoggedInBefore", true);
                        window.document.body.style.overflowY = `visible`;
                    }}
                    className={styles.closeBtn}
                />
                <h1>Dziękujemy, że jesteś z nami!</h1>
                <h3>Aby ułatwić innym kontakt z tobą, dodaj do swojego profilu dane kontaktowe.</h3>
                <h3> Możesz zrobić to w każdej chwili z poziomu profilu użytkownika</h3>
                <div>
                    <Link to={`/profile`}>
                        <button className={styles.profileBtn} onClick={onClose}>
                         PROFIL UŻYTKOWNIKA
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export { FirstTimeForm };