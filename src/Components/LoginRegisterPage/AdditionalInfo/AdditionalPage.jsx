import React, {useState} from 'react';
import {BannerWhite} from '../../Banner/BannerWhite';
import {Helmet} from 'react-helmet';
import {Alert} from '../../Alert/Alert';
import {Popup} from '../../Popup/Popup';
import styles from './AdditionalPage.module.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Select} from "../../Form/Select/Select";

export default function AdditionalPage() {

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

    function showAlert() {
        switch (alert.alertType) {
            case 201:
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
            default:
                return (
                    <Alert onClose={() => closeAlert()} type="error">
                        {alert.alertText}
                    </Alert>
                );
        }
    }

    const { pathname } = useLocation();
    const navigate = useNavigate();


    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [gender, setGender] = React.useState({name: '', value: null});
    const [birthDate, setBirthDate] = React.useState('');
    const [agreement, setAgreement] = React.useState(false);
    const [genderSelectOpen, setGenderSelectOpen] = useState(false);
    const genderOptions = [
        {name: 'Kobieta', value: 'female'},
        {
            name: 'Mężczyzna',
            value: 'male',
        },
        {name: 'Inna', value: 'other'},
    ];

    const currentTime = new Date().toISOString().split('T')[0];

    const user = {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        gender: gender?.value,
    };

    const handleFirstNameChanged = event => {
        setFirstName(event.target.value);
    };
    const handleLastNameChanged = event => {
        setLastName(event.target.value);
    };
    const handleBirthDateChanged = event => {
        setBirthDate(event.target.value);
    };
    const handleAgreementChanged = () => {
        setAgreement(!agreement);
    };

    //SUBMIT BUTTON onClick function
    async function SubmitButtonClicked(event) {
        // event.preventDefault();
        // try {
        //     const response = await fetch(REGISTER_URL, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json; charset:UTF-8',
        //         },
        //         body: JSON.stringify(user),
        //     });
        //
        //     if (response.ok) {
        //         //OK or CREATED
        //         let text;
        //         switch (response.status) {
        //             case 201:
        //                 text = 'Rejestracja przebiegła pomyślnie.';
        //                 navigate('/registeredSuccessfully', {
        //                     replace: false,
        //                     state: { username },
        //                 });
        //                 break;
        //             case 299:
        //                 text = 'Ten email jest już zajęty.';
        //                 break;
        //             case 298:
        //                 text = 'Ta nazwa użytkownika jest już zajęta.';
        //                 break;
        //             default:
        //                 throw new Error();
        //         }
        //         setAlert({
        //             alertOpen: true,
        //             alertType: response.status,
        //             alertText: text,
        //         });
        //     } else {
        //         throw new Error();
        //     }
        // } catch (error) {
        //     setAlert({
        //         alertOpen: true,
        //         alertType: 999,
        //         alertText: 'Coś poszło nie tak.',
        //     });
        // }
    }


    return (
        <div className={styles.loginRegisterPage}>
            <Helmet>
                <title>Uzupełnij dane | JustResearch</title>
            </Helmet>
            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>
            <Link to="/" className={styles.header}>
                <BannerWhite/>
            </Link>

            <main className={styles.main}>
                <div className={styles.wrapper}>
                    <article className={styles.registerFormBox}>
                        <header className={styles.hBox}>
                            <div className={styles.h2}>Uzupełnij dane</div>
                        </header>
                        <form onSubmit={event => SubmitButtonClicked(event)} className={styles.registerForm}>

                            <div className={styles.flexRow}>
                                <div className={styles.inputContainer}>
                                    <label htmlFor="firstName">Imię</label>
                                    <input
                                        onChange={event => handleFirstNameChanged(event)}
                                        id="firstName"
                                        type="text"
                                        placeholder="Imię"
                                        className={styles.textInput}
                                        maxLength={32}
                                        pattern="^([a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+[,.]?[ ]?|[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+['-]?)+$"
                                        title={'Podaj imię'}
                                        required
                                    />
                                </div>

                                <div className={styles.flexColumnSep}></div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor="lastName">Nazwisko</label>
                                    <input
                                        onChange={event => handleLastNameChanged(event)}
                                        id="lastName"
                                        type="text"
                                        placeholder="Nazwisko"
                                        className={styles.textInput}
                                        maxLength={32}
                                        pattern="^([a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+[,.]?[ ]?|[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+['-]?)+$"
                                        title={'Podaj nazwisko'}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.flexRow}>
                                <div className={styles.inputContainer}>
                                    <label htmlFor="gender">Płeć</label>
                                    <Select
                                        id={'gender'}
                                        name={'Płeć'}
                                        title={'Wskaż płeć'}
                                        options={genderOptions}
                                        isOpen={genderSelectOpen}
                                        open={setGenderSelectOpen}
                                        value={gender?.name}
                                        setValue={setGender}
                                        placeholder={'Wskaż płeć'}
                                    ></Select>
                                </div>

                                <div className={styles.flexColumnSep}></div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor="birthdate">Data urodzenia</label>
                                    <input
                                        onChange={event => handleBirthDateChanged(event)}
                                        id="birthdate"
                                        type="date"
                                        className={styles.textInput}
                                        min="1900-01-01"
                                        max={currentTime}
                                        required
                                        title={'Podaj datę urodzenia:'}
                                    />
                                </div>
                            </div>

                            <div className={styles.checkboxRow}>
                                <input
                                    id="agreement"
                                    type="checkbox"
                                    defaultChecked={agreement}
                                    onChange={() => handleAgreementChanged()}
                                    required
                                    className={styles.checkboxInput}
                                />
                                <label htmlFor="agreement">
                                    Wyrażam zgodę na przetwarzanie moich danych osobowych.
                                </label>
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                ZAPISZ
                            </button>

                        </form>
                    </article>
                </div>
            </main>
        </div>
    );
}
