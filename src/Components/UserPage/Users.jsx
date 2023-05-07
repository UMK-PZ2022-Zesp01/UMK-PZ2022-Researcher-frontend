import React from "react";
import {Link} from "react-router-dom";

function Users(props){

    const username = 'odolczykd';
    const szop = 'szop'
    const lewy = 'lewy'

    function UserProfileLink(props) {
        return (
            <Link to={`/profile/${props.username}`}>
                {props.username}
            </Link>
        );
    }

    return(
        <div>
            <div>press X to <UserProfileLink username={username}/></div>

            <div> press Y to <UserProfileLink username={szop}/></div>

            <div> press Z to <UserProfileLink username={lewy}/></div>
        </div>


    );
} export {Users};