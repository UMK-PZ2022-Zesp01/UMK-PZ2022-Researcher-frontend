import React, {useState, useEffect} from 'react';
import styles from './UserPage.module.css';
import {Popup} from '../Popup/Popup';
import {LeftContainer} from "./Containers/LeftContainer";
import {RightContainer} from "./Containers/RightContainer";
import {BookmarksNav} from "../BookmarksNav/BookmarksNav";
import {Alert} from "../Alert/Alert";
import {Gmap} from '../GoogleMap/GoogleMap';
import {ReportForm} from '../Form/ReportForm/ReportForm';
import useAuth from '../../hooks/useAuth';
import {Helmet} from 'react-helmet';
import {Link} from "react-router-dom";
import getApiUrl from '../../Common/Api.js';
import researcherLogo from "../../img/banner2.png";

export default function UserPage(props) {
    /*user data*/
    const [userData, setUserData] = useState({});

    /*access token*/
    const {username, accessToken} = useAuth().auth;

    /*researches button value*/
    const [clickedResearches, setIsClickedResearches] = useState(false);

    const [gmapExit, setGmapExit] = useState(false)

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
        setOpenPopup(true)
    }

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
                setLocationState(data.location)
            })
            .catch(error => {
                console.error(error);
            });
        /***const getPosts = async () => {
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

         getPosts();***/

    }, []);

    /***Do Poprawienia jest css więc zakomentowane
     const showPosts = () => {
        return posts.map((post, index) => (
            <ResearchTile
                key={post.key}
                tileData={{previewed: previewed, setPreviewed: setPreviewed, tileNumber: index}}
                postData={post}
            ></ResearchTile>
        ));
    };***/
    const handleLocationClick = (value) => {
        setIsClickedLocation(value)
    }
    const exit = () => {
        setIsClickedEmail(false);
        setIsClickedLocation(false);
        setIsClickedPhone(false);

    };

    /**leftContainer args**/
    const sendToLeftContainer = {
        name: userData.firstName, lastName: userData.lastName,
        locationState: locationState, emailState: emailState, phoneState: phoneState,
        gender: userData.gender, clickedEdit: clickedEdit, setIsClickedEdit: setIsClickedEdit
    }
    /**rightContainer args**/
    const sendToRightContainer = {
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
        setLocationInput:setLocationInput,
        setPhoneState:setPhoneState,
        setEmailState:setEmailState,
        setLocationState:setLocationState
    }

    console.log("isclickedlocation",isClickedLocation)
    return (
        <div className={styles.PageOverlay}>
            <ReportForm open={openPopup} onClose={() => setOpenPopup(false)}/>
        <div className={styles.MainContainer}>
            <Helmet>
                <title>Profil | Researcher</title>
            </Helmet>
            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>
            <div className={styles.UserBox}>
                <div className={isClickedLocation ? styles.mapBoxVisible : styles.mapBoxHide}>
                    <Gmap latitude={53.015331} longitude={18.6057} type={'user-page'} exit={exit}
                          setLocationInput={setLocationInput} setIsClickedLocation={setIsClickedLocation} setGmapExit={setGmapExit} setResearchPlace={()=>{}} />
                </div>
                <div className={styles.Container}>
                    <header className={styles.bookmarksContainer}>
                        <Link to="/" className={styles.logo}>
                            <img className={styles.logoImg} src={researcherLogo} alt="Researcher Logo"/>
                        </Link>
                        <BookmarksNav active="profile"/>
                    </header>
                    <div className={styles.wrapper}>

                        {/* tutaj posty */}

                        <LeftContainer values={sendToLeftContainer}
                        />
                        <RightContainer values={sendToRightContainer}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}