import React, { useEffect, useState } from 'react';
import styles from './CreateResearchForm.module.css';
import { faFileImage, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getApiUrl from '../../../Common/Api';
import { CreateResearchFormReward } from './Reward/CreateResearchFormReward';
import { v4 as generateKey } from 'uuid';
import { useUsername } from '../../../hooks/useAuth';
import { CreateResearchFormRequirement } from './Requirement/CreateResearchFormRequirement';

function CreateResearchForm() {
    const RESEARCH_ADD_URL = getApiUrl() + 'research/add';
    const PHOTO_UPLOAD_URL = getApiUrl() + 'image/upload';

    const [posterImage, setPosterImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [begDate, setBegDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [participantLimit, setParticipantLimit] = useState(0);
    const [researchForm, setResearchForm] = useState('');
    const [researchPlace, setResearchPlace] = useState('');
    const [rewardList, setRewardList] = useState([{ type: '', value: null }]);
    const [requirementList, setRequirementList] = useState([]);

    let research = {
        title: title,
        description: description,
        creatorLogin: useUsername(),
        posterId: null,
        begDate: begDate,
        endDate: endDate,
        participantLimit: participantLimit,
        location: null,
        rewards: null,
        requirements: null,
    };

    /*** Rewards Section ***/

    const [rewardSectionReload, setRewardSectionReload] = useState(false);
    const [rewardKeyArray, setRewardKeyArray] = useState([]);

    /** Generate New Keys For CreateResearchFormReward Components **/
    useEffect(() => {
        let newRewardKeyArray = rewardList.reduce(array => [...array, generateKey()], []);
        setRewardKeyArray(newRewardKeyArray);
    }, [rewardSectionReload]);

    const renderRewardComponents = () => {
        return rewardList.length > 0 ? (
            rewardList.map((data, index) => (
                <CreateResearchFormReward
                    key={rewardKeyArray[index] ? rewardKeyArray[index] : generateKey()}
                    index={index}
                    data={data}
                    handleUpdate={updateReward}
                    handleDelete={deleteReward}
                />
            ))
        ) : (
            <div className={styles.requirementDesc}>
                W tej chwili Twoje badanie nie oferuje żadnych nagród za udział
            </div>
        );
    };

    const updateReward = (index, reward) => {
        let updatedRewardList = [...rewardList];
        updatedRewardList[index] = reward;
        setRewardList(updatedRewardList);
    };

    const deleteReward = index => {
        const leftList = rewardList.slice(0, index);
        const rightList = rewardList.slice(index + 1);

        setRewardList([...leftList, ...rightList]);
        setRewardSectionReload(!rewardSectionReload);
    };

    const handleAddRewardButtonClick = () => {
        setRewardList([...rewardList, { type: '', value: null }]);
        setRewardSectionReload(!rewardSectionReload);
    };

    /*** Requirements Section ***/

    const getRequirementList = list => {
        setRequirementList(list);
    };

    /*** Functions for Handling Changes in Form ***/

    const handlePosterImageChange = event => {
        setPosterImage(event.target.files[0]);
    };

    const resetPosterInput = () => {
        setPosterImage(null);
    };

    const handleTitleChange = event => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    };

    const handleBegDateChange = event => {
        setBegDate(event.target.value);
    };

    const handleEndDateChange = event => {
        setEndDate(event.target.value);
    };

    const handleParticipantLimitChange = event => {
        setParticipantLimit(event.target.value);
    };

    const handleResearchFormSelect = event => {
        setResearchForm(event.target.value);
    };

    const handleResearchPlaceChange = event => {
        setResearchPlace(event.target.value);
    };

    /*** Send New Research to Backend ***/
    // TODO: Handle Cases in 'switch' & Add Alerts

    const addNewResearch = async () => {
        /** Photo Upload **/

        const formData = new FormData();
        formData.append('image', posterImage);
        formData.append('type', 'research-poster');

        try {
            const response = await fetch(PHOTO_UPLOAD_URL, {
                method: 'POST',
                body: formData,
            });

            switch (response.status) {
                case 201: // CREATED
                    research.posterId = await response.json();

                    /** Research Add **/

                    try {
                        const response = await fetch(RESEARCH_ADD_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json; charset:UTF-8',
                            },
                            body: JSON.stringify(research),
                        });

                        switch (response.status) {
                            case 201:
                                // success
                                break;

                            default:
                                // default
                                break;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    break;

                default:
                    // default
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleFormReset = () => {
        resetPosterInput();
        setResearchForm('');
        setResearchPlace('');
        setRewardList([{ type: '', value: null }]);
        setRequirementList([]);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        research.location = { form: researchForm, place: researchPlace };
        research.rewards = rewardList;
        research.requirements = requirementList;
        addNewResearch().then(null);
    };

    return (
        <>
            <h2 className={styles.title}>Stwórz nowe ogłoszenie o badaniu</h2>
            <form
                className={styles.researchForm}
                onSubmit={handleFormSubmit}
                onReset={handleFormReset}
                encType="multipart/form-data"
            >
                <div className={styles.formRowTop}>
                    <input
                        onChange={handlePosterImageChange}
                        type="file"
                        id="poster"
                        name="poster"
                        accept="image/png, image/jpeg"
                        hidden
                    />

                    <div className={styles.posterContainer}>
                        {posterImage != null && (
                            <img
                                alt="poster"
                                src={URL.createObjectURL(posterImage)}
                                className={styles.posterImg}
                            />
                        )}

                        {posterImage == null ? (
                            <label className={styles.posterOverlay} htmlFor="poster">
                                <div className={styles.overlayItem}>
                                    <FontAwesomeIcon
                                        icon={faFileImage}
                                        className={styles.posterIcon}
                                    />
                                    <span className={styles.posterDesc}>Dodaj plakat</span>
                                </div>
                            </label>
                        ) : (
                            <div className={styles.posterOverlayWithFile}>
                                <label className={styles.overlayItem} htmlFor="poster">
                                    <FontAwesomeIcon
                                        icon={faFileImage}
                                        className={styles.posterIcon}
                                    />
                                    <span className={styles.posterDesc}>Zmień plakat</span>
                                </label>

                                <div className={styles.overlayItem} onClick={resetPosterInput}>
                                    <FontAwesomeIcon icon={faTrash} className={styles.posterIcon} />
                                    <span className={styles.posterDesc}>Usuń plakat</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.formRowTopRight}>
                        <input
                            required
                            className={styles.formInputRegular}
                            onChange={handleTitleChange}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Tytuł badania"
                        />
                        <textarea
                            required
                            className={styles.formInputLarge}
                            onChange={handleDescriptionChange}
                            id="desc"
                            name="desc"
                            maxLength="1500"
                            placeholder="Opis badania"
                        />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.inputWithLabel}>
                        <label className={styles.formLabel} htmlFor="date-begin">
                            Data rozpoczęcia badania
                        </label>
                        <input
                            required
                            className={styles.formInputRegular}
                            onChange={handleBegDateChange}
                            type="date"
                            id="date-begin"
                            name="date-begin"
                        />
                    </div>

                    <div className={styles.inputWithLabel}>
                        <label className={styles.formLabel} htmlFor="date-end">
                            Data zakończenia badania
                        </label>
                        <input
                            required
                            className={styles.formInputRegular}
                            onChange={handleEndDateChange}
                            type="date"
                            id="date-end"
                            name="date-end"
                        />
                    </div>

                    <div className={styles.inputWithLabel}>
                        <label className={styles.formLabel} htmlFor="participant-limit">
                            Liczba uczestników
                        </label>
                        <input
                            required
                            className={styles.formInputRegular}
                            onChange={handleParticipantLimitChange}
                            type="number"
                            min="0"
                            placeholder="1"
                            id="participant-limit"
                            name="participant-limit"
                        />
                    </div>
                </div>

                <div className={styles.rowContainer}>
                    <label className={styles.formLabel}>Miejsce przeprowadzania badania</label>
                    <div className={styles.formRow}>
                        <select
                            required
                            onChange={handleResearchFormSelect}
                            className={styles.formInputRegular}
                            name="form"
                            id="form-select"
                            defaultValue={''}
                        >
                            <option value="" disabled>
                                Wybierz formę...
                            </option>
                            <option value="in-place">stacjonarnie</option>
                            <option value="remote">zdalnie</option>
                        </select>
                        {researchForm === 'remote' && (
                            <input
                                required
                                className={styles.formInputRegular}
                                onChange={handleResearchPlaceChange}
                                type="text"
                                id="remote-link"
                                name="remote-link"
                                placeholder="Link do zdalnego badania"
                            />
                        )}
                    </div>
                </div>
                {researchForm === 'in-place' && (
                    <div className={styles.formRow}>
                        <div className={styles.map}>
                            [GOOGLE API MAP]
                            <br />
                            (do wyboru stacjonarnego miejsca badania)
                        </div>
                    </div>
                )}

                <div className={styles.rowContainer}>
                    <label className={styles.formLabel}>Nagrody za udział w badaniu</label>

                    <div className={styles.formColumn}>{renderRewardComponents()}</div>

                    <div className={styles.formColumnButton}>
                        <div onClick={handleAddRewardButtonClick} className={styles.addButton}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span className={styles.addButtonDesc}>Dodaj nagrodę</span>
                        </div>
                    </div>
                </div>

                <div className={styles.rowContainer}>
                    <label className={styles.formLabel}>Wymagania udziału w badaniu</label>
                    <label className={styles.requirementDesc}>
                        Zaznacz kryteria, które muszą spełniać uczestnicy Twojego badania.
                    </label>

                    <CreateResearchFormRequirement sendList={getRequirementList} />
                </div>

                <div className={`${styles.formRow} ${styles.margin}`}>
                    <button className={styles.formButton} type="reset">
                        Zacznij od nowa
                    </button>
                    <button className={styles.formButton} type="submit">
                        Dodaj nowe ogłoszenie
                    </button>
                </div>
            </form>
        </>
    );
}

export { CreateResearchForm };
