import "../Banner/Banner.css"
import React, {useEffect, useState} from "react";

// pobrać imie i nazwisko uzytkownika

function BannerUser(){
    return(
        <div className={'banner'}>
            {/*Tutaj wypisywać imię i nazwisko uzytkownika*/}
            <p>Twoje Konto</p>
        </div>
    );
}

export default BannerUser;