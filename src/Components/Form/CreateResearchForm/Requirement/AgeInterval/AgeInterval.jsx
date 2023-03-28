import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './AgeInterval.module.css';

function AgeInterval({ index, data, handleUpdate, handleDelete }) {
    const { ageMin, ageMax } = data;

    return (
        <div className={styles.ageIntervalContainer}>
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
                    onChange={event =>
                        handleUpdate(index, {
                            ageMin: Number(event.target.value),
                            ageMax: ageMax,
                        })
                    }
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
                    onChange={event =>
                        handleUpdate(index, {
                            ageMin: ageMin,
                            ageMax: Number(event.target.value),
                        })
                    }
                />
            </div>

            <div
                onClick={() => handleDelete(index)}
                className={styles.removeRequirementButton}
                title="Usuń kryterium"
            >
                <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
            </div>
        </div>
    );
}

AgeInterval.defaultProps = {
    data: { ageMin: null, ageMax: null },
};

export { AgeInterval };
