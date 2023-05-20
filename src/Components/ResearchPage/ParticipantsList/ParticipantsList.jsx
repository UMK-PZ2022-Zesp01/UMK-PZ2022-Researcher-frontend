import styles from './ParticipantsList.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import getApiUrl from '../../../Common/Api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '../../Alert/Alert';
import { Popup } from '../../Popup/Popup';

function ParticipantsList({ researchCode }) {
    const GET_PARTICIPANTS_URL = getApiUrl() + `research/${researchCode}/participants`;

    const { auth } = useAuth();
    const { accessToken } = auth;

    const [participants, setParticipants] = useState([]);
    const [query, setQuery] = useState('');

    /*** Alerts Section ***/

    const [alert, setAlert] = useState({
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
            case 204:
                return (
                    <Alert onClose={closeAlert} type="success">
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

    useEffect(() => {
        const getParticipants = async () => {
            const response = await fetch(GET_PARTICIPANTS_URL, {
                method: 'GET',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json;charset:UTF-8',
                },
            });

            switch (response.status) {
                case 200:
                    const result = await response.json();
                    setParticipants(result);
                    break;
                default:
                    setParticipants(() => null);
                    break;
            }
        };

        getParticipants().then();
    }, []);

    const handleDeleteButtonClick = login => {
        removeUserFromResearch(login).then(null);
    };

    const removeUserFromResearch = async login => {
        const REMOVE_USER_URL = getApiUrl() + `research/${researchCode}/delete/user/${login}`;

        const response = await fetch(REMOVE_USER_URL, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: accessToken,
            },
        });

        switch (response.status) {
            case 204:
                setParticipants(participants.filter(user => user.login !== login));
                setAlert({
                    alertOpen: true,
                    alertType: response.status,
                    alertText: 'Pomyślnie usunięto uczestnika badania!',
                });
                break;
            default:
                setAlert({
                    alertOpen: true,
                    alertType: response.status,
                    alertText:
                        'Nie udało się usunąć uczestnika! Upewnij się, czy uczestnik nadal jest zapisany na to' +
                        ' badanie.',
                });
                break;
        }
    };

    const filteredParticipants = useMemo(() => {
        return participants
            .filter(user => user.fullName.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.fullName.split(' ').at(1).localeCompare(b.fullName.split(' ').at(1)));
    }, [query, participants]);

    return (
        <>
            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>

            <h3 className={styles.title}>Lista uczestników badania</h3>

            {filteredParticipants.length > 0 && (
                <input
                    type="search"
                    onChange={e => setQuery(e.target.value)}
                    className={styles.filterInput}
                    placeholder="Szukaj..."
                />
            )}

            {!participants && <p>Wczytywanie...</p>}
            {filteredParticipants.length === 0 ? (
                <span>Twoje badanie na tę chwilę nie posiada uczestników.</span>
            ) : (
                filteredParticipants.length > 0 && (
                    <div className={styles.participantsList}>
                        {filteredParticipants.map(user => (
                            <div className={styles.participantTile} key={user.login}>
                                <Link to={`/profile/${user.login}`} className={styles.tileFullName}>
                                    {user.fullName}
                                </Link>

                                {user.location && (
                                    <span className={styles.tileLocation}>
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                            className={styles.purple}
                                        />
                                        {user.location}
                                    </span>
                                )}

                                <a href={`mailto:${user.email}`} className={styles.tileEmail}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span>{user.email}</span>
                                </a>

                                <div className={styles.buttonContainer}>
                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteButtonClick(user.login)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                        <span>Usuń uczestnika</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </>
    );
}

export { ParticipantsList };
