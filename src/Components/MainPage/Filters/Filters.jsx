import styles from './Filters.module.css';
import React, { useState } from 'react';

export const Filters = ({ id, filters, saveFilters }) => {
    const [open, setOpen] = useState(false);

    const handleDropdownSwitch = () => {
        setOpen(!open);
    };

    const handleSaveButtonClicked = () => {
        saveFilters();
        setOpen(false);
    };

    const getDropdownClass = () => {
        return `${styles.dropdown} ${open ? styles.active : ''}`;
    };

    const renderFilters = () =>
        filters
            .filter(filter => filter != null)
            .map((filter, index) => (
                <div key={index + filter?.category} className={styles.category}>
                    <header>{filter?.category}</header>
                    {renderOptions(filter?.options)}
                </div>
            ));

    const renderOptions = options =>
        options
            .filter(o => o != null)
            .map((option, index) => (
                <span
                    key={option?.name + option?.type + index}
                    className={styles[option?.type + 'Span']}
                >
                    <input
                        id={option?.name + 'checkbox' + index}
                        type={option?.type}
                        className={styles[option?.type]}
                        checked={option.checked}
                        onChange={option?.setter}
                    ></input>
                    <label
                        htmlFor={option?.name + 'checkbox' + index}
                        className={styles[option?.type + 'Label']}
                    >
                        {option.name}
                    </label>
                </span>
            ));

    return (
        <div className={styles.container}>
            <button id={id} onClick={handleDropdownSwitch} className={styles.filtersButton}>
                Opcje filtrów
            </button>
            <div className={getDropdownClass()}>
                {renderFilters()}
                <button
                    onClick={handleSaveButtonClicked}
                    className={`${styles.filtersButton} ${styles.small}`}
                >
                    Zapisz
                </button>
            </div>
        </div>
    );
};

Filters.defaultProps = {
    id: '',
    filters: [],
    saveFilters: () => {},
};
