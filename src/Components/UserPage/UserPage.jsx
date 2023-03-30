import styles from './UserPage.module.css';
import dude from '../../img/dude.png';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
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
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {LatestResearchCard} from "../Researches/LatestResearchCard";
import {UserResearchCard} from "../Researches/UserResearchCard";
import {Link} from "react-router-dom";
import researcherLogo from "../../img/banner2.png";
import {BookmarksNav} from "../BookmarksNav/BookmarksNav";

const USER_URL = getApiUrl() + 'user/current';

export default function UserPage(props) {
    /*DAWIDOWE*/


    /*user data*/
    const [userData, setUserData] = useState({});

    /*access token*/
    const {username, accessToken} = useAuth().auth;

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
    const [coords,setCoords]=useState(0)

    // /*image*/
    // const PHOTO_UPLOAD_URL = getApiUrl() + 'image/upload';
    // const [image, setImage] = useState(null)
    // const [imageJson,setImageJson]=useState({image:null})
    // const [recivedImage,setRecivedImage]=useState()

    /*dynamic change of displayed data*/
    const [phoneState, setPhoneState] = useState(userData.phone);
    const [emailState, setEmailState] = useState(userData.email);
    const [locationState, setLocationState] = useState('TO DO');

    /*handlers*/
    const handlePhoneChange = event => {
        const regex = /^[0-9\s]+$/; // regular expression to allow only numbers and backspace
        if (event.target.value === '' || regex.test(event.target.value)) {
            setPhoneInput(event.target.value);
        }
    };
    const bugPopup=()=>{
        window.scrollTo({top: 0})
        window.document.body.style.overflowY='hidden'
        setOpenPopup(true)
    }

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
        isPhoneRegexValid?console.log("phone ok"):console.log("phone wrong")
        isEmailRegexValid?console.log("email ok"):console.log("email wrong")
        console.log(isEmailRegexValid && isPhoneRegexValid);
        return isEmailRegexValid && isPhoneRegexValid;
    };

    const exit = () => {
        setIsClickedEdit(!clickedEdit);
        setIsClickedEmail(false);
        setIsClickedLocation(false);
        setIsClickedPhone(false);

    };

    const saveButtonCheck = () => {
        if(validateInputs()){
            if(phoneInput.length>0)
                setPhoneState(phoneInput)
            if(emailInput.length>0)
                setEmailState(emailInput)
            SendToDatabase().catch(e=>(console.log('whoops')))
            exit()
        }
    };

    let putTemplate = {
        phone: phoneInput,
        email: emailInput,
        location:locationInput,
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
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(putTemplate),
    };

    /* ZROBIC ENDPOINT NA BACKU Z LOGINEM*/
    const id = userData.id;
    const EDIT_URL = `${getApiUrl()}user/${id}/update`;

    /* WDROZYC VALIDATEINPUTS*/
    async function SendToDatabase() {
        if (phoneInput === '' && emailInput === ''&& locationInput === '') {
            console.log('brak danych');
            return;
        }
        const response = await fetch(EDIT_URL, requestOptions);
        if (!response.ok) {
            console.log('COS SIE ZJEBALO');
            return;
        }
        console.log('JAZDA Z BZSTYLER NO I W PYTĘ');
    }
    //const avatarid="FY5oFd";

    // console.log(recivedImage)

    return (
        <div className={styles.MainContainer}>
            <Helmet>
                <title>Profile | Researcher</title>
            </Helmet>
            <ReportForm open={openPopup} onClose={() => setOpenPopup(false)}/>
                <div className={isClickedLocation ? styles.mapBoxVisible : styles.mapBoxHide}>
                    <Gmap latitude={53.015331} longitude={18.6057} type={'user-page'} exit={exit} setLocationState={setLocationState} setCoords={setCoords}/>
                </div>
            <div className='Container'>
                <header className={styles.bookmarksContainer}>
                    <Link to="/" className={styles.logo}>
                        <img className={styles.logoImg} src={researcherLogo} alt="Researcher Logo" />
                    </Link>
                    <BookmarksNav active="profile" />
                </header>
                <div className={styles.UserBox}>
                    <div className={styles.leftContainer}>
                        <div className={styles.infoWithoutEdit}>
                            <div className={styles.mainInfo}>
                                <div className={styles.avatarBox}>
                                    <img src={dude} className={styles.avatarImage} alt="avatar"></img>
                                    <div className={styles.editAvatarButton}>
                                        <div className={styles.avatarIcon}>
                                            <BsCameraFill/>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.nameDiv}>
                                    <div className={styles.nameAndSurname}>{userData.firstName}</div>
                                    <div className={styles.nameAndSurname}>{userData.lastName}</div>
                                </div>
                            </div>

                            <div className={styles.profileDescription}>
                                <div className={styles.desc}>
                                    <MdLocationOn className={styles.icon}/>
                                    {locationState}
                                </div>
                                <div className={styles.desc}>
                                    <HiOutlineMail className={styles.icon}/>
                                    {emailState}
                                </div>
                                <div className={styles.desc}>
                                    <MdPhone className={styles.icon}/>
                                    {phoneState}
                                </div>
                                {userData.gender === 'male' ? (
                                    <div className={styles.desc}>
                                        <GiMale className={styles.icon}/>
                                        Mężczyzna
                                    </div>
                                ) : (
                                    <div className={styles.desc}>
                                        <GiFemale className={styles.icon}/>
                                        Kobieta
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.editDiv}>
                            <button
                                className={!clickedEdit ? styles.editButton : styles.editButtonHide}
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
                                className={clickedEdit ? styles.exitBtn : styles.exitBtnHide}
                                onClick={exit}
                            >
                                <GrClose/>
                            </button>
                            <div className={styles.editField}>
                                <div
                                    className={isClickedEmail ? styles.editTileResized : styles.editTile}
                                >
                                    <div
                                        className={clickedEdit ? styles.valueEdit : styles.valueEditHide}
                                        onClick={event => {
                                            if (canExit === true) {
                                                setIsClickedEmail(!isClickedEmail);
                                                setEmailInput('');
                                            }
                                        }}
                                    >
                                        <div className={isClickedEmail ? styles.text : styles.textSmall}>
                                            E-mail
                                        </div>
                                        <input
                                            className={isClickedEmail ? styles.val : styles.valHide}
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
                                    className={isClickedPhone ? styles.editTileResized : styles.editTile}
                                >
                                    <div
                                        className={clickedEdit ? styles.valueEdit : styles.valueEditHide}
                                        onClick={event => {
                                            if (canExit === true) {
                                                setIsClickedPhone(!isClickedPhone);
                                                setPhoneInput('');
                                            }
                                        }}
                                    >
                                        <div className={isClickedPhone ? styles.text : styles.textSmall}>
                                            Telefon
                                        </div>
                                        <input
                                            className={isClickedPhone ? styles.val : styles.valHide}
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
                                        isClickedLocation ? styles.editTileLocation : styles.editTile
                                    } onClick={()=>{window.scrollTo({top: 50})
                                    // window.document.body.style.overflowY='hidden'
                                }}
                                >
                                    <div
                                        className={clickedEdit ? styles.valueEdit : styles.valueEditHide}
                                        onClick={()=> {
                                            if (canExit === true) {
                                                setIsClickedLocation(!isClickedLocation);
                                                setLocationInput('');
                                            }
                                        }}
                                    >
                                        <div
                                            className={isClickedLocation ? styles.text : styles.textSmall}
                                        >
                                            Lokalizacja
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={clickedEdit ? styles.saveBtn : styles.saveBtnHide}
                                onClick={saveButtonCheck}
                            >
                                Zapisz
                            </button>
                        </div>
                        <div className={clickedEdit ? styles.rightHide : styles.right}>
                            <div className={styles.activityBox}>
                                <a className={styles.singleActivity} href={'./research/create'}>
                                    <FontAwesomeIcon icon={faFileCirclePlus}/>
                                    <span>Dodaj nowe badanie</span>

                                </a>
                                <div className={styles.singleActivity}>
                                    <HiOutlineDocumentText className={styles.additionIconResearches}/>
                                    <span>Zobacz swoje badania</span>
                                </div>
                                <div className={styles.singleActivity} onClick={bugPopup}>
                                    <GoFlame className={styles.additionIcon}/>
                                    <span>Zgłoś błąd</span>
                                </div>
                            </div>
                            <div className={styles.latestResearch}>
                                <LatestResearchCard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}