import {Link} from 'react-router-dom';
import styles from './ErrorPage.module.css'
// import React from "react";
import logo1 from '../../img/logo1-borderless.png'
import {BookmarksNav} from "../BookmarksNav/BookmarksNav";
import researcherLogo from "../../img/logo-white.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCirclePlus, faHouse, faUser} from "@fortawesome/free-solid-svg-icons";
export default function ErrorPage() {
    return (
        <div className={styles.MainContainer}>
            <header className={styles.bookmarksContainer}>
                <Link to="/" className={styles.logo}>
                    <img
                        className={styles.logoImg}
                        src={researcherLogo}
                        alt="Researcher Logo"
                    />
                </Link>
                <BookmarksNav active="logout" desc="Oops" />
            </header>
        <div className={styles.pageWrapper}>
        <div className={styles.error}>
            <section className={styles.titleWrapper}>
            <section className={styles.RanyWrapper}>
                <img className={styles.logoR} src={logo1} alt={"Logo"}/>
                <h1 className={styles.title}>any, </h1>
            </section>
            <h1 className={styles.title}>nic tu nie ma! </h1>
            </section>
            <section className={styles.description}>
                <p>Nie znaleźliśmy strony, której szukasz</p>
            </section>

            <div className={styles.navigationContainer}>
                <h3>Co chcesz zrobić?</h3>
                <nav className={styles.navigation}>
                    <Link to="/" className={styles.navigationButton}>
                        <FontAwesomeIcon icon={faHouse} />
                        <span className={styles.buttonDesc}>
                                        Przejdź na stronę główną
                                    </span>
                    </Link>

                    <Link to="/profile" className={styles.navigationButton}>
                        <FontAwesomeIcon icon={faUser} />
                        <span className={styles.buttonDesc}>
                                        Przejdź na stronę swojego profilu
                                    </span>
                    </Link>

                    <Link to="/research/create" className={styles.navigationButton}>
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                        <span className={styles.buttonDesc}>
                                        Stwórz ogłoszenie o badaniu
                                    </span>
                    </Link>

                </nav>
            </div>
        </div>
        </div>
        </div>
    );
};