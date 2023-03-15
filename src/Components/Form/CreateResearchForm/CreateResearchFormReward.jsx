import "./CreateResearchFormReward.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';

function CreateResearchFormReward({ index, data, handleUpdate, handleDelete }) {

  const { type, value } = data;

  return (
    <div className="rewardRow">
      <select required className="formInputRegular" id={uuidv4()} name="reward-type" defaultValue={type}
              onChange={event => handleUpdate(index, { type: event.target.value, value: null })}>
        <option value="" disabled>Wybierz typ nagrody...</option>
        <option value="cash">pieniężna</option>
        <option value="item">przedmiot / upominek</option>
      </select>

      {type === "cash" &&
        <input required className="formInputRegular" type="number" min="0" step="0.01"
               id={uuidv4()} name="reward-value" placeholder="Kwota w zł" defaultValue={value}
               onChange={event => handleUpdate(
                 index, {
                   type: type,
                   value: Number(event.target.value)
                 }
               )}
        />
      }

      {type === "item" &&
        <input required className="formInputRegular" type="text" id={uuidv4()} name="reward-value"
               placeholder="Nazwa przedmiotu / upominku" defaultValue={value}
               onChange={event => handleUpdate(
                 index, {
                   type: type,
                   value: event.target.value
                 }
               )}
        />
      }

      <div className="removeRewardButton" onClick={() => handleDelete(index)}
           title="Usuń nagrodę">
        <FontAwesomeIcon icon={faTrash} className="trashIcon" />
      </div>
    </div>
  );
}

CreateResearchFormReward.defaultProps = {
  data: { type: "", value: null }
};

export { CreateResearchFormReward };