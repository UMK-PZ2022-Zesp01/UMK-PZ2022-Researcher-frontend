import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import '../Reward/CreateResearchFormReward.css';
import '../CreateResearchForm.css';
import './CreateResearchFormRequirement.css';

function CreateResearchFormRequirement({ index, data, handleUpdate, handleDelete }) {
  const { type, value } = data;

  const [isAgeMinCheckboxChecked, setIsAgeMinCheckboxChecked] = useState(true);
  const [isAgeMaxCheckboxChecked, setIsAgeMaxCheckboxChecked] = useState(true);

  const handleAgeMinCheckboxClick = () => {
    setIsAgeMinCheckboxChecked(!isAgeMinCheckboxChecked);
  };

  const handleAgeMaxCheckboxClick = () => {
    setIsAgeMaxCheckboxChecked(!isAgeMaxCheckboxChecked);
  };

  return (
    <>
      <div className="rewardRow">
        <select
          required
          className="formInputRegular"
          name="requirement-type"
          defaultValue={type}
          onChange={event => handleUpdate(index, { type: event.target.value, value: null })}
        >
          <option value="" disabled>
            Wybierz kategorię...
          </option>
          <option value="gender">płeć</option>
          <option value="age">wiek</option>
          <option value="place">miejsce zamieszkania</option>
          <option value="education">wykształcenie</option>
          <option value="marital">stan cywilny</option>
          <option value="other">inne</option>
        </select>

        {type === 'other' && (
          <input
            required
            className="formInputRegular"
            type="text"
            name="requirement-other"
            placeholder="Wpisz kryterium..."
            defaultValue={value}
            onChange={event =>
              handleUpdate(index, {
                type: type,
                value: event.target.value,
              })
            }
          />
        )}

        <div
          className="removeRewardButton"
          onClick={() => {
            handleDelete(index);
          }}
          title="Usuń kryterium"
        >
          <FontAwesomeIcon icon={faTrash} className="trashIcon" />
        </div>
      </div>

      {/*** Gender Checkboxes ***/}

      {type === 'gender' && (
        <div className="checkboxContainer2">
          <div className="checkboxElement">
            <input
              className="checkbox"
              type="checkbox"
              id="gender-male"
              name="gender-male"
              value="male"
            />
            <label className="checkboxLabel" htmlFor="gender-male">
              Mężczyzna
            </label>
          </div>

          <div className="checkboxElement">
            <input
              className="checkbox"
              type="checkbox"
              id="gender-female"
              name="gender-female"
              value="female"
            />
            <label className="checkboxLabel" htmlFor="gender-female">
              Kobieta
            </label>
          </div>

          <div className="checkboxElement">
            <input
              className="checkbox"
              type="checkbox"
              id="gender-other"
              name="gender-other"
              value="other"
            />
            <label className="checkboxLabel" htmlFor="gender-other">
              Inna
            </label>
          </div>

          <div className="checkboxElement">
            <input
              className="checkbox"
              type="checkbox"
              id="gender-unset"
              name="gender-unset"
              value="unset"
            />
            <label className="checkboxLabel" htmlFor="gender-unset">
              Nie podano
            </label>
          </div>
        </div>
      )}

      {/*** Age Checkboxes & Inputs ***/}

      {type === 'age' && (
        <div className="checkboxContainer2">
          <div className="ageRow">
            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="age-min"
                name="age-min"
                value="min"
                defaultChecked
                onClick={handleAgeMinCheckboxClick}
              />
              <label className="checkboxLabel" htmlFor="age-min">
                <span className="checkboxDesc">limit dolny</span>
              </label>
            </div>

            <input
              required
              className={
                !isAgeMinCheckboxChecked ? 'formInputRegular disabled' : 'formInputRegular'
              }
              type="number"
              min="1"
              step="1"
              name="age-min"
              placeholder="Wpisz wiek..."
              defaultValue={value}
              onChange={event =>
                handleUpdate(index, {
                  type: type,
                  value: event.target.value,
                })
              }
            />
          </div>

          <div className="ageRow">
            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="age-min"
                name="age-min"
                value="min"
                defaultChecked
                onClick={handleAgeMaxCheckboxClick}
              />
              <label className="checkboxLabel" htmlFor="age-min">
                <span className="checkboxDesc">limit górny</span>
              </label>
            </div>

            <input
              required
              className={
                !isAgeMaxCheckboxChecked ? 'formInputRegular disabled' : 'formInputRegular'
              }
              type="number"
              min="1"
              step="1"
              name="age-max"
              placeholder="Wpisz wiek..."
              defaultValue={value}
              onChange={event =>
                handleUpdate(index, {
                  type: type,
                  value: event.target.value,
                })
              }
            />
          </div>
        </div>
      )}

      {/*** Living Place Checkboxes ***/}

      {type === 'place' && (
        <div className="rewardRow">
          <div className="checkboxContainerColumn">
            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="place-village"
                name="place-village"
                value="village"
              />
              <label className="checkboxLabel" htmlFor="place-village">
                wieś
              </label>
            </div>

            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="place-city50k150k"
                name="place-city50k150k"
                value="city50k150k"
              />
              <label className="checkboxLabel" htmlFor="place-city50k150k">
                miasto od 50 tys. do 150 tys. mieszkańców
              </label>
            </div>

            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="place-cityAbove500k"
                name="place-cityAbove500k"
                value="cityAbove500k"
              />
              <label className="checkboxLabel" htmlFor="place-cityAbove500k">
                miasto powyżej 500 tys. mieszkańców
              </label>
            </div>
          </div>

          <div className="checkboxContainerColumn">
            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="place-cityBelow50k"
                name="place-cityBelow50k"
                value="cityBelow50k"
              />
              <label className="checkboxLabel" htmlFor="place-cityBelow50k">
                miasto do 50 tys. mieszkańców
              </label>
            </div>

            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="place-city150k500k"
                name="place-city150k500k"
                value="city150k500k"
              />
              <label className="checkboxLabel" htmlFor="place-city150k500k">
                miasto od 150 tys. do 500 tys. mieszkańców
              </label>
            </div>
          </div>
        </div>
      )}

      {/*** Education Checkboxes ***/}

      {type === 'education' && (
        <div className="checkboxContainer2">
          <div className="checkboxElement">
            <input
              className="checkbox"
              type="checkbox"
              id="education-primary"
              name="education-primary"
              value="primary"
            />
            <label className="checkboxLabel" htmlFor="education-primary">
              podstawowe
            </label>
          </div>

          <div className="checkboxElement">
            <input
              className="checkbox"
              type="checkbox"
              id="education-vocational"
              name="education-vocational"
              value="vocational"
            />
            <label className="checkboxLabel" htmlFor="education-vocational">
              zawodowe
            </label>
          </div>

          <div className="checkboxElement">
            <input
              className="checkbox"
              type="checkbox"
              id="education-middle"
              name="education-middle"
              value="middle"
            />
            <label className="checkboxLabel" htmlFor="education-vocational">
              średnie
            </label>
          </div>

          <div className="checkboxElement">
            <input
              className="checkbox"
              type="checkbox"
              id="education-college"
              name="education-college"
              value="college"
            />
            <label className="checkboxLabel" htmlFor="education-college">
              wyższe
            </label>
          </div>
        </div>
      )}

      {/*** Marital Status Checkboxes ***/}

      {type === 'marital' && (
        <div className="rewardRow">
          <div className="checkboxContainerColumn">
            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="marital-single"
                name="marital-single"
                value="single"
              />
              <label className="checkboxLabel" htmlFor="marital-single">
                singiel / singielka
              </label>
            </div>

            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="marital-marriage"
                name="marital-marriage"
                value="marriage"
              />
              <label className="checkboxLabel" htmlFor="marital-marriage">
                żonaty / zamężna
              </label>
            </div>

            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="marital-divorced"
                name="marital-divorced"
                value="marital-divorced"
              />
              <label className="checkboxLabel" htmlFor="marital-divorced">
                rozwiedziony / rozwiedziona
              </label>
            </div>
          </div>

          <div className="checkboxContainerColumn">
            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="marital-engagement"
                name="marital-engagement"
                value="engagement"
              />
              <label className="checkboxLabel" htmlFor="marital-engagement">
                zaręczony / zaręczona
              </label>
            </div>

            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="marital-widowed"
                name="marital-widowed"
                value="widowed"
              />
              <label className="checkboxLabel" htmlFor="marital-widowed">
                wdowiec / wdowa
              </label>
            </div>

            <div className="checkboxElement">
              <input
                className="checkbox"
                type="checkbox"
                id="marital-separation"
                name="marital-separation"
                value="separation"
              />
              <label className="checkboxLabel" htmlFor="marital-separation">
                w separacji
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

CreateResearchFormRequirement.defaultProps = {
  data: { type: '', value: null },
};

export { CreateResearchFormRequirement };
