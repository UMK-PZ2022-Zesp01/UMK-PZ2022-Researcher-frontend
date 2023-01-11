import React from "react";
import MainPageStyle from "./MainPageStyle";
import {useEffect} from "react";
import getApiUrl from "../../Common/Api";
import {Select, MenuItem} from "@mui/material";

function MainPage(){
    const [posts, setPosts] = React.useState([])
    const styles = MainPageStyle()

    useEffect(()=>{
        let isMounted=true
        const controller = new AbortController();
        const signal = controller.signal

        const getPosts = async ()=>{

            try{
                await fetch(getApiUrl()+"getAllResearches", {
                    signal,
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json;charset:UTF-8'
                    }
                }).then(response=>
                    response.json().then(result=>{
                        console.log(result)
                        isMounted && setPosts(result)
                    })
                ).catch(error=>{
                    console.log(error)
                })
            }catch (error){
                console.log(error)
            }
        }

        getPosts();
        return()=>{
            isMounted=false;
            controller.abort();
        }
    },[])

    const showPosts =()=>{
        return posts.map(post=>
            <div key={post.id}>{post.title}</div>
        )
    }

    return(
        <div className={styles.mainPage}>
            MainPage
            {showPosts()}

        </div>
    );
}

export default MainPage;