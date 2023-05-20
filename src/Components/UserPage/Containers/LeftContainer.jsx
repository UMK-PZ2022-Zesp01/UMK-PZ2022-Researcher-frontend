import styles from '../Containers/Container.module.css';
import { BsCameraFill } from 'react-icons/bs';
import { MdLocationOn, MdPhone } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { GiFemale, GiMale } from 'react-icons/gi';
import React, { useEffect, useState } from 'react';
import { Alert } from '../../Alert/Alert';
import { Popup } from '../../Popup/Popup';
import getApiUrl from '../../../Common/Api';
import useAuth from '../../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const LeftContainer = ({ values }) => {
    const AVATAR_UPDATE_URL = getApiUrl() + 'user/current/avatar/update';
    const { auth } = useAuth();
    const { username, accessToken } = useAuth().auth;
    const [avatarImage, setAvatarImage] = useState(null);
    /** Handle correct poster file extensions **/
    const acceptedAvatarExtensions = ['png', 'jpg', 'jpeg', 'bmp'];
    const acceptedAvatarExtensionsString = acceptedAvatarExtensions
        .map(value => value.toUpperCase())
        .join(', ');

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
            case 499:
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

    const handleAvatarImageChange = event => {
        if (
            !acceptedAvatarExtensions.includes(
                event.target.files[0].name.split('.').at(1).toLowerCase()
            )
        ) {
            setAlert({
                alertOpen: true,
                alertType: 400,
                alertText:
                    'Akceptowane są wyłącznie plakaty z następującymi rozszerzeniami: ' +
                    acceptedAvatarExtensionsString,
            });
            return;
        }

        if (event.target.files[0].size > 524288) {
            setAlert({
                alertOpen: true,
                alertType: 400,
                alertText: 'Zbyt duże zdjęcie profilowe! Maksymalny rozmiar pliku to 512 KB',
            });
            return;
        }
        setAvatarImage(event.target.files[0]);
    };

    useEffect(() => {
        const uploadAvatar = async () => {
            const data = new FormData();
            data.append('userAvatar', avatarImage);
            const response = await fetch(AVATAR_UPDATE_URL, {
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: accessToken,
                },
            });
            switch (response.status) {
                case 200:
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText:
                            'Zdjęcie profilowe zostało zmienione! Zmiany będą widoczne po odświeżeniu strony.',
                    });
                    break;
                default:
                    setAlert({
                        alertOpen: true,
                        alertType: 400,
                        alertText:
                            'Nie udało się zmienić zdjęcia profilowego! Spróbuj ponownie później.',
                    });
                    break;
            }
        };
        if (avatarImage !== null) {
            uploadAvatar();
        }
    }, [avatarImage]);

    return (
        <div className={styles.leftContainer}>
            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>
            <div className={styles.infoWithoutEdit}>
                <div className={styles.mainInfo}>
                    <div className={styles.avatarBox}>
                        {values.avatar === undefined ||
                            (values.avatar === '' ? (
                                <div className={styles.avatarImage}>
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className={styles.userAvatarIcon}
                                    />
                                </div>
                            ) : (
                                <img
                                    src={`data:image/jpeg;base64,${values.avatar}`}
                                    className={styles.avatarImage}
                                    alt="avatar"
                                />
                            ))}
                        <div className={styles.editAvatarButton}>
                            <label htmlFor="avatar" className={styles.avatarIcon}>
                                <BsCameraFill />
                                <input
                                    onChange={handleAvatarImageChange}
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/png, image/jpeg"
                                    hidden
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.nameDiv}>
                        <div className={styles.nameAndSurname}>{values.name}</div>
                        <div className={styles.nameAndSurname}>{values.lastName}</div>
                    </div>
                </div>

                <div className={styles.profileDescription}>
                    <div className={styles.desc}>
                        <MdLocationOn className={styles.icon} />
                        <span>{values.locationState}</span>
                    </div>
                    <div className={styles.desc}>
                        <HiOutlineMail className={styles.icon} />
                        <span>{values.emailState}</span>
                    </div>
                    <div className={styles.desc}>
                        <MdPhone className={styles.icon} />
                        <span>{values.phoneState}</span>
                    </div>
                    {values.gender === 'male' ? (
                        <div className={styles.desc}>
                            <GiMale className={styles.icon} />
                            <span>Mężczyzna</span>
                        </div>
                    ) : (
                        <div className={styles.desc}>
                            <GiFemale className={styles.icon} />
                            <span>Kobieta</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.editDiv}>
                <button
                    className={
                        !(values.clickedEdit || values.clickedAdvance)
                            ? styles.editButton
                            : styles.editButtonHide
                    }
                    onClick={() => {
                        values.setIsClickedEdit(!values.clickedEdit);
                    }}
                >
                    Edytuj profil
                </button>
                <button
                    className={
                        !(values.clickedAdvance || values.clickedEdit)
                            ? styles.editButton
                            : styles.editButtonHide
                    }
                    onClick={() => {
                        values.setClickedAdvance(!values.clickedAdvance);
                    }}
                >
                    Ustawienia konta
                </button>
            </div>
        </div>
    );
};
export { LeftContainer };
