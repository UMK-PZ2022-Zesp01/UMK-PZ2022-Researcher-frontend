import React from "react";
import CreateResearchFormStyle from "./CreateResearchFormStyle";
import { Helmet } from "react-helmet";
import addImg from '../../img/create-research/add-image.png'

function CreateResearchForm(){

  const styles = CreateResearchFormStyle()

  return (
    <>
      <Helmet>
        <title>Researcher | Nowe badanie</title>
      </Helmet>
      <h2 className={styles.title}>Stwórz nowe ogłoszenie o badaniu</h2>
      <form className={styles.researchForm}>

        <div className={styles.formRow}>
          <input type="file" id="poster" name="poster" accept="image/png, image/jpeg" hidden />
          <label className={styles.posterButton} htmlFor="poster">
            <img className={styles.posterButtonImage} src={addImg} alt="add-image"/>
            <div className={styles.posterButtonDesc}>Dodaj<br />plakat</div>
          </label>
          <div className={styles.formRow1Right}>
            <input className={styles.formInputRegular} type="text" id="title" name="title" placeholder="Tytuł badania"/>
            <textarea className={styles.formInputLarge} id="desc" name="desc" maxLength="1000" placeholder="Opis badania"/>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputWithLabel}>
            <label htmlFor="date-begin">Data i godzina rozpoczęcia badania</label>
            <input className={styles.formInputRegular} type="datetime-local" id="date-begin" name="date-begin" />
          </div>
          <div className={styles.inputWithLabel}>
            <label htmlFor="date-end">Data i godzina zakończenia badania</label>
            <input className={styles.formInputRegular} type="datetime-local" id="date-end" name="date-end" />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputWithLabel}>
            <label htmlFor="form-select">W jakiej formie przeprowadzasz badanie?</label>
            <select className={styles.formInputRegular} name="form" id="form-select">
              <option value="" disabled selected>Wybierz formę...</option>
              <option value="in-place">stacjonarnie</option>
              <option value="remote">zdalnie</option>
            </select>
          </div>
          <div className={styles.inputWithLabel}>
            <label htmlFor="remote-link">Link do badania</label>
            <input className={styles.formInputRegular}
                   type="text" id="remote-link" name="remote-link" placeholder="np. https://docs.google.com/forms/tw0j384d4n13"/>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.map}>[GOOGLE API MAP]<br/>(do wyboru stacjonarnego miejsca badania)</div>
        </div>

        <div className={styles.rowContainer}>
          <label className={styles.formLabel}>Nagrody za udział w badaniu</label>
          <div className={styles.formRow}>
            <select className={styles.formInputRegular} name="reward-type" id="reward-type-select">
              <option value="" disabled selected>Wybierz typ nagrody...</option>
              <option value="in-place">pieniężna</option>
              <option value="remote">przedmiot / upominek</option>
            </select>
            <input className={styles.formInputRegular}
                   type="text" id="reward-value" name="reward-value" placeholder="kwota w zł / przedmiot"/>
          </div>
          <div className={styles.addRewardReqLabel}>
            <span className={styles.plusSign}>+</span> <span>Dodaj kolejną nagrodę</span>
          </div>
        </div>

        <div className={styles.rowContainer}>
          <label className={styles.formLabel}>Wymagania</label>
          <div className={styles.formRow}>
            <select className={styles.formInputRegular} name="requirement-type" id="requirement-type-select">
              <option value="" disabled selected>Wybierz kryterium...</option>
              <option value="req-age">wiek</option>
              <option value="req-gender">płeć</option>
              <option value="req-sth">??? (dodać coś)</option>
            </select>
            <label htmlFor="req-age-min">Minimum: </label>
            <input className={styles.formInputRegular}
                   type="number" min="0" max="130" defaultValue="0" id="req-age-min" name="req-age-min"/>
            <label htmlFor="req-age-max">Maksimum: </label>
            <input className={styles.formInputRegular}
                   type="number" min="0" max="130" defaultValue="0" id="req-age-max" name="req-age-max"/>
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
          <input className={styles.formButton} type="reset" value="Zacznij od nowa"/>
          <input className={styles.formButton} type="submit" value="Dodaj nowe badanie"/>
        </div>

      </form>
    </>
  );
}

export default CreateResearchForm;