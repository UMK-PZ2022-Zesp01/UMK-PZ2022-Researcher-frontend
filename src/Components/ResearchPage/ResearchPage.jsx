import React, { useEffect, useState } from 'react';
import styles from './ResearchPage.module.css';
import { Helmet } from 'react-helmet';
import researcherLogo from '../../img/banner2.png';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import { Link, useParams } from 'react-router-dom';
import getApiUrl from '../../Common/Api';

function ResearchPage() {
    const { researchCode } = useParams();
    const GET_RESEARCH_URL = getApiUrl() + `research/code/${researchCode}`;
    const GET_CREATOR_URL = getApiUrl() + 'user/';

    const [research, setResearch] = useState();
    const [creator, setCreator] = useState();
    const [researchGetSuccess, setResearchGetSuccess] = useState(false);

    useEffect(() => {
        const getResearch = async () => {
            const researchResponse = await fetch(GET_RESEARCH_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset:UTF-8',
                },
            });

            switch (researchResponse.status) {
                case 200:
                    const result = await researchResponse.json();
                    setResearch(result);

                    const creatorResponse = await fetch(GET_CREATOR_URL + result.creatorLogin, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json;charset:UTF-8',
                        },
                    });

                    switch (creatorResponse.status) {
                        case 200:
                            setCreator(await creatorResponse.json());
                            setResearchGetSuccess(true);
                            break;
                        default:
                            setResearchGetSuccess(false);
                            break;
                    }

                    break;
                case 204:
                    setResearchGetSuccess(false);
                    break;
                default:
                    setResearchGetSuccess(false);
                    break;
            }
        };

        getResearch().then(null);
    }, []);

    return (
        <div className={styles.container}>
            <Helmet>
                <title>Nowe badanie | Researcher</title>
            </Helmet>

            <header className={styles.bookmarksContainer}>
                <Link to="/" className={styles.logo}>
                    <img className={styles.logoImg} src={researcherLogo} alt="Researcher Logo" />
                </Link>
                <BookmarksNav active="research" />
            </header>

            <main className={styles.researchPagePanel}>
                {researchGetSuccess ? (
                    <>
                        <h2 className={styles.title}>{research.title}</h2>

                        <div className={styles.researchPageRow}>
                            <div className={styles.posterContainer}>
                                <img
                                    className={styles.posterImg}
                                    alt="poster"
                                    src={`data:image/jpeg;base64,${research.poster}`}
                                />
                            </div>

                            <div className={styles.basicInfoContainer}>
                                <div className={styles.basicInfoElementRow}>
                                    <div className={styles.dateContainerLeft}>
                                        <div className={styles.categoryLabel}>Otwarte do:</div>
                                        <div className={styles.categoryValue}>
                                            {research.endDate}
                                        </div>
                                    </div>

                                    <div className={styles.dateContainerRight}>
                                        <div className={styles.categoryLabel}>
                                            Do końca badania pozostało
                                        </div>
                                        <div className={styles.categoryValue}>xx dni</div>
                                    </div>
                                </div>

                                <div className={styles.author}>
                                    <span className={styles.categoryLabel}>Autor badania: </span>
                                    {creator.firstName + ' ' + creator.lastName}
                                </div>

                                <div className={styles.basicInfoElement}>
                                    <span className={styles.categoryLabel}>
                                        Kontakt z autorem badania:
                                    </span>
                                    <div className={styles.contactDetails}>
                                        <span className={styles.contactElement}>
                                            Adres e-mail: {creator.email}
                                        </span>
                                        <span className={styles.contactElement}>
                                            Numer telefonu: {creator.phone}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.basicInfoElement}>
                                    <div className={styles.participantsHeader}>
                                        <label
                                            className={styles.categoryLabel}
                                            htmlFor="progress-bar"
                                        >
                                            Liczba zajętych miejsc
                                        </label>
                                        <span>
                                            5 / {research.participantLimit} (pozostało x wolnych
                                            miejsc)
                                        </span>
                                    </div>
                                    <progress
                                        id="progress-bar"
                                        className={styles.participantsProgressBar}
                                        value="5"
                                        max={research.participantLimit}
                                    />
                                </div>

                                <div className={styles.basicInfoElement}>
                                    Forma: zdalnie [LINK] / na miejscu (kliknij, aby przejść do
                                    mapy)
                                </div>
                            </div>
                        </div>

                        <div className={styles.bottomPageContainer}>
                            <div className={styles.researchPageElementColumn}>
                                <span className={styles.categoryLabel}>Opis badania</span>
                                <span className={styles.description}>{research.description}</span>
                            </div>

                            {research.location.form === 'in-place' && (
                                <div className={styles.researchPageElementColumn}>
                                    <span className={styles.categoryLabel}>
                                        Miejsce przeprowadzania badania
                                    </span>
                                    <span className={styles.description}>[MAPA]</span>
                                </div>
                            )}

                            <div className={styles.rewardReqContainer}>
                                <div className={styles.rewardReqElement}>
                                    <div className={styles.categoryLabel}>Wymagania</div>
                                </div>
                                <div className={styles.rewardReqElement}>
                                    <div className={styles.categoryLabel}>
                                        Nagrody za udział w badaniu
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Nie udało się pobrać badania</div>
                )}
            </main>
        </div>
    );
}

export { ResearchPage };
