import React from 'react';
import styles from './CreateResearchPage.module.css';
import { CreateResearchForm } from '../Form/CreateResearchForm/CreateResearchForm';
import researcherLogo from '../../img/logo-white.png';
import { Helmet } from 'react-helmet';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import { Link } from 'react-router-dom';

function CreateResearchPage() {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>Nowe badanie | JustResearch</title>
            </Helmet>

            <header className={styles.bookmarksContainer}>
                <Link to="/" className={styles.logo}>
                    <img className={styles.logoImg} src={researcherLogo} alt="Researcher Logo" />
                </Link>
                <BookmarksNav active="research" desc="Nowe badanie" />
            </header>

            <main className={styles.createResearchPanel}>
                <CreateResearchForm />
            </main>
        </div>
    );
}

export { CreateResearchPage };
