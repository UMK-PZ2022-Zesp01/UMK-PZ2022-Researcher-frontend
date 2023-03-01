import { createUseStyles } from 'react-jss';

export default createUseStyles({
    registeredSuccessfullyPanel: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'center',

        width: 'clamp(200px,500px,100%)',
        padding: '5vw 5vw',
        borderRadius: '10px',
        margin: '5vh auto',

        color:'#6D3B9E',

        backgroundColor: '#F4F0FA',


    },
    h2: {
        fontSize: '1.5rem',
        fontWeight: '500',
        margin: '0.5rem auto',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#6D3B9E',
    },
    h3: {
        fontSize: '1rem',
        fontWeight:'400',
        margin: '0.5rem auto',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#6D3B9E',
    },

    flexRow:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },

    button:{
        appearance: 'none',

        padding: '0.5rem',
        margin: '0.5rem 0',
        border: '3px solid #6D3B9E',
        borderRadius: '2rem',

        backgroundColor: '#F4F0FA',
        fontWeight: '400',
        color: '#512c8c',

        boxShadow: '0px 5px 3px 0px rgba(66, 68, 90, 1)',
        '-webkit-box-shadow': '0px 5px 3px 0px rgba(66, 68, 90, 1)',
        '-moz-box-shadow':'0px 5px 3px 0px rgba(66, 68, 90, 1)',

        position:'relative',
        zIndex:'0',
        transition:'translate linear 0.05s, box-shadow linear 0.05s ',

        '&::before':{
            zIndex:'-1',
            position:'absolute',
            content:'""',
            top:'0',
            left:'50%',
            width:'0',
            height:'100%',
            transition:'width ease-in-out 0.1s, left ease-in-out 0.1s',
            borderRadius:'2rem',
            backgroundColor: '#e7e3ff'
        },

        '&:active': {
            translate: '0 2px',
            boxShadow:'0px 2px 2px 0px rgba(66, 68, 90, 1)',
            '-webkit-box-shadow':'0px 2px 2px 0px rgba(66, 68, 90, 1)',
            '-moz-box-shadow':'0px 2px 2px 0px rgba(66, 68, 90, 1)',
        },

        '&:hover': {
            cursor: 'pointer',
            '&::before':{
                width:'100%',
                left:'0',
            },
        },
    },
})