import React from "react";
import styles from './ResearchCard.module.css';
import { useUsername } from "../../hooks/useAuth";
import { useEffect } from 'react';
import getApiUrl from '../../Common/Api';
import {Link} from "react-router-dom";

const USERRESEARCHES_URL = getApiUrl() + 'research/creator/';

function LatestResearchCard(){
    const [researches, setResearches] = React.useState([]);
    const login = useUsername();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        const getUserResearches = async () => {
            try {
                await fetch(USERRESEARCHES_URL + login, {
                    signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset:UTF-8',
                    },
                })
                    .then(response =>
                        response.json().then(result => {
                            isMounted && setResearches(result);
                        })
                    )
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };

        getUserResearches();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const showUserResearches = researches => {
        return researches.map(research => (
            <Link to={`/research/${research.researchCode}`} className={styles.linkToLatest}>
            <div key={research.researchCode} className={styles.latestResearchCard}>
                <div className={styles.latestResearchHeader}>
                    <div className={styles.researchTitle}>
                        <h2 className={styles.title}>{research.title}</h2>
                    </div>

                    {/*<div className={styles.researchDate}>*/}
                    {/*    <h3>{research.begDate} - {research.endDate}</h3>*/}
                    {/*</div>*/}
                </div>

                <div className={styles.latestResearchDesc}>
                    <h4>{research.description}</h4>
                </div>
            </div>
            </Link>
        ));
    };

    const showLastResearch = () => {
        const newestResearch = researches.slice(-1);
        return showUserResearches(newestResearch);
    };

    return <div className={styles.researchContainer}>{showLastResearch()}</div>;
}

export { LatestResearchCard };
