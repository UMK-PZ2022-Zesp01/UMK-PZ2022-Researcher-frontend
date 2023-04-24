import styles from '../Containers/Container.module.css';
import {GrClose} from 'react-icons/gr';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {HiOutlineDocumentText} from 'react-icons/hi';
import {GoFlame} from 'react-icons/go';
import {LatestResearchCard} from '../../Researches/LatestResearchCard';
import React, {useEffect, useState} from 'react';
import useAuth, {useUsername} from '../../../hooks/useAuth';
import getApiUrl from '../../../Common/Api';
import {Alert} from "../../Alert/Alert";
import {Popup} from "../../Popup/Popup";

const RightContainer = ({values}) => {
    const login = useUsername();
    const EDIT_URL = `${getApiUrl()}user/current/update`;
    const { username, accessToken } = useAuth().auth;

    /*phone section*/
    const [phoneInput, setPhoneInput] = useState('');
    const [isClickedPhone, setIsClickedPhone] = useState(false);

    /*location section*/
    const [isClickedLocation, setIsClickedLocation] = useState(false);

    /*email section*/
    const [emailInput, setEmailInput] = useState('');
    const [isClickedEmail, setIsClickedEmail] = useState(false);

    /*input debugger*/
    const [canExit, setCanExit] = useState(true);

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

    let putTemplate = {
        phone: phoneInput.length > 0 ? phoneInput : null,
        email: emailInput.length > 0 ? emailInput : null,
        location: values.locationInput.length > 0 ? values.locationInput : null,
    };

    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(putTemplate),
    };

    const saveButtonCheck = async () => {
        if (phoneInput.length < 1 && emailInput.length < 1 && values.locationInput.length < 1) {
            values.setGmapExit(false);
            return;
        }
        console.log(phoneInput,emailInput)
        if (values.locationInput.includes('[nie wybrano]')){
            setAlert({
                alertOpen: true,
                alertType: 299,
                alertText: 'Nie wybrano lokalizacji',
            })
            return;
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailInput)&&emailInput.length>0){
            setAlert({
                alertOpen: true,
                alertType: 298,
                alertText: 'Nieprawidłowy format email',
            })
            return
        }
        if (!/[0-9]{3} [0-9]{3} [0-9]{3}/.test(phoneInput)&&phoneInput.length>0){
            setAlert({
                alertOpen: true,
                alertType: 298,
                alertText: 'Nieprawidłowy format numeru telefonu',
            })
            return
        }
        const response = await fetch(EDIT_URL, requestOptions);
        if (response.status===298){
            setAlert({
                alertOpen: true,
                alertType: 298,
                alertText: 'Ten email jest zajęty, wprowadź poprawny adres email',
            })
        }
        if (response.status===299){
            setAlert({
                alertOpen: true,
                alertType: 299,
                alertText: 'Ten numer telefonu jest zajęty, wprowadź poprawny numer telefonu',
            })
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
            })
            return
        } else {
            setIsClickedLocation(false);
            setIsClickedEmail(false);
            setIsClickedPhone(false);
            setEmailInput('');
            setPhoneInput('');
            values.setGmapExit(false);
        }
    };

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


    return (
        <div className={styles.rightContainer}>
            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>
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
                    <div className={isClickedEmail ? styles.editTileResized : styles.editTile}>
                        <div
                            className={values.clickedEdit ? styles.valueEdit : styles.valueEditHide}
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
                            />
                        </div>
                    </div>

                    <div className={isClickedPhone ? styles.editTileResized : styles.editTile}>
                        <div
                            className={values.clickedEdit ? styles.valueEdit : styles.valueEditHide}
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
            <div className={values.clickedEdit ? styles.rightHide : styles.right}>
                <div className={styles.activityBox}>
                    <a className={styles.singleActivity} href={'./research/create'}>
                        <FontAwesomeIcon icon={faFileCirclePlus}/>
                        <span>Dodaj nowe badanie</span>
                    </a>
                    <div
                        className={styles.singleActivity}
                        onClick={() => values.setIsClickedResearches(true)}
                    >
                        <HiOutlineDocumentText className={styles.additionIconResearches}/>
                        <span>Zobacz swoje badania</span>
                    </div>
                    <div className={styles.singleActivity} onClick={values.bugPopup}>
                        <GoFlame className={styles.additionIcon}/>
                        <span>Zgłoś błąd</span>
                    </div>
                </div>
                <div className={styles.latestResearch}>
                    <LatestResearchCard/>
                </div>
            </div>
        </div>
    );
};

export {RightContainer};