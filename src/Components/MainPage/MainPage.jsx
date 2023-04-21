import React, { useLayoutEffect, useRef } from 'react';
import styles from './MainPage.module.css';
import getApiUrl from '../../Common/Api';
import ResearchTile from '../ResearchTile/ResearchTile';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import banner from '../../img/logo-white.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { LoadingDots } from '../LoadingDots/LoadingDots';

const RESEARCHES_URL = getApiUrl() + 'research/';

function MainPage() {
    const [posts, setPosts] = React.useState([]);
    const [previewed, setPreviewed] = React.useState(-1);

    const [isLoading, setIsLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(false);
    const urlPageSection = `page/${page}/9`;

    const triggerRef = useRef(null);

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY + 1 >= triggerRef.current.offsetHeight) {
            if (!lastPage && !isLoading) {
                setPage(page + 1);
            }
        }
    };

    useLayoutEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;

        const filterUnique = (element, index, array) => {
            return array.indexOf(element) === index;
        };

        const getPosts = async () => {
            try {
                setLastPage(true);
                const response = await fetch(RESEARCHES_URL + urlPageSection, {
                    signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset:UTF-8',
                    },
                });

                const json = await response.json();

                setIsLoading(false);
                json.length === 9 && setLastPage(false);
                isMounted && setPosts([...posts, ...json].filter(filterUnique));
            } catch (error) {
                console.error(error);
            }
        };

        if (!lastPage) {
            getPosts();
        }

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [page]);

    // const cutText = (text, toLength) =>
    //     [...text].length > toLength ? text.substring(0, toLength) : text;

    const displayPosts = () => {
        return posts.map((post, index) => (
            <ResearchTile
                key={`ResearchTile${post.researchCode}`}
                tileData={{ previewed: previewed, setPreviewed: setPreviewed, tileNumber: index }}
                postData={post}
            ></ResearchTile>
        ));
    };

    return (
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
                <ul className={styles.tileGrid}>{displayPosts()}</ul>
                {isLoading && <LoadingDots></LoadingDots>}
            </main>
        </div>
    );
}

export { MainPage };
