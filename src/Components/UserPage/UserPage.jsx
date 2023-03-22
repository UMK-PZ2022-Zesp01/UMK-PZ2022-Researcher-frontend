import UserPageStyle from './UserPageStyle';
import "./UserPage.css"
import banner from "../../img/banner2.png";
import dude from "../../img/dude.png";
import {Alert} from "@mui/material";
import React, {useEffect, useState} from "react";
import useAuth from '../../hooks/useAuth';
import getApiUrl from '../../Common/Api.js';
import BookmarksNav from "../BookmarksNav/BookmarksNav";
import UserResearchCard from "../Researches/UserResearchCard";
import LatestResearchCard from "../Researches/LatestResearchCard";
import {Helmet} from "react-helmet";
import {MdLocationOn, MdPhone,MdPostAdd} from 'react-icons/md';
import {GiFemale, GiMale} from 'react-icons/gi';
import {HiOutlineMail,HiOutlineDocumentAdd,HiOutlineDocumentText} from 'react-icons/hi';
import {FiSettings} from 'react-icons/fi';
import {GoFlame} from 'react-icons/go';
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReportForm from "../Form/ReportForm";
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';



export default function UserPage(props) {

    const styles = UserPageStyle();
    const [alert, setAlert] = React.useState({
        alertType: 0,
        alertText: ''
    });

    function showAlert() {
        switch (alert.alertType) {
            case 0:
                return (<div/>)
            case 201:
                return (<Alert severity="success">{alert.alertText}</Alert>)
            default:
                return (<Alert severity="error">{alert.alertText}</Alert>)
        }
    }

    const[openPopup, setOpenPopup] = useState(false)

    const [userData, setUserData] = useState({});
    const {username, accessToken} = useAuth().auth;

    useEffect(() => {
        fetch(getApiUrl() + 'user/current', {
            method: 'GET',
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


    return (
        <div className="MainContainer">
            <ReportForm open={openPopup} onClose={()=>setOpenPopup(false)}></ReportForm>
            <div className="Container">
                <div className={styles.bookmarksContainer}>
                    <div  className={styles.logo}>
                        <img className={styles.logoImg} src={banner} alt="Researcher logo" />
                    </div>
                    <BookmarksNav/>
                </div>
                <div className="UserBox">
                    <div className="leftContainer">
                            <img src={dude} className="avatar"></img>
                        <div className="profileDescription">
                            <div className="nameAndSurname">John Doe</div>
                            <div className="desc"><MdLocationOn className="icon"/>Toruń</div>
                            <div className="desc"><HiOutlineMail className="icon"/>testowy123@gmail.com</div>
                            <div className="desc"><MdPhone className="icon"/> 123-123-123</div>
                            <div className="desc"><GiMale className="icon"/>Mężczyzna</div>
                        </div>
                    </div>
                    <div className="divider">
                        <div className="line"></div>
                    </div>
                    <div className="rightContainer">
                        <div className="activityBox">
                            <div className="singleActivity"> <FiSettings/>Edytuj profil</div>
                            <a className="singleActivity" href={"./research/create"}>
                                <FontAwesomeIcon icon={faFileCirclePlus} />
                                Dodaj nowe badanie</a>
                            <div className="singleActivity"><HiOutlineDocumentText className="additionIcon"/>Zobacz swoje badania</div>
                            <div className="singleActivity" onClick={() => setOpenPopup(true)}> <GoFlame/>Zgłoś błąd</div>
                        </div>
                        <div className="latestResearch">
                            <LatestResearchCard></LatestResearchCard>
                        </div>
                        {/*<div className="researches">*/}
                        {/*    <UserResearchCard></UserResearchCard>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};