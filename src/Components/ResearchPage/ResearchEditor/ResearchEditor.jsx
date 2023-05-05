import styles from './ResearchEditor.module.css';
import React, { useState } from 'react';
import getApiUrl from '../../../Common/Api';
import useAuth from '../../../hooks/useAuth';
import { Alert } from '../../Alert/Alert';
import { Popup } from '../../Popup/Popup';

function ResearchEditor({ research }) {
    const UPDATE_RESEARCH_URL = getApiUrl() + `research/${research.researchCode}/update`;

    const { auth } = useAuth();

    const [title, setTitle] = useState(research.title);
    const [description, setDescription] = useState(research.description);
    const [begDate, setBegDate] = useState(research.begDate);
    const [endDate, setEndDate] = useState(research.endDate);
    const [creatorEmail, setCreatorEmail] = useState(research.creatorEmail);
    const [creatorPhone, setCreatorPhone] = useState(research.creatorPhone);
    const [participantLimit, setParticipantLimit] = useState(research.participantLimit);

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
            default:
                return (
                    <Alert onClose={closeAlert} type="error">
                        {alert.alertText}
                    </Alert>
                );
        }
    };

    const handleFormSubmit = event => {
        event.preventDefault();

        let unchangedFieldKeys = [];
        if (title === research.title) unchangedFieldKeys.push('title');
        if (description === research.description) unchangedFieldKeys.push('description');
        if (begDate === research.begDate) unchangedFieldKeys.push('begDate');
        if (endDate === research.endDate) unchangedFieldKeys.push('endDate');
        if (creatorEmail === research.creatorEmail) unchangedFieldKeys.push('creatorEmail');
        if (creatorPhone === research.creatorPhone) unchangedFieldKeys.push('creatorPhone');
        if (participantLimit === research.participantLimit)
            unchangedFieldKeys.push('participantLimit');

        const researchUpdateData = {
            title: unchangedFieldKeys.includes('title') ? null : title,
            description: unchangedFieldKeys.includes('description') ? null : description,
            begDate: unchangedFieldKeys.includes('begDate') ? null : begDate,
            endDate: unchangedFieldKeys.includes('description') ? null : endDate,
            creatorEmail: unchangedFieldKeys.includes('creatorEmail') ? null : creatorEmail,
            creatorPhone: unchangedFieldKeys.includes('creatorPhone') ? null : creatorPhone,
            participantLimit: unchangedFieldKeys.includes('participantLimit')
                ? null
                : participantLimit,
        };

        sendEditedResearch(researchUpdateData).then(null);
    };

    const sendEditedResearch = async researchEditData => {
        try {
            const response = await fetch(UPDATE_RESEARCH_URL, {
                method: 'PUT',
                body: JSON.stringify(researchEditData),
                credentials: 'include',
                headers: {
                    Authorization: auth.accessToken,
                    'Content-Type': 'application/json; charset:UTF-8',
                },
            });

            switch (response.status) {
                case 200:
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText:
                            'Pomyślnie zmieniono badanie! Wprowadzone dane będą widoczne po odświeżeniu strony.',
                    });
                    break;
                default:
                    setAlert({
                        alertOpen: true,
                        alertType: response.status,
                        alertText:
                            'Coś poszło nie tak! Upewnij się, że posiadasz uprawnienia do edycji tego badania lub' +
                            ' spróbuj ponownie później...',
                    });
                    break;
            }
        } catch (e) {
            setAlert({
                alertOpen: true,
                alertType: 500,
                alertText: 'Błąd połączenia z serwerem! Spróbuj ponownie później.',
            });
        }
    };

    return (
        <>
            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>

            <form className={styles.editorContainer} onSubmit={handleFormSubmit}>
                <div className={styles.editorRow}>
                    <div className={styles.editorColumn}>
                        <div className={styles.inputWithLabel}>
                            <label htmlFor="title">Tytuł badania</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={research.title}
                                onChange={e => setTitle(() => e.target.value)}
                            />
                        </div>

                        <div className={styles.inputWithLabel}>
                            <label htmlFor="participant-limit">Liczba uczestników</label>
                            <input
                                type="number"
                                name="participant-limit"
                                min="1"
                                defaultValue={research.participantLimit}
                                onChange={e => setParticipantLimit(() => e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.inputWithLabel}>
                        <label htmlFor="description">Opis badania</label>
                        <textarea
                            className={styles.editorTextArea}
                            name="description"
                            defaultValue={research.description}
                            onChange={e => setDescription(() => e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.editorRow}>
                    <div className={styles.inputWithLabel}>
                        <label htmlFor="beg-date">Data rozpoczęcia badania</label>
                        <input
                            type="date"
                            name="beg-date"
                            defaultValue={research.begDate}
                            onChange={e => setBegDate(() => e.target.value)}
                        />
                    </div>

                    <div className={styles.inputWithLabel}>
                        <label htmlFor="end-date">Data zakończenia badania</label>
                        <input
                            type="date"
                            name="end-date"
                            defaultValue={research.endDate}
                            onChange={e => setEndDate(() => e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.editorRow}>
                    <div className={styles.inputWithLabel}>
                        <label htmlFor="contact-email">Kontaktowy adres e-mail</label>
                        <input
                            type="email"
                            name="contact-email"
                            placeholder="Przykład: adres@domena.pl"
                            defaultValue={research.creatorEmail}
                            onChange={e => setCreatorEmail(() => e.target.value)}
                        />
                    </div>

                    <div className={styles.inputWithLabel}>
                        <label htmlFor="contact-phone">Kontaktowy numer telefonu</label>
                        <input
                            type="text"
                            name="contact-phone"
                            placeholder="Format: 505 505 505 lub 505-505-505"
                            pattern="[0-9]{3}[ -]?[0-9]{3}[ -]?[0-9]{3}"
                            defaultValue={research.creatorPhone}
                            onChange={e => setCreatorPhone(() => e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.formButtonContainer}>
                    <button type="reset" className={styles.formButton}>
                        Resetuj
                    </button>

                    <button type="submit" className={styles.formButton}>
                        Zatwierdź zmiany
                    </button>
                </div>
            </form>
        </>
    );
}

export { ResearchEditor };
