import styles from "./UserPage.module.css"
import BannerWhite from "../Banner/BannerWhite";
import BannerUser from "./BannerUser";
import dude from "../../img/dude.png";
import {Alert} from "@mui/material";
import React, {useEffect, useState} from "react";
import banner from "../../img/banner2.png";
import GetUserData from "./FetchUser";
import useAuth from '../../hooks/useAuth';
import getApiUrl from '../../Common/Api.js';
import { Helmet } from "react-helmet";

export default function UserPage(props) {

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
    console.log(accessToken)

    useEffect(() => {
        fetch(getApiUrl() + 'user/current', {
            method:'GET',
            credentials: 'include',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json; charset:UTF-8',
            }
        })
            .then(response => response.json().then(data=>{setUserData(data)}))
            // .then(data => {
            //     setUserData(data);
            // })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return(
        <div className={styles.userPage}>

            <Helmet>
                <title>Researcher | Twój profil</title>
            </Helmet>

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
                        <h4 className={styles.name}>{userData.firstName} {userData.lastName}</h4>
                    </div>

                    <div className={styles.separator}>

                    </div>
                    <div className={styles.right}>
                        <div className={styles.userData}>
                            <h5>Lokalizacja: Toruń </h5>
                            <h5>Email: {userData.email}</h5>
                            <h5>Numer Telefonu: {userData.phone}</h5>
                            <h5>Płeć: {userData.gender}</h5>
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