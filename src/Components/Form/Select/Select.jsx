import styles from './Select.module.css';
import { useEffect, useRef } from 'react';

export const Select = ({
    id,
    name,
    title,
    options,
    isOpen,
    open,
    placeholder,
    value,
    setValue,
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        const available = options.map(option => option.name);
        if (available.indexOf(value) === -1) {
            inputRef.current.setCustomValidity('Zaznacz jedną z dostępnych opcji');
        } else inputRef.current.setCustomValidity('');
    }, [value]);
    const renderOptions = () => {
        return options.map(option => (
            <button
                key={`option${option.name}`}
                title={option.name}
                className={styles.option}
                onClick={() => setValue(option)}
            >
                {option.name}
            </button>
        ));
    };

    return (
        <div
            id={id}
            title={title}
            onClick={() => open(!isOpen)}
            onFocus={() => open(true)}
            onBlur={() => open(false)}
            className={styles.select}
        >
            <input
                ref={inputRef}
                name={name}
                type="text"
                value={value}
                placeholder={placeholder}
                className={styles.current}
                required
                onChange={() => {}}
            />
            <div className={`${styles.dropdown} ${isOpen ? '' : styles.hidden}`}>
                {renderOptions()}
            </div>
        </div>
    );
};
