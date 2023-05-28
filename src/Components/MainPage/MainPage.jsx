import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './MainPage.module.css';
import getApiUrl from '../../Common/Api';
import useAuth from '../../hooks/useAuth';
import ResearchTile from '../ResearchTile/ResearchTile';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import banner from '../../img/logo-white.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import { Filters } from './Filters/Filters';
import { FirstTimeForm } from '../Form/FirstTimeForm/FirstTimeForm';
import { AddResearchTile } from '../ResearchTile/AddResearchTile';

const RESEARCHES_URL = getApiUrl() + 'research';

function MainPage() {
    const { accessToken } = useAuth()?.auth;

    const [posts, setPosts] = useState([]);
    const [previewed, setPreviewed] = useState(-1);

    const [isLoading, setIsLoading] = useState(true);
    const [lastPage, setLastPage] = useState(false);

    const triggerRef = useRef(null);

    const [forMeOnly, setForMeOnly] = useState({
        name: 'forMeOnly',
        value: false,
    });
    const [available, setAvailable] = useState({
        name: 'available',
        value: false,
    });
    const [inPlace, setInPlace] = useState({ name: 'in-place', value: false });
    const [remote, setRemote] = useState({ name: 'remote', value: false });
    const [fromDate, setFromDate] = useState({
        name: 'minDate',
        value: new Date().toISOString().substring(0, 10),
    });
    const [toDate, setToDate] = useState({ name: 'maxDate', value: null });

    const [filterBy, setFilterBy] = useState({
        forMeOnly: !!accessToken,
        availableOnly: !!accessToken,
        form: null,
        minDate: fromDate.value,
        maxDate: null,
    });

    const [tempSortBy, setTempSortBy] = useState('newest');
    const [sortBy, setSortBy] = useState('newest');
    const [page, setPage] = useState(1);

    const urlSortBySection = `sortBy=${sortBy}`;

    const urlFiltersSection = Object.keys(filterBy)
        .filter(key => filterBy[key])
        .map(key => `${key}=${filterBy[key]}`)

        .reduce((param1, param2) => `${param1}${param2}&`, '?');

    const urlPageSection = `&page=${page}&perPage=9`;

    const url = RESEARCHES_URL + urlFiltersSection + urlSortBySection + urlPageSection;

    const getFormString = () => {
        const temp = [inPlace, remote]
            .filter(item => item.value)
            .map(f => f.name)
            .reduce((f1, f2) => `${f1}${f2},`, '');
        if (temp?.length === 0) return null;
        return temp.substring(0, temp.length - 1);
    };
    const handleSaveFiltersClicked = () => {
        setSortBy(prevState => {
            if (prevState !== tempSortBy) {
                setPreviewed(-1);
                setPosts([]);
                setPage(1);
                setLastPage(false);
            }
            return tempSortBy;
        });

        setFilterBy(prevState => {
            const current = {
                forMeOnly: forMeOnly.value,
                availableOnly: available.value,
                form: getFormString(),
                minDate: fromDate.value,
                maxDate: toDate.value,
            };

            const keys = Object.keys(prevState);
            const differences = keys.filter(key => prevState[key] !== current[key]);
            if (differences.length !== 0) {
                setPreviewed(-1);
                setPosts([]);
                setPage(1);
                setLastPage(false);
            }
            return current;
        });
    };

    const handleSorterChanged = event => {
        // const checked = event.target.value;
        // setSortBy(prevState => {
        //     if (prevState !== checked) {
        //         setPreviewed(-1);
        //         setPosts([]);
        //         setPage(1);
        //         setLastPage(false);
        //     }
        //     return checked;
        // });
        setTempSortBy(event.target.value);
    };
    const handleFromDateSet = event => {
        setFromDate({ ...fromDate, value: event.target.value });
    };

    const handleToDateSet = event => {
        setToDate({ ...toDate, value: event.target.value });
    };

    const filters = [
        {
            category: 'Specjalne',
            options: [
                accessToken
                    ? {
                          name: 'Pokazuj tylko badania do których się wstępnie kwalifikuję',
                          type: 'checkbox',
                          // value: forMeOnly.value,
                          checked: forMeOnly.value,
                          setter: () => setForMeOnly({ ...forMeOnly, value: !forMeOnly.value }),
                      }
                    : null,
                {
                    name: 'Pokazuj tylko badania z wolnymi miejscami',
                    type: 'checkbox',
                    // value: available,
                    checked: available.value,
                    setter: () => setAvailable({ ...available, value: !available.value }),
                },
            ],
        },
        {
            category: 'Forma badania',
            options: [
                {
                    name: 'Na miejscu',
                    type: 'checkbox',
                    // value: 'in-place',
                    checked: inPlace.value,
                    setter: () => setInPlace({ ...inPlace, value: !inPlace.value }),
                },
                {
                    name: 'Zdalnie',
                    type: 'checkbox',
                    // value: remote,
                    checked: remote.value,
                    setter: () => setRemote({ ...remote, value: !remote.value }),
                },
            ],
        },
        {
            category: 'Data udziału',
            options: [
                {
                    name: 'Od',
                    type: 'date',
                    defaultValue: fromDate.value,
                    setter: handleFromDateSet,
                },
                {
                    name: 'Do',
                    type: 'date',
                    setter: handleToDateSet,
                },
            ],
        },
    ];

    /*first login popup*/
    const [openFirstPopup, setOpenFirstPopup] = useState(false);

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY + 1 >= triggerRef?.current?.offsetHeight) {
            if (!lastPage && !isLoading) {
                setPage(prevState => prevState + 1);
            }
        }
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        // const signal = controller.signal;

        const getUser = async () => {
            if (accessToken)
                try {
                    const response = await fetch(getApiUrl() + 'user/current', {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            Authorization: accessToken,
                            'Content-Type': 'application/json; charset:UTF-8',
                        },
                    });

                    switch (response.status) {
                        case 200:
                            const json = await response.json();
                            setOpenFirstPopup(!json.lastLoggedIn);
                            break;
                        default:
                            setOpenFirstPopup(null);
                            break;
                    }
                    // if (response.ok) {
                    //     const json = await response.json();
                    //     setOpenFirstPopup(!json.lastLoggedIn);
                    // }
                } catch (e) {
                    setOpenFirstPopup(null);
                }
        };

        getUser();
        if (accessToken) {
            console.log(accessToken);
            setAvailable({ ...available, value: true });
            setForMeOnly({ ...forMeOnly, value: true });
        }

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [accessToken]);

    useLayoutEffect(() => {
        let isMounted = true;
        let tryAgain = true;
        setIsLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;

        const filterUnique = (element, index, array) => {
            return array.indexOf(element) === index;
        };

        const getPosts = async () => {
            const nextLoadMax = 9 - (accessToken && page === 1 ? 1 : 0);
            // const nextLoadMax = 9;
            try {
                setLastPage(true);

                const response = await fetch(url, {
                    signal,
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: accessToken,
                        'Content-Type': 'application/json;charset:UTF-8',
                    },
                });

                const json = await response.json();

                setIsLoading(false);
                json.length === nextLoadMax && setLastPage(false);
                isMounted &&
                    Array.isArray(json) &&
                    setPosts(prevPosts => [...prevPosts, ...json].filter(filterUnique));
            } catch (error) {
                if (tryAgain) {
                    getPosts();
                    tryAgain = false;
                }
            }
        };

        console.log(url);
        if (!lastPage) {
            getPosts();
        }

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [url]);

    // const cutText = (text, toLength) =>
    //     [...text].length > toLength ? text.substring(0, toLength) : text;

    const displayPosts = () => {
        return posts.map((post, index) => (
            <ResearchTile
                key={`ResearchTile${post.researchCode}`}
                withShadow={true}
                tileData={{ previewed: previewed, setPreviewed: setPreviewed, tileNumber: index }}
                postData={post}
            ></ResearchTile>
        ));
    };

    return (
        <>
            <div className={styles.pageOverlay}>
                <FirstTimeForm open={openFirstPopup} onClose={() => setOpenFirstPopup(false)} />
            </div>
            <div className={styles.mainPage}>
                <Helmet>
                    <title>Strona główna | JustResearch</title>
                </Helmet>
                <div className={styles.bookmarksContainer}>
                    <Link to="/" className={styles.logo}>
                        <img className={styles.logoImg} src={banner} alt="just-research-logo" />
                    </Link>
                    <BookmarksNav active="home" desc="Strona główna" />
                </div>
                <main ref={triggerRef} className={styles.mainPagePanel}>
                    <div className={styles.options}>
                        <div>
                            <label htmlFor={'sortSelect'}>Sortuj według:</label>
                            <div className={styles.sorterOptions}>
                                <div className={styles.row}>
                                    <input
                                        type={'radio'}
                                        id={'newest'}
                                        name={'sortBy'}
                                        value={'newest'}
                                        onChange={handleSorterChanged}
                                        checked={tempSortBy === 'newest'}
                                        className={styles.radio}
                                    />
                                    <label htmlFor={'newest'}>daty dodania</label>
                                </div>
                                <div className={styles.row}>
                                    <input
                                        type={'radio'}
                                        id={'ending'}
                                        name={'sortBy'}
                                        value={'ending'}
                                        onChange={handleSorterChanged}
                                        checked={tempSortBy === 'ending'}
                                        className={styles.radio}
                                    />{' '}
                                    <label htmlFor={'ending'}>daty zakończenia</label>
                                </div>
                                <div className={styles.row}>
                                    <input
                                        type={'radio'}
                                        id={'starting'}
                                        name={'sortBy'}
                                        value={'starting'}
                                        onChange={handleSorterChanged}
                                        checked={tempSortBy === 'starting'}
                                        className={styles.radio}
                                    />
                                    <label htmlFor={'starting'}>daty rozpoczęcia</label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor={'filterMenu'}>Filtruj według:</label>
                            <Filters
                                id={'filterMenu'}
                                filters={filters}
                                saveFilters={handleSaveFiltersClicked}
                            ></Filters>
                        </div>
                    </div>

                    <ul className={styles.tileGrid}>
                        {accessToken && <AddResearchTile withShadow={true} />}
                        {displayPosts()}
                    </ul>
                    {isLoading && <LoadingDots></LoadingDots>}
                </main>
            </div>
        </>
    );
}

export { MainPage };
