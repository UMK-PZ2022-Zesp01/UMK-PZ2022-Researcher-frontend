import '../CreateResearchForm.css';
import '../Reward/CreateResearchFormReward.css';
import './CreateResearchFormRequirement.css';
import { useState } from 'react';

function CreateResearchFormRequirement({ sendList }) {
    const [isGenderCheckboxChecked, setIsGenderCheckboxChecked] = useState(false);
    const [isAgeCheckboxChecked, setIsAgeCheckboxChecked] = useState(false);
    const [isPlaceCheckboxChecked, setIsPlaceCheckboxChecked] = useState(false);
    const [isEducationCheckboxChecked, setIsEducationCheckboxChecked] = useState(false);
    const [isMaritalCheckboxChecked, setIsMaritalCheckboxChecked] = useState(false);
    const [isOtherCheckboxChecked, setIsOtherCheckboxChecked] = useState(false);

    const [isAgeMinCheckboxChecked, setIsAgeMinCheckboxChecked] = useState(true);
    const [isAgeMaxCheckboxChecked, setIsAgeMaxCheckboxChecked] = useState(true);
    const [isPlaceOtherCheckboxChecked, setIsPlaceOtherCheckboxChecked] = useState(false);
    const [isEducationOtherCheckboxChecked, setIsEducationOtherCheckboxChecked] = useState(false);
    const [isMaritalOtherCheckboxChecked, setIsMaritalOtherCheckboxChecked] = useState(false);

    const [genderList, setGenderList] = useState([]);
    const [placeList, setPlaceList] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [maritalList, setMaritalList] = useState([]);
    const [ageMin, setAgeMin] = useState(null);
    const [ageMax, setAgeMax] = useState(null);

    const [otherRequirementList, setOtherRequirementList] = useState([{type: "", criteria: ""}]);

    const renderOtherRequirementComponents = () => {
		return otherRequirementList.length > 0 ?
			otherRequirementList.map((value, index) =>
				<div className="formRow">
					<input
						className="formInputRegular"
						type="text"
						id={"requirement-other-category-" + index}
						placeholder="Wpisz kategorię..."
					/>

					<input
						className="formInputRegular"
						type="text"
						id="requirement-other-desc"
						placeholder="Wpisz kryterium..."
					/>
				</div>
			)
	};

    const handleGenderListChange = event => {
        const valueIndex = genderList.indexOf(event.target.value);
        const isValueInList = valueIndex >= 0;

        if (event.target.checked) {
            if (!isValueInList) {
                setGenderList([...genderList, event.target.value]);
            }
        } else {
            if (isValueInList) {
                const reducedGenderList = [...genderList];
                reducedGenderList.splice(valueIndex, 1);
                setGenderList(reducedGenderList);
            }
        }

        sendList(requirementList.filter(value => value !== false));
    };

    const handleAgeMinInputChange = event => {
        setAgeMin(event.target.value);
        sendList(requirementList.filter(value => value !== false));
    };

    const handleAgeMaxInputChange = event => {
        setAgeMax(event.target.value);
        sendList(requirementList.filter(value => value !== false));
    };

    const handlePlaceListChange = event => {
        const valueIndex = placeList.indexOf(event.target.value);
        const isValueInList = valueIndex >= 0;

        if (event.target.checked) {
            if (!isValueInList) {
                setPlaceList([...placeList, event.target.value]);
            }
        } else {
            if (isValueInList) {
                const reducedPlaceList = [...placeList];
                reducedPlaceList.splice(valueIndex, 1);
                setPlaceList(reducedPlaceList);
            }
        }

        sendList(requirementList.filter(value => value !== false));
    };

    const handleEducationListChange = event => {
        const valueIndex = educationList.indexOf(event.target.value);
        const isValueInList = valueIndex >= 0;

        if (event.target.checked) {
            if (!isValueInList) {
                setEducationList([...educationList, event.target.value]);
            }
        } else {
            if (isValueInList) {
                const reducedEducationList = [...educationList];
                reducedEducationList.splice(valueIndex, 1);
                setEducationList(reducedEducationList);
            }
        }

        sendList(requirementList.filter(value => value !== false));
    };

    const handleMaritalListChange = event => {
        const valueIndex = maritalList.indexOf(event.target.value);
        const isValueInList = valueIndex >= 0;

        if (event.target.checked) {
            if (!isValueInList) {
                setMaritalList([...maritalList, event.target.value]);
            }
        } else {
            if (isValueInList) {
                const reducedMaritalList = [...maritalList];
                reducedMaritalList.splice(valueIndex, 1);
                setMaritalList(reducedMaritalList);
            }
        }

        sendList(requirementList.filter(value => value !== false));
    };

    let requirementList = [
        isGenderCheckboxChecked && {
            type: 'gender',
            criteria: genderList,
        },

        isAgeCheckboxChecked && {
            type: 'age',
            criteria: {
                ageMin: isAgeMinCheckboxChecked ? Number(ageMin) : null,
                ageMax: isAgeMaxCheckboxChecked ? Number(ageMax) : null,
            },
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
    ];

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

    const handleAgeMinCheckboxClick = () => {
        setIsAgeMinCheckboxChecked(!isAgeMinCheckboxChecked);
    };

    const handleAgeMaxCheckboxClick = () => {
        setIsAgeMaxCheckboxChecked(!isAgeMaxCheckboxChecked);
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

    return (
        <>
            <div className="requirementsRow">
                <div className="checkboxElement">
                    <input
                        className="checkbox"
                        type="checkbox"
                        id="req-gender"
                        name="req-category"
                        value="gender"
                        onClick={handleGenderCheckboxClick}
                    />
                    <label className="checkboxLabel" htmlFor="req-gender">
                        płeć
                    </label>
                </div>

                <div className="checkboxElement">
                    <input
                        className="checkbox"
                        type="checkbox"
                        id="req-age"
                        name="req-category"
                        value="age"
                        onClick={handleAgeCheckboxClick}
                    />
                    <label className="checkboxLabel" htmlFor="req-age">
                        wiek
                    </label>
                </div>

                <div className="checkboxElement">
                    <input
                        className="checkbox"
                        type="checkbox"
                        id="req-place"
                        name="req-category"
                        value="place"
                        onClick={handlePlaceCheckboxClick}
                    />
                    <label className="checkboxLabel" htmlFor="req-place">
                        miejsce zamieszkania
                    </label>
                </div>

                <div className="checkboxElement">
                    <input
                        className="checkbox"
                        type="checkbox"
                        id="req-education"
                        name="req-category"
                        value="education"
                        onClick={handleEducationCheckboxClick}
                    />
                    <label className="checkboxLabel" htmlFor="req-education">
                        wykształcenie
                    </label>
                </div>

                <div className="checkboxElement">
                    <input
                        className="checkbox"
                        type="checkbox"
                        id="req-marital"
                        name="req-category"
                        value="marital"
                        onClick={handleMaritalCheckboxClick}
                    />
                    <label className="checkboxLabel" htmlFor="req-marital">
                        stan cywilny
                    </label>
                </div>

                <div className="checkboxElement">
                    <input
                        className="checkbox"
                        type="checkbox"
                        id="req-other"
                        name="req-category"
                        value="other"
                        onClick={handleOtherCheckboxClick}
                    />
                    <label className="checkboxLabel" htmlFor="req-other">
                        inne
                    </label>
                </div>
            </div>

            {isGenderCheckboxChecked && (
                <div className="requirementContainer">
                    <label className="requirementTitle">Płeć</label>
                    <div className="checkboxContainer">
                        <div className="checkboxColumn">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="gender-male"
                                    name="gender"
                                    value="male"
                                    onClick={handleGenderListChange}
                                />
                                <label htmlFor="gender-male" className="checkboxLabel">
                                    mężczyzna
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="gender-other"
                                    name="gender"
                                    value="other"
                                    onClick={handleGenderListChange}
                                />
                                <label htmlFor="gender-other" className="checkboxLabel">
                                    inna
                                </label>
                            </div>
                        </div>

                        <div className="checkboxColumn">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="gender-female"
                                    name="gender"
                                    value="female"
                                    onClick={handleGenderListChange}
                                />
                                <label htmlFor="gender-female" className="checkboxLabel">
                                    kobieta
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="gender-notGiven"
                                    name="gender"
                                    value="notGiven"
                                    onClick={handleGenderListChange}
                                />
                                <label htmlFor="gender-notGiven" className="checkboxLabel">
                                    nie podano / nieokreślona
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isAgeCheckboxChecked && (
                <div className="requirementContainer">
                    <label className="requirementTitle">Wiek</label>
                    <div className="checkboxContainer">
                        <div className="checkboxAge">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="age-min"
                                    name="age-min"
                                    defaultChecked
                                    onClick={handleAgeMinCheckboxClick}
                                />
                                <label htmlFor="age-min" className="checkboxLabel">
                                    ustaw limit dolny
                                </label>
                            </div>
                            <input
                                className={
                                    isAgeMinCheckboxChecked
                                        ? 'formInputRegular'
                                        : 'formInputRegular inputDisabled'
                                }
                                type="number"
                                min="1"
                                max="130"
                                name="age-min-value"
                                placeholder="Wpisz wiek..."
                                onChange={handleAgeMinInputChange}
                            />
                        </div>

                        <div className="checkboxAge">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="age-max"
                                    name="age-max"
                                    defaultChecked
                                    onClick={handleAgeMaxCheckboxClick}
                                />
                                <label htmlFor="age-max" className="checkboxLabel">
                                    ustaw limit górny
                                </label>
                            </div>
                            <input
                                className={
                                    isAgeMaxCheckboxChecked
                                        ? 'formInputRegular'
                                        : 'formInputRegular inputDisabled'
                                }
                                type="number"
                                min="1"
                                max="130"
                                name="age-max-value"
                                placeholder="Wpisz wiek..."
                                onChange={handleAgeMaxInputChange}
                            />
                        </div>
                    </div>
                </div>
            )}

            {isPlaceCheckboxChecked && (
                <div className="requirementContainer">
                    <label className="requirementTitle">Miejsce zamieszkania</label>
                    <div className="checkboxContainer">
                        <div className="checkboxColumn">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="place-village"
                                    name="place"
                                    value="village"
                                    onClick={handlePlaceListChange}
                                />
                                <label htmlFor="place-village" className="checkboxLabel">
                                    wieś
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="place-cityBetween50kAnd150k"
                                    name="place"
                                    value="cityBetween50kAnd150k"
                                    onClick={handlePlaceListChange}
                                />
                                <label
                                    htmlFor="place-cityBetween50kAnd150k"
                                    className="checkboxLabel"
                                >
                                    miasto od 50 tys. do 150 tys. mieszkańców
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="place-cityAbove500k"
                                    name="place"
                                    value="cityAbove500k"
                                    onClick={handlePlaceListChange}
                                />
                                <label htmlFor="place-cityAbove500k" className="checkboxLabel">
                                    miasto powyżej 500 tys. mieszkańców
                                </label>
                            </div>
                        </div>

                        <div className="checkboxColumn">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="place-cityBelow50k"
                                    name="place"
                                    value="cityBelow50k"
                                    onClick={handlePlaceListChange}
                                />
                                <label htmlFor="place-cityBelow50k" className="checkboxLabel">
                                    miasto poniżej 50 tys. mieszkańców
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="place-cityBetween150kAnd500k"
                                    name="place"
                                    value="cityBetween150kAnd500k"
                                    onClick={handlePlaceListChange}
                                />
                                <label
                                    htmlFor="place-cityBetween150kAnd500k"
                                    className="checkboxLabel"
                                >
                                    miasto od 150 tys. do 500 tys. mieszkańców
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="place-other"
                                    name="place"
                                    value="other"
                                    onClick={handlePlaceOtherCheckboxClick}
                                />
                                <label htmlFor="place-other" className="checkboxLabel">
                                    inne (jakie?)
                                </label>
                            </div>
                        </div>
                    </div>

                    {isPlaceOtherCheckboxChecked && (
                        <input
                            className="formInputRegular"
                            type="text"
                            id="place-other-desc"
                            placeholder="Wpisz inne kryterium..."
                        />
                    )}
                </div>
            )}

            {isEducationCheckboxChecked && (
                <div className="requirementContainer">
                    <label className="requirementTitle">Wykształcenie</label>
                    <div className="checkboxContainer">
                        <div className="checkboxColumn">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="education-primary"
                                    name="education"
                                    value="primary"
                                    onClick={handleEducationListChange}
                                />
                                <label htmlFor="education-primary" className="checkboxLabel">
                                    podstawowe
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="education-middle"
                                    name="education"
                                    value="middle"
                                    onClick={handleEducationListChange}
                                />
                                <label htmlFor="education-middle" className="checkboxLabel">
                                    średnie
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="education-other"
                                    name="education"
                                    value="other"
                                    onClick={handleEducationOtherCheckboxClick}
                                />
                                <label htmlFor="education-other" className="checkboxLabel">
                                    inne (jakie?)
                                </label>
                            </div>
                        </div>

                        <div className="checkboxColumn">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="education-vocational"
                                    name="education"
                                    value="vocational"
                                    onClick={handleEducationListChange}
                                />
                                <label htmlFor="education-vocational" className="checkboxLabel">
                                    zasadnicze zawodowe
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="education-college"
                                    name="education"
                                    value="college"
                                    onClick={handleEducationListChange}
                                />
                                <label htmlFor="education-college" className="checkboxLabel">
                                    wyższe
                                </label>
                            </div>
                        </div>
                    </div>

                    {isEducationOtherCheckboxChecked && (
                        <input
                            className="formInputRegular"
                            type="text"
                            id="education-other-desc"
                            placeholder="Wpisz inne kryterium..."
                        />
                    )}
                </div>
            )}

            {isMaritalCheckboxChecked && (
                <div className="requirementContainer">
                    <label className="requirementTitle">Stan cywilny</label>
                    <div className="checkboxContainer">
                        <div className="checkboxColumn">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="marital-single"
                                    name="marital"
                                    value="single"
                                    onClick={handleMaritalListChange}
                                />
                                <label htmlFor="marital-single" className="checkboxLabel">
                                    singiel / singielka
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="marital-engaged"
                                    name="marital"
                                    value="engaged"
                                    onClick={handleMaritalListChange}
                                />
                                <label htmlFor="marital-engaged" className="checkboxLabel">
                                    zaręczony / zaręczona
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="marital-divorced"
                                    name="marital"
                                    value="divorced"
                                    onClick={handleMaritalListChange}
                                />
                                <label htmlFor="marital-divorced" className="checkboxLabel">
                                    rozwiedziony / rozwiedziona
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="marital-inSeparation"
                                    name="marital"
                                    value="inSeparation"
                                    onClick={handleMaritalListChange}
                                />
                                <label htmlFor="marital-inSeparation" className="checkboxLabel">
                                    w separacji
                                </label>
                            </div>
                        </div>

                        <div className="checkboxColumn">
                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="marital-inRelationship"
                                    name="marital"
                                    value="inRelationship"
                                    onClick={handleMaritalListChange}
                                />
                                <label htmlFor="marital-inRelationship" className="checkboxLabel">
                                    w związku partnerskim
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="marital-marriage"
                                    name="marital"
                                    value="marriage"
                                    onClick={handleMaritalListChange}
                                />
                                <label htmlFor="marital-marriage" className="checkboxLabel">
                                    w związku małżeńskim
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="place-widowed"
                                    name="place"
                                    value="widowed"
                                    onClick={handleMaritalListChange}
                                />
                                <label htmlFor="place-widowed" className="checkboxLabel">
                                    wdowiec / wdowa
                                </label>
                            </div>

                            <div className="checkboxElement">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="marital-other"
                                    name="marital"
                                    value="other"
                                    onClick={handleMaritalOtherCheckboxClick}
                                />
                                <label htmlFor="marital-other" className="checkboxLabel">
                                    inny (jaki?)
                                </label>
                            </div>
                        </div>
                    </div>

                    {isMaritalOtherCheckboxChecked && (
                        <input
                            className="formInputRegular"
                            type="text"
                            id="marital-other-desc"
                            placeholder="Wpisz inne kryterium..."
                        />
                    )}
                </div>
            )}

            {isOtherCheckboxChecked && (
                <div className="requirementContainer">
                    <label className="requirementTitle">Inne</label>
                    <div className="formRow">
                        <input
                            className="formInputRegular"
                            type="text"
                            id="requirement-other-category"
                            placeholder="Wpisz kategorię..."
                        />

                        <input
                            className="formInputRegular"
                            type="text"
                            id="requirement-other-desc"
                            placeholder="Wpisz kryterium..."
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export { CreateResearchFormRequirement };
