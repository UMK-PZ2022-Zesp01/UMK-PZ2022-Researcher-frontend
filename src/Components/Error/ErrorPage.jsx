import {Link} from 'react-router-dom';
import styles from './ErrorPage.module.css'
// import React from "react";
import logo1 from '../../img/logo1.png'
import {BookmarksNav} from "../BookmarksNav/BookmarksNav";
import researcherLogo from "../../img/logo-white.png";
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
        <section className={styles.error}>
            <section className={styles.titleWrapper}>
                <img className={styles.logoR} src={logo1} alt={"Logo"}/>
                <h1 className={styles.title}>any, nic tu nie ma! </h1>
            </section>
            <p className={styles.description}>Nie znaleźliśmy strony, której szukasz</p>
            <Link className={styles.link} to={'/'}>
                <button className={styles.button}>
                    Przejdź do strony głównej
                </button>
            </Link>
        </section>
        </div>
        </div>
    );
};