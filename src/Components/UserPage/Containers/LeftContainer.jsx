import styles from '../Containers/Container.module.css';
import { BsCameraFill, BsGenderAmbiguous } from 'react-icons/bs';
import { MdLocationOn, MdPhone } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { GiFemale, GiMale } from 'react-icons/gi';
import React, { useEffect, useState } from 'react';
import getApiUrl from '../../../Common/Api';
import useAuth from '../../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const LeftContainer = ({ values }) => {
    const AVATAR_UPDATE_URL = getApiUrl() + 'user/current/avatar/update';
    const { auth } = useAuth();
    const { username, accessToken } = auth;
    const [avatarImage, setAvatarImage] = useState(null);
    const setAlert = values.setAlert;
    /** Handle correct poster file extensions **/
    const acceptedAvatarExtensions = ['png', 'jpg', 'jpeg', 'bmp'];
    const acceptedAvatarExtensionsString = acceptedAvatarExtensions
        .map(value => value.toUpperCase())
        .join(', ');
    /** Conditional component rendering **/
    const location = useLocation();

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
                        {location.pathname === '/profile' && (
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
                        )}
                    </div>
                    <div className={styles.nameDiv}>
                        <div className={styles.nameAndSurname}>{values.name}</div>
                        <div className={styles.nameAndSurname}>{values.lastName}</div>
                    </div>
                </div>

                <div className={styles.profileDescription}>
                    <div className={styles.desc}>
                        <MdLocationOn className={styles.icon} />
                        <span>{values.locationState ? values.locationState : '(nie podano)'}</span>
                    </div>

                    <div className={styles.desc}>
                        <HiOutlineMail className={styles.icon} />
                        <span>{values.emailState}</span>
                    </div>
                    <div className={styles.desc}>
                        <MdPhone className={styles.icon} />
                        <span>
                            {accessToken
                                ? values.phoneState
                                    ? values.phoneState
                                    : '(nie podano)'
                                : [
                                      <Link to={'/login'} state={{ from: location }}>
                                          Zaloguj się
                                      </Link>,
                                      ,
                                  ]}
                        </span>
                    </div>
                    {values.gender === 'male' ? (
                        <div className={styles.desc}>
                            <GiMale className={styles.icon} />
                            <span>Mężczyzna</span>
                        </div>
                    ) : values.gender === 'female' ? (
                        <div className={styles.desc}>
                            <GiFemale className={styles.icon} />
                            <span>Kobieta</span>
                        </div>
                    ) : (
                        <div className={styles.desc}>
                            <BsGenderAmbiguous className={styles.icon} />
                            <span>Inna / Nieokreślona</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export { LeftContainer };
