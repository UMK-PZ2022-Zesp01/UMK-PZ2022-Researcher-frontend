import React from 'react';
import './Popup.css';

function Popup({ enabled, children, direction }) {
  const popupClass = enabled ? `popupEnabled popup${direction} ` : `popup${direction}`;

  return <div className={popupClass}>{children}</div>;
}

Popup.defaultProps = {
  enabled: false,
  children: [],
  direction: 'Horizontal',
};

export { Popup };
