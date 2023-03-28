import React from 'react';

import styles from './Loading.module.css';
import LoadingStyle from './LoadingStyle';

export function Loading(props) {
    // const styles = LoadingStyle();

    const { isLoading, isSuccessful } = props;

    const getChungusStyle = () => {
        return `${styles.chungus} ${
            isLoading
                ? styles.chungusLoad
                : isSuccessful
                ? styles.chungusCheck
                : styles.chungusCross
        }`;
    };
    return <div className={getChungusStyle()}></div>;
}

Loading.defaultProps = {
    isLoading: true,
    isSuccessful: false,
};
