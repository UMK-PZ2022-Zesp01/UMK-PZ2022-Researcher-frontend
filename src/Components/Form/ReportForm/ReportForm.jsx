import FormStyle from '../LoginRegisterForm/FormStyle';
import { GrClose } from 'react-icons/gr';

const ReportForm = ({ open, onClose }) => {
    const styles = FormStyle();

    if (!open) return null;
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.popupContainer}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <GrClose onClick={onClose} className={styles.closeBtn}>
                    {' '}
                    X{' '}
                </GrClose>
                <h1>Oops! Coś się POJEBAŁO!!!!</h1>
                <h3>machnij nam paragraf a my tego nie poprawimy</h3>
                <textarea className={styles.bugInput}></textarea>
                <button className={styles.bugBtn} onClick={onClose}>
                    ZGŁOŚ BŁĄD
                </button>
            </div>
        </div>
    );
};

export default ReportForm;
