import './UserPage.css';
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
import { Gmap } from './Map';
import ReportForm from '../Form/ReportForm';
import LatestResearchCard from '../Researches/LatestResearchCard';
import { GoFlame } from 'react-icons/go';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function UserPage(props) {
    /*DAWIDOWE*/

    /*user data*/
    const [userData, setUserData] = useState({});

    /*access token*/
    const { username, accessToken } = useAuth().auth;

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

    /*functions*/
    const dataReload = () => {
        if (phoneInput.length > 0) {
            setPhoneState(phoneInput);
        }
        if (emailInput.length > 0) {
            setEmailState(emailInput);
        }
        if (locationInput.length > 0) {
            setLocationState(locationInput);
        }
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
        setIsClickedEdit(!clickedEdit);
        setIsClickedEmail(false);
        setIsClickedLocation(false);
        setIsClickedPhone(false);
    };

    const saveButtonCheck = () => {
        if (validateInputs()) {
            if (phoneInput.length > 0) setPhoneState(phoneInput);
            if (emailInput.length > 0) setEmailState(emailInput);
            SendToDatabase();
        }
    };

    let putTemplate = {
        phone: phoneInput,
        email: emailInput,
        location: locationInput,
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putTemplate),
    };

    /* ZROBIC ENDPOINT NA BACKU Z LOGINEM*/
    const id = userData.id;
    const EDIT_URL = `${getApiUrl()}user/${id}/update`;

    /* WDROZYC VALIDATEINPUTS*/
    async function SendToDatabase() {
        if (phoneInput === '' && emailInput === '' && locationInput === '') {
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
        <div className="MainContainer">
            <Helmet>
                <title>Profile | Researcher</title>
            </Helmet>
            <ReportForm open={openPopup} onClose={() => setOpenPopup(false)}></ReportForm>
            <div className="Container">
                <div className={isClickedLocation ? 'mapBoxVisible' : 'mapBoxHide'}>
                    <Gmap exit={exit} setLocationState={setLocationState} />
                </div>
                <div className="UserBox">
                    <div className="leftContainer">
                        <div className="infoWithoutEdit">
                            {/*<input type="file" accept="image/png, image/jpeg" onChange={event => setImage(event.target.files[0])}/>*/}
                            {/*<button onClick={async () => {*/}
                            {/*    const formData = new FormData();*/}
                            {/*    formData.append('image', image);*/}
                            {/*    formData.append('type', 'user-avatar');*/}
                            {/*    await fetch(PHOTO_UPLOAD_URL, {*/}
                            {/*        method: 'POST',*/}
                            {/*        body: formData,*/}
                            {/*    });*/}
                            {/*}}>wyślij*/}
                            {/*</button>*/}
                            <div className="mainInfo">
                                <div className="avatarBox">
                                    <img src={dude} className="avatar" alt="avatar"></img>
                                    <div className="editProfilePicture">
                                        <div className="editProfileIcon">
                                            <BsCameraFill />
                                        </div>
                                    </div>
                                </div>
                                <div className="nameDiv">
                                    <div className="nameAndSurname">{userData.firstName}</div>
                                    <div className="nameAndSurname">{userData.lastName}</div>
                                </div>
                            </div>

                            <div className="profileDescription">
                                <div className="desc">
                                    <MdLocationOn className="icon" />
                                    {locationState}
                                </div>
                                <div className="desc">
                                    <HiOutlineMail className="icon" />
                                    {emailState}
                                </div>
                                <div className="desc">
                                    <MdPhone className="icon" />
                                    {phoneState}
                                </div>
                                {userData.gender === 'male' ? (
                                    <div className="desc">
                                        <GiMale className="icon" />
                                        Mężczyzna
                                    </div>
                                ) : (
                                    <div className="desc">
                                        <GiFemale className="icon" />
                                        Kobieta
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="edit">
                            <button
                                className={!clickedEdit ? 'editBtn' : 'editBtnHide'}
                                onClick={event => {
                                    setIsClickedEdit(!clickedEdit);
                                }}
                            >
                                Edytuj profil
                            </button>
                        </div>
                    </div>
                    <div className="divider">
                        <div className="line"></div>
                    </div>
                    <div className="rightContainer">
                        <div className={clickedEdit ? 'Box' : 'BoxHide'}>
                            <div className={clickedEdit ? 'editBox' : 'editBoxHide'}>
                                <button
                                    className={clickedEdit ? 'exitBtn' : 'exitBtnHide'}
                                    onClick={event => {
                                        setIsClickedEdit(!clickedEdit);
                                        setIsClickedEmail(false);
                                        setIsClickedLocation(false);
                                        setIsClickedPhone(false);
                                    }}
                                >
                                    <GrClose />
                                </button>
                                <div className="editField">
                                    <div
                                        className={isClickedEmail ? 'editTileResized' : 'editTile'}
                                    >
                                        <div
                                            className={clickedEdit ? 'valueEdit' : 'valueEditHide'}
                                            onClick={event => {
                                                if (canExit === true) {
                                                    setIsClickedEmail(!isClickedEmail);
                                                    setEmailInput('');
                                                }
                                            }}
                                        >
                                            <div className={isClickedEmail ? 'text' : 'textSmall'}>
                                                E-mail
                                            </div>
                                            <input
                                                className={isClickedEmail ? 'val' : 'valHide'}
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
                                        className={isClickedPhone ? 'editTileResized' : 'editTile'}
                                    >
                                        <div
                                            className={clickedEdit ? 'valueEdit' : 'valueEditHide'}
                                            onClick={event => {
                                                if (canExit === true) {
                                                    setIsClickedPhone(!isClickedPhone);
                                                    setPhoneInput('');
                                                }
                                            }}
                                        >
                                            <div className={isClickedPhone ? 'text' : 'textSmall'}>
                                                Telefon
                                            </div>
                                            <input
                                                className={isClickedPhone ? 'val' : 'valHide'}
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
                                            isClickedLocation ? 'editTileLocation' : 'editTile'
                                        }
                                    >
                                        <div
                                            className={clickedEdit ? 'valueEdit' : 'valueEditHide'}
                                            onClick={event => {
                                                if (canExit === true) {
                                                    setIsClickedLocation(!isClickedLocation);
                                                    setLocationInput('');
                                                }
                                            }}
                                        >
                                            <div
                                                className={isClickedLocation ? 'text' : 'textSmall'}
                                            >
                                                Lokalizacja
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={clickedEdit ? 'saveBtn' : 'saveBtnHide'}
                                    onClick={saveButtonCheck}
                                >
                                    Zapisz
                                </button>
                            </div>
                        </div>
                        <div className={clickedEdit ? 'rightHide' : 'right'}>
                            <div className="activityBox">
                                <a className="singleActivity" href={'./research/create'}>
                                    <FontAwesomeIcon icon={faFileCirclePlus} />
                                    Dodaj nowe badanie
                                </a>
                                <div className="singleActivity">
                                    <HiOutlineDocumentText className="additionIcon" />
                                    Zobacz swoje badania
                                </div>
                                <div className="singleActivity" onClick={() => setOpenPopup(true)}>
                                    <GoFlame />
                                    Zgłoś błąd
                                </div>
                            </div>

                            {/*<div className="latestResearch">*/}
                            {/*    <LatestResearchCard></LatestResearchCard>*/}
                            {/*</div>*/}

                        </div>
                        {/*<div className="researches">*/}
                        {/*    <UserResearchCard></UserResearchCard>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}
