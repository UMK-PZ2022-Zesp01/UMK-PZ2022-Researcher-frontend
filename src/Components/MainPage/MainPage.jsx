import React from "react";
import MainPageStyle from './MainPageStyle';
import { useEffect } from 'react';
import getApiUrl from '../../Common/Api';
import useLogout from '../../hooks/useLogout';
import { useUsername } from "../../hooks/useAuth";
import Loading from "../Loading/Loading";

const RESEARCHES_URL = getApiUrl() + 'researches'

function MainPage() {
  const styles = MainPageStyle();
  const [username,setUsername] = React.useState(useUsername())
  const logout = useLogout();
  const [posts, setPosts] = React.useState([]);

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

    getPosts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const signOut = async () => {
    await logout();
    setUsername("")
  };

  const showPosts = () => {
    return posts.map(post => <div key={post.id}>{post.title}</div>);
  };

  return (
    <article className={styles.mainPage}>
      <Loading isLoading={true} isSuccessful={false}></Loading>
      <header>Witaj{username?(" "+username):""}!</header>
      {showPosts()}
      {username&&<button onClick={signOut}>Sign out</button>}
    </article>
  );
}

export default MainPage;
