import { useEffect, useState } from 'react';
import styles from './ResearchPage.module.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import researcherLogo from '../../img/logo-white.png';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import { Link, useLocation, useParams } from 'react-router-dom';
import getApiUrl from '../../Common/Api';
import {
    faEnvelope,
    faPhone,
    faCircleCheck,
    faCircleXmark,
    faFileCircleExclamation,
    faHouse,
    faUser,
    faFileCirclePlus,
    faPencil,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../../hooks/useAuth';
import { Alert } from '../Alert/Alert';
import { Popup } from '../Popup/Popup';
import { Forum } from './Forum/Forum';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import { Gmap } from '../GoogleMap/GoogleMap';
import { ResearchEditor } from './ResearchEditor/ResearchEditor';
import { useDateFormat } from '../../hooks/useDateFormat';
import { useTranslate } from '../../hooks/useTranslate';
import { ParticipantsList } from './ParticipantsList/ParticipantsList';
import AddressFormatter from '../../Common/AddressFormatter';

function ResearchPage() {
    const { researchCode } = useParams();

    const { auth } = useAuth();
    const { username, accessToken } = auth;
    const webLocation = useLocation();

    const dateFormat = useDateFormat('pl');
    const translator = useTranslate();

    const GET_RESEARCH_URL = getApiUrl() + `research/code/${researchCode}`;
    const DELETE_RESEARCH_URL = getApiUrl() + `research/${researchCode}/delete`;
    const ENROLL_CHECK_URL = getApiUrl() + `research/${researchCode}/enrollCheck`;
    const GET_CREATOR_URL = getApiUrl() + 'user/';
    const ENROLL_URL = getApiUrl() + `research/${researchCode}/enroll`;
    const RESIGN_URL = getApiUrl() + `research/${researchCode}/resign`;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [begDate, setBegDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [creatorEmail, setCreatorEmail] = useState('');
    const [creatorPhone, setCreatorPhone] = useState('');
    const [participantLimit, setParticipantLimit] = useState(0);
    const [participantNumber, setParticipantNumber] = useState(0);
    const [research, setResearch] = useState();
    const [creator, setCreator] = useState();
    const [loggedUser, setLoggedUser] = useState({});
    const [location, setLocation] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [requirements, setRequirements] = useState([]);

    const [editedData, setEditedData] = useState({});
    const [participantNumberReceived, setParticipantNumberReceived] = useState(null);

    const [isPosterOnFullScreen, setIsPosterOnFullScreen] = useState(false);
    const [researchGetSuccess, setResearchGetSuccess] = useState(null);
    const [isSomeoneLoggedIn, setIsSomeoneLoggedIn] = useState(false);
    const [isLoggedUserOnParticipantList, setIsLoggedUserOnParticipantList] = useState(false);
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [isListVisible, setIsListVisible] = useState(false);
    const [isDeleteResearchConfirmVisible, setIsDeleteResearchConfirmVisible] = useState(false);
    const [isEnrollButtonBlocked, setIsEnrollButtonBlocked] = useState(false);

    /** Get Research From Database **/

    const getResearch = async () => {
        setResearchGetSuccess(undefined);
        const researchResponse = await fetch(GET_RESEARCH_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:UTF-8',
            },
        });

        switch (researchResponse.status) {
            case 200:
                const result = await researchResponse.json();
                setResearch(result);
                setTitle(result.title);
                setDescription(result.description);
                setBegDate(result.begDate);
                setEndDate(result.endDate);
                setCreatorEmail(result.creatorEmail);
                setCreatorPhone(result.creatorPhone);
                setParticipantNumber(result.participants);
                setParticipantLimit(result.participantLimit);
                setLocation(result.location);
                setRewards(result.rewards);
                setRequirements(result.requirements);

                const creatorResponse = await fetch(GET_CREATOR_URL + result.creatorLogin, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset:UTF-8',
                    },
                });

                switch (creatorResponse.status) {
                    case 200:
                        setCreator(await creatorResponse.json());
                        setResearchGetSuccess(true);
                        if (isSomeoneLoggedIn) checkIfLoggedUserIsDownForResearch().then(null);
                        break;
                    default:
                        setResearchGetSuccess(false);
                        break;
                }

                break;
            case 204:
                setResearchGetSuccess(false);
                break;
            default:
                setResearchGetSuccess(false);
                break;
        }
    };

    const getCurrentUser = async () => {
        if (accessToken)
            try {
                const response = await fetch(getApiUrl() + 'user/current', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: accessToken,
                        'Content-Type': 'application/json; charset:UTF-8',
                    },
                });

                if (response.ok) {
                    const json = await response.json();
                    setLoggedUser(json);
                    setIsSomeoneLoggedIn(true);
                } else {
                    setLoggedUser({});
                    setIsSomeoneLoggedIn(false);
                }
            } catch (e) {
                setLoggedUser({});
                setIsSomeoneLoggedIn(false);
            }
    };

    const checkIfLoggedUserIsDownForResearch = async () => {
        try {
            const response = await fetch(ENROLL_CHECK_URL, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json; charset:UTF-8',
                },
            });

            switch (response.status) {
                case 200:
                    setIsLoggedUserOnParticipantList(true);
                    break;
                case 204:
                    setIsLoggedUserOnParticipantList(false);
                    break;
                default:
                    setIsLoggedUserOnParticipantList(false);
            }
        } catch (e) {
            setIsLoggedUserOnParticipantList(false);
        }
    };

    useEffect(() => {
        setIsSomeoneLoggedIn(false);
        setIsLoggedUserOnParticipantList(false);

        getResearch().then(null);
        getCurrentUser().then(null);
    }, [accessToken]);

    useEffect(() => {
        if (researchGetSuccess && loggedUser) {
            checkIfLoggedUserIsDownForResearch().then(null);
        }
    }, [researchGetSuccess, loggedUser]);

    const getEditedData = data => {
        setEditedData(() => data);
    };

    const getParticipantNumber = number => {
        setParticipantNumberReceived(() => number);
    };

    useEffect(() => {
        if (editedData.title != null) setTitle(() => editedData.title);
        if (editedData.description != null) setDescription(() => editedData.description);
        if (editedData.begDate != null) setBegDate(() => editedData.begDate);
        if (editedData.endDate != null) setEndDate(() => editedData.endDate);
        if (editedData.creatorEmail != null) setCreatorEmail(() => editedData.creatorEmail);
        if (editedData.creatorPhone != null) setCreatorPhone(() => editedData.creatorPhone);
        if (editedData.participantLimit != null)
            setParticipantLimit(() => editedData.participantLimit);
        if (editedData.location != null)
            setLocation({
                form: editedData.location.form,
                place: editedData.location.place,
                address: editedData.location.address,
            });
    }, [editedData]);

    useEffect(() => {
        setParticipantNumber(prevState => prevState - 1);
    }, [participantNumberReceived]);

    /*** Alerts Section ***/

    const [alert, setAlert] = useState({
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

    const showAlert = () => {
        switch (alert.alertType) {
            case 200:
            case 204:
                return (
                    <Alert onClose={closeAlert} type="success">
                        {alert.alertText}
                    </Alert>
                );
            case 298:
            case 299:
                return (
                    <Alert onClose={closeAlert} type="warning">
                        {alert.alertText}
                    </Alert>
                );
            default:
                return (
                    <Alert onClose={closeAlert} type="error">
                        {alert.alertText}
                    </Alert>
                );
        }
    };

    /*** Enroll Checking Functions ***/

    const calculateDaysLeft = () => {
        const current = new Date(research.currentDate);
        const end = new Date(research.endDate);

        const diff = end - current;

        if (diff <= 0) return 'CLOSED';
        else return Math.ceil(diff / (1000 * 3600 * 24));
    };

    const checkForLimitExceedance = () => {
        const partNumber = Number(research.participants);
        const partLimit = Number(research.participantLimit);

        if (partNumber >= partLimit) return 'EXCEEDED';
        else return partLimit - partNumber;
    };

    const checkRequirements = () => {
        const contraindicationList = [];

        /** Check for Gender **/
        const loggedUserGender = loggedUser?.gender;
        const requiredGenders = requirements
            .filter(value => value.type === 'gender')
            .map(value => value.criteria)
            .join();

        if (requiredGenders.length > 0) {
            if (!requiredGenders.split(',').includes(loggedUserGender))
                contraindicationList.push('płeć');
        }

        /** Check for Age **/
        const birthDate = new Date(loggedUser?.birthDate);
        const currentDate = new Date(research.currentDate);
        const diff = currentDate - birthDate;
        const diffDate = new Date(diff);
        const age = Math.abs(diffDate.getUTCFullYear() - 1970);

        const requiredAge = requirements
            .filter(value => value.type === 'age')
            .map(value => value.criteria);

        requiredAge.forEach(value => {
            if (age < value.ageMin || age > value.ageMax) contraindicationList.push('wiek');
        });

        const contraindication = [...new Set(contraindicationList)];
        return contraindication.length === 0 ? true : contraindication.join(' i ');
    };

    /*** Render Functions ***/

    const renderRewards = () => {
        if (rewards.length === 0)
            return 'Autor badania nie oferuje nagród za udział w tym badaniu.';
        return (
            <ul className={styles.rewardsList}>
                {rewards.map((value, index) => {
                    return (
                        <li key={index}>
                            <strong>{translator(value.type)}: </strong>
                            <span>
                                {value.type === 'cash'
                                    ? Number(value.value) % 100 === 0
                                        ? Number(value.value) / 100 + ' zł'
                                        : (Number(value.value) / 100).toFixed(2) + ' zł'
                                    : value.value}
                            </span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderRequirements = () => {
        if (requirements.length === 0) return 'Badanie nie posiada żadnych wymagań udziału.';
        return (
            <div className={styles.requirementsContainer}>
                {requirements.map((value, index) => {
                    return value.type === 'other' ? (
                        <div className={styles.reqList} key={index}>
                            {value.criteria.map((value, index) => {
                                return (
                                    <div className={styles.reqElementColumn} key={index}>
                                        <strong className={styles.requirementCategory}>
                                            {translator(value.type)}
                                        </strong>
                                        <span className={styles.reqDescription}>
                                            {value.description}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles.reqList} key={index}>
                            <strong className={styles.requirementCategory}>
                                {translator(value.type)}
                            </strong>

                            <ul className={styles.reqElement}>
                                {value.type === 'age' &&
                                    value.criteria.map((value, index) => {
                                        return (
                                            <li key={index}>
                                                od {value.ageMin} do {value.ageMax} lat
                                            </li>
                                        );
                                    })}

                                {value.type !== 'age' &&
                                    value.type !== 'other' &&
                                    value.criteria.map((value, index) => {
                                        return <li key={index}>{translator(value)}</li>;
                                    })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        );
    };

    /*** Handle Poster Full-Screen Mode ***/

    const handlePosterClick = () => {
        setIsPosterOnFullScreen(true);
    };

    const handleFullScreenModeClose = () => {
        setIsPosterOnFullScreen(false);
    };

    /*** Enroll Logged User on Research ***/

    const enrollOnResearch = async event => {
        event.preventDefault();

        try {
            const response = await fetch(ENROLL_URL, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    Authorization: accessToken,
                },
            });

            switch (response.status) {
                case 200:
                    setIsEnrollButtonBlocked(true);
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText: (
                            <span>
                                Udało Ci się zapisać na to badanie!{' '}
                                {research.location.form === 'remote' && (
                                    <a
                                        href={research.location.place}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.alertLink}
                                    >
                                        Kliknij, aby przejść do ankiety z badaniem
                                    </a>
                                )}
                            </span>
                        ),
                    });
                    break;
                case 298:
                    setIsEnrollButtonBlocked(true);
                    setAlert({
                        alertOpen: true,
                        alertType: 298,
                        alertText: 'Nie możesz zapisać się na swoje badanie',
                    });
                    break;
                case 299:
                    setIsEnrollButtonBlocked(true);
                    setAlert({
                        alertOpen: true,
                        alertType: 299,
                        alertText:
                            'Nie możesz zapisać się na to badanie, ponieważ już jesteś jego uczestnikiem',
                    });
                    break;
                case 403:
                    setIsEnrollButtonBlocked(true);
                    setAlert({
                        alertOpen: true,
                        alertType: 400,
                        alertText: [
                            <Link to={'/login'}>Zaloguj się</Link>,
                            'aby zapisać się na badanie',
                        ],
                    });
                    break;
                default:
                    setIsEnrollButtonBlocked(true);
                    setAlert({
                        alertOpen: true,
                        alertType: 400,
                        alertText: 'Nie udało Ci się zapisać na badanie! Spróbuj ponownie później',
                    });
                    break;
            }
        } catch (e) {
            setAlert({
                alertOpen: true,
                alertType: 500,
                alertText: 'Błąd połączenia z serwerem! Spróbuj ponownie później',
            });
        }
    };

    /** Resign From Research **/

    const resignFromResearch = async event => {
        event.preventDefault();

        try {
            const response = await fetch(RESIGN_URL, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Authorization: accessToken,
                },
            });

            switch (response.status) {
                case 200:
                    setIsEnrollButtonBlocked(true);
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText: 'Udało Ci się pomyślnie wypisać z udziału w tym badaniu!',
                    });
                    break;
                default:
                    setIsEnrollButtonBlocked(true);
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText:
                            'Nie udało Ci się wypisać z udziału w tym badaniu! Upewnij się, czy jesteś na nie' +
                            ' zapisany/a lub czy nie jesteś już z niego wypisany/a.',
                    });
                    break;
            }
        } catch (e) {
            setAlert({
                alertOpen: true,
                alertType: 500,
                alertText: 'Błąd połączenia z serwerem! Spróbuj ponownie później',
            });
        }
    };

    const toggleDeleteResearchConfirmVisibility = () => {
        setIsDeleteResearchConfirmVisible(prevState => !prevState);
        setIsEditorVisible(false);
        setIsListVisible(false);
    };

    const toggleResearchEditorVisibility = () => {
        setIsEditorVisible(prevState => !prevState);
        setIsDeleteResearchConfirmVisible(false);
        setIsListVisible(false);
    };

    const toggleListVisibility = () => {
        setIsListVisible(prevState => !prevState);
        setIsDeleteResearchConfirmVisible(false);
        setIsEditorVisible(false);
    };

    const deleteResearch = async event => {
        event.preventDefault();

        try {
            const response = await fetch(DELETE_RESEARCH_URL, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Authorization: accessToken,
                },
            });

            switch (response.status) {
                case 204:
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText: (
                            <span>
                                Badanie zostało pomyślnie usunięte!{' '}
                                <Link to="/" className={styles.alertLink}>
                                    Kliknij, aby przejść na stronę główną
                                </Link>
                            </span>
                        ),
                    });
                    break;
                default:
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText:
                            'Nie udało się usunąć badania! Upewnij się, że posiadasz uprawnienia do wykonania' +
                            ' tej czynności.',
                    });
                    break;
            }
        } catch (e) {
            setAlert({
                alertOpen: true,
                alertType: 500,
                alertText: 'Błąd połączenia z serwerem! Spróbuj ponownie później.',
            });
        }
    };

    return (
        <div className={styles.container}>
            <HelmetProvider>
                <Helmet>
                    <title>{title} | JustResearch</title>
                </Helmet>
            </HelmetProvider>

            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>

            <header className={styles.bookmarksContainer}>
                <Link to="/" className={styles.logo}>
                    <img className={styles.logoImg} src={researcherLogo} alt="Researcher Logo" />
                </Link>
                <BookmarksNav
                    active="research"
                    desc={researchGetSuccess ? title : 'Nie znaleziono badania'}
                />
            </header>

            <main className={styles.researchPagePanel}>
                {isPosterOnFullScreen && (
                    <div
                        className={styles.posterFullScreenContainer}
                        onClick={handleFullScreenModeClose}
                    >
                        <div className={styles.btnContainer}>
                            <button
                                className={styles.posterFullScreenCloseBtn}
                                onClick={handleFullScreenModeClose}
                            >
                                Wróć do badania
                            </button>
                        </div>
                        <div className={styles.imgContainer}>
                            <img
                                alt="poster"
                                src={`data:image/jpeg;base64,${research.poster}`}
                                className={styles.posterFullScreen}
                            />
                        </div>
                    </div>
                )}

                {researchGetSuccess && (
                    <>
                        {loggedUser?.login === research.creatorLogin && (
                            <div className={styles.researchEditor}>
                                <label className={styles.categoryLabel}>Panel autora badania</label>
                                <div className={styles.editorButtons}>
                                    <div className={styles.btnBox}>
                                        <button
                                            className={styles.editorBtn}
                                            onClick={toggleListVisibility}
                                        >
                                            <FontAwesomeIcon icon={faUser} />
                                            <span>Pokaż uczestników</span>
                                        </button>

                                        <button
                                            className={styles.editorBtn}
                                            onClick={toggleResearchEditorVisibility}
                                        >
                                            <FontAwesomeIcon icon={faPencil} />
                                            <span>Edytuj badanie</span>
                                        </button>

                                        <button
                                            className={styles.editorBtn}
                                            onClick={toggleDeleteResearchConfirmVisibility}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span>Usuń badanie</span>
                                        </button>
                                    </div>
                                </div>

                                {isDeleteResearchConfirmVisible && (
                                    <div className={styles.deleteResearchConfirm}>
                                        <span>Czy na pewno chcesz usunąć badanie?</span>
                                        <button
                                            className={styles.editorBtn}
                                            onClick={deleteResearch}
                                        >
                                            Tak
                                        </button>
                                        <button
                                            className={styles.editorBtn}
                                            onClick={toggleDeleteResearchConfirmVisibility}
                                        >
                                            Anuluj
                                        </button>
                                    </div>
                                )}
                                {isEditorVisible && (
                                    <ResearchEditor
                                        research={research}
                                        sendEdited={getEditedData}
                                        onClose={() => {
                                            setIsEditorVisible(false);
                                        }}
                                    />
                                )}
                                {isListVisible && (
                                    <ParticipantsList
                                        researchCode={research.researchCode}
                                        sendParticipantNumber={getParticipantNumber}
                                        onClose={() => {
                                            setIsListVisible(false);
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        {!isEditorVisible && !isListVisible && (
                            <>
                                <h2 className={styles.title}>{title}</h2>

                                <div className={styles.researchPageRow}>
                                    <div
                                        className={styles.posterContainer}
                                        onClick={handlePosterClick}
                                    >
                                        <img
                                            className={styles.posterImg}
                                            alt="poster"
                                            src={`data:image/jpeg;base64,${research.poster}`}
                                        />
                                    </div>

                                    <div className={styles.basicInfoContainer}>
                                        <div className={styles.basicInfoElementRow}>
                                            <div className={styles.dateContainerLeft}>
                                                <div className={styles.categoryLabel}>
                                                    Otwarte do
                                                </div>
                                                <div className={styles.categoryValue}>
                                                    {dateFormat(endDate)}
                                                </div>
                                            </div>

                                            <div className={styles.dateContainerRight}>
                                                {calculateDaysLeft() === 'CLOSED' ? (
                                                    <div className={styles.categoryLabel}>
                                                        Badanie zakończyło się
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className={styles.categoryLabel}>
                                                            Badanie zamyka się za
                                                        </div>
                                                        <div className={styles.categoryValue}>
                                                            {calculateDaysLeft() === 1
                                                                ? '1 dzień'
                                                                : calculateDaysLeft() + ' dni'}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className={styles.spanLeft}>
                                            <span className={styles.categoryLabel}>
                                                Autor badania:{' '}
                                            </span>
                                            <Link
                                                to={`/profile/${creator.login}`}
                                                className={styles.link}
                                            >
                                                {creator.firstName + ' ' + creator.lastName}
                                            </Link>
                                        </div>

                                        <div className={styles.basicInfoElement}>
                                            <span className={styles.categoryLabel}>
                                                Kontakt z autorem badania:
                                            </span>

                                            <div className={styles.contactDetails}>
                                                <span className={styles.contactElement}>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faEnvelope}
                                                            className={styles.icon}
                                                        />
                                                        <strong> Adres e-mail: </strong>
                                                    </div>

                                                    {isSomeoneLoggedIn ? (
                                                        <a
                                                            href={`mailto:${creatorEmail}`}
                                                            className={styles.link}
                                                        >
                                                            {creatorEmail}
                                                        </a>
                                                    ) : (
                                                        <span>
                                                            <Link to="/login">Zaloguj się</Link>
                                                            <span>
                                                                , aby wyświetlić adres e-mail
                                                            </span>
                                                        </span>
                                                    )}
                                                </span>

                                                <span className={styles.contactElement}>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faPhone}
                                                            className={styles.icon}
                                                        />
                                                        <strong> Numer telefonu: </strong>
                                                    </div>

                                                    {isSomeoneLoggedIn ? (
                                                        <span>{creatorPhone}</span>
                                                    ) : (
                                                        <span>
                                                            <Link to="/login">Zaloguj się</Link>
                                                            <span>
                                                                , aby wyświetlić adres e-mail
                                                            </span>
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={styles.basicInfoElement}>
                                            <div className={styles.participantsHeader}>
                                                <label
                                                    className={styles.categoryLabel}
                                                    htmlFor="progress-bar"
                                                >
                                                    Liczba zajętych miejsc
                                                </label>
                                                <strong
                                                    className={
                                                        checkForLimitExceedance() <= 2
                                                            ? styles.red
                                                            : undefined
                                                    }
                                                >
                                                    {participantNumber} / {participantLimit}
                                                </strong>
                                            </div>
                                            <progress
                                                id="progress-bar"
                                                className={styles.participantsProgressBar}
                                                value={participantNumber}
                                                max={participantLimit}
                                            />
                                        </div>

                                        <div className={styles.basicInfoElement}>
                                            <span className={styles.categoryLabel}>
                                                Forma badania
                                            </span>
                                            <span className={styles.spanLeft}>
                                                {location.form === 'in-place' ? (
                                                    <span>
                                                        stacjonarnie{' '}
                                                        <a href="#map" className={styles.mapLink}>
                                                            (kliknij, aby przejść do mapy)
                                                        </a>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        {isLoggedUserOnParticipantList ? (
                                                            <>
                                                                <span>zdalnie: </span>
                                                                <a
                                                                    href={location.place}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    {location.place}
                                                                </a>
                                                            </>
                                                        ) : (
                                                            'zdalnie'
                                                        )}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.bottomPageContainer}>
                                    <div className={styles.researchPageElementColumn}>
                                        <span className={styles.categoryLabel}>Opis badania</span>
                                        <span className={styles.description}>{description}</span>
                                    </div>

                                    {research.location.form === 'in-place' && (
                                        <div className={styles.researchPageElementColumn} id="map">
                                            <span className={styles.categoryLabel}>
                                                Miejsce przeprowadzania badania
                                            </span>
                                            <div className={styles.mapContainer}>
                                                <span className={styles.locationAddress}>
                                                    {AddressFormatter(location.address)}
                                                </span>
                                                <Gmap
                                                    latitude={Number(
                                                        location.place.toString().split(' ').at(0)
                                                    )}
                                                    longitude={Number(
                                                        location.place.toString().split(' ').at(1)
                                                    )}
                                                    type={'researchPage'}
                                                    exit={() => {}}
                                                    setLocationInput={() => {}}
                                                    setGmapExit={() => {}}
                                                    setResearchPlace={() => {}}
                                                    setResearchPageAddress={() => {}}
                                                    setIsClickedLocation={() => {}}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className={styles.researchPageElementColumn}>
                                        <div className={styles.categoryLabel}>
                                            Nagrody za udział w badaniu
                                        </div>
                                        {renderRewards()}
                                    </div>

                                    <div className={styles.researchPageElementColumn}>
                                        <div className={styles.categoryLabel}>Wymagania</div>
                                        {renderRequirements()}
                                    </div>

                                    {loggedUser?.login !== research.creatorLogin && (
                                        <>
                                            <div className={styles.enrollContainer}>
                                                <div className={styles.enrollCheckmark}>
                                                    {isSomeoneLoggedIn === false ? (
                                                        <>
                                                            <FontAwesomeIcon
                                                                icon={faCircleXmark}
                                                                className={`${styles.enrollIcon} ${styles.red}`}
                                                            />
                                                            <span
                                                                className={`${styles.enrollDesc} ${styles.red}`}
                                                            >
                                                                <Link
                                                                    to={'/login'}
                                                                    state={{
                                                                        from: webLocation,
                                                                    }}
                                                                    replace
                                                                >
                                                                    Zaloguj się
                                                                </Link>
                                                                {', aby zapisać się na badanie.'}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {calculateDaysLeft() === 'CLOSED' ? (
                                                                <>
                                                                    <FontAwesomeIcon
                                                                        icon={faCircleXmark}
                                                                        className={`${styles.enrollIcon} ${styles.red}`}
                                                                    />
                                                                    <span
                                                                        className={`${styles.enrollDesc} ${styles.red}`}
                                                                    >
                                                                        Badanie zakończyło się.
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {checkForLimitExceedance() ===
                                                                    'EXCEEDED' ? (
                                                                        <>
                                                                            <FontAwesomeIcon
                                                                                icon={faCircleXmark}
                                                                                className={`${styles.enrollIcon} ${styles.red}`}
                                                                            />
                                                                            <span
                                                                                className={`${styles.enrollDesc} ${styles.red}`}
                                                                            >
                                                                                Lista uczestników
                                                                                jest już pełna.
                                                                            </span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {checkRequirements() !==
                                                                            true ? (
                                                                                <>
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faCircleXmark
                                                                                        }
                                                                                        className={`${styles.enrollIcon} ${styles.red}`}
                                                                                    />
                                                                                    <span
                                                                                        className={`${styles.enrollDesc} ${styles.red}`}
                                                                                    >
                                                                                        Nie
                                                                                        kwalifikujesz
                                                                                        się do
                                                                                        udziału w
                                                                                        tym badaniu
                                                                                        ze względu
                                                                                        na{' '}
                                                                                        {checkRequirements()}
                                                                                        !
                                                                                    </span>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {isLoggedUserOnParticipantList ===
                                                                                    true ? (
                                                                                        <>
                                                                                            <FontAwesomeIcon
                                                                                                icon={
                                                                                                    faCircleCheck
                                                                                                }
                                                                                                className={`${styles.enrollIcon} ${styles.green}`}
                                                                                            />
                                                                                            <span
                                                                                                className={`${styles.enrollDesc} ${styles.green}`}
                                                                                            >
                                                                                                Bierzesz
                                                                                                udział
                                                                                                w
                                                                                                tym
                                                                                                badaniu!
                                                                                            </span>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <FontAwesomeIcon
                                                                                                icon={
                                                                                                    faCircleCheck
                                                                                                }
                                                                                                className={`${styles.enrollIcon} ${styles.green}`}
                                                                                            />
                                                                                            <span
                                                                                                className={`${styles.enrollDesc} ${styles.green}`}
                                                                                            >
                                                                                                Na
                                                                                                podstawie
                                                                                                wstępnych
                                                                                                wymagań
                                                                                                (płeć
                                                                                                i
                                                                                                wiek)
                                                                                                kwalifikujesz
                                                                                                się
                                                                                                do
                                                                                                udziału
                                                                                                w
                                                                                                badaniu!
                                                                                            </span>
                                                                                        </>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>

                                                {isLoggedUserOnParticipantList === false ? (
                                                    <button
                                                        className={
                                                            isSomeoneLoggedIn === false ||
                                                            calculateDaysLeft() === 'CLOSED' ||
                                                            checkForLimitExceedance() ===
                                                                'EXCEEDED' ||
                                                            checkRequirements() !== true ||
                                                            isEnrollButtonBlocked
                                                                ? `${styles.enrollButton} ${styles.disabled}`
                                                                : styles.enrollButton
                                                        }
                                                        onClick={enrollOnResearch}
                                                    >
                                                        Zapisz się na badanie
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={
                                                            isSomeoneLoggedIn === false ||
                                                            isEnrollButtonBlocked === true
                                                                ? `${styles.enrollButton} ${styles.disabled}`
                                                                : styles.enrollButton
                                                        }
                                                        onClick={resignFromResearch}
                                                    >
                                                        Zrezygnuj z udziału w badaniu
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    <div className={styles.researchPageElementColumn}>
                                        <div className={styles.categoryLabel}>
                                            Sekcja pytań i odpowiedzi
                                        </div>
                                        <span className={styles.forumInfo}>
                                            {loggedUser?.login === research.creatorLogin
                                                ? 'Poniżej znajdują się pytania, które zadały Ci osoby zainteresowane Twoim' +
                                                  ' badaniem.'
                                                : 'Jeśli chcesz zadać autorowi pytanie dotyczące badania, możesz to zrobić' +
                                                  ' poniżej.'}
                                        </span>
                                        <Forum
                                            researchCode={researchCode}
                                            fullName={`${loggedUser?.firstName} ${loggedUser?.lastName}`}
                                            researchOwnerLogin={research.creatorLogin}
                                            isSomeoneLoggedIn={isSomeoneLoggedIn}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
                {researchGetSuccess === false && (
                    <div className={styles.researchNotFoundContainer}>
                        <HelmetProvider>
                            <Helmet>
                                <title>Nie znaleziono badania | JustResearch</title>
                            </Helmet>
                        </HelmetProvider>
                        <div className={styles.researchNotFoundInfo}>
                            <FontAwesomeIcon
                                icon={faFileCircleExclamation}
                                className={styles.researchNotFoundIcon}
                            />
                            <div className={styles.researchNotFoundDesc}>
                                <span className={styles.desc1}>Nie znaleziono badania!</span>
                                <span>
                                    Upewnij się, czy link jest poprawny oraz czy autor badania nie
                                    usunął ogłoszenia
                                </span>
                            </div>
                        </div>

                        <div className={styles.navigationContainer}>
                            <h3>Co chcesz zrobić?</h3>
                            <nav className={styles.navigation}>
                                <Link to="/" className={styles.navigationButton}>
                                    <FontAwesomeIcon icon={faHouse} />
                                    <span className={styles.buttonDesc}>
                                        Przejdź na stronę główną
                                    </span>
                                </Link>

                                {isSomeoneLoggedIn && (
                                    <Link to={`/profile`} className={styles.navigationButton}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className={styles.buttonDesc}>
                                            Przejdź na stronę swojego profilu
                                        </span>
                                    </Link>
                                )}

                                <Link to="/research/create" className={styles.navigationButton}>
                                    <FontAwesomeIcon icon={faFileCirclePlus} />
                                    <span className={styles.buttonDesc}>
                                        Stwórz ogłoszenie o badaniu
                                    </span>
                                </Link>
                            </nav>
                        </div>
                    </div>
                )}
                {researchGetSuccess === null && <LoadingDots />}
            </main>
        </div>
    );
}

export { ResearchPage };
