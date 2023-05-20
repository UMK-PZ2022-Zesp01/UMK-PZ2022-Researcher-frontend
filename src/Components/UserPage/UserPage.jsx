import React, { useState, useEffect, useRef } from 'react';
import styles from './UserPage.module.css';
import { Popup } from '../Popup/Popup';
import { LeftContainer } from './Containers/LeftContainer';
import { RightContainer } from './Containers/RightContainer';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import { Alert } from '../Alert/Alert';
import { Gmap } from '../GoogleMap/GoogleMap';
import { ReportForm } from '../Form/ReportForm/ReportForm';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import getApiUrl from '../../Common/Api.js';
import researcherLogo from '../../img/logo-white.png';
import { faFileCirclePlus, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResearchTile from '../ResearchTile/ResearchTile';
import { HelmetProvider } from 'react-helmet-async';
import { Forum } from '../ResearchPage/Forum/Forum';

const RESEARCHES_URL = getApiUrl() + 'research/creator/';

export default function UserPage(props) {
    /*user data*/
    const [userData, setUserData] = useState({});

    /*access token*/
    const { username, accessToken } = useAuth().auth;

    /*researches button value*/
    const [clickedResearches, setIsClickedResearches] = useState(false);

    const [gmapExit, setGmapExit] = useState(false);

    const [clickedAdvance, setClickedAdvance] = useState(false);

    /*edit button value*/
    const [clickedEdit, setIsClickedEdit] = useState(false);

    /*phone section*/
    const [isClickedPhone, setIsClickedPhone] = useState(false);

    /*location section*/
    const [locationInput, setLocationInput] = useState('');
    const [isClickedLocation, setIsClickedLocation] = useState(false);

    /*email section*/
    const [isClickedEmail, setIsClickedEmail] = useState(false);

    /*input debugger*/
    const [canExit, setCanExit] = useState(true);

    /*report popup*/
    const [openPopup, setOpenPopup] = useState(false);

    /*user's posts*/
    const [posts, setPosts] = React.useState([]);
    const [previewed, setPreviewed] = React.useState(null);

    /*dynamic change of displayed data*/
    const [phoneState, setPhoneState] = useState();
    const [emailState, setEmailState] = useState();
    const [locationState, setLocationState] = useState();

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

    const bugPopup = () => {
        setOpenPopup(true);
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(getApiUrl() + 'user/current', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json; charset:UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserData(data);
                setPhoneState(data.phone);
                setEmailState(data.email);
                setLocationState(data.location);
            })
            .catch(error => {
                console.error(error);
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

    //Do Poprawienia jest css więc zakomentowane
    const showPosts = () => {
        return posts.map((post, index) => (
            <ResearchTile
                key={`ResearchTile${post.researchCode}`}
                tileData={{ previewed: previewed, setPreviewed: setPreviewed, tileNumber: index }}
                postData={post}
            ></ResearchTile>
        ));
    };
    const handleLocationClick = value => {
        setIsClickedLocation(value);
    };
    const exit = () => {
        setIsClickedEmail(false);
        setIsClickedLocation(false);
        setIsClickedPhone(false);
    };

    /**leftContainer args**/
    const sendToLeftContainer = {
        name: userData.firstName,
        lastName: userData.lastName,
        locationState: locationState,
        emailState: emailState,
        phoneState: phoneState,
        gender: userData.gender,
        avatar: userData.avatarImage,
        clickedEdit: clickedEdit,
        setIsClickedEdit: setIsClickedEdit,
        clickedAdvance: clickedAdvance,
        setClickedAdvance: setClickedAdvance,
    };
    /**rightContainer args**/
    const sendToRightContainer = {
        clickedAdvance: clickedAdvance,
        setClickedAdvance: setClickedAdvance,
        clickedEdit: clickedEdit,
        setIsClickedEdit: setIsClickedEdit,
        canExit: canExit,
        setCanExit: setCanExit,
        gmapExit: gmapExit,
        setGmapExit: setGmapExit,
        setIsClickedResearches: setIsClickedResearches,
        bugPopup,
        handleLocationClick,
        locationInput: locationInput,
        setLocationInput: setLocationInput,
        setPhoneState: setPhoneState,
        setEmailState: setEmailState,
        setLocationState: setLocationState,
    };

    return (
        <div className={styles.PageOverlay}>
            <ReportForm open={openPopup} onClose={() => setOpenPopup(false)} />
            <div className={styles.MainContainer}>
                <Helmet>
                    <title>Profil | Researcher</title>
                </Helmet>
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
                            <BookmarksNav active="profile" desc="Twój profil" />
                        </header>
                        <div className={styles.wrapper}>
                            <div
                                className={
                                    clickedResearches
                                        ? styles.userResearches
                                        : styles.userResearchesHide
                                }
                            >
                                <button
                                    className={styles.exitResBtn}
                                    onClick={() => setIsClickedResearches(false)}
                                >
                                    <FontAwesomeIcon
                                        className={styles.arrowIcon}
                                        icon={faArrowTurnDown}
                                    />
                                </button>
                                <div className={styles.userResearchCard}>{showPosts()}</div>
                            </div>

                            <LeftContainer values={sendToLeftContainer} />
                            <RightContainer values={sendToRightContainer} />
                        </div>
                    </div>
                    <div className={isClickedLocation ? styles.mapBoxVisible : styles.mapBoxHide}>
                        <Gmap
                            latitude={53.015331}
                            longitude={18.6057}
                            type={'user-page'}
                            exit={exit}
                            setLocationInput={setLocationInput}
                            setIsClickedLocation={setIsClickedLocation}
                            setGmapExit={setGmapExit}
                            setResearchPlace={() => {}}
                            setResearchPageAddress={() => {}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
