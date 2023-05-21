import styles from './ResearchTile.module.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const AddResearchTile = ({ withShadow }) => {
    const navigate = useNavigate();

    return (
        <li
            onClick={() => navigate('/research/create')}
            className={`${styles.researchTile} ${withShadow ? styles.withShadow : ''}`}
        >
            <span className={`${styles.whiteFont} ${styles.column} ${styles.bigSvg}`}>
                <FontAwesomeIcon icon={faFileCirclePlus} />
                <h3>Dodaj badanie</h3>
            </span>
        </li>
    );
};

AddResearchTile.defaultProps = {
    withShadow: false,
};
