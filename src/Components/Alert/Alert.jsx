import React from 'react';
import './Alert.css';

function Alert({ type, onClose, children }) {
    const alertClass = `alert alert${type}`;
    const iconClass = `alertIcon icon${type}`;

    return (
        <div className={alertClass}>
            <div className="toLeft">
                <div className={'iconContainer'}>
                    <div className={iconClass}></div>
                </div>
                <div className={'textContainer'}>{children}</div>
            </div>
            <div className="toRight">
                <div className={'buttonContainer'}>
                    <button onClick={onClose} className={'closeButton'}></button>
                </div>
            </div>
        </div>
    );
}

Alert.defaultProps = {
    type: 'Error',
    children: [],
    onClose: () => {},
};

export { Alert };
