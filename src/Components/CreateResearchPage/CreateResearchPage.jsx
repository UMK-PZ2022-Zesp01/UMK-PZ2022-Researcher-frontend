import React from 'react';
import styles from './CreateResearchPage.module.css';
import { CreateResearchForm } from '../Form/CreateResearchForm/CreateResearchForm';
import researcherLogo from '../../img/banner2.png';
import { Helmet } from 'react-helmet';
import BookmarksNav from '../BookmarksNav/BookmarksNav';

function CreateResearchPage() {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Nowe badanie | Researcher</title>
            </Helmet>

            <header className={styles.bookmarksContainer}>
                <a href="/" className={styles.logo}>
                    <img className={styles.logoImg} src={researcherLogo} alt="Researcher Logo" />
                </a>
                <BookmarksNav active="research" />
            </header>

            <main className={styles.createResearchPanel}>
                <CreateResearchForm />
            </main>
        </div>
    );
}

export { CreateResearchPage };
