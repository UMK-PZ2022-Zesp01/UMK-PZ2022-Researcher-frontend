import React, { useState } from "react";
import CreateResearchFormStyle from "./CreateResearchFormStyle";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateResearchForm() {

  const styles = CreateResearchFormStyle();

  const [researchForm, setResearchForm] = useState("");
  const handleResearchFormSelect = (event) => {
    setResearchForm(event.target.value);
  };

  const [rewardType, setRewardType] = useState("");
  const handleRewardTypeSelect = (event) => {
    setRewardType(event.target.value);
  };

  const [reqType, setReqType] = useState("");
  const handleReqTypeSelect = (event) => {
    setReqType(event.target.value);
  };

  const RewardDiv = () => {
    return (
      <>
        <select onChange={handleRewardTypeSelect} className={styles.formInputRegular}
                name="reward-type" id="reward-type-select">
          <option value="" disabled selected>Wybierz typ nagrody...</option>
          <option value="reward-cash">pieniężna</option>
          <option value="reward-item">przedmiot / upominek</option>
        </select>
        {rewardType === "reward-cash" &&
          <input className={styles.formInputRegular}
                 type="number" min="0" step="0.01" id="reward-value" name="reward-value"
                 placeholder="Kwota w zł"
          />
        }
        {rewardType === "reward-item" &&
          <input className={styles.formInputRegular}
                 type="text" id="reward-value" name="reward-value"
                 placeholder="Nazwa przedmiotu / upominku"
          />
        }
      </>
    );
  };

  const [rewardList, setRewardList] = useState([<RewardDiv key="0" />]);
  const onAddRewardButtonClick = () => {
    setRewardList(rewardList.concat(<RewardDiv key={rewardList.length} />));
  };

  return (
    <>
      <h2 className={styles.title}>Stwórz nowe ogłoszenie o badaniu</h2>
      <form className={styles.researchForm}>

        <div className={styles.formRowTop}>
          <input type="file" id="poster" name="poster" accept="image/png, image/jpeg" hidden />
          <label className={styles.posterButton} htmlFor="poster">
            <FontAwesomeIcon className={styles.posterIcon} icon={faFileImage} />
            <div className={styles.posterButtonDesc}>Dodaj<br />plakat</div>
          </label>
          <div className={styles.formRow1Right}>
            <input className={styles.formInputRegular} type="text" id="title" name="title"
                   placeholder="Tytuł badania" required />
            <textarea className={styles.formInputLarge} id="desc" name="desc" maxLength="1500"
                      placeholder="Opis badania" required />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputWithLabel}>
            <label htmlFor="date-begin">Data i godzina rozpoczęcia badania</label>
            <input className={styles.formInputRegular}
                   type="datetime-local" id="date-begin" name="date-begin" required />
          </div>
          <div className={styles.inputWithLabel}>
            <label htmlFor="date-end">Data i godzina zakończenia badania</label>
            <input className={styles.formInputRegular}
                   type="datetime-local" id="date-end" name="date-end" required />
          </div>
        </div>

        <div className={styles.rowContainer}>
          <label className={styles.formLabel}>W jakiej formie przeprowadzasz badanie?</label>
          <div className={styles.formRow}>
            <select onChange={handleResearchFormSelect} className={styles.formInputRegular} name="form"
                    id="form-select" required>
              <option value="" disabled selected>Wybierz formę...</option>
              <option value="form-in-place">stacjonarnie</option>
              <option value="form-remote">zdalnie</option>
            </select>
            {researchForm === "form-remote" &&
              <input className={styles.formInputRegular} type="text" id="remote-link" name="remote-link"
                     placeholder="Link do zdalnego badania" required />
            }
          </div>
        </div>

        {researchForm === "form-in-place" &&
          <div className={styles.formRow}>
            <div className={styles.map}>[GOOGLE API MAP]<br />(do wyboru stacjonarnego miejsca badania)</div>
          </div>
        }

        <div className={styles.rowContainer}>
          <label className={styles.formLabel}>Nagrody za udział w badaniu</label>
          <div className={styles.formRow}>
            {/*<select onChange={handleRewardTypeSelect} className={styles.formInputRegular}*/}
            {/*        name="reward-type" id="reward-type-select">*/}
            {/*  <option value="" disabled selected>Wybierz typ nagrody...</option>*/}
            {/*  <option value="reward-cash">pieniężna</option>*/}
            {/*  <option value="reward-item">przedmiot / upominek</option>*/}
            {/*</select>*/}
            {/*{rewardType === "reward-cash" &&*/}
            {/*  <input className={styles.formInputRegular}*/}
            {/*         type="number" min="0" step="0.01" id="reward-value" name="reward-value"*/}
            {/*         placeholder="Kwota w zł"*/}
            {/*  />*/}
            {/*}*/}
            {/*{rewardType === "reward-item" &&*/}
            {/*  <input className={styles.formInputRegular}*/}
            {/*         type="text" id="reward-value" name="reward-value"*/}
            {/*         placeholder="Nazwa przedmiotu / upominku"*/}
            {/*  />*/}
            {/*}*/}
            {rewardList}
          </div>
          <div onClick={onAddRewardButtonClick} className={styles.addRewardReqLabel}>
            <span className={styles.plusSign}>+</span> <span>Dodaj kolejną nagrodę</span>
          </div>
        </div>

        <div className={styles.rowContainer}>
          <label className={styles.formLabel}>Wymagania</label>
          <div className={styles.formRow}>
            <select onChange={handleReqTypeSelect} className={styles.formInputRegular}
                    name="requirement-type" id="requirement-type-select">
              <option value="" disabled selected>Wybierz kryterium...</option>
              <option value="req-age">wiek</option>
              <option value="req-gender">płeć</option>
              <option value="req-sth">??? (dodać coś)</option>
            </select>
            {reqType === "req-age" &&
              <>
                <label htmlFor="req-age-min">Minimum: </label>
                <input className={styles.formInputRegular}
                       type="number" min="0" max="130" defaultValue="0" id="req-age-min" name="req-age-min"
                />
                <label htmlFor="req-age-max">Maksimum: </label>
                <input className={styles.formInputRegular}
                       type="number" min="0" max="130" defaultValue="0" id="req-age-max" name="req-age-max"
                />
              </>
            }
            {
              reqType === "req-gender" &&
              <>
                <input type="checkbox" id="req-gender-male" name="req-gender-male" value="MALE" />
                <label htmlFor="req-gender-male">Mężczyzna</label>
                <input type="checkbox" id="req-gender-female" name="req-gender-female" value="FEMALE" />
                <label htmlFor="req-gender-female">Kobieta</label>
                <input type="checkbox" id="req-gender-other" name="req-gender-other" value="OTHER" />
                <label htmlFor="req-gender-other">Inna</label>
              </>
            }
          </div>
          {/*<div className={styles.formLabel}>*/}
          {/*  Jeśli nie chcesz, aby kryterium wieku było ograniczone z dwóch stron, to ustaw jedynie wartość kryterium, które Cię interesuje - drugie ustaw na wartość 0!*/}
          {/*</div>*/}
          {/* lub dodać checkboxy na minimum/maksimum! */}
          <div className={styles.addRewardReqLabel}>
            <span className={styles.plusSign}>+</span> <span>Dodaj kolejne kryterium</span>
          </div>
        </div>

        <div className={styles.formRow}>
          <input className={styles.formButton} type="reset" value="Zacznij od nowa" />
          <input className={styles.formButton} type="submit" value="Dodaj nowe ogłoszenie" />
        </div>

      </form>
    </>
  );
}

export default CreateResearchForm;