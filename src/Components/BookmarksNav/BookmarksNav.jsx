import React, { useState } from "react";
import BookmarksNavStyle from "./BookmarksNavStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faHouse, faUser, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

function BookmarksNav(){
  const styles = BookmarksNavStyle();

  const [isHoverHome, setIsHoverHome] = useState(false);
  const [isHoverProfile, setIsHoverProfile] = useState(false);
  const [isHoverSettings, setIsHoverSettings] = useState(false);
  const [isHoverLogout, setIsHoverLogout] = useState(false);

  const handleMouseOverHome = () => {
    setIsHoverHome(true);
  };
  const handleMouseOutHome = () => {
    setIsHoverHome(false);
  };

  const handleMouseOverProfile = () => {
    setIsHoverProfile(true);
  };
  const handleMouseOutProfile = () => {
    setIsHoverProfile(false);
  };

  const handleMouseOverSettings = () => {
    setIsHoverSettings(true);
  };
  const handleMouseOutSettings = () => {
    setIsHoverSettings(false);
  };

  const handleMouseOverLogout = () => {
    setIsHoverLogout(true);
  };
  const handleMouseOutLogout = () => {
    setIsHoverLogout(false);
  };

  return (
    <nav className={styles.bookmarks}>

      <div className={styles.activeBookmarkItem}>
        <FontAwesomeIcon className={styles.activeIcon} icon={faFileCirclePlus} />
      </div>

      <a className={styles.bookmarkItem} href="/"
         onMouseOver={handleMouseOverHome} onMouseOut={handleMouseOutHome}>
        <FontAwesomeIcon className={styles.icon} icon={faHouse} />
        {isHoverHome && <span className={styles.iconDesc}>Strona główna</span>}
      </a>

      <a className={styles.bookmarkItem} href={"/profile"}
         onMouseOver={handleMouseOverProfile} onMouseOut={handleMouseOutProfile}>
        <FontAwesomeIcon className={styles.icon} icon={faUser} />
        {isHoverProfile && <span className={styles.iconDesc}>Twój profil</span>}
      </a>

      <a className={styles.bookmarkItem} href="/settings"
         onMouseOver={handleMouseOverSettings} onMouseOut={handleMouseOutSettings}>
        <FontAwesomeIcon className={styles.icon} icon={faGear} />
        {isHoverSettings && <span className={styles.iconDesc}>Ustawienia</span>}
      </a>

      <a className={styles.bookmarkItem} href="/logout"
         onMouseOver={handleMouseOverLogout} onMouseOut={handleMouseOutLogout}>
        <FontAwesomeIcon className={styles.icon} icon={faRightFromBracket} />
        {isHoverLogout && <span className={styles.iconDesc}>Wyloguj</span>}
      </a>

    </nav>
  );
}

export default BookmarksNav;