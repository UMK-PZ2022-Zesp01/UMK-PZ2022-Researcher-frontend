import styles from './LoadingDots.module.css';

export const LoadingDots = () => {
    return (
        <div className={styles.container}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    );
};
