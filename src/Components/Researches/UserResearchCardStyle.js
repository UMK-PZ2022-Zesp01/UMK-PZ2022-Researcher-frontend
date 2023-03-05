import React from 'react';
import { createUseStyles } from "react-jss";

export default createUseStyles({
    researchContainer:{
        display:'grid',
        width:'100%',
        height:'auto',
        // padding:'20px',
        // backgroundColor: 'rgba(198, 177, 231,1)',


    },

    researchHeader:{
        padding:'10px',
        display:'grid',
        gridTemplateColumns:'60% 40%',
        backgroundColor: 'rgba(109, 59, 158, 0.9)',
        borderRadius:'14px',
        backdropFilter:'blur(3.5px)'
    },

    title:{
      // color: '#6D3B9E',
    },

    researchCard:{
        marginBottom:'20px',
        boxShadow: '8px 8px 24px 0px rgba(109, 59, 151, 0.37)',
        backdropFilter:'blur(3.5px)',
        borderRadius:'15px',
        border:'solid rgb(109, 59, 158) 1px',
    },

    researchTitle:{
        display:'grid',
        justifyContent: 'start',
        alignItems:'center',
        // backgroundColor:'beige'
    },

    researchDate:{
        display:'grid',
        justifyContent: 'end',
        alignItems:'center',
        // backgroundColor:'aquamarine'
    },

    researchDesc:{
        padding:'10px',
        display:'grid',
        justifyContent: 'start',
        height:'150px',
        overflow:'hidden',
        // backgroundColor:'teal'
    },

    researchLocation:{
        backgroundColor:'grey'
    },
});