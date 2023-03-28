import React from "react";
import userResearchCardStyle from './UserResearchCardStyle.js';
import { useUsername } from "../../hooks/useAuth";
import { useEffect } from 'react';
import getApiUrl from "../../Common/Api";
const USERRESEARCHES_URL = getApiUrl() + 'research/creatorLogin/'

function UserResearchCard(){
    const styles=userResearchCardStyle();
    const [researches, setResearches] = React.useState([]);
    const login=useUsername();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        const getUserResearches = async () => {
            try {
                await fetch(USERRESEARCHES_URL+login, {
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

    console.log(researches);


    const showUserResearches = () => {
        return researches.map(research =>
            <div key={research.id} className={styles.researchCard}>

                <div className={styles.researchHeader}>

                <div className={styles.researchTitle}>
                    <h1 className={styles.title}>{research.title}</h1>
                </div>

                <div className={styles.researchDate}>
                    <h2>{research.begDate} - {research.endDate}</h2>
                </div>

                </div>

                <div className={styles.researchDesc}>
                    <h3>{research.description}</h3>
                </div>

            </div>

        );
    };

    return <div className={styles.researchContainer}>{showUserResearches()}</div>;
}

export { UserResearchCard };