import styles from './ResearchTileRequirement.module.css';

import { useTranslate } from '../../hooks/useTranslate';
import { useCapitalize } from '../../hooks/useCapitalize';

export const ResearchTileRequirement = ({ requirement, researchCode }) => {
    const { type, criteria } = requirement;

    const capitalize = useCapitalize();
    const translate = useTranslate();

    const renderCriteria = () => {
        if (type.toLowerCase() === 'age') {
            return (
                <ul className={styles.criteriaList}>
                    {[...criteria].map((cri, index) => (
                        <li
                            key={`${researchCode}criteria${index}`}
                            className={styles.value}
                        >{`od ${cri.ageMin} do ${cri.ageMax} lat`}</li>
                    ))}
                </ul>
            );
        }
        if (type.toLowerCase() === 'other') {
            return [...criteria].map((cri, index) => (
                <span key={`${researchCode}criteria${index}`} className={styles.criteria}>
                    <span className={styles.type}>{`${capitalize(cri.type)}: `}</span>
                    <ul className={styles.criteriaList}>
                        <li className={styles.value}>{cri.description}</li>
                    </ul>
                </span>
            ));
        }

        return (
            <ul className={styles.criteriaList}>
                {[...criteria].map((cri, index) => (
                    <li key={`${researchCode}criteria${index}`}>{translate(cri)}</li>
                ))}
            </ul>
        );
    };
    return (
        <li className={styles.researchTileRequirement}>
            <span className={styles.type}>
                {type !== 'other' && capitalize(translate(type)) + ':'}{' '}
            </span>
            {renderCriteria()}
        </li>
    );
};
