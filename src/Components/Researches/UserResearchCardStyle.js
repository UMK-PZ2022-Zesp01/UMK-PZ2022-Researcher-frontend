import React from 'react';
import { createUseStyles } from 'react-jss';
import { hover } from '@testing-library/user-event/dist/hover';

export default createUseStyles({
    researchContainer: {
        display: 'grid',
        width: '100%',
        height: '100%',
        // padding:'20px',
        // backgroundColor: 'rgba(198, 177, 231,1)',
    },

    researchHeader: {
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        backgroundColor: 'rgba(109, 59, 158, 0.9)',
        borderRadius: '14px',
        backdropFilter: 'blur(3.5px)',
    },

    latestResearchHeader: {
        // height:'50px',
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        backgroundColor: 'rgb(81, 44, 140)',
        color: 'white',
        borderRadius: '10px',
        backdropFilter: 'blur(3.5px)',
    },

    title: {
        fontSize: 'large',
        margin: 0,
    },

    researchCard: {
        marginBottom: '20px',
        boxShadow: '8px 8px 24px 0px rgba(109, 59, 151, 0.37)',
        backdropFilter: 'blur(3.5px)',
        borderRadius: '15px',
        border: 'solid rgb(109, 59, 158) 1px',
    },

    latestResearchCard: {
        boxShadow: '8px 8px 24px 0px rgba(109, 59, 151, 0.37)',
        borderRadius: '15px',
        border: 'solid rgb(109, 59, 158) 1px',
        transition: 'all .3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(102%)',
        },
    },

    researchTitle: {
        display: 'grid',
        justifyContent: 'start',
        alignItems: 'center',
    },

    researchDate: {
        display: 'grid',
        justifyContent: 'end',
        alignItems: 'center',
    },

    researchDesc: {
        padding: '10px',
        display: 'grid',
        justifyContent: 'start',
        height: '150px',
        overflow: 'hidden',
    },

    latestResearchDesc: {
        padding: '10px',
        display: 'grid',
        borderRadius: '15px',
        justifyContent: 'start',
        height: '80px',

        overflow: 'hidden',
        fontSize: 'medium',
    },

    researchLocation: {
        backgroundColor: 'grey',
    },
});
