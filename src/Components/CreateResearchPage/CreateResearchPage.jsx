import React from 'react';
import CreateResearchPageStyle from "./CreateResearchPageStyle";
import CreateResearchForm from "../Form/CreateResearchForm";

function CreateResearchPage(){
  const styles = CreateResearchPageStyle()

  return(
    <div className={styles.container}>
      <nav className={styles.bookmarks}>
        <div className={styles.bookmarkItem}>Strona główna</div>
        <div className={styles.bookmarkItem}>Twój profil</div>
        <div className={styles.bookmarkItem}>Ustawienia</div>
        <div className={styles.bookmarkItem}>Wyloguj</div>
      </nav>
      <main className={styles.createResearchPanel}>
        <CreateResearchForm />
      </main>
    </div>
  );
}

export default CreateResearchPage;