import React from 'react';
import styles from './Alert.module.css';

function Alert({ type, onClose, children }) {
    const alertClass = `${styles.alert} ${styles[type]}`;
    const iconClass = `${styles.icon} ${styles[type]}`;

    return (
        <div className={alertClass}>
            <div className={styles.toLeft}>
                <div className={styles.iconContainer}>
                    <div className={iconClass}></div>
                </div>
                <div className={styles.textContainer}>{children}</div>
            </div>
            <div className={styles.toRight}>
                <div className={styles.buttonContainer}>
                    <button onClick={onClose} className={styles.closeButton}></button>
                </div>
            </div>
        </div>
    );
}

Alert.defaultProps = {
    type: 'error',
    children: [],
    onClose: () => {},
};

export { Alert };
