import React, { useRef } from 'react';
import MainPageStyle from './MainPageStyle';
import { useEffect } from 'react';
import getApiUrl from '../../Common/Api';
import useLogout from '../../hooks/useLogout';
import { useUsername } from '../../hooks/useAuth';
import ResearchTile from '../ResearchTile/ResearchTile';
import BookmarksNav from '../BookmarksNav/BookmarksNav';
import banner from '../../img/banner2.png';
import { Helmet } from 'react-helmet';

const RESEARCHES_URL = getApiUrl() + 'researches';

const fakeApiPosts = [
    {
        poster: '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',
        title: 'Tutył tytuł tytuł',
        description:
            'wowlowlwooolololololollol woololololwolo wolowlololow loowlolow lowlolololow olwolwlwowlol wolowlodalsodlasol doas',
        author: 'Marian Mlecz',
        begDate: '2023-03-10',
        endDate: '2023-04-15',
        location: {
            form: 'remote',
            address: 'aaaaaaaaaaaadres',
        },
        rewards: [
            {
                type: 'cash',
                value: 25.5,
            },
            {
                type: 'item',
                value: 'reeee',
            },
        ],
        requirements: [
            {
                type: 'gender',
                criteria: ['male', 'female'],
            },
            {
                type: 'place',
                criteria: ['cityBetween150kAnd500k', 'cityBelow50k'],
            },
            {
                type: 'education',
                criteria: ['primary, middle'],
            },
            {
                type: 'marital',
                criteria: ['divorced', 'married', 'inRelationship'],
            },
        ],
    },
];

function MainPage() {
    const styles = MainPageStyle();
    const [username, setUsername] = React.useState(useUsername());
    const logout = useLogout();
    const [posts, setPosts] = React.useState([]);
    const [previewed, setPreviewed] = React.useState(null);

    // const previewedRef = useRef(null);
    //
    // useEffect(() => {
    //   if (previewed !== null)
    //     previewedRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    // }, [previewed]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        const getPosts = async () => {
            try {
                await fetch(RESEARCHES_URL, {
                    signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset:UTF-8',
                    },
                })
                    .then(response =>
                        response.json().then(result => {
                            isMounted && setPosts(result);
                        })
                    )
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };

        // getPosts();
        isMounted && setPosts(fakeApiPosts);

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const signOut = async () => {
        await logout();
        setUsername('');
    };

    const cutText = (text, toLength) =>
        [...text].length > toLength ? text.substring(0, toLength) : text;

    const showPosts = () => {
        return posts.map((post, index) => (
            <ResearchTile
                key={post}
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
                <a href="/" className={styles.logo}>
                    <img className={styles.logoImg} src={banner} alt="Researcher Logo" />
                </a>
                <BookmarksNav active="home" />
            </div>
            <main className={styles.mainPagePanel}>
                <ul className={styles.tileGrid}>{showPosts()}</ul>
            </main>
        </div>
    );
}

export default MainPage;
