import React, { useRef } from 'react';
import styles from './MainPage.module.css';
import { useEffect } from 'react';
import getApiUrl from '../../Common/Api';
import { useUsername } from '../../hooks/useAuth';
import ResearchTile from '../ResearchTile/ResearchTile';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import banner from '../../img/banner2.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { LoadingDots } from '../LoadingDots/LoadingDots';

const RESEARCHES_URL = getApiUrl() + 'research/';

function MainPage() {
    const [username, setUsername] = React.useState(useUsername());
    const [posts, setPosts] = React.useState([]);
    const [previewed, setPreviewed] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(false);
    const urlPageSection = `page/${page}/9`;
    const triggerRef = useRef(null);

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight) {
            if (!lastPage) setPage(page + 1);
        }
    };

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;

        const getPosts = async () => {
            try {
                setLastPage(true);
                await fetch(RESEARCHES_URL + urlPageSection, {
                    signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset:UTF-8',
                    },
                })
                    .then(response =>
                        response.json().then(result => {
                            if (result.length === 9) {
                                setLastPage(false);
                            }
                            setIsLoading(false);
                            isMounted && setPosts([...posts, ...result]);
                        })
                    )
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };

        getPosts();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [page]);

    const cutText = (text, toLength) =>
        [...text].length > toLength ? text.substring(0, toLength) : text;

    const showPosts = () => {
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
                <title>Strona główna | Researcher</title>
            </Helmet>
            <div className={styles.bookmarksContainer}>
                <Link to="/" className={styles.logo}>
                    <img className={styles.logoImg} src={banner} alt="Researcher Logo" />
                </Link>
                <BookmarksNav active="home" />
            </div>
            <main className={styles.mainPagePanel}>
                <ul className={styles.tileGrid}>{showPosts()}</ul>
                {isLoading && <LoadingDots />}
                <span ref={triggerRef}></span>
            </main>
        </div>
    );
}

export { MainPage };
