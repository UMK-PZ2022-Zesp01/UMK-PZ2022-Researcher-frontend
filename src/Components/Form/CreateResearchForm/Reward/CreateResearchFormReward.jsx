import React from 'react';
import './CreateResearchFormReward.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function CreateResearchFormReward({ index, data, handleUpdate, handleDelete }) {
    const { type, value } = data;

    return (
        <div className="rewardContainer">
            <select
                required
                className="formInputRegular"
                name="reward-type"
                defaultValue={type}
                onChange={event => handleUpdate(index, { type: event.target.value, value: null })}
            >
                <option value="" disabled>
                    Wybierz typ nagrody...
                </option>
                <option value="cash">pieniężna</option>
                <option value="item">upominek</option>
                <option value="other">inna</option>
            </select>

            {type === 'cash' && (
                <input
                    required
                    className="formInputRegular"
                    type="number"
                    min="0"
                    step="0.01"
                    name="reward-value"
                    placeholder="Kwota w zł"
                    defaultValue={Number(value) / 100}
                    onChange={event =>
                        handleUpdate(index, {
                            type: type,
                            value: Math.round((Number(event.target.value) + Number.EPSILON) * 100),
                        })
                    }
                />
            )}

            {type === 'item' && (
                <input
                    required
                    className="formInputRegular"
                    type="text"
                    name="reward-value"
                    placeholder="Podaj nazwę..."
                    defaultValue={value}
                    onChange={event =>
                        handleUpdate(index, {
                            type: type,
                            value: event.target.value,
                        })
                    }
                />
            )}

            {type === 'other' && (
                <input
                    required
                    className="formInputRegular"
                    type="text"
                    name="reward-value"
                    placeholder="Podaj nazwę..."
                    defaultValue={value}
                    onChange={event =>
                        handleUpdate(index, {
                            type: type,
                            value: event.target.value,
                        })
                    }
                />
            )}

            <div
                className="removeRewardButton"
                onClick={() => handleDelete(index)}
                title="Usuń nagrodę"
            >
                <FontAwesomeIcon icon={faTrash} className="trashIcon" />
            </div>
        </div>
    );
}

CreateResearchFormReward.defaultProps = {
    data: { type: '', value: null },
};

export { CreateResearchFormReward };
