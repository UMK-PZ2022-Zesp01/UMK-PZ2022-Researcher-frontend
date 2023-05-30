import React, {useState, useEffect} from 'react';
import styles from './UserPage.module.css';
import {Popup} from '../Popup/Popup';
import {LeftContainer} from './Containers/LeftContainer';
import {RightContainer} from './Containers/RightContainer';
import {BookmarksNav} from '../BookmarksNav/BookmarksNav';
import {Alert} from '../Alert/Alert';
import {Gmap} from '../GoogleMap/GoogleMap';
import {ReportForm} from '../Form/ReportForm/ReportForm';
import useAuth from '../../hooks/useAuth';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import getApiUrl from '../../Common/Api.js';
import researcherLogo from '../../img/logo-white.png';
import {faArrowTurnDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ResearchTile from '../ResearchTile/ResearchTile';
import {HelmetProvider} from 'react-helmet-async';

const RESEARCHES_URL = getApiUrl() + 'research/creator/';

export default function UserPage(props) {
    /*user data*/
    const [userData, setUserData] = useState({});
    const [isGoogle, setIsGoogle] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    /*access token*/
    const {username, accessToken} = useAuth().auth;

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
    const [userLocationCoords, setUserLocationCoords] = useState([]);
    const [isClickedLocation, setIsClickedLocation] = useState(false);

    /*email section*/
    const [isClickedEmail, setIsClickedEmail] = useState(false);

    /*input debugger*/
    const [canExit, setCanExit] = useState(true);

    /*report popup*/
    const [openPopup, setOpenPopup] = useState(false);

    /*user's posts*/
    const [postsCreated, setPostsCreated] = useState([]);
    const [postsEnrolled, setPostsEnrolled] = useState([]);
    const [previewed, setPreviewed] = useState(null);
    const [fetchCreatedPosts, setFetchCreatedPosts] = useState(true);

    /*dynamic change of displayed data*/
    const [phoneState, setPhoneState] = useState();
    const [emailState, setEmailState] = useState();
    const [locationState, setLocationState] = useState();
    const [coords, setCoords] = useState([]);

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
            case 200:
            case 201:
            case 202:
            case 203:
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
                setCoords(data.locationCoords);
                setIsGoogle(data.isGoogle);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
            });


        const getPosts = async () => {
            const response = await fetch(RESEARCHES_URL + username, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset:UTF-8',
                },
            });

            switch (response.status){
                case 200:
                    const result = await response.json()
                    setPostsCreated(result)
                    break;
                case 204:
                    setPostsCreated([])
                    break;
            }
        };

        try {
            fetch(getApiUrl() + 'user/' + username + '/enrolledresearches', {
                method: 'GET',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json;charset:UTF-8',
                },
            })
                .then(response => response.json())
                .then(result => setPostsEnrolled(result))
                .catch(error => {
                    console.error(error);
                    setPostsEnrolled([]);
                });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }

        getPosts();


    }, [emailState, phoneState, locationState]);


    const showPostsCreated = () => {
        if (postsCreated.length === 0)
            return (
                <div className={styles.noPosts}>
                    <h2>Nie ma jeszcze badań stworzonych przez Ciebie</h2>
                </div>
            )
        else
            return postsCreated.map((post, index) => (
                <ResearchTile
                    key={`ResearchTile${post.researchCode}`}
                    tileData={{
                        previewed: previewed,
                        setPreviewed: setPreviewed,
                        tileNumber: index,
                    }}
                    postData={post}
                />
            ));
    };

    const showPostsEnrolled = () => {
        if (postsEnrolled.length === 0)
            return (
                <div className={styles.noPosts}>
                    <h2>Nie bierzesz jeszcze udziału w żadnym badaniu</h2>
                </div>
            )
        else
            return postsEnrolled.map((post, index) => (
                <ResearchTile
                    key={`ResearchTile${post.researchCode}`}
                    tileData={{
                        previewed: previewed,
                        setPreviewed: setPreviewed,
                        tileNumber: index,
                    }}
                    postData={post}
                />
            ));
    };

    const researchesHeader = () => {
        if (fetchCreatedPosts)
            return <h2 className={styles.researchListHeader}>Badania utworzone przez Ciebie</h2>;
        else
            return (
                <h2 className={styles.researchListHeader}>Badania, w których bierzesz udział</h2>
            );
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
        isGoogle: isGoogle,
        setAlert: setAlert,
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
        isGoogle: isGoogle,
        setIsClickedResearches: setIsClickedResearches,
        bugPopup,
        handleLocationClick,
        locationInput: locationInput,
        setLocationInput: setLocationInput,
        userLocationCoords: userLocationCoords,
        setUserLocationCoords: setUserLocationCoords,
        setPhoneState: setPhoneState,
        setEmailState: setEmailState,
        setLocationState: setLocationState,
        setAlert: setAlert,
        emailState:emailState
    };
    return (
        !isLoading && (
            <div className={styles.PageOverlay}>
                <div className={styles.alertOverlay}>
                    <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
                </div>
                <ReportForm
                    setAlert={setAlert}
                    open={openPopup}
                    onClose={() => setOpenPopup(false)}
                />
                <div className={styles.MainContainer}>
                    <HelmetProvider>
                        <Helmet>
                            <title>
                                {userData.firstName + ' ' + userData.lastName + ' | JustResearch'}
                            </title>
                        </Helmet>
                    </HelmetProvider>
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
                                <BookmarksNav active="profile" desc="Twój profil"/>
                            </header>
                            <div className={styles.wrapper}>
                                <div
                                    className={
                                        clickedResearches
                                            ? styles.userResearches
                                            : styles.userResearchesHide
                                    }
                                >
                                    <div className={styles.userResearchesToggles}>
                                        <button
                                            className={styles.exitResBtn}
                                            onClick={() => setIsClickedResearches(false)}
                                        >
                                            <FontAwesomeIcon
                                                className={styles.arrowIcon}
                                                icon={faArrowTurnDown}
                                            />
                                        </button>
                                        <div className={styles.inputWrapper}>
                                            <label className={styles.switch}>
                                                <input
                                                    type="checkbox"
                                                    className={styles.checkbox}
                                                    id={'checkbox'}
                                                    checked={fetchCreatedPosts}
                                                    onChange={e =>
                                                        setFetchCreatedPosts(e.target.checked)
                                                    }
                                                />
                                                <div className={styles.slider}/>
                                            </label>
                                        </div>
                                    </div>
                                    {researchesHeader()}
                                    {fetchCreatedPosts === true && (
                                        <div className={styles.userResearchCard}>
                                            {showPostsCreated()}
                                        </div>
                                    )}
                                    {fetchCreatedPosts === false && (
                                        <div className={styles.userResearchCard}>
                                            {showPostsEnrolled()}
                                        </div>
                                    )}
                                </div>

                                <LeftContainer values={sendToLeftContainer}/>
                                <RightContainer values={sendToRightContainer}/>
                            </div>
                        </div>
                        <div
                            className={isClickedLocation ? styles.mapBoxVisible : styles.mapBoxHide}
                        >
                            <Gmap
                                latitude={coords.length > 0 ? Number(coords[0]) : 53.015331}
                                longitude={coords.length > 0 ? Number(coords[1]) : 18.6057}
                                type={'user-page'}
                                exit={exit}
                                setLocationInput={setLocationInput}
                                setIsClickedLocation={setIsClickedLocation}
                                setGmapExit={setGmapExit}
                                setResearchPlace={() => {
                                }}
                                setResearchPageAddress={() => {
                                }}
                                setUserLocationCoords={setUserLocationCoords}
                                userLocation={locationState}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
