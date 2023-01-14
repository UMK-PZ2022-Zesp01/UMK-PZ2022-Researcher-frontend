import React from "react";
import {createUseStyles} from 'react-jss'


export default createUseStyles({
        loginRegisterPage:{
            width: '100%',
            height: '100%'
        },
        loginRegisterPanel:{
            position: 'relative',
            maxWidth: '900px',
            padding: '5vw',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',

            justifyContent: 'space-evenly',

            borderRadius: '10px',
        },
        alertOverlay:{
            position: 'absolute',
            width: '100%',
            padding: '0 5vw',
            top: '0',
            left: '0',
        },
        header:{
            width: '30%' ,

            margin: 'auto',

            backgroundColor: '#512c8c',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
        },
        main:{
            width: '100%',
            padding: '5% 0',

            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',

            backgroundColor: '#F4F0FA',
            borderRadius: '10px',

        },
        separator:{
            width: '3px',
            margin: '0',
            flexBasis: '3px',
            flexShrink:'1',

            backgroundColor: '#512c8c',
            borderRadius: '2px',
        }
})

