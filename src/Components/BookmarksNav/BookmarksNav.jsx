import React from "react";
import "./BookmarksNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faHouse, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

// Props "active":
// * 0 = Profile Page
// * 1 = Home Page
// * 2 = Research Page
// * 3 = Logout Button

function BookmarksNav({ active }) {

  const bookmarksMap = new Map();

  bookmarksMap.set("profile", 0);
  bookmarksMap.set("home", 1);
  bookmarksMap.set("research", 2);
  bookmarksMap.set("logout", 3);

  const activeBookmarkIndex = bookmarksMap.get(active);

  const generateNav = () => {

    let bookmarksList = [

      <a href="/" className={activeBookmarkIndex === 1 ? "activeBookmarkItem" : "bookmarkItem"} key="1">
        <FontAwesomeIcon className="icon" icon={faHouse} />
        {activeBookmarkIndex !== 1 && <span className="iconDesc">Strona główna</span>}
      </a>,

      <a href="/research/create"
         className={activeBookmarkIndex === 2 ? "activeBookmarkItem" : "bookmarkItem"} key="2">
        <FontAwesomeIcon className="icon" icon={faFileCirclePlus} />
        {activeBookmarkIndex !== 2 && <span className="iconDesc">Dodaj badanie</span>}
      </a>,

      <a className="bookmarkItem" href="/logout" key="3">
        <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
        <span className="iconDesc">Wyloguj</span>
      </a>
    ];

    /*** Set Active Bookmark at the Beginning ***/

    const activeBookmark = bookmarksList.at(activeBookmarkIndex - 1);
    bookmarksList.unshift(activeBookmark);

    return bookmarksList.filter(function(value, index) {
      return index !== activeBookmarkIndex;
    });

  };

  return (
    <nav className="bookmarks">

      { activeBookmarkIndex === bookmarksMap.get("profile") ?

        <a href="/profile" className="activeBookmarkItem">
          <FontAwesomeIcon className="icon" icon={faUser} />
        </a> :

        <a href="/profile" className="loggedUserBookmarkItem" title="Przejdź do swojego profilu">
        <FontAwesomeIcon className="icon" icon={faUser} />
        <span className="loggedUserBookmarkDesc">Imię Nazwisko</span>
        </a>
      }

      {generateNav()}

    </nav>
  );
}

export default BookmarksNav;