import styles from './CustomRequirement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function CustomRequirement({ index, data, handleUpdate, handleDelete }) {
    const { type, description } = data;

    return (
        <div className={styles.formRow}>
            <input
                required
                className={styles.formInputRegular}
                type="text"
                name="other-req-category"
                placeholder="Wpisz kategorię..."
                defaultValue={type}
                onChange={event =>
                    handleUpdate(index, {
                        type: event.target.value,
                        description: description,
                    })
                }
            />

            <input
                required
                className={styles.formInputRegular}
                type="text"
                name="other-req-desc"
                placeholder="Wpisz kryterium..."
                defaultValue={description}
                onChange={event =>
                    handleUpdate(index, {
                        type: type,
                        description: event.target.value,
                    })
                }
            />

            <div
                onClick={() => handleDelete(index)}
                className={styles.removeRequirementButton}
                title="Usuń kryterium"
            >
                <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
                <span className={styles.buttonVisible}>Usuń kryterium</span>
            </div>
        </div>
    );
}

CustomRequirement.defaultProps = {
    data: { type: '', description: '' },
};

export { CustomRequirement };
