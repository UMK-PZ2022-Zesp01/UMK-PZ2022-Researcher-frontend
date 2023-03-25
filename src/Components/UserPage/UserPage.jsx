import UserPageStyle from './UserPageStyle';
import banner from '../../img/banner2.png';
import dude from '../../img/dude.png';
import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import getApiUrl from '../../Common/Api.js';
import BookmarksNav from '../BookmarksNav/BookmarksNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone, faPerson } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';

export default function UserPage(props) {
  const styles = UserPageStyle();
  const [alert, setAlert] = React.useState({
    alertType: 0,
    alertText: '',
  });

  function showAlert() {
    switch (alert.alertType) {
      case 0:
        return <div />;
      case 201:
        return <Alert severity="success">{alert.alertText}</Alert>;
      default:
        return <Alert severity="error">{alert.alertText}</Alert>;
    }
  }

  const [userData, setUserData] = useState({});
  const { username, accessToken } = useAuth().auth;
  console.log(accessToken);

  useEffect(() => {
    fetch(getApiUrl() + 'user/current', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json; charset:UTF-8',
      },
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
    <div className={styles.userPage}>
      <Helmet>
        <title>Researcher | Twój profil</title>
      </Helmet>

      {/*<div className="navbar"> TUTAJ NAVBAR </div>*/}

      <div className={styles.userPanel}>
        <div className={styles.bookmarksContainer}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={banner} alt="Researcher logo" />
          </div>
          <BookmarksNav />
        </div>

        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.userPic}>
              <img src={dude} alt="profile" className={styles.profileImage}></img>
            </div>
            <div className={styles.h4}>
              {userData.firstName} {userData.lastName}
            </div>
          </div>

          <div className={styles.separator}></div>
          <div className={styles.right}>
            <div className={styles.userData}>
              <div className={styles.dataItem}>
                <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
                <div className={styles.h5}>Toruń </div>
              </div>

              <div className={styles.dataItem}>
                <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
                <div className={styles.h5}>{userData.email}</div>
              </div>

              <div className={styles.dataItem}>
                <FontAwesomeIcon className={styles.icon} icon={faPhone} />
                <div className={styles.h5}>{userData.phone}</div>
              </div>

              <div className={styles.dataItem}>
                <FontAwesomeIcon className={styles.icon} icon={faPerson} />
                <div className={styles.h5}>{userData.gender}</div>
              </div>
            </div>
          </div>

          <div className={styles.userResearches}></div>
        </div>
      </div>
    </div>
  );
}
