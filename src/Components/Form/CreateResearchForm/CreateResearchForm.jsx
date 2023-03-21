import React, { useEffect, useState } from 'react';
import './CreateResearchForm.css';
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
            <div className="noRewardDesc">
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
            <h2 className="title">Stwórz nowe ogłoszenie o badaniu</h2>
            <form
                className="researchForm"
                onSubmit={handleFormSubmit}
                onReset={handleFormReset}
                encType="multipart/form-data"
            >
                <div className="formRowTop">
                    <input
                        onChange={handlePosterImageChange}
                        type="file"
                        id="poster"
                        name="poster"
                        accept="image/png, image/jpeg"
                        hidden
                    />

                    <div className="posterButton">
                        {posterImage != null && (
                            <img
                                alt="poster"
                                src={URL.createObjectURL(posterImage)}
                                className="posterImg"
                            />
                        )}
                        <div
                            className={
                                posterImage != null
                                    ? 'posterButtonOverlay'
                                    : 'posterButtonOverlay overlayActive'
                            }
                        >
                            <label htmlFor="poster" className="overlayTile">
                                <FontAwesomeIcon className="posterIcon" icon={faFileImage} />
                                <span className="posterButtonDesc">
                                    {posterImage == null ? 'Dodaj' : 'Zmień'} plakat
                                </span>
                            </label>

                            {posterImage != null && (
                                <div className="overlayTile" onClick={resetPosterInput}>
                                    <FontAwesomeIcon className="posterIcon" icon={faTrash} />
                                    <span className="posterButtonDesc">Usuń plakat</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="formRow1Right">
                        <input
                            className="formInputRegular"
                            onChange={handleTitleChange}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Tytuł badania"
                            required
                        />
                        <textarea
                            className="formInputLarge"
                            onChange={handleDescriptionChange}
                            id="desc"
                            name="desc"
                            maxLength="1500"
                            placeholder="Opis badania"
                            required
                        />
                    </div>
                </div>

                <div className="formRow">
                    <div className="inputWithLabel">
                        <label className="formLabel" htmlFor="date-begin">
                            Data rozpoczęcia badania
                        </label>
                        <input
                            className="formInputRegular"
                            onChange={handleBegDateChange}
                            type="date"
                            id="date-begin"
                            name="date-begin"
                            required
                        />
                    </div>

                    <div className="inputWithLabel">
                        <label className="formLabel" htmlFor="date-end">
                            Data zakończenia badania
                        </label>
                        <input
                            className="formInputRegular"
                            onChange={handleEndDateChange}
                            type="date"
                            id="date-end"
                            name="date-end"
                            required
                        />
                    </div>

                    <div className="inputWithLabel">
                        <label className="formLabel" htmlFor="participant-limit">
                            Ilu uczestników potrzebujesz?
                        </label>
                        <input
                            className="formInputRegular"
                            onChange={handleParticipantLimitChange}
                            type="number"
                            min="0"
                            placeholder="1"
                            id="participant-limit"
                            name="participant-limit"
                            required
                        />
                    </div>
                </div>

                <div className="rowContainer">
                    <label className="formLabel">W jakiej formie przeprowadzasz badanie?</label>
                    <div className="formRow">
                        <select
                            onChange={handleResearchFormSelect}
                            className="formInputRegular"
                            name="form"
                            id="form-select"
                            defaultValue={''}
                            required
                        >
                            <option value="" disabled>
                                Wybierz formę...
                            </option>
                            <option value="in-place">stacjonarnie</option>
                            <option value="remote">zdalnie</option>
                        </select>
                        {researchForm === 'remote' && (
                            <input
                                className="formInputRegular"
                                onChange={handleResearchPlaceChange}
                                type="text"
                                id="remote-link"
                                name="remote-link"
                                placeholder="Link do zdalnego badania"
                                required
                            />
                        )}
                    </div>
                </div>
                {researchForm === 'in-place' && (
                    <div className="formRow">
                        <div className="map">
                            [GOOGLE API MAP]
                            <br />
                            (do wyboru stacjonarnego miejsca badania)
                        </div>
                    </div>
                )}

                <div className="rowContainer">
                    <label className="formLabel">Nagrody za udział w badaniu</label>

                    <div className="formColumn">{renderRewardComponents()}</div>

                    <div className="formColumnButton">
                        <div onClick={handleAddRewardButtonClick} className="addRewardReqButton">
                            <FontAwesomeIcon icon={faPlus} />
                            <span className="addRewardReqButtonDesc">Dodaj nagrodę</span>
                        </div>
                    </div>
                </div>

                <div className="rowContainer">
                    <label className="formLabel">Wymagania udziału w badaniu</label>
                    <label className="noRewardDesc">
                        Zaznacz kryteria, które muszą spełniać uczestnicy Twojego badania.
                    </label>

                    <CreateResearchFormRequirement sendList={getRequirementList} />
                    {/*  TODO: Receive data from the component placed line above */}
                </div>

                <div className="rowContainer">
                    <label htmlFor="" className="formLabel">
                        Dodatkowe informacje
                    </label>
                </div>

                <div className="formRow">
                    <button className="formButton" type="reset">
                        Zacznij od nowa
                    </button>
                    <button className="formButton" type="submit">
                        Dodaj nowe ogłoszenie
                    </button>
                </div>
            </form>
        </>
    );
}

export { CreateResearchForm };
