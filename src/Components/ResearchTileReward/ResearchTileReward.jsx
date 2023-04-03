import styles from './ResearchTileReward.module.css';
import { useCapitalize } from '../../hooks/useCapitalize';
import { useTranslate } from '../../hooks/useTranslate';

export const ResearchTileReward = ({ reward }) => {
    const { type, value } = reward;

    const capitalize = useCapitalize();
    const translate = useTranslate();

    return (
        <li className={styles.researchTileReward}>
            <span className={styles.type}>{capitalize(translate(type))}: </span>
            <ul className={styles.rewardList}>
                <li className={styles.value}>
                    {type.toLowerCase() === 'cash' ? `${Number(value / 100).toFixed(2)}zł` : value}
                </li>
            </ul>
        </li>
    );
};
