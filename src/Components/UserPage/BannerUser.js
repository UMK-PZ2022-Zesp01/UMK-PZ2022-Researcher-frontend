import "../Banner/Banner.css"
import banner from "../../img/banner2.png"
import UserData from "./FetchUser";
import React, {useEffect, useState} from "react";
import styles from "./UserData.module.css";

// pobrać imie i nazwisko uzytkownika

function BannerUser(){
    UserData();
    return(
        <div className={'banner'}>
            {/*Tutaj wypisywać imię i nazwisko uzytkownika*/}
            <p>Twoje Konto</p>
        </div>
    );
}

export default BannerUser;