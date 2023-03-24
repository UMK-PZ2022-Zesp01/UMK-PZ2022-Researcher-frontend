import '../../CreateResearchForm.css';
import './CustomRequirement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function CustomRequirement({ index, data, handleUpdate, handleDelete }) {
    const { type, description } = data;

    return (
        <div className="formRow">
            <input
                required
                className="formInputRegular"
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
                className="formInputRegular"
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
                className="removeRequirementButton"
                title="Usuń kryterium"
            >
                <FontAwesomeIcon icon={faTrash} className="trashIcon" />
            </div>
        </div>
    );
}

CustomRequirement.defaultProps = {
    data: { type: '', description: '' },
};

export { CustomRequirement };
