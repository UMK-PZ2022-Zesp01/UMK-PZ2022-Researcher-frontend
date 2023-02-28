import React from "react";
import BookmarksNavStyle from "./BookmarksNavStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faHouse, faUser, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function BookmarksNav() {
  const styles = BookmarksNavStyle();

  return (
    <nav className={styles.bookmarks}>

      <div className={styles.activeBookmarkItem}>
        <FontAwesomeIcon className={styles.activeIcon} icon={faFileCirclePlus} />
      </div>

      <a className={styles.bookmarkItem} href="/">
        <FontAwesomeIcon className={styles.icon} icon={faHouse} />
        <span className={styles.iconDesc}>Strona główna</span>
      </a>

      <a className={styles.bookmarkItem} href={"/profile"}>
        <FontAwesomeIcon className={styles.icon} icon={faUser} />
        <span className={styles.iconDesc}>Twój profil</span>
      </a>

      <a className={styles.bookmarkItem} href="/settings">
        <FontAwesomeIcon className={styles.icon} icon={faGear} />
        <span className={styles.iconDesc}>Ustawienia</span>
      </a>

      <a className={styles.bookmarkItem} href="/logout">
        <FontAwesomeIcon className={styles.icon} icon={faRightFromBracket} />
        <span className={styles.iconDesc}>Wyloguj</span>
      </a>

    </nav>
  );
}

export default BookmarksNav;