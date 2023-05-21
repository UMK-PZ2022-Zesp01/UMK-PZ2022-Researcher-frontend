import React, {useState, useEffect, useRef} from 'react';
import styles from './UserPage.module.css';
import {Popup} from '../Popup/Popup';
import {LeftContainer} from './Containers/LeftContainer';
import {BookmarksNav} from '../BookmarksNav/BookmarksNav';
import {Alert} from '../Alert/Alert';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import getApiUrl from '../../Common/Api.js';
import researcherLogo from '../../img/logo-white.png';
import ResearchTile from '../ResearchTile/ResearchTile';
import {HelmetProvider} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFileCircleExclamation,
    faFileCirclePlus,
    faHouse,
    faUser,
    faUserXmark
} from "@fortawesome/free-solid-svg-icons";

const USER_URL = getApiUrl() + 'user/';
const RESEARCHES_URL = getApiUrl() + 'research/creator/';

export default function UserPage(props) {
    /*user data*/
    const [userData, setUserData] = useState({});
    const [doesUserExist, setDoesUserExist] = useState(true);

    /*get username*/
    const {username} = useParams();

    /*user's posts*/
    const [posts, setPosts] = React.useState([]);
    const [previewed, setPreviewed] = React.useState(null);

    const [alert, setAlert] = React.useState({
        alertOpen: false,
        alertType: 0,
        alertText: '',
    });

    const closeAlert = () =>
        setAlert({
            alertOpen: false,
            alertType: alert.alertType,
            alertText: alert.alertText,
        });

    function showAlert() {
        switch (alert.alertType) {
            case 204:
                return (
                    <Alert onClose={() => closeAlert()} type="success">
                        {alert.alertText}
                    </Alert>
                );
            case 298:
            case 299:
                return (
                    <Alert onClose={() => closeAlert()} type="warning">
                        {alert.alertText}
                    </Alert>
                );
            case 500:
                return (
                    <Alert onClose={() => closeAlert()} type="error">
                        {alert.alertText}
                    </Alert>
                );
            default:
                return (
                    <Alert onClose={() => closeAlert()} type="error">
                        {alert.alertText}
                    </Alert>
                );
        }
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(USER_URL + username, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset:UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserData(data);
                setDoesUserExist(true);
            })
            .catch(error => {
                console.error(error);
                setDoesUserExist(false);
            });

        const getPosts = async () => {
            try {
                await fetch(RESEARCHES_URL + username, {
                    signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset:UTF-8',
                    },
                })
                    .then(response =>
                        response.json().then(result => {
                            isMounted && setPosts([...posts, ...result]);
                        })
                    )
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };

        getPosts();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const showPosts = () => {
        return posts.map((post, index) => (
            <ResearchTile
                key={`ResearchTile${post.researchCode}`}
                tileData={{previewed: previewed, setPreviewed: setPreviewed, tileNumber: index}}
                postData={post}
            />
        ));
    };

    /**leftContainer args**/
    const sendToLeftContainer = {
        name: userData.firstName,
        lastName: userData.lastName,
        locationState: userData.location,
        emailState: userData.email,
        phoneState: userData.phone,
        gender: userData.gender,
        avatar: userData.avatarImage,
    };

    return (
        <div className={styles.PageOverlay}>
            <div className={styles.MainContainer}>
                <HelmetProvider>
                    <Helmet>
                        <title>
                            {userData.firstName + ' ' + userData.lastName + ' | JustResearch'}
                        </title>
                    </Helmet>
                </HelmetProvider>
                <div className={styles.alertOverlay}>
                    <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
                </div>
                <div className={styles.UserBox}>
                    <div className={styles.Container}>
                        <header className={styles.bookmarksContainer}>
                            <Link to="/" className={styles.logo}>
                                <img
                                    className={styles.logoImg}
                                    src={researcherLogo}
                                    alt="Researcher Logo"
                                />
                            </Link>
                            <BookmarksNav
                                active="profile"
                                desc={'Profil: ' + userData.firstName + ' ' + userData.lastName}
                            />
                        </header>
                        {doesUserExist === true && (
                            <div className={styles.wrapper}>
                                <LeftContainer values={sendToLeftContainer}/>

                                <div className={styles.OtherRightContainer}>
                                    <div className={styles.OtherUsersResearches}>
                                        <div className={styles.OtherResearchesHeader}>
                                            <h1>Badania użytkownika</h1>
                                        </div>
                                        {showPosts()}
                                    </div>
                                </div>
                            </div>)}
                        {doesUserExist === false && (
                            <div className={styles.userNotFoundWrapper}>
                                <div className={styles.userNotFoundContainer}>
                                    <HelmetProvider>
                                        <Helmet>
                                            <title>Nie znaleziono użytkownika | JustResearch</title>
                                        </Helmet>
                                    </HelmetProvider>
                                    <div className={styles.userNotFoundInfo}>
                                        <FontAwesomeIcon
                                            icon={faUserXmark}
                                            className={styles.userNotFoundIcon}
                                        />
                                        <div className={styles.userNotFoundDesc}>
                                            <span className={styles.desc1}>Nie znaleziono użytkownika!</span>
                                            <span>
                                    Upewnij się, czy link jest poprawny oraz czy użytkownik, którego szukasz istnieje
                                </span>
                                        </div>
                                    </div>

                                    <div className={styles.navigationContainer}>
                                        <h3>Co chcesz zrobić?</h3>
                                        <nav className={styles.navigation}>
                                            <Link to="/" className={styles.navigationButton}>
                                                <FontAwesomeIcon icon={faHouse}/>
                                                <span className={styles.buttonDesc}>
                                        Przejdź na stronę główną
                                    </span>
                                            </Link>

                                            <Link to="/profile" className={styles.navigationButton}>
                                                <FontAwesomeIcon icon={faUser}/>
                                                <span className={styles.buttonDesc}>
                                        Przejdź na stronę swojego profilu
                                    </span>
                                            </Link>

                                            <Link to="/research/create" className={styles.navigationButton}>
                                                <FontAwesomeIcon icon={faFileCirclePlus}/>
                                                <span className={styles.buttonDesc}>
                                        Stwórz ogłoszenie o badaniu
                                    </span>
                                            </Link>

                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}



