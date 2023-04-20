import React from 'react';
import styles from './ResearchTile.module.css';
import { ResearchTileRequirement } from '../ResearchTileRequirement/ResearchTileRequirement';
import { useTranslate } from '../../hooks/useTranslate';
import { useCapitalize } from '../../hooks/useCapitalize';
import { ResearchTileReward } from '../ResearchTileReward/ResearchTileReward';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ResearchTile({ tileData, postData }) {
    const { tileNumber, previewed, setPreviewed } = tileData;
    const {
        researchCode,
        poster,
        title,
        creatorLogin,
        description,

        location,

        begDate,
        endDate,

        highlight,

        requirements,
        rewards,
    } = postData;

    const isPreviewed = previewed === tileNumber;

    const translate = useTranslate();
    const capitalize = useCapitalize();

    const navigate = useNavigate();
    const webLocation = useLocation();

    const handleTileClicked = () => {
        if (isPreviewed) {
            setPreviewed(null);
            return;
        }
        setPreviewed(tileNumber);
    };

    const renderRewards = () => {
        return postData?.rewards.map((reward, index) => (
            <ResearchTileReward
                key={`${researchCode}rew${index}`}
                researchCode={researchCode}
                reward={reward}
            ></ResearchTileReward>
        ));
    };

    const renderRequirements = () => {
        return postData?.requirements.map((req, index) => (
            <ResearchTileRequirement
                key={`${researchCode}req${index}`}
                researchCode={researchCode}
                requirement={req}
            />
        ));
    };

    // const renderInfo = (array = []) => {
    //     return [...array].map(item => (
    //         <React.Fragment key={`${item.type}${item.value}`}>
    //             <span className={styles.bold}>{`${translate[item.type.toLowerCase()]}: `}</span>
    //             {item.type.toLowerCase() === 'cash'
    //                 ? `${Number(item.value / 100).toFixed(2)}zł`
    //                 : item.value}
    //             <br />
    //         </React.Fragment>
    //     ));
    // };

    return (
        <>
            {/*SMALL TILE*/}
            <li
                key={`SmallTile${researchCode}`}
                className={`${isPreviewed ? styles.previewed : ''} ${styles.researchTile} `}
                onClick={handleTileClicked}
            >
                <img
                    className={styles.poster}
                    alt={'poster'}
                    src={`data:image/jpeg;base64,${poster}`}
                    // src={URL.createObjectURL(poster?.data)}
                />
                <div className={styles.tileOverlay}>
                    <p className={styles.tileOverlayTitle}>{title}</p>
                    <p className={styles.tileOverlayAuthor}>{creatorLogin}</p>
                    <p className={styles.tileOverlayDate}>otwarte do: {endDate}</p>
                </div>
            </li>

            {/*BIG TILE*/}
            <li
                key={`BigTile${researchCode}`}
                className={`${styles.previewTile} ${isPreviewed ? styles.previewVisible : ''}`}
            >
                <div className={styles.previewHeader1}>
                    <header className={`${styles.headerHalf} ${styles.headerLeft}`}>{title}</header>
                    <div className={`${styles.headerHalf} ${styles.headerRight}`}>
                        Otwarte do:
                        <br /> {endDate}
                    </div>
                </div>
                <div className={styles.previewHeader2}>
                    <div className={`${styles.headerHalf} ${styles.headerLeft}`}>
                        {creatorLogin}
                    </div>
                    <div className={`${styles.headerHalf} ${styles.headerRight}`}>{highlight}</div>
                </div>
                <div className={styles.previewBody}>
                    <div className={`${styles.bodyPart} ${styles.bodyLeft}`}>
                        <div className={styles.infoBox}>
                            <div className={styles.h4}>Dostęp</div>
                            <ul className={styles.list}>
                                <li>
                                    <span className={styles.type}>Forma: </span>
                                    <span>{translate(location.form)}</span>
                                </li>
                                <li>
                                    <span className={styles.type}>Adres: </span>
                                    <span>{location?.place}</span>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.h4}>Wymagania</div>
                            <ul className={styles.requirementsList}>{renderRequirements()}</ul>
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.h4}>Nagrody za udział</div>
                            <ul className={styles.rewardsList}>{renderRewards()}</ul>
                        </div>
                    </div>
                    <main className={`${styles.bodyPart} ${styles.bodyRight}`}>
                        <div className={styles.h4}>Opis badania:</div>
                        <main>{description}</main>
                    </main>
                </div>
                <div className={styles.previewButtonContainer}>
                    <button
                        className={styles.researchPageButton}
                        onClick={() =>
                            navigate(`/research/${researchCode}`, {
                                from: webLocation,
                                replace: false,
                            })
                        }
                    >
                        STRONA BADANIA
                    </button>
                </div>
                <div className={styles.previewRollInContainer}>
                    <button onClick={handleTileClicked} className={styles.rollInButton}></button>
                </div>
            </li>
        </>
    );
}

ResearchTile.defaultProps = {
    tileData: {
        tileNumber: null,
        previewed: false,
    },

    postData: {
        poster: '',
        title: '',
        description: '',
        author: '',

        begDate: '',
        endDate: '',

        location: {
            form: '',
            address: '',
        },

        rewards: [],
        requirements: [],

        highlight: '',
    },
};
