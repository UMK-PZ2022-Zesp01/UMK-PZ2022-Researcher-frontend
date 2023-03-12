import React, { useState } from "react";
import CreateResearchFormStyle from "./CreateResearchFormStyle";
import { faFileImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getApiUrl from "../../../Common/Api";
import { CreateResearchFormReward } from "./CreateResearchFormReward";

function CreateResearchForm() {

  const styles = CreateResearchFormStyle();

  const RESEARCH_ADD_URL = getApiUrl() + "research/add";
  const PHOTO_UPLOAD_URL = getApiUrl() + "photo/upload";

  const loggedUserId = null; //TODO

  const [posterImage, setPosterImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [begDate, setBegDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [participantLimit, setParticipantLimit] = useState(0);
  const [researchForm, setResearchForm] = useState("");
  const [researchPlace, setResearchPlace] = useState("");
  const [rewardType, setRewardType] = useState("");
  const [rewardName, setRewardName] = useState("");
  const [rewardItem, setRewardItem] = useState(null);
  const [rewardList, setRewardList] = useState([{ type: "", cashValue: "", name: "" }]);
  const [requirementType, setRequirementType] = useState("");
  const [requirementAgeMin, setRequirementAgeMin] = useState(-1);
  const [requirementAgeMax, setRequirementAgeMax] = useState(-1);
  const [requirementGender, setRequirementGender] = useState("");
  const [requirementCustom, setRequirementCustom] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  let research = {
    title: title,
    description: description,
    posterId: null,
    begDate: begDate,
    endDate: endDate,
    participantLimit: participantLimit,
    location: null
    // rewards: null
    // requirementList: requirement
  };

  /*** Rewards Section ***/

  const addRewardItem = (type, cashValue, name) => {
    setRewardList([...rewardList,
      { type: type, cashValue: cashValue, name: name }
    ]);
  };

  let rewardCounter = 1;
  const [rewardComponentsList, setRewardComponentsList] = useState([
    <CreateResearchFormReward key={rewardCounter} addRewardItem={addRewardItem} />
  ]);

  const onAddRewardButtonClick = () => {
    rewardCounter++;
    setRewardComponentsList([...rewardComponentsList,
      <CreateResearchFormReward key={rewardCounter} addRewardItem={addRewardItem} />
    ]);
    setRewardList([...rewardList, { type: "", cashValue: "", name: "" }]);

    /*** For deleting reward from list ***/
    // setRewardList(
    //   prevState => [
    //     prevState.map((index) => index < rewardCounter)
    //   ]
    // );
  };

  /*** Functions for Handling Changes in Form ***/

  const handlePosterImageChange = (event) => {
    setPosterImage(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleBegDateChange = (event) => {
    setBegDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleParticipantLimitChange = (event) => {
    setParticipantLimit(event.target.value);
  };

  const handleResearchFormSelect = (event) => {
    setResearchForm(event.target.value);
  };

  const handleResearchPlaceChange = (event) => {
    setResearchPlace(event.target.value);
  };

  const handleRewardTypeSelect = (event) => {
    setRewardType(event.target.value);
  };

  const handleRewardNameSelect = (event) => {
    setRewardName(event.target.value);
  };

  /*** Send New Research to Backend ***/

  const addNewResearch = async () => {

    /** Photo Upload **/

    const formData = new FormData();
    formData.append("image", posterImage);
    formData.append("type", "research-poster");

    try {
      const response = await fetch(PHOTO_UPLOAD_URL, {
        method: "POST",
        body: formData
      });

      switch (response.status) {
        case 201: // CREATED
          research.posterId = await response.json();

          /** Research Add **/

          try {
            const response = await fetch(RESEARCH_ADD_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset:UTF-8"
              },
              body: JSON.stringify(research)
            });

            switch (response.status) {
              case 201:
                // success
                break;

              default:
                // default
                break;
            }
          } catch (e) {
            console.log(e);
          }
          break;

        default:
          // default
          break;
      }

    } catch (e) {
      console.log(e);
    }

  };

  const resetPosterInput = () => {
    setPosterImage(null);
  };

  const handleFormReset = () => {
    resetPosterInput();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    research.location = { form: researchForm, place: researchPlace };
    addNewResearch().then(null);
  };

  return (
    <>
      <h2 className={styles.title}>Stwórz nowe ogłoszenie o badaniu</h2>
      <form className={styles.researchForm} onSubmit={handleFormSubmit} onReset={handleFormReset}
            encType="multipart/form-data">

        <div className={styles.formRowTop}>
          <input onChange={handlePosterImageChange}
                 type="file" id="poster" name="poster" accept="image/png, image/jpeg" hidden />

          <div className={styles.posterButton}>
            {
              posterImage != null &&
              <img alt="poster" src={URL.createObjectURL(posterImage)} className={styles.posterImg} />
            }
            <div className={posterImage != null
              ? styles.posterButtonOverlay
              : `${styles.posterButtonOverlay} ${styles.overlayActive}`}>

              <label htmlFor="poster" className={styles.overlayTile}>
                <FontAwesomeIcon className={styles.posterIcon} icon={faFileImage} />
                <span className={styles.posterButtonDesc}>
                  {posterImage == null ? "Dodaj" : "Zmień"} plakat
                </span>
              </label>

              {posterImage != null &&
                <div className={styles.overlayTile} onClick={resetPosterInput}>
                  <FontAwesomeIcon className={styles.posterIcon} icon={faTrash} />
                  <span className={styles.posterButtonDesc}>Usuń plakat</span>
                </div>
              }

            </div>
          </div>

          <div className={styles.formRow1Right}>
            <input className={styles.formInputRegular} onChange={handleTitleChange}
                   type="text" id="title" name="title" placeholder="Tytuł badania" required />
            <textarea className={styles.formInputLarge} onChange={handleDescriptionChange}
                      id="desc" name="desc" maxLength="1500" placeholder="Opis badania" required />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputWithLabel}>
            <label htmlFor="date-begin">Data rozpoczęcia badania</label>
            <input className={styles.formInputRegular} onChange={handleBegDateChange}
                   type="date" id="date-begin" name="date-begin" required />
          </div>

          <div className={styles.inputWithLabel}>
            <label htmlFor="date-end">Data zakończenia badania</label>
            <input className={styles.formInputRegular} onChange={handleEndDateChange}
                   type="date" id="date-end" name="date-end" required />
          </div>

          <div className={styles.inputWithLabel}>
            <label htmlFor="participant-limit">Ilu uczestników potrzebujesz?</label>
            <input className={styles.formInputRegular} onChange={handleParticipantLimitChange}
                   type="number" min="0" placeholder="1" id="participant-limit" name="participant-limit" required />
          </div>
        </div>

        <div className={styles.rowContainer}>
          <label className={styles.formLabel}>W jakiej formie przeprowadzasz badanie?</label>
          <div className={styles.formRow}>
            <select onChange={handleResearchFormSelect} className={styles.formInputRegular}
                    name="form" id="form-select" required>
              <option value="" disabled selected>Wybierz formę...</option>
              <option value="in-place">stacjonarnie</option>
              <option value="remote">zdalnie</option>
            </select>
            {researchForm === "remote" &&
              <input className={styles.formInputRegular} onChange={handleResearchPlaceChange}
                     type="text" id="remote-link" name="remote-link" placeholder="Link do zdalnego badania" required />
            }
          </div>
        </div>
        {researchForm === "in-place" &&
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
            {/*         placeholder="Kwota w zł" onChange={handleRewardNameSelect}*/}
            {/*  />*/}
            {/*}*/}

            {/*{rewardType === "reward-item" &&*/}
            {/*  <input className={styles.formInputRegular}*/}
            {/*         type="text" id="reward-value" name="reward-value"*/}
            {/*         placeholder="Nazwa przedmiotu / upominku" onChange={handleRewardNameSelect}*/}
            {/*  />*/}
            {/*}*/}

            <div className={styles.formColumn}>
              {rewardComponentsList.length > 0
                ? rewardComponentsList
                : <div>Twoje badanie obecnie nie oferuje żadnych nagród za udział</div>
              }
            </div>

            {/*<div onClick={onAddRewardButtonClick} className={styles.addRewardReqLabel}>*/}
            {/*  <span className={styles.plusSign}>+</span> <span>Dodaj kolejną nagrodę</span>*/}
            {/*</div>*/}

          </div>

          <div onClick={onAddRewardButtonClick} className={styles.addRewardReqLabel}>
            <span className={styles.plusSign}>+</span> <span>Dodaj kolejną nagrodę</span>
          </div>

        </div>

        {/*<div className={styles.formColumn}>*/}
        {/*  /!*{rewardComponentsList}*!/*/}
        {/*  <CreateResearchFormReward addRewardItem={addRewardItem} />*/}
        {/*</div>*/}

        {/*<div onClick={onAddRewardButtonClick} className={styles.addRewardReqLabel}>*/}
        {/*  <span className={styles.plusSign}>+</span> <span>Dodaj kolejną nagrodę</span>*/}
        {/*</div>*/}
        {/*</div>*/}

        {/*{rewardList.map(function(value) {*/}
        {/*  return <div>{value}</div>;*/}
        {/*})}*/}

        {/*<div className={styles.rowContainer}>*/}
        {/*  <label className={styles.formLabel}>Wymagania</label>*/}
        {/*  <div className={styles.formRow}>*/}
        {/*    <select onChange={handleReqTypeSelect} className={styles.formInputRegular}*/}
        {/*            name="requirement-type" id="requirement-type-select">*/}
        {/*      <option value="" disabled selected>Wybierz kryterium...</option>*/}
        {/*      <option value="req-age">wiek</option>*/}
        {/*      <option value="req-gender">płeć</option>*/}
        {/*      /!*<option value="req-sth">??? (dodać coś)</option>*!/*/}
        {/*    </select>*/}
        {/*    {reqType === "req-age" &&*/}
        {/*      <>*/}
        {/*        <label htmlFor="req-age-min">Minimum: </label>*/}
        {/*        <input className={styles.formInputRegular}*/}
        {/*               type="number" min="0" max="130" defaultValue="0" id="req-age-min" name="req-age-min"*/}
        {/*        />*/}
        {/*        <label htmlFor="req-age-max">Maksimum: </label>*/}
        {/*        <input className={styles.formInputRegular}*/}
        {/*               type="number" min="0" max="130" defaultValue="0" id="req-age-max" name="req-age-max"*/}
        {/*        />*/}
        {/*      </>*/}
        {/*    }*/}
        {/*    {*/}
        {/*      reqType === "req-gender" &&*/}
        {/*      <>*/}
        {/*        <input type="checkbox" id="req-gender-male" name="req-gender-male" value="MALE" />*/}
        {/*        <label htmlFor="req-gender-male">Mężczyzna</label>*/}
        {/*        <input type="checkbox" id="req-gender-female" name="req-gender-female" value="FEMALE" />*/}
        {/*        <label htmlFor="req-gender-female">Kobieta</label>*/}
        {/*        <input type="checkbox" id="req-gender-other" name="req-gender-other" value="OTHER" />*/}
        {/*        <label htmlFor="req-gender-other">Inna</label>*/}
        {/*      </>*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*  /!*<div className={styles.formLabel}>*!/*/}
        {/*  /!*  Jeśli nie chcesz, aby kryterium wieku było ograniczone z dwóch stron, to ustaw jedynie wartość kryterium, które Cię interesuje - drugie ustaw na wartość 0!*!/*/}
        {/*  /!*</div>*!/*/}
        {/*  /!* lub dodać checkboxy na minimum/maksimum! *!/*/}
        {/*  /!*<div className={styles.addRewardReqLabel}>*!/*/}
        {/*  /!*  <span className={styles.plusSign}>+</span> <span>Dodaj kolejne kryterium</span>*!/*/}
        {/*  /!*</div>*!/*/}
        {/*</div>*/}

        <div className={styles.formRow}>
          <button className={styles.formButton} type="reset">Zacznij od nowa</button>
          <button className={styles.formButton} type="submit">Dodaj nowe ogłoszenie</button>
        </div>

      </form>
    </>
  );
}

export default CreateResearchForm;