import styles from './CreateResearchFormRequirement.module.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as generateKey } from 'uuid';
import { CustomRequirement } from './CustomRequirement/CustomRequirement';
import { AgeInterval } from './AgeInterval/AgeInterval';
import { Alert } from '../../../Alert/Alert';
import { Popup } from '../../../Popup/Popup';

function CreateResearchFormRequirement({ sendList }) {
    const [isGenderCheckboxChecked, setIsGenderCheckboxChecked] = useState(false);
    const [isAgeCheckboxChecked, setIsAgeCheckboxChecked] = useState(false);
    const [isPlaceCheckboxChecked, setIsPlaceCheckboxChecked] = useState(false);
    const [isEducationCheckboxChecked, setIsEducationCheckboxChecked] = useState(false);
    const [isMaritalCheckboxChecked, setIsMaritalCheckboxChecked] = useState(false);
    const [isOtherCheckboxChecked, setIsOtherCheckboxChecked] = useState(false);

    const [isPlaceOtherCheckboxChecked, setIsPlaceOtherCheckboxChecked] = useState(false);
    const [isEducationOtherCheckboxChecked, setIsEducationOtherCheckboxChecked] = useState(false);
    const [isMaritalOtherCheckboxChecked, setIsMaritalOtherCheckboxChecked] = useState(false);

    const [genderList, setGenderList] = useState([]);
    const [ageList, setAgeList] = useState([{ ageMin: null, ageMax: null }]);
    const [placeList, setPlaceList] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [maritalList, setMaritalList] = useState([]);
    const [otherRequirementList, setOtherRequirementList] = useState([
        { type: '', description: '' },
    ]);

    const [placeOtherDesc, setPlaceOtherDesc] = useState('');
    const [educationOtherDesc, setEducationOtherDesc] = useState('');
    const [maritalOtherDesc, setMaritalOtherDesc] = useState('');

    const [ageSectionReload, setAgeSectionReload] = useState(false);
    const [ageKeyArray, setAgeKeyArray] = useState([]);
    const [requirementSectionReload, setRequirementSectionReload] = useState(false);
    const [requirementKeyArray, setRequirementKeyArray] = useState([]);

    /** Generating New Keys for Other Requirement Inputs **/
    useEffect(() => {
        let newAgeKeyArray = ageList.reduce(array => [...array, generateKey()], []);
        setAgeKeyArray(newAgeKeyArray);
    }, [ageSectionReload]);

    /** Generating New Keys for Other Requirement Inputs **/
    useEffect(() => {
        let newRequirementKeyArray = otherRequirementList.reduce(
            array => [...array, generateKey()],
            []
        );
        setRequirementKeyArray(newRequirementKeyArray);
    }, [requirementSectionReload]);

    /*** Use Effects for Custom Place Requirement ***/

    useEffect(() => {
        let updatedPlaceList = [...placeList];
        const index = placeList.indexOf(placeList.find(value => value.includes('other: ')));
        index !== -1
            ? (updatedPlaceList[index] = 'other: ' + placeOtherDesc)
            : updatedPlaceList.push('other: ' + placeOtherDesc);
        setPlaceList(updatedPlaceList);
    }, [placeOtherDesc]);

    useEffect(() => {
        if (!isPlaceOtherCheckboxChecked) {
            let reducedPlaceList = [...placeList];
            const index = placeList.indexOf(placeList.find(value => value.includes('other: ')));
            reducedPlaceList.splice(index, 1);
            setPlaceList(reducedPlaceList);
        }
    }, [isPlaceOtherCheckboxChecked]);

    /*** Use Effects for Custom Education Requirement ***/

    useEffect(() => {
        let updatedEducationList = [...educationList];
        const index = educationList.indexOf(educationList.find(value => value.includes('other: ')));
        index !== -1
            ? (updatedEducationList[index] = 'other: ' + educationOtherDesc)
            : updatedEducationList.push('other: ' + educationOtherDesc);
        setEducationList(updatedEducationList);
    }, [educationOtherDesc]);

    useEffect(() => {
        if (!isEducationOtherCheckboxChecked) {
            let reducedEducationList = [...educationList];
            const index = educationList.indexOf(
                educationList.find(value => value.includes('other: '))
            );
            reducedEducationList.splice(index, 1);
            setEducationList(reducedEducationList);
        }
    }, [isEducationOtherCheckboxChecked]);

    /*** Use Effects for Custom Marital Requirement ***/

    useEffect(() => {
        let updatedMaritalList = [...maritalList];
        const index = maritalList.indexOf(maritalList.find(value => value.includes('other: ')));
        index !== -1
            ? (updatedMaritalList[index] = 'other: ' + maritalOtherDesc)
            : updatedMaritalList.push('other: ' + maritalOtherDesc);
        setMaritalList(updatedMaritalList);
    }, [maritalOtherDesc]);

    useEffect(() => {
        if (!isMaritalOtherCheckboxChecked) {
            let reducedMaritalList = [...maritalList];
            const index = maritalList.indexOf(maritalList.find(value => value.includes('other: ')));
            reducedMaritalList.splice(index, 1);
            setMaritalList(reducedMaritalList);
        }
    }, [isMaritalOtherCheckboxChecked]);

    /*** Send Data to CRForm Component ***/

    useEffect(() => {
        sendList(requirementList.filter(value => value !== false));
    }, [genderList, ageList, placeList, educationList, maritalList, otherRequirementList]);

    useEffect(() => {
        // TODO: Check Age Intervals
    }, [ageList]);

    const renderAgeIntervalComponents = () => {
        return ageList.length > 0 ? (
            ageList.map((data, index) => (
                <AgeInterval
                    key={ageKeyArray[index] ? ageKeyArray[index] : generateKey()}
                    index={index}
                    data={data}
                    handleUpdate={updateAgeInterval}
                    handleDelete={deleteAgeInterval}
                />
            ))
        ) : (
            <div className={styles.requirementDesc}>
                Twoje badanie nie posiada żadnych przedziałów określających wiek badanych
            </div>
        );
    };

    const updateAgeInterval = (index, ageInterval) => {
        let updatedAgeList = [...ageList];
        updatedAgeList[index] = ageInterval;
        setAgeList(updatedAgeList);
    };

    const deleteAgeInterval = index => {
        let updatedAgeList = [...ageList];
        updatedAgeList.splice(index, 1);
        setAgeList(updatedAgeList);
        setAgeSectionReload(!ageSectionReload);
    };

    const renderCustomComponents = () => {
        return otherRequirementList.length > 0 ? (
            otherRequirementList.map((data, index) => (
                <CustomRequirement
                    key={requirementKeyArray[index] ? requirementKeyArray[index] : generateKey()}
                    index={index}
                    data={data}
                    handleUpdate={updateOtherRequirement}
                    handleDelete={deleteOtherRequirement}
                />
            ))
        ) : (
            <div className={styles.requirementDesc}>
                Twoje badanie nie posiada żadnych dodatkowych kryteriów udziału
            </div>
        );
    };

    const updateOtherRequirement = (index, req) => {
        let updatedOtherRequirementList = [...otherRequirementList];
        updatedOtherRequirementList[index] = req;
        setOtherRequirementList(updatedOtherRequirementList);
    };

    const deleteOtherRequirement = index => {
        let updatedOtherRequirementList = [...otherRequirementList];
        updatedOtherRequirementList.splice(index, 1);
        setOtherRequirementList(updatedOtherRequirementList);
        setRequirementSectionReload(!requirementSectionReload);
    };

    /*** Send Requirements List to Parent on Each Change in Checkboxes ***/

    const handleGenderListChange = event => {
        const value = event.target.value;
        const valueIndex = genderList.indexOf(value);

        if (event.target.checked) {
            setGenderList([...genderList, value]);
        } else {
            let reducedGenderList = [...genderList];
            reducedGenderList.splice(valueIndex, 1);
            setGenderList(reducedGenderList);
        }
    };

    const handleAddAgeIntervalButtonClick = () => {
        setAgeList([...ageList, { ageMin: null, ageMax: null }]);
        setAgeSectionReload(!ageSectionReload);
    };

    const handlePlaceListChange = event => {
        const value = event.target.value;
        const valueIndex = placeList.indexOf(value);

        if (event.target.checked) {
            setPlaceList([...placeList, value]);
        } else {
            let reducedPlaceList = [...placeList];
            reducedPlaceList.splice(valueIndex, 1);
            setPlaceList(reducedPlaceList);
        }
    };

    const handleEducationListChange = event => {
        const value = event.target.value;
        const valueIndex = educationList.indexOf(value);

        if (event.target.checked) {
            setEducationList([...educationList, value]);
        } else {
            let reducedEducationList = [...educationList];
            reducedEducationList.splice(valueIndex, 1);
            setEducationList(reducedEducationList);
        }
    };

    const handleMaritalListChange = event => {
        const value = event.target.value;
        const valueIndex = maritalList.indexOf(value);

        if (event.target.checked) {
            setMaritalList([...maritalList, value]);
        } else {
            let reducedMaritalList = [...maritalList];
            reducedMaritalList.splice(valueIndex, 1);
            setMaritalList(reducedMaritalList);
        }
    };

    const handleAddOtherCriterionButtonClick = () => {
        setOtherRequirementList([...otherRequirementList, { type: '', description: '' }]);
        setRequirementSectionReload(!requirementSectionReload);
    };

    const requirementList = [
        isGenderCheckboxChecked && {
            type: 'gender',
            criteria: genderList,
        },

        isAgeCheckboxChecked && {
            type: 'age',
            criteria: ageList,
        },

        isPlaceCheckboxChecked && {
            type: 'place',
            criteria: placeList,
        },

        isEducationCheckboxChecked && {
            type: 'education',
            criteria: educationList,
        },

        isMaritalCheckboxChecked && {
            type: 'marital',
            criteria: maritalList,
        },

        isOtherCheckboxChecked && {
            type: 'other',
            criteria: otherRequirementList,
        },
    ];

    /*** Functions for Handling Text Inputs ***/

    const handlePlaceOtherDescChange = event => {
        setPlaceOtherDesc(event.target.value);
    };

    const handleEducationOtherDescChange = event => {
        setEducationOtherDesc(event.target.value);
    };

    const handleMaritalOtherDescChange = event => {
        setMaritalOtherDesc(event.target.value);
    };

    /*** Functions for Handling Checkboxes Clicks ***/

    const handleGenderCheckboxClick = () => {
        setIsGenderCheckboxChecked(!isGenderCheckboxChecked);
    };

    const handleAgeCheckboxClick = () => {
        setIsAgeCheckboxChecked(!isAgeCheckboxChecked);
    };

    const handlePlaceCheckboxClick = () => {
        setIsPlaceCheckboxChecked(!isPlaceCheckboxChecked);
    };

    const handleEducationCheckboxClick = () => {
        setIsEducationCheckboxChecked(!isEducationCheckboxChecked);
    };

    const handleMaritalCheckboxClick = () => {
        setIsMaritalCheckboxChecked(!isMaritalCheckboxChecked);
    };

    const handleOtherCheckboxClick = () => {
        setIsOtherCheckboxChecked(!isOtherCheckboxChecked);
    };

    const handlePlaceOtherCheckboxClick = () => {
        setIsPlaceOtherCheckboxChecked(!isPlaceOtherCheckboxChecked);
    };

    const handleEducationOtherCheckboxClick = () => {
        setIsEducationOtherCheckboxChecked(!isEducationOtherCheckboxChecked);
    };

    const handleMaritalOtherCheckboxClick = () => {
        setIsMaritalOtherCheckboxChecked(!isMaritalOtherCheckboxChecked);
    };

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
            case 201:
                return (
                    <Alert onClose={closeAlert} type="success">
                        {alert.alertText}
                    </Alert>
                );
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

    return (
        <>
            <div className={styles.alertOverlay}>
                <Popup enabled={alert.alertOpen}>{showAlert()}</Popup>
            </div>
            <div className={styles.requirementRow}>
                <div className={styles.checkboxElement}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="req-gender"
                        name="req-category"
                        value="gender"
                        onChange={handleGenderCheckboxClick}
                    />
                    <label className={styles.checkboxLabel} htmlFor="req-gender">
                        płeć
                    </label>
                </div>

                <div className={styles.checkboxElement}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="req-age"
                        name="req-category"
                        value="age"
                        onChange={handleAgeCheckboxClick}
                    />
                    <label className={styles.checkboxLabel} htmlFor="req-age">
                        wiek
                    </label>
                </div>

                <div className={styles.checkboxElement}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="req-place"
                        name="req-category"
                        value="place"
                        onChange={handlePlaceCheckboxClick}
                    />
                    <label className={styles.checkboxLabel} htmlFor="req-place">
                        miejsce zamieszkania
                    </label>
                </div>

                <div className={styles.checkboxElement}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="req-education"
                        name="req-category"
                        value="education"
                        onChange={handleEducationCheckboxClick}
                    />
                    <label className={styles.checkboxLabel} htmlFor="req-education">
                        wykształcenie
                    </label>
                </div>

                <div className={styles.checkboxElement}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="req-marital"
                        name="req-category"
                        value="marital"
                        onChange={handleMaritalCheckboxClick}
                    />
                    <label className={styles.checkboxLabel} htmlFor="req-marital">
                        stan cywilny
                    </label>
                </div>

                <div className={styles.checkboxElement}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="req-other"
                        name="req-category"
                        value="other"
                        onChange={handleOtherCheckboxClick}
                    />
                    <label className={styles.checkboxLabel} htmlFor="req-other">
                        inne
                    </label>
                </div>
            </div>

            {isGenderCheckboxChecked && (
                <div className={styles.requirementContainer}>
                    <label className={styles.formLabel}>Płeć</label>
                    <div className={styles.checkboxContainer}>
                        <div className={styles.checkboxColumn}>
                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="gender-male"
                                    name="gender"
                                    value="male"
                                    onChange={handleGenderListChange}
                                />
                                <label htmlFor="gender-male" className={styles.checkboxLabel}>
                                    mężczyzna
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="gender-other"
                                    name="gender"
                                    value="other"
                                    onChange={handleGenderListChange}
                                />
                                <label htmlFor="gender-other" className={styles.checkboxLabel}>
                                    inna
                                </label>
                            </div>
                        </div>

                        <div className={styles.checkboxColumn}>
                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="gender-female"
                                    name="gender"
                                    value="female"
                                    onChange={handleGenderListChange}
                                />
                                <label htmlFor="gender-female" className={styles.checkboxLabel}>
                                    kobieta
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="gender-notGiven"
                                    name="gender"
                                    value="notGiven"
                                    onChange={handleGenderListChange}
                                />
                                <label htmlFor="gender-notGiven" className={styles.checkboxLabel}>
                                    nie podano / nieokreślona
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isAgeCheckboxChecked && (
                <div className={styles.requirementContainer}>
                    <label className={styles.requirementTitle}>Wiek</label>

                    {renderAgeIntervalComponents()}

                    <div className={styles.formColumnButton}>
                        <div className={styles.addButton}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span
                                onClick={handleAddAgeIntervalButtonClick}
                                className={styles.addButtonDesc}
                            >
                                Dodaj przedział
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {isPlaceCheckboxChecked && (
                <div className={styles.requirementContainer}>
                    <label className={styles.requirementTitle}>Miejsce zamieszkania</label>
                    <div className={styles.checkboxContainer}>
                        <div className={styles.checkboxColumn}>
                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="place-village"
                                    name="place"
                                    value="village"
                                    onChange={handlePlaceListChange}
                                />
                                <label htmlFor="place-village" className={styles.checkboxLabel}>
                                    wieś
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="place-cityBetween50kAnd150k"
                                    name="place"
                                    value="cityBetween50kAnd150k"
                                    onChange={handlePlaceListChange}
                                />
                                <label
                                    htmlFor="place-cityBetween50kAnd150k"
                                    className={styles.checkboxLabel}
                                >
                                    miasto od 50 tys. do 150 tys. mieszkańców
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="place-cityAbove500k"
                                    name="place"
                                    value="cityAbove500k"
                                    onChange={handlePlaceListChange}
                                />
                                <label
                                    htmlFor="place-cityAbove500k"
                                    className={styles.checkboxLabel}
                                >
                                    miasto powyżej 500 tys. mieszkańców
                                </label>
                            </div>
                        </div>

                        <div className={styles.checkboxColumn}>
                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="place-cityBelow50k"
                                    name="place"
                                    value="cityBelow50k"
                                    onChange={handlePlaceListChange}
                                />
                                <label
                                    htmlFor="place-cityBelow50k"
                                    className={styles.checkboxLabel}
                                >
                                    miasto poniżej 50 tys. mieszkańców
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="place-cityBetween150kAnd500k"
                                    name="place"
                                    value="cityBetween150kAnd500k"
                                    onChange={handlePlaceListChange}
                                />
                                <label
                                    htmlFor="place-cityBetween150kAnd500k"
                                    className={styles.checkboxLabel}
                                >
                                    miasto od 150 tys. do 500 tys. mieszkańców
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="place-other"
                                    name="place"
                                    value="other"
                                    onChange={handlePlaceOtherCheckboxClick}
                                />
                                <label htmlFor="place-other" className={styles.checkboxLabel}>
                                    inne (jakie?)
                                </label>
                            </div>
                        </div>
                    </div>

                    {isPlaceOtherCheckboxChecked && (
                        <input
                            className={styles.formInputRegular}
                            type="text"
                            name="place-other-desc"
                            placeholder="Wpisz inne kryterium..."
                            onChange={handlePlaceOtherDescChange}
                        />
                    )}
                </div>
            )}

            {isEducationCheckboxChecked && (
                <div className={styles.requirementContainer}>
                    <label className={styles.requirementTitle}>Wykształcenie</label>
                    <div className={styles.checkboxContainer}>
                        <div className={styles.checkboxColumn}>
                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="education-primary"
                                    name="education"
                                    value="primary"
                                    onChange={handleEducationListChange}
                                />
                                <label htmlFor="education-primary" className={styles.checkboxLabel}>
                                    podstawowe
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="education-middle"
                                    name="education"
                                    value="middle"
                                    onChange={handleEducationListChange}
                                />
                                <label htmlFor="education-middle" className={styles.checkboxLabel}>
                                    średnie
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="education-other"
                                    name="education"
                                    value="other"
                                    onChange={handleEducationOtherCheckboxClick}
                                />
                                <label htmlFor="education-other" className={styles.checkboxLabel}>
                                    inne (jakie?)
                                </label>
                            </div>
                        </div>

                        <div className={styles.checkboxColumn}>
                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="education-vocational"
                                    name="education"
                                    value="vocational"
                                    onChange={handleEducationListChange}
                                />
                                <label
                                    htmlFor="education-vocational"
                                    className={styles.checkboxLabel}
                                >
                                    zasadnicze zawodowe
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="education-college"
                                    name="education"
                                    value="college"
                                    onChange={handleEducationListChange}
                                />
                                <label htmlFor="education-college" className={styles.checkboxLabel}>
                                    wyższe
                                </label>
                            </div>
                        </div>
                    </div>

                    {isEducationOtherCheckboxChecked && (
                        <input
                            className={styles.formInputRegular}
                            type="text"
                            name="education-other-desc"
                            placeholder="Wpisz inne kryterium..."
                            onChange={handleEducationOtherDescChange}
                        />
                    )}
                </div>
            )}

            {isMaritalCheckboxChecked && (
                <div className={styles.requirementContainer}>
                    <label className={styles.requirementTitle}>Stan cywilny</label>
                    <div className={styles.checkboxContainer}>
                        <div className={styles.checkboxColumn}>
                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="marital-single"
                                    name="marital"
                                    value="single"
                                    onChange={handleMaritalListChange}
                                />
                                <label htmlFor="marital-single" className={styles.checkboxLabel}>
                                    singiel / singielka
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="marital-engaged"
                                    name="marital"
                                    value="engaged"
                                    onChange={handleMaritalListChange}
                                />
                                <label htmlFor="marital-engaged" className={styles.checkboxLabel}>
                                    zaręczony / zaręczona
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="marital-divorced"
                                    name="marital"
                                    value="divorced"
                                    onChange={handleMaritalListChange}
                                />
                                <label htmlFor="marital-divorced" className={styles.checkboxLabel}>
                                    rozwiedziony / rozwiedziona
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="marital-inSeparation"
                                    name="marital"
                                    value="inSeparation"
                                    onChange={handleMaritalListChange}
                                />
                                <label
                                    htmlFor="marital-inSeparation"
                                    className={styles.checkboxLabel}
                                >
                                    w separacji
                                </label>
                            </div>
                        </div>

                        <div className={styles.checkboxColumn}>
                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="marital-inRelationship"
                                    name="marital"
                                    value="inRelationship"
                                    onChange={handleMaritalListChange}
                                />
                                <label
                                    htmlFor="marital-inRelationship"
                                    className={styles.checkboxLabel}
                                >
                                    w związku
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="marital-married"
                                    name="marital"
                                    value="married"
                                    onChange={handleMaritalListChange}
                                />
                                <label htmlFor="marital-married" className={styles.checkboxLabel}>
                                    w związku małżeńskim
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="place-widowed"
                                    name="marital"
                                    value="widowed"
                                    onChange={handleMaritalListChange}
                                />
                                <label htmlFor="marital-widowed" className={styles.checkboxLabel}>
                                    wdowiec / wdowa
                                </label>
                            </div>

                            <div className={styles.checkboxElement}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="marital-other"
                                    name="marital"
                                    value="other"
                                    onChange={handleMaritalOtherCheckboxClick}
                                />
                                <label htmlFor="marital-other" className={styles.checkboxLabel}>
                                    inny (jaki?)
                                </label>
                            </div>
                        </div>
                    </div>

                    {isMaritalOtherCheckboxChecked && (
                        <input
                            className={styles.formInputRegular}
                            type="text"
                            name="marital-other-desc"
                            placeholder="Wpisz inne kryterium..."
                            onChange={handleMaritalOtherDescChange}
                        />
                    )}
                </div>
            )}

            {isOtherCheckboxChecked && (
                <div className={styles.requirementContainer}>
                    <label className={styles.requirementTitle}>Inne</label>

                    {renderCustomComponents()}

                    <div className={styles.formColumnButton}>
                        <div className={styles.addButton}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span
                                onClick={handleAddOtherCriterionButtonClick}
                                className={styles.addButtonDesc}
                            >
                                Dodaj kryterium
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export { CreateResearchFormRequirement };
