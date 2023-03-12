import React from "react";
import BookmarksNavStyle from "./BookmarksNavStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faGear, faHouse, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

/***
 props "active":
*
 * 0 = Home Page
 *
 * 1 = Profile Page
 *
 * 2 = Research Page
 *
 * 3 = Settings Page
 *
 * 4 = Logout Button
 ***/

function BookmarksNav({active}) {

  const styles = BookmarksNavStyle();

  const generateNav = () => {
    const activeBookmarkIndex = Number(active);

    let bookmarksList = [
      <a href="/" className={activeBookmarkIndex === 0 ? styles.activeBookmarkItem : styles.bookmarkItem}>
        <FontAwesomeIcon className={styles.icon} icon={faHouse} />
        {activeBookmarkIndex !== 0 && <span className={styles.iconDesc}>Strona główna</span>}
      </a>,

      <a href="/profile" className={activeBookmarkIndex === 1 ? styles.activeBookmarkItem : styles.bookmarkItem}>
        <FontAwesomeIcon className={styles.activeIcon} icon={faUser} />
        {activeBookmarkIndex !== 1 && <span className={styles.iconDesc}>Twój profil</span>}
      </a>,

      <a href="/research/create"
         className={activeBookmarkIndex === 2 ? styles.activeBookmarkItem : styles.bookmarkItem}>
        <FontAwesomeIcon className={styles.icon} icon={faFileCirclePlus} />
        {activeBookmarkIndex !== 2 && <span className={styles.iconDesc}>Dodaj badanie</span>}
      </a>,

      <a href="/settings" className={activeBookmarkIndex === 3 ? styles.activeBookmarkItem : styles.bookmarkItem}>
        <FontAwesomeIcon className={styles.icon} icon={faGear} />
        {activeBookmarkIndex !== 3 && <span className={styles.iconDesc}>Ustawienia</span>}
      </a>,

      <a className={styles.bookmarkItem} href="/logout">
        <FontAwesomeIcon className={styles.icon} icon={faRightFromBracket} />
        <span className={styles.iconDesc}>Wyloguj</span>
      </a>
    ];

    const activeBookmark = bookmarksList.at(activeBookmarkIndex);
    bookmarksList.reverse().push(activeBookmark);
    bookmarksList.reverse();

    return bookmarksList.filter(function(value, index) {
      return index !== activeBookmarkIndex + 1;
    });
  };

  return (
    <nav className={styles.bookmarks}>
      {generateNav()}
    </nav>
  );
}

export default BookmarksNav;