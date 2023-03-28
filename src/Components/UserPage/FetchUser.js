import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import getApiUrl from '../../Common/Api';

////////////////////////////////////
// na pózniej - na razie nie używać
//////////////////////////////////////
const USER_URL = getApiUrl() + 'user/current';

function GetUserData() {
    const [userData, setUserData] = useState({});
    const { username, accessToken } = useAuth().auth;
    console.log(accessToken);

    useEffect(() => {
        fetch(USER_URL, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json; charset:UTF-8',
            },
        })
            .then(response =>
                response.json().then(data => {
                    setUserData(data);
                })
            )
            // .then(data => {
            //     setUserData(data);
            // })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        // dane

        <div />
    );
}

export default GetUserData;
