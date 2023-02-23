import React from 'react';
import CreateResearchPageStyle from "./CreateResearchPageStyle";
import CreateResearchForm from "../Form/CreateResearchForm";
import banner from '../../img/banner2.png'

function CreateResearchPage(){
  const styles = CreateResearchPageStyle()

  return(
    <div className={styles.container}>
      <div className={styles.bookmarksContainer}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={banner} alt="Researcher Logo" />
        </div>
        <nav className={styles.bookmarks}>
          <div className={styles.bookmarkItem}>Strona główna</div>
          <div className={styles.bookmarkItem}>Twój profil</div>
          <div className={styles.bookmarkItem}>Ustawienia</div>
          <div className={styles.bookmarkItem}>Wyloguj</div>
        </nav>
      </div>
      <main className={styles.createResearchPanel}>
        <CreateResearchForm />
      </main>
    </div>
  );
}

export default CreateResearchPage;