import UserPageStyle from './UserPageStyle';
import BannerUser from "../Banner/BannerUser.jsx";
import dude from "../../img/dude.png";
import {Alert} from "@mui/material";
import React, {useEffect, useState} from "react";
import useAuth from '../../hooks/useAuth';
import getApiUrl from '../../Common/Api.js';

export default function UserPage(props) {

    const styles=UserPageStyle();
    const [alert, setAlert] = React.useState({
        alertType: 0,
        alertText: ''
    });

    function showAlert(){
        switch (alert.alertType){
            case 0:
                return (<div/>)
            case 201:
                return(<Alert severity="success">{alert.alertText}</Alert>)
            default:
                return(<Alert severity="error">{alert.alertText}</Alert>)
        }
    }

    const [userData, setUserData] = useState({});
    const { username, accessToken } = useAuth().auth;
    console.log(accessToken);

    useEffect(() => {
        fetch(getApiUrl() + 'user/current', {
            method:'GET',
            credentials: 'include',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json; charset:UTF-8',
            }
        })
            .then(response => response.json())
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return(
        <div className={styles.userPage}>

            {/*<div className="navbar"> TUTAJ NAVBAR </div>*/}

            <div className={styles.userPanel}>
                <div className={styles.header}>
                    <BannerUser/>
                </div>
                <div className={styles.main}>
                    <div className={styles.left}>
                        <div className={styles.userPic}>
                            <img src={dude} alt="profile" className={styles.profileImage}></img>
                        </div>
                        <div className={styles.h4}>{userData.firstName} {userData.lastName}</div>
                    </div>

                    <div className={styles.separator}>

                    </div>
                    <div className={styles.right}>
                        <div className={styles.userData}>
                            <div className={styles.h5}> Lokalizacja: Toruń </div>
                            <div className={styles.h5}> Email: {userData.email}</div>
                            <div className={styles.h5}> Numer Telefonu: {userData.phone}</div>
                            <div className={styles.h5}> Płeć: {userData.gender}</div>
                            {/*<UserData/>*/}
                        </div>
                        <a href={"/.."}>
                            <button className={styles.editButton}>Edytuj dane</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

};