import React, { useEffect, useState } from 'react';
import styles from './ResearchPage.module.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import researcherLogo from '../../img/banner2.png';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import { Link, useParams } from 'react-router-dom';
import getApiUrl from '../../Common/Api';
import {
    faEnvelope,
    faPhone,
    faCircleCheck,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../../hooks/useAuth';
import { Alert } from '../Alert/Alert';
import { Popup } from '../Popup/Popup';

function ResearchPage() {
    const { researchCode } = useParams();

    const { auth } = useAuth();
    const { username, accessToken } = useAuth().auth;

    const GET_RESEARCH_URL = getApiUrl() + `research/code/${researchCode}`;
    const GET_CREATOR_URL = getApiUrl() + 'user/';
    const ENROLL_URL = getApiUrl() + `research/${researchCode}/enroll`;

    const [title, setTitle] = useState('');
    const [research, setResearch] = useState();
    const [creator, setCreator] = useState();
    const [loggedUser, setLoggedUser] = useState({});
    const [location, setLocation] = useState();
    const [rewards, setRewards] = useState([]);
    const [requirements, setRequirements] = useState([]);

    const [isPosterOnFullScreen, setIsPosterOnFullScreen] = useState(false);
    const [researchGetSuccess, setResearchGetSuccess] = useState(null);

    /** Get Research From Database **/

    useEffect(() => {
        const getResearch = async () => {
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

        getResearch().then(null);
    }, []);

    /** Get Logged User Data **/

    useEffect(() => {
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
                setLoggedUser(data);
            })
            .catch(() => setResearchGetSuccess(false));
    }, [auth]);

    /*** Alerts Section ***/

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

    const showAlert = () => {
        switch (alert.alertType) {
            case 200:
                return (
                    <Alert onClose={closeAlert} type="success">
                        {alert.alertText}
                    </Alert>
                );
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
        const loggedUserGender = loggedUser.gender;
        const requiredGenders = requirements
            .filter(value => value.type === 'gender')
            .map(value => value.criteria)
            .join();

        if (requiredGenders.length > 0) {
            if (!requiredGenders.split(',').includes(loggedUserGender))
                contraindicationList.push('płeć');
        }

        /** Check for Age **/
        const birthDate = new Date(loggedUser.birthDate);
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

    /*** Polish Translator Function ***/

    const convertDateToPolish = date => {
        const months = new Map();
        months.set('01', 'stycznia');
        months.set('02', 'lutego');
        months.set('03', 'marca');
        months.set('04', 'kwietnia');
        months.set('05', 'maja');
        months.set('06', 'czerwca');
        months.set('07', 'lipca');
        months.set('08', 'sierpnia');
        months.set('09', 'września');
        months.set('10', 'października');
        months.set('11', 'listopada');
        months.set('12', 'grudnia');

        const polishDate = [];
        const separated = date.toString().split('-').reverse();
        polishDate.push(
            separated.at(0).charAt(0) === '0' ? separated.at(0).substring(1) : separated.at(0)
        );
        polishDate.push(months.get(separated.at(1)));
        polishDate.push(separated.at(2));

        return polishDate.join(' ');
    };

    const translateRewardRequirementType = type => {
        const types = new Map();
        types.set('cash', 'Pieniężna');
        types.set('item', 'Nagroda rzeczowa');
        types.set('other', 'Inne');
        types.set('gender', 'Płeć');
        types.set('age', 'Wiek');
        types.set('place', 'Miejsce zamieszkania');
        types.set('education', 'Wykształcenie');
        types.set('marital', 'Stan cywilny');

        return types.get(type) !== undefined
            ? types.get(type)
            : type.charAt(0).toUpperCase() + type.substring(1);
    };

    const translateRequirementCriterion = criterion => {
        const criteria = new Map();

        /** Gender **/
        criteria.set('male', 'mężczyzna');
        criteria.set('female', 'kobieta');
        criteria.set('other', 'inna');
        criteria.set('notGiven', 'nie podano');

        /** Place **/
        criteria.set('village', 'wieś');
        criteria.set('cityBelow50k', 'miasto poniżej 50 000 mieszkańców');
        criteria.set('cityBetween50kAnd150k', 'miasto od 50 000 do 150 000 mieszkańców');
        criteria.set('cityBetween150kAnd500k', 'miasto od 150 000 do 500 000 mieszkańców');
        criteria.set('cityAbove500k', 'miasto powyżej 500 000 mieszkańców');

        /** Education **/
        criteria.set('primary', 'podstawowe');
        criteria.set('vocational', 'zasadnicze zawodowe');
        criteria.set('middle', 'średnie');
        criteria.set('college', 'wyższe');

        /** Marital **/
        criteria.set('single', 'singiel(ka)');
        criteria.set('inRelationship', 'w związku partnerskim');
        criteria.set('engaged', 'zaręczony(-a)');
        criteria.set('married', 'w związku małżeńskim');
        criteria.set('divorced', 'rozwiedziony(-a)');
        criteria.set('widowed', 'wdowiec / wdowa');
        criteria.set('inSeparation', 'w separacji');

        return criterion.includes('other: ')
            ? criterion.split(': ').at(1)
            : criteria.get(criterion);
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
                            <strong>{translateRewardRequirementType(value.type)}: </strong>
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
                                            {translateRewardRequirementType(value.type)}
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
                                {translateRewardRequirementType(value.type)}
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
                                        return (
                                            <li key={index}>
                                                {translateRequirementCriterion(value)}
                                            </li>
                                        );
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
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText: 'Udało Ci się zapisać na to badanie!',
                    });
                    break;
                case 299:
                    setAlert({
                        alertOpen: true,
                        alertType: 299,
                        alertText:
                            'Nie możesz zapisać się na to badanie, ponieważ już jesteś jego uczestnikiem',
                    });
                    break;
                default:
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

    return (
        <div className={styles.container}>
            <HelmetProvider>
                <Helmet>
                    <title>{title} | Researcher</title>
                </Helmet>
            </HelmetProvider>

            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>

            <header className={styles.bookmarksContainer}>
                <Link to="/" className={styles.logo}>
                    <img className={styles.logoImg} src={researcherLogo} alt="Researcher Logo" />
                </Link>
                <BookmarksNav active="research" />
            </header>

            <main className={styles.researchPagePanel}>
                {isPosterOnFullScreen && <div className={styles.posterFullScreen}></div>}

                {researchGetSuccess === true && (
                    <>
                        <h2 className={styles.title}>{research.title}</h2>

                        <div className={styles.researchPageRow}>
                            <div className={styles.posterContainer} onClick={handlePosterClick}>
                                <img
                                    className={styles.posterImg}
                                    alt="poster"
                                    src={`data:image/jpeg;base64,${research.poster}`}
                                />
                            </div>

                            <div className={styles.basicInfoContainer}>
                                <div className={styles.basicInfoElementRow}>
                                    <div className={styles.dateContainerLeft}>
                                        <div className={styles.categoryLabel}>Otwarte do</div>
                                        <div className={styles.categoryValue}>
                                            {convertDateToPolish(research.endDate)}
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

                                <div className={styles.author}>
                                    <span className={styles.categoryLabel}>Autor badania: </span>
                                    <Link to={`/profile/${creator.login}`} className={styles.link}>
                                        {creator.firstName + ' ' + creator.lastName}
                                    </Link>
                                </div>

                                <div className={styles.basicInfoElement}>
                                    <span className={styles.categoryLabel}>
                                        Kontakt z autorem badania:
                                    </span>
                                    <div className={styles.contactDetails}>
                                        <span className={styles.contactElement}>
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                                className={styles.icon}
                                            />
                                            <strong> Adres e-mail: </strong>
                                            <a
                                                href={`mailto:${creator.email}`}
                                                className={styles.link}
                                            >
                                                {creator.email}
                                            </a>
                                        </span>
                                        <span className={styles.contactElement}>
                                            <FontAwesomeIcon
                                                icon={faPhone}
                                                className={styles.icon}
                                            />
                                            <strong>Numer telefonu: </strong>
                                            <span>{creator.phone}</span>
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
                                            className={checkForLimitExceedance() <= 2 && styles.red}
                                        >
                                            {research.participants} / {research.participantLimit}
                                        </strong>
                                    </div>
                                    <progress
                                        id="progress-bar"
                                        className={styles.participantsProgressBar}
                                        value={research.participants}
                                        max={research.participantLimit}
                                    />
                                </div>

                                <div className={styles.basicInfoElement}>
                                    <span className={styles.categoryLabel}>Forma badania</span>
                                    <span>
                                        {location.form === 'in-place' ? (
                                            <span>
                                                stacjonarnie{' '}
                                                <a href="#map">(kliknij, aby przejść do mapy)</a>
                                            </span>
                                        ) : (
                                            <span>
                                                zdalnie <a href="#"></a>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.bottomPageContainer}>
                            <div className={styles.researchPageElementColumn}>
                                <span className={styles.categoryLabel}>Opis badania</span>
                                <span className={styles.description}>{research.description}</span>
                            </div>

                            {research.location.form === 'in-place' && (
                                <div className={styles.researchPageElementColumn} id="map">
                                    <span className={styles.categoryLabel}>
                                        Miejsce przeprowadzania badania
                                    </span>
                                    <span className={styles.description}>[MAPA]</span>
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

                            <div className={styles.enrollContainer}>
                                <div className={styles.enrollCheckmark}>
                                    {calculateDaysLeft() === 'CLOSED' ? (
                                        <>
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                className={`${styles.enrollIcon} ${styles.red}`}
                                            />
                                            <span className={`${styles.enrollDesc} ${styles.red}`}>
                                                Badanie zakończyło się.
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {checkForLimitExceedance() === 'EXCEEDED' ? (
                                                <>
                                                    <FontAwesomeIcon
                                                        icon={faCircleXmark}
                                                        className={`${styles.enrollIcon} ${styles.red}`}
                                                    />
                                                    <span
                                                        className={`${styles.enrollDesc} ${styles.red}`}
                                                    >
                                                        Lista uczestników jest już pełna.
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    {checkRequirements() !== true ? (
                                                        <>
                                                            <FontAwesomeIcon
                                                                icon={faCircleXmark}
                                                                className={`${styles.enrollIcon} ${styles.red}`}
                                                            />
                                                            <span
                                                                className={`${styles.enrollDesc} ${styles.red}`}
                                                            >
                                                                Nie kwalifikujesz się do udziału w
                                                                tym badaniu ze względu na{' '}
                                                                {checkRequirements()}!
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FontAwesomeIcon
                                                                icon={faCircleCheck}
                                                                className={`${styles.enrollIcon} ${styles.green}`}
                                                            />
                                                            <span
                                                                className={`${styles.enrollDesc} ${styles.green}`}
                                                            >
                                                                Możesz wziąć udział w badaniu!
                                                            </span>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>

                                <button
                                    className={
                                        calculateDaysLeft() === 'CLOSED' ||
                                        checkForLimitExceedance() === 'EXCEEDED' ||
                                        checkRequirements() !== true
                                            ? `${styles.enrollButton} ${styles.disabled}`
                                            : styles.enrollButton
                                    }
                                    onClick={enrollOnResearch}
                                >
                                    Zapisz się na badanie
                                </button>
                            </div>

                            <div className={styles.researchPageElementColumn}>
                                <div className={styles.categoryLabel}>
                                    Sekcja pytań i odpowiedzi
                                </div>
                                <span>
                                    Jeśli chcesz zadać autorowi pytanie dotyczące badania, możesz to
                                    zrobić poniżej.
                                </span>
                                <div>[FORUM]</div>
                            </div>
                        </div>
                    </>
                )}
                {researchGetSuccess === false && <div>Nie udało się pobrać badania</div>}
                {researchGetSuccess === null && <div>Wczytywanie badania...</div>}
            </main>
        </div>
    );
}

export { ResearchPage };
