import styles from "../Containers/Container.module.css"
import dude from "../../../img/dude.png";
import {BsCameraFill} from "react-icons/bs";
import {MdLocationOn, MdPhone} from "react-icons/md";
import {HiOutlineMail} from "react-icons/hi";
import {GiFemale, GiMale} from "react-icons/gi";
import React from "react";


const LeftContainer=({values})=>{
    return(
        <div className={styles.leftContainer}>
            <div className={styles.infoWithoutEdit}>
                <div className={styles.mainInfo}>
                    <div className={styles.avatarBox}>
                        <img src={dude} className={styles.avatarImage} alt="avatar"></img>
                        <div className={styles.editAvatarButton}>
                            <div className={styles.avatarIcon}>
                                <BsCameraFill/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.nameDiv}>
                        <div className={styles.nameAndSurname}>{values.name}</div>
                        <div className={styles.nameAndSurname}>{values.lastName}</div>
                    </div>
                </div>

                <div className={styles.profileDescription}>
                    <div className={styles.desc}>
                        <MdLocationOn className={styles.icon}/>
                        <span>{values.locationState}</span>
                    </div>
                    <div className={styles.desc}>
                        <HiOutlineMail className={styles.icon}/>
                        <span>{values.emailState}</span>
                    </div>
                    <div className={styles.desc}>
                        <MdPhone className={styles.icon}/>
                        <span>{values.phoneState}</span>
                    </div>
                    {values.gender === 'male' ? (
                        <div className={styles.desc}>
                            <GiMale className={styles.icon}/>
                            <span>Mężczyzna</span>
                        </div>
                    ) : (
                        <div className={styles.desc}>
                            <GiFemale className={styles.icon}/>
                            <span>Kobieta</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.editDiv}>
                <button
                    className={!values.clickedEdit ? styles.editButton : styles.editButtonHide}
                    onClick={event => {
                        values.setIsClickedEdit(!values.clickedEdit);
                    }}
                >
                    Edytuj profil
                </button>
            </div>
        </div>
    )
}
export {LeftContainer};