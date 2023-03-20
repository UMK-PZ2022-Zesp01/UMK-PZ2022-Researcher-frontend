import React from 'react';
import './Alert.css';

function Alert({ type, text, onClose }) {
  const alertClass = `alert alert${type}`;
  const iconClass = `icon icon${type}`;

  return (
    <div className={alertClass}>
      <div className="toLeft">
        <div className={'iconContainer'}>
          <div className={iconClass}></div>
        </div>
        <div className={'textContainer'}>{text}</div>
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
  text: '',
  onClose: () => {},
};

export { Alert };
