import React from "react";
import CreateResearchPageStyle from "./CreateResearchPageStyle";
import CreateResearchForm from "../Form/CreateResearchForm";
import banner from "../../img/banner2.png";
import { Helmet } from "react-helmet";
import BookmarksNav from "../BookmarksNav/BookmarksNav";

function CreateResearchPage() {
  const styles = CreateResearchPageStyle();

  return (
    <div className={styles.container}>

      <Helmet>
        <title>Researcher | Nowe badanie</title>
      </Helmet>

      <div className={styles.bookmarksContainer}>
        <a href="/" className={styles.logo}>
          <img className={styles.logoImg} src={banner} alt="Researcher Logo" />
        </a>
        <BookmarksNav />
      </div>

      <main className={styles.createResearchPanel}>
        <CreateResearchForm />
      </main>

    </div>
  );
}

export default CreateResearchPage;