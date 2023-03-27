import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './AgeInterval.css';

function AgeInterval({ index, data, handleUpdate, handleDelete }) {
    const { ageMin, ageMax } = data;

    return (
        <div className="ageIntervalContainer">
            <div className="checkboxAge">
                <label className="checkboxLabel">limit dolny:</label>
                <input
                    required
                    className="formInputRegular"
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

            <div className="checkboxAge">
                <div className="checkboxElement">
                    <label className="checkboxLabel">limit górny:</label>
                </div>
                <input
                    required
                    className="formInputRegular"
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
                className="removeRequirementButton"
                title="Usuń kryterium"
            >
                <FontAwesomeIcon icon={faTrash} className="trashIcon" />
            </div>
        </div>
    );
}

AgeInterval.defaultProps = {
    data: { ageMin: null, ageMax: null },
};

export { AgeInterval };
