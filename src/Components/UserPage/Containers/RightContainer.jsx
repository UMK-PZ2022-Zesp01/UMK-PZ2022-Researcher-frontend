import styles from '../Containers/Container.module.css';
import {useRef} from 'react';
import { GrClose } from 'react-icons/gr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { GoFlame } from 'react-icons/go';
import { LatestResearchCard } from '../../Researches/LatestResearchCard';
import React, { useState } from 'react';
import useAuth, { useUsername } from '../../../hooks/useAuth';
import getApiUrl from '../../../Common/Api';
import { Alert } from '../../Alert/Alert';
import { Popup } from '../../Popup/Popup';

const RightContainer = ({ values }) => {
    const login = useUsername();
    const EDIT_URL = `${getApiUrl()}user/current/update`;
    const EDIT_PASSWORD_URL = `${getApiUrl()}user/current/updatePassword`;
    const DELETE_URL = `${getApiUrl()}user/current/delete`;
    const { username, accessToken } = useAuth().auth;
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const delPasswordRef = useRef(null);
    const setAlert=values.setAlert

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

    const handleClick = (ref) => {
        ref.current.focus();
    };
    const exit = () => {
        values.setIsClickedEdit(false);
        setIsClickedEmail(false);
        setIsClickedLocation(false);
        setIsClickedPhone(false);
        values.setLocationInput('');
    };
    const handlePhoneChange = event => {
        const regex = /^[0-9\s]+$/; // regular expression to allow only numbers and backspace
        if (event.target.value === '' || regex.test(event.target.value)) {
            setPhoneInput(event.target.value);
        }
    };

    let deleteTemplate = {
        password: passwordCheckInput.length > 0 ? passwordCheckInput : null,
    };

    const deleteRequestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteTemplate),
    };

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
        window.location.replace("https://justresearch.netlify.app/login");
    };

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
        locationCoords:values.userLocationCoords.length>0?values.userLocationCoords:null,
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
        // console.log(phoneInput, emailInput);
        if (values.locationInput.includes('[nie wybrano]')) {
            setAlert({
                alertOpen: true,
                alertType: 299,
                alertText: 'Nie wybrano lokalizacji',
            });
            return;
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailInput) && emailInput.length > 0) {
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
                // values.setLocationInput('')
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
        }
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
                    <GrClose />
                </button>
                <div className={styles.editField}>
                    <div className={isClickedEmail ? styles.editTileResized : styles.editTile}>
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
                                onClick={(event)=>{
                                    event.stopPropagation();
                                }}
                                onChange={event => {
                                    setEmailInput(event.target.value);
                                }}
                                type="email"
                                placeholder="j.kowalski@example.com"
                            />
                        </div>
                    </div>

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
                                onClick={(event)=>{
                                    event.stopPropagation();
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
                            values.gmapExit && values.locationInput !== ''
                                ? styles.editTileResized
                                : styles.editTile
                        }
                        onClick={() => {}}
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
                    <GrClose />
                </button>
                <div className={styles.editField}>
                    <div
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
                                onClick={(event)=>{
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
                                onClick={(event)=>{
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
                                Zapisz
                            </button>
                        </div>
                    </div>

                    <div
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
                                onClick={(event)=>{
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
                    </div>
                </div>
            </div>
            <div
                className={
                    values.clickedEdit || values.clickedAdvance ? styles.rightHide : styles.right
                }
            >
                <div className={styles.activityBox}>
                    <a className={styles.singleActivity} href={'./research/create'}>
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                        <span>Dodaj nowe badanie</span>
                    </a>
                    <div
                        className={styles.singleActivity}
                        onClick={() => values.setIsClickedResearches(true)}
                    >
                        <HiOutlineDocumentText className={styles.additionIconResearches} />
                        <span>Zobacz swoje badania</span>
                    </div>
                    <div className={styles.singleActivity} onClick={values.bugPopup}>
                        <GoFlame className={styles.additionIcon} />
                        <span>Zgłoś błąd</span>
                    </div>
                </div>
                <div className={styles.latestResearch}>
                    <LatestResearchCard />
                </div>
            </div>
        </div>
    );
};

export { RightContainer };
