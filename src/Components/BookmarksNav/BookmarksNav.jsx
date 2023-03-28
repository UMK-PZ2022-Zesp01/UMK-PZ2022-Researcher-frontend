import React, { useEffect, useState } from 'react';
import './BookmarksNav.css';
import researcherLogo from '../../img/banner2.png';
import userAvatar from '../../img/user.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faHouse,
    faRightFromBracket,
    faUser,
    faGear,
    faBars,
    faXmark,
    faBug,
} from '@fortawesome/free-solid-svg-icons';
import getApiUrl from '../../Common/Api';
import useAuth from '../../hooks/useAuth';

// Props "active":
// * 0 = Profile Page
// * 1 = Home Page
// * 2 = Research Page
// * 3 = Settings Button
// * 4 = Logout Button

function BookmarksNav({ active /*, loggedUser*/ }) {
    const [loggedUser, setLoggedUser] = useState({});
    const { username, accessToken } = useAuth().auth;

    const [isSomeoneLoggedIn, setIsSomeoneLoggedIn] = useState(false);

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
                setLoggedUser(data);
                setIsSomeoneLoggedIn(true);
            })
            .catch(error => {
                console.error(error);
                setIsSomeoneLoggedIn(false);
            });
    }, []);

    const bookmarksMap = new Map();

    bookmarksMap.set('profile', 0);
    bookmarksMap.set('home', 1);
    bookmarksMap.set('research', 2);
    bookmarksMap.set('settings', 3);
    bookmarksMap.set('logout', 4);

    const activeBookmarkIndex = bookmarksMap.get(active);

    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    const handleMobileMenuTriggerClick = () => {
        setIsMobileMenuVisible(!isMobileMenuVisible);
    };

    const generateNav = () => {
        let bookmarksList = [
            <a
                href="/"
                className={
                    activeBookmarkIndex === 1
                        ? 'activeBookmarkItem bookmarkItemNormalView'
                        : 'bookmarkItem bookmarkItemNormalView'
                }
                key="1"
            >
                <FontAwesomeIcon className="bookmarkIcon" icon={faHouse} />
                {activeBookmarkIndex !== 1 && <span className="iconDesc">Strona główna</span>}
            </a>,

            <a
                href="/research/create"
                className={
                    activeBookmarkIndex === 2
                        ? 'activeBookmarkItem bookmarkItemNormalView'
                        : 'bookmarkItem bookmarkItemNormalView'
                }
                key="2"
            >
                <FontAwesomeIcon className="bookmarkIcon" icon={faFileCirclePlus} />
                {activeBookmarkIndex !== 2 && <span className="iconDesc">Dodaj badanie</span>}
            </a>,

            <a
                href="/settings"
                className={
                    activeBookmarkIndex === 3
                        ? 'activeBookmarkItem bookmarkItemNormalView'
                        : 'bookmarkItem bookmarkItemNormalView'
                }
                key="3"
            >
                <FontAwesomeIcon className="bookmarkIcon" icon={faGear} />
                {activeBookmarkIndex !== 3 && <span className="iconDesc">Ustawienia</span>}
            </a>,

            <a className="bookmarkItem bookmarkItemNormalView" href="/logout" key="4">
                <FontAwesomeIcon className="bookmarkIcon" icon={faRightFromBracket} />
                <span className="iconDesc">Wyloguj</span>
            </a>,
        ];

        /*** Set Active Bookmark at the Beginning ***/

        const activeBookmark = bookmarksList.at(activeBookmarkIndex - 1);
        bookmarksList.unshift(activeBookmark);

        return bookmarksList.filter(function (value, index) {
            return index !== activeBookmarkIndex;
        });
    };

    return (
        <>
            <nav className="bookmarks">
                {activeBookmarkIndex === bookmarksMap.get('profile') ? (
                    <a
                        href={isSomeoneLoggedIn ? '/profile' : '/login'}
                        className="activeBookmarkItem bookmarkItemNormalView"
                    >
                        <FontAwesomeIcon className="bookmarkIcon" icon={faUser} />
                    </a>
                ) : (
                    <a
                        href={isSomeoneLoggedIn ? '/profile' : '/login'}
                        className="loggedUserBookmarkItem bookmarkItemNormalView"
                        title={
                            isSomeoneLoggedIn
                                ? 'Przejdź do swojego profilu'
                                : 'Kliknij, aby się zalogować'
                        }
                    >
                        <FontAwesomeIcon className="bookmarkIcon" icon={faUser} />
                        <span className="loggedUserBookmarkDesc">
                            {isSomeoneLoggedIn ? (
                                <>
                                    <div className="loggedUserBookmarkData">
                                        {loggedUser.firstName}
                                    </div>
                                    <div className="loggedUserBookmarkData">
                                        {loggedUser.lastName}
                                    </div>
                                </>
                            ) : (
                                <div className="loggedUserBookmarkData">Zaloguj się</div>
                            )}
                        </span>
                    </a>
                )}

                {generateNav()}

                <div
                    onClick={handleMobileMenuTriggerClick}
                    className="bookmarkItem bookmarkItemMobileView"
                >
                    <FontAwesomeIcon className="bookmarkIcon" icon={faBars} />
                </div>
            </nav>

            <div
                className={
                    isMobileMenuVisible
                        ? 'bookmarksMobileViewBackgroundVisible'
                        : 'bookmarksMobileViewBackground'
                }
            >
                <div
                    className={
                        isMobileMenuVisible
                            ? 'bookmarksContainerMobileViewVisible'
                            : 'bookmarksContainerMobileView'
                    }
                >
                    <div className="bookmarkTopRow">
                        <div onClick={handleMobileMenuTriggerClick} className="bookmarkCloseButton">
                            <FontAwesomeIcon className="bookmarkIcon" icon={faXmark} />
                        </div>

                        <div className="logoContainer">
                            <a href="/">
                                <img
                                    className="bookmarkLogo"
                                    src={researcherLogo}
                                    alt="Researcher"
                                />
                            </a>
                        </div>

                        <span className="currentPageText">Nowe badanie</span>
                    </div>

                    <a href="/profile" className="bookmarkMiddleRow">
                        <img src={userAvatar} alt="user-avatar" className="userAvatar" />
                        <span className="name">
                            {isSomeoneLoggedIn ? loggedUser.firstName : 'Zaloguj się'}
                        </span>
                        {isSomeoneLoggedIn && (
                            <>
                                <span className="name">{loggedUser.lastName}</span>
                                <span className="userDescription">
                                    Kliknij, aby przejść do profilu
                                </span>
                            </>
                        )}
                    </a>

                    <div className="bookmarkBottomRow">
                        <a href="/" className="bookmarkButtonMobile">
                            <FontAwesomeIcon icon={faHouse} />
                            <span className="bookmarkButtonMobileText">Strona główna</span>
                        </a>

                        <a href="/settings" className="bookmarkButtonMobile">
                            <FontAwesomeIcon icon={faGear} />
                            <span className="bookmarkButtonMobileText">Ustawienia konta</span>
                        </a>

                        <a href="/" className="bookmarkButtonMobile">
                            <FontAwesomeIcon icon={faBug} />
                            <span className="bookmarkButtonMobileText">Zgłoś błąd</span>
                        </a>

                        <a href="/logout" className="bookmarkButtonMobile">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span className="bookmarkButtonMobileText">Wyloguj</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookmarksNav;
