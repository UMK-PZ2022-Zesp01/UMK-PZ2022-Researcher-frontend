import {createUseStyles} from "react-jss";

export default createUseStyles({

    researchTile:{
        height:'350px',

        backgroundColor:'green',
        borderRadius:'5px',

        transition:'flex-basis 0.25s linear',

        listStyleType:'none',
    },

    preview:{
        height:0,
        gridColumn:'1/-1',
        backgroundColor:'purple',
        overflow:'hidden',
        transition:'height 0.3s ease-in-out',
    },

    previewed:{
        display:"block",
        height:'400px',

    },
})