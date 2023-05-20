import { GrClose } from 'react-icons/gr';
import styles from './ReportForm.module.css';

const ReportForm = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.popupContainer}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <GrClose
                    onClick={() => {
                        onClose();
                        window.document.body.style.overflowY = `visible`;
                    }}
                    className={styles.closeBtn}
                />
                <h1>Ups! Coś nie działa?</h1>
                <h3>Wyślij nam wiadomość, postaramy się to poprawić!</h3>
                <textarea className={styles.bugInput}></textarea>
                <button className={styles.bugBtn} onClick={onClose}>
                    ZGŁOŚ BŁĄD
                </button>
            </div>
        </div>
    );
};

export { ReportForm };
