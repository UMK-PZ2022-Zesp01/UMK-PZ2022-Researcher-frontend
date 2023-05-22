import React, { useEffect, useState } from 'react';
import styles from './ResearchTile.module.css';
import { ResearchTileRequirement } from './ResearchTileRequirement/ResearchTileRequirement';
import { useTranslate } from '../../hooks/useTranslate';
import { ResearchTileReward } from './ResearchTileReward/ResearchTileReward';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDateFormat } from '../../hooks/useDateFormat';
import AddressFormatter from '../../Common/AddressFormatter';

export default function ResearchTile({ withShadow, tileData, postData }) {
    const { tileNumber, previewed, setPreviewed } = tileData;
    const {
        researchCode,
        poster,
        title,
        creatorFullName,
        description,
        location,
        begDate,
        endDate,
        // highlight,
        // requirements,
        // rewards,
    } = postData;

    // const [geoDecoded, setGeoDecoded] = useState('');

    const isPreviewed = previewed === tileNumber;

    const translate = useTranslate();
    const plDate = useDateFormat();

    const navigate = useNavigate();
    const webLocation = useLocation();

    const handleTileClicked = () => {
        if (window.innerWidth < 600) {
            navigate(`/research/${researchCode}`, {
                from: webLocation,
                replace: false,
            });
        }

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

    const displayAddress = () => {
        if (location.form === 'in-place') {
            // console.log(location.address);
            return <li>{AddressFormatter(location.address)}</li>;
        }
        return [];
    };

    const displayDate = () => {
        const current = new Date().toISOString().split('T')[0];

        if (begDate > current) {
            return ['otwarte od: ', `${plDate(begDate)}`];
        }
        return ['otwarte do: ', `${plDate(endDate)}`];
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

    // useEffect(() => {
    //     const geoDecode = async () => {
    //         const latlng = location?.place.replace(' ', ',');
    //         try {
    //             const response = await fetch(
    //                 `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&language=pl&key=${process.env.REACT_APP_API_GOOGLE}`
    //             );
    //
    //             const json = await response.json();
    //             const address = json.results[0].formatted_address;
    //             setGeoDecoded(address);
    //         } catch (e) {
    //             setGeoDecoded('Nie udało się pobrać adresu');
    //         }
    //     };
    //
    //     if (location.form === 'in-place') {
    //         geoDecode();
    //     } else {
    //         setGeoDecoded(null);
    //     }
    // }, [location]);

    return (
        <>
            {/*SMALL TILE*/}
            <li
                key={`SmallTile${researchCode}`}
                className={`${isPreviewed ? styles.previewed : ''} ${styles.researchTile} ${
                    withShadow ? styles.withShadow : ''
                } `}
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
                    <p className={styles.tileOverlayAuthor}>{creatorFullName}</p>
                    <p className={styles.tileOverlayDate}>{displayDate()}</p>
                </div>
            </li>

            {/*BIG TILE*/}
            <li
                key={`BigTile${researchCode}`}
                className={`${styles.previewTile} ${isPreviewed ? styles.previewVisible : ''} ${
                    withShadow ? styles.withShadow : ''
                }`}
            >
                <div className={styles.previewHeader1}>
                    <header className={`${styles.headerHalf} ${styles.headerLeft}`}>{title}</header>
                    <div className={`${styles.headerHalf} ${styles.headerRight}`}>
                        {displayDate()[0]}
                        <br></br>
                        {displayDate()[1]}
                    </div>
                </div>
                <div className={styles.previewHeader2}>
                    <div className={`${styles.headerHalf} ${styles.headerLeft}`}>
                        {creatorFullName}
                    </div>
                    {/*<div className={`${styles.headerHalf} ${styles.headerRight}`}>{highlight}</div>*/}
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
                                {displayAddress()}
                            </ul>
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.h4}>Wymagania</div>
                            {postData.requirements.length > 0 ? (
                                <ul className={styles.requirementsList}>{renderRequirements()}</ul>
                            ) : (
                                <ul className={styles.requirementsList}>
                                    {'(Brak szczególnych wymagań)'}
                                </ul>
                            )}
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.h4}>Nagrody za udział</div>
                            {postData.rewards.length > 0 ? (
                                <ul className={styles.rewardsList}>{renderRewards()}</ul>
                            ) : (
                                <ul className={styles.rewardsList}>{'(Brak nagród za udział)'}</ul>
                            )}
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
    withShadow: false,

    tileData: {
        tileNumber: null,
        previewed: false,
    },

    postData: {
        poster: '',
        title: '',
        description: '',
        creatorFullName: '',

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
