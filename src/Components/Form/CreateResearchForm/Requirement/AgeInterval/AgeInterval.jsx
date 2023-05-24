import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './AgeInterval.module.css';
import { Alert } from '../../../../Alert/Alert';
import { Popup } from '../../../../Popup/Popup';

function AgeInterval({ index, data, handleUpdate, handleDelete }) {
    const [ageMin, setAgeMin] = useState(data.ageMin);
    const [ageMax, setAgeMax] = useState(data.ageMax);

    const ageMinRef = useRef(null);

    const validateAgeInterval = () => {
        let minA = ageMinRef.current;
        if (Number(ageMin) > Number(ageMax)) {
            minA.setCustomValidity('Limit dolny nie może być większy niż limit górny');
        } else {
            minA.setCustomValidity('');
        }
    };

    useEffect(validateAgeInterval, [ageMin, ageMax]);

    /*** Alerts Section ***/

    const [alert, setAlert] = React.useState({
        alertOpen: false,
        alertType: 0,
        alertText: '',
    });

    const closeAlert = () =>
        setAlert({
            alertOpen: false,
            alertType: alert.alertType,
            alertText: alert.alertText,
        });

    const showAlert = () => {
        switch (alert.alertType) {
            case 499:
                return (
                    <Alert onClose={closeAlert} type="warning">
                        {alert.alertText}
                    </Alert>
                );
            default:
                return (
                    <Alert onClose={closeAlert} type="error">
                        {alert.alertText}
                    </Alert>
                );
        }
    };

    return (
        <div className={styles.ageIntervalContainer}>
            <div className={alert.alertOpen ? styles.alertOverlay : styles.hidden}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>
            <div className={styles.checkboxAge}>
                <label className={styles.checkboxLabel}>limit dolny:</label>
                <input
                    required
                    className={styles.formInputRegular}
                    type="number"
                    min="1"
                    max="130"
                    name="age-min-value"
                    placeholder="Wpisz wiek..."
                    defaultValue={ageMin}
                    ref={element => (ageMinRef.current = element)}
                    onChange={event => {
                        setAgeMin(event.target.value);
                        handleUpdate(index, {
                            ageMin: Number(event.target.value),
                            ageMax: Number(ageMax),
                        });
                    }}
                />
            </div>

            <div className={styles.checkboxAge}>
                <div className={styles.checkboxElement}>
                    <label className={styles.checkboxLabel}>limit górny:</label>
                </div>
                <input
                    required
                    className={styles.formInputRegular}
                    type="number"
                    min="1"
                    max="130"
                    name="age-max-value"
                    placeholder="Wpisz wiek..."
                    defaultValue={ageMax}
                    onChange={event => {
                        setAgeMax(event.target.value);
                        handleUpdate(index, {
                            ageMin: Number(ageMin),
                            ageMax: Number(event.target.value),
                        });
                    }}
                />
            </div>

            <div
                onClick={() => handleDelete(index)}
                className={styles.removeRequirementButton}
                title="Usuń kryterium"
            >
                <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
                <span className={styles.buttonVisible}>Usuń przedział</span>
            </div>
        </div>
    );
}

AgeInterval.defaultProps = {
    data: { ageMin: null, ageMax: null },
};

export { AgeInterval };
