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
        <div className={styles.formRow1}>
          <input type="file" id="poster" name="poster" accept="image/png, image/jpeg" hidden />
          <label className={styles.posterButton} htmlFor="poster">
            <img className={styles.posterButtonImage} src={addImg} alt="add-image"/>
            <div className={styles.posterButtonDesc}>Dodaj<br />plakat</div>
          </label>
          <div className={styles.formRow1Right}>
            <input className={styles.formInputRegular} type="text" id="title" name="title" placeholder="Tytuł badania"/>
            <textarea className={styles.formInputLarge} id="desc" name="desc" placeholder="Opis badania"/>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateResearchForm;