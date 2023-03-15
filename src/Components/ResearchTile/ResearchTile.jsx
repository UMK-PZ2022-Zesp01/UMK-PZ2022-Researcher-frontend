import React, {useEffect, useRef} from "react";
import ResearchTileStyle from "./ResearchTileStyle";

export default function ResearchTile({ tileData, postData}){
    const styles=ResearchTileStyle()

    const {tileNumber, previewed, setPreviewed} = tileData

    const ref=useRef(null)

    useEffect(()=>{
        if(tileNumber===previewed) ref.current.scrollIntoView({behavior:'smooth'})
    },[previewed])

    const handleTileClicked = () => {
        if(tileNumber===previewed){
            setPreviewed(null)
            return
        }
        setPreviewed(tileNumber)
    }

    return<>
        <li
            className={styles.researchTile}
            onClick={handleTileClicked}
        >
            {postData.title}
        </li>
        <li
            ref={ref}
            className={`${styles.preview} ${(previewed===tileNumber)?styles.previewed:''}`}
        >
            asfasfascvzscccccccccsvz sfasfas fasgfbsd vsagy cygvsc gyasvygc vasygv fcuasvc guvagvcasg vcgu
        </li>
    </>
}

ResearchTile.defaultProps = {
    tileData:{
        tileNumber:null,
        previewed:false,
    },

    postData:{
        researchImage:'',
        locationForm:'',
        address:'',

        title:'',
        begDate:'',
        endDate:'',

        author:'',
        highlight:'',

        researchText:'',
        requirements:{
            age:'',
            gender:'',
        },
        rewards:{

        },
    },
}