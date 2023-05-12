import React, { useEffect, useState } from 'react';
import styles from './BookmarksNav.module.css';
import researcherLogo from '../../img/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoice,
    faHouse,
    faRightFromBracket,
    faUser,
    faBars,
    faXmark,
    faBug,
} from '@fortawesome/free-solid-svg-icons';
import getApiUrl from '../../Common/Api';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';
import { Link } from 'react-router-dom';

// Props "active":
// * 0 = Profile Page
// * 1 = Home Page
// * 2 = Research Page
// * 3 = Settings Button
// * 4 = Logout Button

function BookmarksNav({ active, desc }) {
    const { auth } = useAuth();
    const { username, accessToken } = auth;
    const logout = useLogout();

    const [loggedUser, setLoggedUser] = useState({});

    const [isSomeoneLoggedIn, setIsSomeoneLoggedIn] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            try {
                if (!username) {
                    throw new Error();
                }
                const response = await fetch(getApiUrl() + 'user/current', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: accessToken,
                        'Content-Type': 'application/json; charset:UTF-8',
                    },
                });

                const json = await response.json();

                setLoggedUser(json);
                setIsSomeoneLoggedIn(true);
            } catch (e) {
                setIsSomeoneLoggedIn(false);
            }
        };

        getUserData();
    }, [auth]);

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
            <Link
                to="/"
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
            </Link>,

            <Link
                to="/research/create"
                className={
                    activeBookmarkIndex === 2
                        ? `${styles.activeBookmarkItem} ${styles.bookmarkItemNormalView} ${
                              !isSomeoneLoggedIn && styles.hidden
                          }`
                        : `${styles.bookmarkItem} ${styles.bookmarkItemNormalView} ${
                              !isSomeoneLoggedIn && styles.hidden
                          }`
                }
                key="2"
            >
                <FontAwesomeIcon className={styles.bookmarkIcon} icon={faFileInvoice} />
                {activeBookmarkIndex !== 2 && (
                    <span className={styles.iconDesc}>Dodaj badanie</span>
                )}
            </Link>,

            // <Link
            //     to="/settings"
            //     className={
            //         activeBookmarkIndex === 3
            //             ? `${styles.activeBookmarkItem} ${styles.bookmarkItemNormalView} ${
            //                   !isSomeoneLoggedIn && styles.hidden
            //               }`
            //             : `${styles.bookmarkItem} ${styles.bookmarkItemNormalView} ${
            //                   !isSomeoneLoggedIn && styles.hidden
            //               }`
            //     }
            //     key="3"
            // >
            //     <FontAwesomeIcon className={styles.bookmarkIcon} icon={faGear} />
            //     {activeBookmarkIndex !== 3 && <span className={styles.iconDesc}>Ustawienia</span>}
            // </Link>,

            <div
                className={`${styles.bookmarkItem} ${styles.bookmarkItemNormalView} ${
                    !isSomeoneLoggedIn && styles.hidden
                }`}
                key="4"
                onClick={logout}
            >
                <FontAwesomeIcon className={styles.bookmarkIcon} icon={faRightFromBracket} />
                <span className={styles.iconDesc}>Wyloguj</span>
            </div>,
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
                    <Link
                        to={isSomeoneLoggedIn ? '/profile' : '/login'}
                        className={`${styles.activeBookmarkItem} ${styles.bookmarkItemNormalView}`}
                    >
                        <FontAwesomeIcon className={styles.bookmarkIcon} icon={faUser} />
                    </Link>
                ) : (
                    <Link
                        to={isSomeoneLoggedIn ? '/profile' : '/login'}
                        className={`${styles.loggedUserBookmarkItem} ${styles.bookmarkItemNormalView}`}
                        title={
                            isSomeoneLoggedIn
                                ? 'Przejdź do swojego profilu'
                                : 'Kliknij, aby się zalogować'
                        }
                    >
                        {isSomeoneLoggedIn === false || loggedUser.avatarImage.length === 0 ? (
                            <FontAwesomeIcon
                                className={`${styles.bookmarkIcon} ${styles.bookmarkAvatarIcon}`}
                                icon={faUser}
                            />
                        ) : (
                            <img
                                alt="user-avatar"
                                src={`data:image/jpeg;base64,${loggedUser.avatarImage}`}
                                className={styles.bookmarkAvatarImg}
                            />
                        )}
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
                    </Link>
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
                                    alt="JustResearch"
                                />
                            </a>
                        </div>

                        <span className={styles.currentPageText}>{desc}</span>
                    </div>

                    <Link
                        to={isSomeoneLoggedIn ? '/profile' : '/login'}
                        className={styles.bookmarkMiddleRow}
                    >
                        {isSomeoneLoggedIn && loggedUser.avatarImage !== '' ? (
                            <img
                                alt="user-avatar"
                                src={`data:image/jpeg;base64,${loggedUser.avatarImage}`}
                                className={styles.userAvatarImg}
                            />
                        ) : (
                            <div className={styles.userAvatar}>
                                <FontAwesomeIcon icon={faUser} className={styles.userAvatarIcon} />
                            </div>
                        )}
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
                    </Link>

                    <div className={styles.bookmarkBottomRow}>
                        <Link to="/" className={styles.bookmarkButtonMobile}>
                            <FontAwesomeIcon icon={faHouse} />
                            <span className={styles.bookmarkButtonMobileText}>Strona główna</span>
                        </Link>

                        {/*{isSomeoneLoggedIn && (*/}
                        {/*    <Link to="/settings" className={styles.bookmarkButtonMobile}>*/}
                        {/*        <FontAwesomeIcon icon={faGear} />*/}
                        {/*        <span className={styles.bookmarkButtonMobileText}>*/}
                        {/*            Ustawienia konta*/}
                        {/*        </span>*/}
                        {/*    </Link>*/}
                        {/*)}*/}

                        {isSomeoneLoggedIn && (
                            <Link to="/research/create" className={styles.bookmarkButtonMobile}>
                                <FontAwesomeIcon icon={faFileInvoice} />
                                <span className={styles.bookmarkButtonMobileText}>
                                    Dodaj ogłoszenie o badaniu
                                </span>
                            </Link>
                        )}

                        <Link to="/" className={styles.bookmarkButtonMobile}>
                            <FontAwesomeIcon icon={faBug} />
                            <span className={styles.bookmarkButtonMobileText}>Zgłoś błąd</span>
                        </Link>

                        {isSomeoneLoggedIn && (
                            <div onClick={logout} className={styles.bookmarkButtonMobile}>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className={styles.bookmarkButtonMobileText}>Wyloguj</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export { BookmarksNav };
