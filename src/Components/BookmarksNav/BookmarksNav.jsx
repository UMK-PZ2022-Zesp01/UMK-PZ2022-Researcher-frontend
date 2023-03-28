import React, { useEffect, useState } from 'react';
import styles from './BookmarksNav.module.css';
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

function BookmarksNav({ active }) {
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
                        ? `${styles.activeBookmarkItem} ${styles.bookmarkItemNormalView}`
                        : `${styles.bookmarkItem} ${styles.bookmarkItemNormalView}`
                }
                key="1"
            >
                <FontAwesomeIcon className={styles.bookmarkIcon} icon={faHouse} />
                {activeBookmarkIndex !== 1 && (
                    <span className={styles.iconDesc}>Strona główna</span>
                )}
            </a>,

            <a
                href="/research/create"
                className={
                    activeBookmarkIndex === 2
                        ? `${styles.activeBookmarkItem} ${styles.bookmarkItemNormalView}`
                        : `${styles.bookmarkItem} ${styles.bookmarkItemNormalView}`
                }
                key="2"
            >
                <FontAwesomeIcon className={styles.bookmarkIcon} icon={faFileCirclePlus} />
                {activeBookmarkIndex !== 2 && (
                    <span className={styles.iconDesc}>Dodaj badanie</span>
                )}
            </a>,

            <a
                href="/settings"
                className={
                    activeBookmarkIndex === 3
                        ? `${styles.activeBookmarkItem} ${styles.bookmarkItemNormalView}`
                        : `${styles.bookmarkItem} ${styles.bookmarkItemNormalView}`
                }
                key="3"
            >
                <FontAwesomeIcon className={styles.bookmarkIcon} icon={faGear} />
                {activeBookmarkIndex !== 3 && <span className={styles.iconDesc}>Ustawienia</span>}
            </a>,

            <a
                className={`${styles.bookmarkItem} ${styles.bookmarkItemNormalView}`}
                href="/logout"
                key="4"
            >
                <FontAwesomeIcon className={styles.bookmarkIcon} icon={faRightFromBracket} />
                <span className={styles.iconDesc}>Wyloguj</span>
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
            <nav className={styles.bookmarks}>
                {activeBookmarkIndex === bookmarksMap.get('profile') ? (
                    <a
                        href={isSomeoneLoggedIn ? '/profile' : '/login'}
                        className={`${styles.activeBookmarkItem} ${styles.bookmarkItemNormalView}`}
                    >
                        <FontAwesomeIcon className={styles.bookmarkIcon} icon={faUser} />
                    </a>
                ) : (
                    <a
                        href={isSomeoneLoggedIn ? '/profile' : '/login'}
                        className={`${styles.loggedUserBookmarkItem} ${styles.bookmarkItemNormalView}`}
                        title={
                            isSomeoneLoggedIn
                                ? 'Przejdź do swojego profilu'
                                : 'Kliknij, aby się zalogować'
                        }
                    >
                        <FontAwesomeIcon className={styles.bookmarkIcon} icon={faUser} />
                        <span className={styles.loggedUserBookmarkDesc}>
                            {isSomeoneLoggedIn ? (
                                <>
                                    <div className={styles.loggedUserBookmarkData}>
                                        {loggedUser.firstName}
                                    </div>
                                    <div className={styles.loggedUserBookmarkData}>
                                        {loggedUser.lastName}
                                    </div>
                                </>
                            ) : (
                                <div className={styles.loggedUserBookmarkData}>Zaloguj się</div>
                            )}
                        </span>
                    </a>
                )}

                {generateNav()}

                <div
                    onClick={handleMobileMenuTriggerClick}
                    className={`${styles.bookmarkItem} ${styles.bookmarkItemMobileView}`}
                >
                    <FontAwesomeIcon className={styles.bookmarkIcon} icon={faBars} />
                </div>
            </nav>

            <div
                className={
                    isMobileMenuVisible
                        ? `${styles.bookmarksMobileViewBackgroundVisible}`
                        : `${styles.bookmarksMobileViewBackground}`
                }
            >
                <div
                    className={
                        isMobileMenuVisible
                            ? `${styles.bookmarksContainerMobileViewVisible}`
                            : `${styles.bookmarksContainerMobileView}`
                    }
                >
                    <div className={styles.bookmarkTopRow}>
                        <div
                            onClick={handleMobileMenuTriggerClick}
                            className={styles.bookmarkCloseButton}
                        >
                            <FontAwesomeIcon className={styles.bookmarkIcon} icon={faXmark} />
                        </div>

                        <div className={styles.logoContainer}>
                            <a href="/">
                                <img
                                    className={styles.bookmarkLogo}
                                    src={researcherLogo}
                                    alt="Researcher"
                                />
                            </a>
                        </div>

                        <span className={styles.currentPageText}>Nowe badanie</span>
                    </div>

                    <a href="/profile" className={styles.bookmarkMiddleRow}>
                        <img src={userAvatar} alt="user-avatar" className={styles.userAvatar} />
                        <span className={styles.name}>
                            {isSomeoneLoggedIn ? loggedUser.firstName : 'Zaloguj się'}
                        </span>
                        {isSomeoneLoggedIn && (
                            <>
                                <span className={styles.name}>{loggedUser.lastName}</span>
                                <span className={styles.userDescription}>
                                    Kliknij, aby przejść do profilu
                                </span>
                            </>
                        )}
                    </a>

                    <div className={styles.bookmarkBottomRow}>
                        <a href="/" className={styles.bookmarkButtonMobile}>
                            <FontAwesomeIcon icon={faHouse} />
                            <span className={styles.bookmarkButtonMobileText}>Strona główna</span>
                        </a>

                        <a href="/settings" className={styles.bookmarkButtonMobile}>
                            <FontAwesomeIcon icon={faGear} />
                            <span className={styles.bookmarkButtonMobileText}>
                                Ustawienia konta
                            </span>
                        </a>

                        <a href="/" className={styles.bookmarkButtonMobile}>
                            <FontAwesomeIcon icon={faBug} />
                            <span className={styles.bookmarkButtonMobileText}>Zgłoś błąd</span>
                        </a>

                        <a href="/logout" className={styles.bookmarkButtonMobile}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span className={styles.bookmarkButtonMobileText}>Wyloguj</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookmarksNav;
