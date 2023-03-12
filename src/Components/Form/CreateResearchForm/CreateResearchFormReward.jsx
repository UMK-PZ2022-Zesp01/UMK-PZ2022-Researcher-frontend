import CreateResearchFormRewardStyle from "./CreateResearchFormRewardStyle";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CreateResearchFormReward({ addRewardItem }) {
  const styles = CreateResearchFormRewardStyle();

  const [rewardType, setRewardType] = useState("");
  const [rewardCashValue, setRewardCashValue] = useState(null);
  const [rewardItemName, setRewardItemName] = useState(null);

  const handleRewardTypeSelect = (event) => {
    setRewardType(event.target.value);
  };

  const handleRewardCashValueChange = (event) => {
    setRewardCashValue(event.target.value);
  };

  const handleRewardItemNameChange = (event) => {
    setRewardItemName(event.target.value);
  };

  const handleRemoveRewardButtonClick = () => {

  };

  return (
    <div className={styles.rewardRow}>
      <select onChange={handleRewardTypeSelect} className={styles.formInputRegular}
              name="reward-type" id="reward-type-select" required>
        <option value="" disabled selected>Wybierz typ nagrody...</option>
        <option value="reward-cash">pieniężna</option>
        <option value="reward-item">przedmiot / upominek</option>
      </select>

      {rewardType === "reward-cash" &&
        <input className={styles.formInputRegular}
               type="number" min="0" step="0.01" id="reward-value" name="reward-value"
               placeholder="Kwota w zł" required onChange={handleRewardCashValueChange}
        />
      }

      {rewardType === "reward-item" &&
        <input className={styles.formInputRegular}
               type="text" id="reward-value" name="reward-value"
               placeholder="Nazwa przedmiotu / upominku" required onChange={handleRewardItemNameChange}
        />
      }

      <div className={styles.removeRewardButton} onClick={handleRemoveRewardButtonClick}
           title="Usuń nagrodę">
        <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
      </div>
    </div>
  );
}

export { CreateResearchFormReward };