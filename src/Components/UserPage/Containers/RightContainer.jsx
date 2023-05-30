import styles from '../Containers/Container.module.css';
import {useEffect, useRef} from 'react';
import {GrClose} from 'react-icons/gr';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faBug,
    faFileCirclePlus,
    faFileLines,
    faGear,
    faPencil,
} from '@fortawesome/free-solid-svg-icons';

import React, {useState} from 'react';
import useAuth from '../../../hooks/useAuth';
import getApiUrl from '../../../Common/Api';
import {Link} from 'react-router-dom';

import {useLocation} from 'react-router-dom';
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import jwtDecode from "jwt-decode";

const RightContainer = ({values}) => {
    /** Conditional component rendering **/

    const EDIT_URL = `${getApiUrl()}user/current/update`;
    const EDIT_PASSWORD_URL = `${getApiUrl()}user/current/updatePassword`;
    const DELETE_URL = `${getApiUrl()}user/current/delete`;
    const DELETE_GOOGLE_URL = `${getApiUrl()}user/google/delete`;
    const {accessToken} = useAuth().auth;
    const setAlert = values.setAlert;

    const[googleInfo,setGoogleInfo]=useState('')

    const [googleDelete,setGoogleDelete]=useState(false)

    /*phone section*/
    const [phoneInput, setPhoneInput] = useState('');
    const [isClickedPhone, setIsClickedPhone] = useState(false);

    /*location section*/
    const [isClickedLocation, setIsClickedLocation] = useState(false);

    /*email section*/
    const [emailInput, setEmailInput] = useState('');
    const [isClickedEmail, setIsClickedEmail] = useState(false);

    const [currentPasswordInput, setCurrentPasswordInput] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [isClickedPassword, setIsClickedPassword] = useState(false);

    const [passwordCheckInput, setPasswordCheckInput] = useState('');
    const [isClickedDelete, setIsClickedDelete] = useState(false);

    /*input debugger*/
    const [canExit, setCanExit] = useState(true);
    const [googleButtonWrapper, setGoogleButtonWrapper] = useState(null);
    const fakeButton = useRef(null);

    const exit = () => {
        values.setIsClickedEdit(false);
        setIsClickedEmail(false);
        setIsClickedLocation(false);
        setIsClickedPhone(false);
        values.setLocationInput('');
    };
    const handlePhoneChange = event => {
        const regex = /^[0-9\b\s]*$/; // regular expression to allow only numbers and backspace
        if (event.target.value === '' || regex.test(event.target.value)) {
            setPhoneInput(event.target.value);
        }
    };

    let deleteTemplate = {
        password: passwordCheckInput.length > 0 ? passwordCheckInput : null,
    };
    let deleteGoogleTemplate = {
        email: values.emailState.length > 0 ? values.emailState : null,
        jwt:googleInfo
    };

    const deleteRequestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteTemplate),
    };

    const deleteGoogleRequestOptions={
        method: 'DELETE',
        headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteGoogleTemplate),
    }

    const deleteUser = async () => {
        const response = await fetch(DELETE_URL, deleteRequestOptions);
        if (response.status === 299) {
            setAlert({
                alertOpen: true,
                alertType: 299,
                alertText: 'Podane hasło jest niepoprawne',
            });
            return;
        }
        window.location.replace('https://justresearch.netlify.app/login');
    };

    const deleteGoogleUser = async () => {
        const response = await fetch(DELETE_GOOGLE_URL, deleteGoogleRequestOptions);
        if (response.status === 299) {
            setAlert({
                alertOpen: true,
                alertType: 299,
                alertText: 'Coś jest nie tak, spróbuj ponownie później',
            });
            return;
        }
        window.location.replace('https://justresearch.netlify.app/login');

    }

    let passwordTemplate = {
        password: currentPasswordInput.length > 0 ? currentPasswordInput : null,
        newPassword: newPasswordInput.length > 0 ? newPasswordInput : null,
    };
    const passwordRequestOptions = {
        method: 'PUT',
        headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordTemplate),
    };
    const changePasswordButton = async () => {
        const response = await fetch(EDIT_PASSWORD_URL, passwordRequestOptions);
        if (response.status === 299) {
            setAlert({
                alertOpen: true,
                alertType: 299,
                alertText: 'Wprowadź poprawne dane',
            });
            return;
        }
        setAlert({
            alertOpen: true,
            alertType: 204,
            alertText: 'Zmiany zostały zapisane',
        });
        return;
    };

    let putTemplate = {
        phone: phoneInput.length > 0 ? phoneInput : null,
        email: emailInput.length > 0 ? emailInput : null,
        location: values.locationInput.length > 0 ? values.locationInput : null,
        locationCoords: values.userLocationCoords.length > 0 ? values.userLocationCoords : null,
        // locationCoords:[21,21],
    };

    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(putTemplate),
    };

    const saveButtonCheck = async () => {
        if (phoneInput.length < 1 && emailInput.length < 1 && values.locationInput.length < 1) {
            values.setGmapExit(false);
            return;
        }
        if (values.locationInput.includes('[nie wybrano]')) {
            setAlert({
                alertOpen: true,
                alertType: 299,
                alertText: 'Nie wybrano lokalizacji',
            });
            return;
        }
        if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/.test(emailInput) && emailInput.length > 0) {
            setAlert({
                alertOpen: true,
                alertType: 298,
                alertText: 'Nieprawidłowy format email',
            });
            return;
        }
        if (!/[0-9]{3} [0-9]{3} [0-9]{3}/.test(phoneInput) && phoneInput.length > 0) {
            setAlert({
                alertOpen: true,
                alertType: 298,
                alertText: 'Nieprawidłowy format numeru telefonu',
            });
            return;
        }
        const response = await fetch(EDIT_URL, requestOptions);
        if (response.status === 298) {
            setAlert({
                alertOpen: true,
                alertType: 298,
                alertText: 'Ten email jest zajęty, wprowadź poprawny adres email',
            });
        }
        if (response.status === 299) {
            setAlert({
                alertOpen: true,
                alertType: 299,
                alertText: 'Ten numer telefonu jest zajęty, wprowadź poprawny numer telefonu',
            });
        }
        if (response.status === 200) {
            if (phoneInput.length > 0) {
                values.setPhoneState(phoneInput);
                setIsClickedPhone(false);
                setPhoneInput('');
            }
            if (emailInput.length > 0) {
                values.setEmailState(emailInput);
                setIsClickedEmail(false);
                setEmailInput('');
            }
            if (values.locationInput.length > 0) {
                values.setLocationState(values.locationInput);
                setIsClickedLocation(false);
                values.setGmapExit(false);
            }
            setAlert({
                alertOpen: true,
                alertType: 204,
                alertText: 'Zmiany zostały zapisane',
            });
            return;
        } else {
            setIsClickedLocation(false);
            setIsClickedEmail(false);
            setIsClickedPhone(false);
            setEmailInput('');
            setPhoneInput('');
            values.setGmapExit(false);
            values.setGmapExit(false)
        }
    };

    async function handleGoogleResponse(response) {
        setGoogleInfo(response.credential)
    }

    useEffect(()=>{
        if (googleInfo!==null&&googleDelete===true){
            deleteGoogleUser()
        }
    },[googleInfo])


    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_LOGIN_API_GOOGLE,
            callback: handleGoogleResponse,
        });
        createFakeGoogleWrapper();
    }, []);

    const createFakeGoogleWrapper = () => {
        window.google.accounts.id.renderButton(fakeButton.current, {
            type: "icon",
            width: "200",
        });

        const googleLoginWrapperButton =
            fakeButton.current.querySelector("div[role=button]");

        setGoogleButtonWrapper({
            click: () => {
                googleLoginWrapperButton.click();
            },
        });
    };

    window.handleGoogleLogin = () => {
        if (googleButtonWrapper) {
            googleButtonWrapper.click();
        }
    };

    const formatAndSetPhoneInput = e => {
        const inputVal = e.target.value.replace(/ /g, ""); //remove all the empty spaces in the input
        let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits

        if (inputNumbersOnly.length > 9) {
            //If entered value has a length greater than 16 then take only the first 16 digits
            inputNumbersOnly = inputNumbersOnly.substr(0, 9);
        }

        // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
        const splits = inputNumbersOnly.match(/.{1,3}/g);

        let spacedNumber = "";
        if (splits) {
            spacedNumber = splits.join(" "); // Join all the splits with an empty space
        }

        setPhoneInput(spacedNumber); // Set the new CC number
    };


    return (
        <div className={styles.rightContainer}>
            <div className={values.clickedEdit ? styles.editBox : styles.editBoxHide}>
                <button
                    className={values.clickedEdit ? styles.exitBtn : styles.exitBtnHide}
                    onClick={() => {
                        exit();
                    }}
                >
                    <GrClose/>
                </button>
                <div className={styles.editField}>
                    {!values.isGoogle && <div className={isClickedEmail ? styles.editTileResized : styles.editTile}>
                        <div
                            className={values.clickedEdit ? styles.valueEdit : styles.valueEditHide}
                            onClick={() => {
                                setIsClickedEmail(!isClickedEmail);
                                setEmailInput('');
                            }}
                        >
                            <div className={isClickedEmail ? styles.text : styles.textSmall}>
                                E-mail
                            </div>
                            <input
                                className={isClickedEmail ? styles.val : styles.valHide}
                                value={emailInput}
                                onClick={event => {
                                    event.stopPropagation();
                                }}
                                onChange={event => {
                                    setEmailInput(event.target.value);
                                }}
                                type="email"
                                placeholder="j.kowalski@example.com"
                            />
                        </div>
                    </div>}

                    <div className={isClickedPhone ? styles.editTileResized : styles.editTile}>
                        <div
                            className={values.clickedEdit ? styles.valueEdit : styles.valueEditHide}
                            onClick={() => {
                                setIsClickedPhone(!isClickedPhone);
                                setPhoneInput('');
                            }}
                        >
                            <div className={isClickedPhone ? styles.text : styles.textSmall}>
                                Telefon
                            </div>
                            <input
                                className={isClickedPhone ? styles.val : styles.valHide}
                                onClick={event => {
                                    event.stopPropagation();
                                }}
                                onChange={formatAndSetPhoneInput}
                                type="text"
                                value={phoneInput}
                                placeholder="555 555 555"
                                pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
                            />
                        </div>
                    </div>

                    <div
                        className={
                            values.gmapExit && values.locationInput !== ''
                                ? styles.editTileResized
                                : styles.editTile
                        }
                        onClick={() => {
                        }}
                    >
                        <div
                            className={values.clickedEdit ? styles.valueEdit : styles.valueEditHide}
                            onClick={() => {
                                if (canExit === true) {
                                    values.handleLocationClick(!isClickedLocation);
                                }
                            }}
                        >
                            <div className={isClickedLocation ? styles.text : styles.textSmall}>
                                Lokalizacja
                            </div>
                            <span
                                className={`${styles.location} ${styles.color} ${styles.margin} ${
                                    !values.gmapExit ? styles.hidden : ''
                                } `}
                            >
                                {values.locationInput}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    className={values.clickedEdit ? styles.saveBtn : styles.saveBtnHide}
                    onClick={saveButtonCheck}
                >
                    Zapisz
                </button>
            </div>

            <div className={values.clickedAdvance ? styles.editBoxPassword : styles.editBoxHide}>
                <button
                    className={values.clickedAdvance ? styles.exitBtn : styles.exitBtnHide}
                    onClick={() => {
                        values.setClickedAdvance(false);
                        setIsClickedPassword(false);
                        setIsClickedDelete(false);
                        setPasswordCheckInput('');
                        setCurrentPasswordInput('');
                        setNewPasswordInput('');
                    }}
                >
                    <GrClose/>
                </button>
                <div className={styles.editField}>
                    {!values.isGoogle && <div
                        className={
                            isClickedPassword ? styles.editTileResizedPassword : styles.editTile
                        }
                    >
                        <div
                            className={
                                values.clickedAdvance ? styles.valueEdit : styles.valueEditHide
                            }
                            onClick={() => {
                                if (canExit === true) {
                                    setIsClickedPassword(!isClickedPassword);
                                    setCurrentPasswordInput('');
                                    setNewPasswordInput('');
                                }
                            }}
                        >
                            <div className={isClickedPassword ? styles.text : styles.textSmall}>
                                Zmień hasło
                            </div>
                            <input
                                className={isClickedPassword ? styles.val : styles.valHide}
                                onClick={event => {
                                    event.stopPropagation();
                                }}
                                value={currentPasswordInput}
                                onChange={event => {
                                    setCurrentPasswordInput(event.target.value);
                                }}
                                type="password"
                                placeholder="aktualne hasło"
                            />
                            <input
                                className={isClickedPassword ? styles.val : styles.valHide}
                                onClick={event => {
                                    event.stopPropagation();
                                }}
                                value={newPasswordInput}
                                onChange={event => {
                                    setNewPasswordInput(event.target.value);
                                }}
                                type="password"
                                placeholder="nowe hasło"
                            />
                            <button
                                className={
                                    isClickedPassword
                                        ? styles.saveBtnPassword
                                        : styles.saveBtnPasswordHide
                                }
                                onClick={changePasswordButton}
                            >
                                Zapiszz
                            </button>
                        </div>
                    </div>}
                    {!values.isGoogle && <div
                        className={isClickedDelete ? styles.editTileResizedDelete : styles.editTile}
                    >
                        <div
                            className={
                                values.clickedAdvance ? styles.valueEdit : styles.valueEditHide
                            }
                            onClick={() => {
                                if (canExit === true) {
                                    setIsClickedDelete(!isClickedDelete);
                                    setPasswordCheckInput('');
                                }
                            }}
                        >

                            <div className={isClickedDelete ? styles.text : styles.textSmall}>
                                Usuń konto
                            </div>
                            <input
                                className={isClickedDelete ? styles.val : styles.valHide}
                                onClick={event => {
                                    event.stopPropagation();
                                }}
                                onChange={event => {
                                    setPasswordCheckInput(event.target.value);
                                }}
                                type="password"
                                value={passwordCheckInput}
                                placeholder="aktualne hasło"
                            />
                            <button
                                onMouseEnter={() => {
                                    setCanExit(false);
                                }}
                                onMouseLeave={() => {
                                    setCanExit(true);
                                }}
                                onClick={deleteUser}
                                className={
                                    isClickedDelete ? styles.deleteButton : styles.deleteButtonHide
                                }
                            >
                                Usuń konto
                            </button>
                        </div>
                    </div>}
                    {values.isGoogle &&
                        <div
                            className={styles.editTileResizedDelete}
                        >
                            <div
                                className={styles.valueEdit}
                            >
                                <div className={styles.text}>
                                    Usuń konto
                                </div>
                                <button
                                    onClick={()=>{
                                        window.handleGoogleLogin()
                                        setGoogleDelete(true)
                                    }}
                                    className={styles.deleteGoogleButton}
                                >
                                    <FontAwesomeIcon icon={faGoogle}/>
                                </button>

                            </div>
                        </div>

                    }

                </div>
            </div>
            <div
                className={
                    values.clickedEdit || values.clickedAdvance ? styles.rightHide : styles.right
                }
            >
                <div className={styles.activityBox}>
                    <Link to='/research/create' className={styles.formButton}>
                        <FontAwesomeIcon icon={faFileCirclePlus} className={styles.faIcon}/>
                        <span>Dodaj nowe badanie</span>
                    </Link>
                    <div
                        className={styles.formButton}
                        onClick={() => values.setIsClickedResearches(true)}
                    >
                        <FontAwesomeIcon icon={faFileLines} className={styles.faIcon}/>
                        <span>Zobacz swoje badania</span>
                    </div>
                    <div className={styles.formButton} onClick={values.bugPopup}>
                        <FontAwesomeIcon icon={faBug} className={styles.faIcon}/>
                        <span>Zgłoś błąd</span>
                    </div>
                    <div className={styles.cont}>
                        <div
                            className={`${styles.formButton} ${styles.half}`}
                            onClick={() => {
                                values.setIsClickedEdit(!values.clickedEdit);
                            }}
                        >
                            <FontAwesomeIcon icon={faPencil} className={styles.faIcon}/>
                            <span>Edytuj profil</span>
                        </div>
                        <div
                            className={`${styles.formButton} ${styles.half}`}
                            onClick={() => {
                                values.setClickedAdvance(!values.clickedAdvance);
                            }}
                        >
                            <FontAwesomeIcon icon={faGear} className={styles.faIcon}/>
                            <span>Ustawienia </span>
                        </div>
                    </div>
                </div>
            </div>
            <div role={"button"} ref={fakeButton} className={styles.fakeButton} />
        </div>
    );
};

export {RightContainer};
