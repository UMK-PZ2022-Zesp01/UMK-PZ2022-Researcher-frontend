import React from "react";
import styles from './Popup.module.css';

function Popup({ enabled, children, direction }) {
    const popupClass = enabled
        ? `${styles.popupEnabled} ${styles[direction]} `
        : `${styles[direction]}`;

    return <div className={popupClass}>{children}</div>;
}

Popup.defaultProps = {
    enabled: false,
    children: [],
    direction: 'horizontal',
};

export {Popup};
