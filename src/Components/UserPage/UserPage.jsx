import styles from './UserPage.module.css';
import { Popup } from '../Popup/Popup';
import dude from '../../img/dude.png';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useUsername } from '../../hooks/useAuth';
import getApiUrl from '../../Common/Api.js';
import { MdLocationOn, MdPhone } from 'react-icons/md';
import { GiFemale, GiMale } from 'react-icons/gi';
import { HiOutlineMail, HiOutlineDocumentText } from 'react-icons/hi';
import { BsCameraFill } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { Helmet } from 'react-helmet';
import { Gmap } from '../GoogleMap/GoogleMap';
import { ReportForm } from '../Form/ReportForm/ReportForm';
// import LatestResearchCard from '../Researches/LatestResearchCard';
import { GoFlame } from 'react-icons/go';
import { faFileCirclePlus, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LatestResearchCard } from '../Researches/LatestResearchCard';
import { UserResearchCard } from '../Researches/UserResearchCard';
import { Link } from 'react-router-dom';
import researcherLogo from '../../img/banner2.png';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import { Alert } from '../Alert/Alert';
import ResearchTile from '../ResearchTile/ResearchTile';

const USER_URL = getApiUrl() + 'user/current';
const RESEARCHES_URL = getApiUrl() + 'research/all';

export default function UserPage(props) {
    /*user data*/
    const [userData, setUserData] = useState({});

    /*access token*/
    const { username, accessToken } = useAuth().auth;

    /*researches button value*/
    const [clickedResearches, setIsClickedResearches] = useState(false);

    const [gmapExit, setGmapExit] = useState(false);

    /*edit button value*/
    const [clickedEdit, setIsClickedEdit] = useState(false);

    /*phone section*/
    const [phoneInput, setPhoneInput] = useState('');
    const [isClickedPhone, setIsClickedPhone] = useState(false);

    /*location section*/
    const [locationInput, setLocationInput] = useState('');
    const [isClickedLocation, setIsClickedLocation] = useState(false);

    /*email section*/
    const [emailInput, setEmailInput] = useState('');
    const [isClickedEmail, setIsClickedEmail] = useState(false);

    /*input debugger*/
    const [canExit, setCanExit] = useState(true);

    /*report popup*/
    const [openPopup, setOpenPopup] = useState(false);

    /*coordinates*/
    const [coords, setCoords] = useState(0);

    /*user's posts*/
    const [posts, setPosts] = React.useState([]);
    const [previewed, setPreviewed] = React.useState(null);

    /*dynamic change of displayed data*/
    const [phoneState, setPhoneState] = useState();
    const [emailState, setEmailState] = useState();
    const [locationState, setLocationState] = useState();

    /*ALERTY OD RIMBIBIMBI*/

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

    /*handlers*/
    const handlePhoneChange = event => {
        const regex = /^[0-9\s]+$/; // regular expression to allow only numbers and backspace
        if (event.target.value === '' || regex.test(event.target.value)) {
            setPhoneInput(event.target.value);
        }
    };
    const bugPopup = () => {
        window.scrollTo({ top: 0 });
        window.document.body.style.overflowY = 'hidden';
        setOpenPopup(true);
    };

    const validateInputs = () => {
        //phoneValidation
        let isPhoneRegexValid = true;
        const phoneRegex = /^(\d{3}\s){2}\d{3}$/;
        if (phoneInput.length !== 0) {
            isPhoneRegexValid = phoneRegex.test(String(phoneInput));
        }
        //emailValidation
        let isEmailRegexValid = true;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailInput.length !== 0) {
            isEmailRegexValid = emailRegex.test(String(emailInput));
        }
        isPhoneRegexValid ? console.log('phone ok') : console.log('phone wrong');
        isEmailRegexValid ? console.log('email ok') : console.log('email wrong');
        console.log(isEmailRegexValid && isPhoneRegexValid);
        return isEmailRegexValid && isPhoneRegexValid;
    };

    const exit = () => {
        // setIsClickedEdit(!clickedEdit);
        setIsClickedEmail(false);
        setIsClickedLocation(false);
        setIsClickedPhone(false);
    };

    const login = useUsername();
    const EDIT_URL = `${getApiUrl()}user/${login}/update`;

    let putTemplate = {
        phone: phoneInput.length > 0 ? phoneInput : null,
        email: emailInput.length > 0 ? emailInput : null,
        location: locationInput.length > 0 ? locationInput : null,
    };

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putTemplate),
    };

    const saveButtonCheck = async () => {
        const response = await fetch(EDIT_URL, requestOptions);
        console.log(response.status);
        if (response.status === 200) {
            if (phoneInput.length > 0) {
                setPhoneState(phoneInput);
                setIsClickedPhone(false);
                setPhoneInput('');
            }
            if (emailInput.length > 0) {
                setEmailState(emailInput);
                setIsClickedEmail(false);
                setEmailInput('');
            }
            if (locationInput.length > 0) {
                setLocationState(locationInput);
                setIsClickedEmail(false);
                setEmailInput('');
                setGmapExit(false);
            }
        }
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
                await fetch(RESEARCHES_URL, {
                    signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset:UTF-8',
                    },
                })
                    .then(response =>
                        response.json().then(result => {
                            isMounted && setPosts(result);
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
    }, []);

    const showPosts = () => {
        return posts.map((post, index) => (
            <ResearchTile
                key={post.key}
                tileData={{ previewed: previewed, setPreviewed: setPreviewed, tileNumber: index }}
                postData={post}
            ></ResearchTile>
        ));
    };

    console.log(userData);

    return (
        <>
            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>
            <div className={styles.MainContainer}>
                <Helmet>
                    <title>Profil | Researcher</title>
                </Helmet>
                <ReportForm open={openPopup} onClose={() => setOpenPopup(false)} />
                <div className={isClickedLocation ? styles.mapBoxVisible : styles.mapBoxHide}>
                    <Gmap
                        latitude={53.015331}
                        longitude={18.6057}
                        type={'user-page'}
                        exit={exit}
                        setLocationInput={setLocationInput}
                        setCoords={setCoords}
                        setGmapExit={setGmapExit}
                    />
                </div>
                <div className="Container">
                    <header className={styles.bookmarksContainer}>
                        <Link to="/" className={styles.logo}>
                            <img
                                className={styles.logoImg}
                                src={researcherLogo}
                                alt="Researcher Logo"
                            />
                        </Link>
                        <BookmarksNav active="profile" />
                    </header>
                    <div className={styles.UserBox}>
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

                        <div className={clickedResearches ? styles.userDataHide : styles.userData}>
                            <div className={styles.leftContainer}>
                                <div className={styles.infoWithoutEdit}>
                                    <div className={styles.mainInfo}>
                                        <div className={styles.avatarBox}>
                                            <img
                                                src={dude}
                                                className={styles.avatarImage}
                                                alt="avatar"
                                            ></img>
                                            <div className={styles.editAvatarButton}>
                                                <div className={styles.avatarIcon}>
                                                    <BsCameraFill />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.nameDiv}>
                                            <div className={styles.nameAndSurname}>
                                                {userData.firstName}
                                            </div>
                                            <div className={styles.nameAndSurname}>
                                                {userData.lastName}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.profileDescription}>
                                        <div className={styles.desc}>
                                            <MdLocationOn className={styles.icon} />
                                            {locationState}
                                        </div>
                                        <div className={styles.desc}>
                                            <HiOutlineMail className={styles.icon} />
                                            {emailState}
                                        </div>
                                        <div className={styles.desc}>
                                            <MdPhone className={styles.icon} />
                                            {phoneState}
                                        </div>
                                        {userData.gender === 'male' ? (
                                            <div className={styles.desc}>
                                                <GiMale className={styles.icon} />
                                                Mężczyzna
                                            </div>
                                        ) : (
                                            <div className={styles.desc}>
                                                <GiFemale className={styles.icon} />
                                                Kobieta
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.editDiv}>
                                    <button
                                        className={
                                            !clickedEdit ? styles.editButton : styles.editButtonHide
                                        }
                                        onClick={event => {
                                            setIsClickedEdit(!clickedEdit);
                                        }}
                                    >
                                        Edytuj profil
                                    </button>
                                </div>
                            </div>
                            <div className={styles.divider}>
                                <div className={styles.line}></div>
                            </div>
                            <div className={styles.rightContainer}>
                                <div className={clickedEdit ? styles.editBox : styles.editBoxHide}>
                                    <button
                                        className={
                                            clickedEdit ? styles.exitBtn : styles.exitBtnHide
                                        }
                                        onClick={exit}
                                    >
                                        <GrClose />
                                    </button>
                                    <div className={styles.editField}>
                                        <div
                                            className={
                                                isClickedEmail
                                                    ? styles.editTileResized
                                                    : styles.editTile
                                            }
                                        >
                                            <div
                                                className={
                                                    clickedEdit
                                                        ? styles.valueEdit
                                                        : styles.valueEditHide
                                                }
                                                onClick={event => {
                                                    if (canExit === true) {
                                                        setIsClickedEmail(!isClickedEmail);
                                                        setEmailInput('');
                                                    }
                                                }}
                                            >
                                                <div
                                                    className={
                                                        isClickedEmail
                                                            ? styles.text
                                                            : styles.textSmall
                                                    }
                                                >
                                                    E-mail
                                                </div>
                                                <input
                                                    className={
                                                        isClickedEmail ? styles.val : styles.valHide
                                                    }
                                                    value={emailInput}
                                                    onMouseEnter={() => {
                                                        setCanExit(false);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setCanExit(true);
                                                    }}
                                                    onChange={event => {
                                                        setEmailInput(event.target.value);
                                                    }}
                                                    type="email"
                                                    placeholder="j.kowalski@example.com"
                                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                isClickedPhone
                                                    ? styles.editTileResized
                                                    : styles.editTile
                                            }
                                        >
                                            <div
                                                className={
                                                    clickedEdit
                                                        ? styles.valueEdit
                                                        : styles.valueEditHide
                                                }
                                                onClick={event => {
                                                    if (canExit === true) {
                                                        setIsClickedPhone(!isClickedPhone);
                                                        setPhoneInput('');
                                                    }
                                                }}
                                            >
                                                <div
                                                    className={
                                                        isClickedPhone
                                                            ? styles.text
                                                            : styles.textSmall
                                                    }
                                                >
                                                    Telefon
                                                </div>
                                                <input
                                                    className={
                                                        isClickedPhone ? styles.val : styles.valHide
                                                    }
                                                    onMouseEnter={() => {
                                                        setCanExit(false);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setCanExit(true);
                                                    }}
                                                    onChange={handlePhoneChange}
                                                    type="text"
                                                    value={phoneInput}
                                                    placeholder="505 505 505"
                                                    pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                gmapExit ? styles.editTileResized : styles.editTile
                                            }
                                            onClick={() => {
                                                window.scrollTo({ top: 50 });
                                            }}
                                        >
                                            <div
                                                className={
                                                    clickedEdit
                                                        ? styles.valueEdit
                                                        : styles.valueEditHide
                                                }
                                                onClick={() => {
                                                    if (canExit === true) {
                                                        setIsClickedLocation(!isClickedLocation);
                                                        setLocationInput('');
                                                    }
                                                }}
                                            >
                                                <div
                                                    className={
                                                        isClickedLocation
                                                            ? styles.text
                                                            : styles.textSmall
                                                    }
                                                >
                                                    Lokalizacja
                                                </div>
                                                <span
                                                    className={`${styles.location} ${
                                                        styles.color
                                                    } ${styles.margin} ${
                                                        !gmapExit ? styles.hidden : ''
                                                    } `}
                                                >
                                                    {locationInput}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className={
                                            clickedEdit ? styles.saveBtn : styles.saveBtnHide
                                        }
                                        onClick={saveButtonCheck}
                                    >
                                        Zapisz
                                    </button>
                                </div>
                                <div className={clickedEdit ? styles.rightHide : styles.right}>
                                    <div className={styles.activityBox}>
                                        <a
                                            className={styles.singleActivity}
                                            href={'./research/create'}
                                        >
                                            <FontAwesomeIcon icon={faFileCirclePlus} />
                                            <span>Dodaj nowe badanie</span>
                                        </a>
                                        <div
                                            className={styles.singleActivity}
                                            onClick={() => setIsClickedResearches(true)}
                                        >
                                            <HiOutlineDocumentText
                                                className={styles.additionIconResearches}
                                            />
                                            <span>Zobacz swoje badania</span>
                                        </div>
                                        <div className={styles.singleActivity} onClick={bugPopup}>
                                            <GoFlame className={styles.additionIcon} />
                                            <span>Zgłoś błąd</span>
                                        </div>
                                    </div>
                                    <div className={styles.latestResearch}>
                                        <LatestResearchCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
