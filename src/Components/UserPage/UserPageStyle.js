import React from 'react';
import { createUseStyles } from 'react-jss';
export default createUseStyles({
userPage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    /*background: rgb(238,174,202);*/
    /*background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);*/
    /*background-attachment: scroll;*/
    /*background-repeat: no-repeat;*/
    /*background-size: contain;*/
    /*background-position: center;*/
    /*background: rgb(255,0,194);*/
    /*background: linear-gradient(125deg, rgb(81, 44, 140) 0%, rgba(250, 0, 255, 0.56) 35%, rgba(0, 225, 255, 0.71) 100%);*/

},

header:{
    maxWidth: '30%',
    /*margin: auto;*/
    marginLeft: '125px',
    backgroundColor: '#512c8c',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
},

userPanel:{
    /*background-color: rgba(255, 255, 255, 0.38);*/
    width: '1200px',
    padding: '5vw',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    justifyContent: 'space-evenly',
    borderRadius: '10px',
},

bookmarksContainer:{
    display: 'flex',
    flexDirection:'row',
    width:'95%'
},

logo:{
    backgroundColor: "#512C8C",
    padding: '10px 15px',
    marginLeft: '40px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
},

logoImg:{
    height:'40px',
},

main:{
    maxWidth: '100%',
    padding: '5% 0',
    display: 'grid',
    gridTemplateRows: '2fr 0.1fr 3fr',
    background: '#F4F0FA',
    // backdropFilter: 'blur( 20px )',
    /*background-color: #F4F0FA;*/
    borderRadius: '10px',
    // border: '1px solid rgba( 255, 255, 255, 0.18 )',
    // boxShadow: '8px 10px 20px rgba(115, 115, 115, 0.5)',
},

left:{
    display: 'flex',
    flexDirection: 'column',
},

right:{
    display: 'flex',
    flexDirection: 'column',
},

navbar:{
    backgroundColor: '#6D3B9E',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '10%',
    padding: '30px 100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
},

userData:{
    backgroundColor: 'rgba(255, 255, 255, 0)',
    maxWidth: '100%',
    padding: '5% 10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'left',
},

userResearches:{


},

dataItem:{
    display: 'flex',
    flexDirection: 'row',
    marginBlockStart: '2rem',
},

userPic:{
    maxWidth:'20%',
    display: 'block',
    margin: '10px auto',
},

profileImage:{
    borderRadius: '50%',
    border: '2px solid #6d18ee',
    maxWidth: '100%',
    padding: '2px',
},

separator:{
    height: '3px',
    maxWidth: '80%',
    marginLeft: '10%',
    backgroundColor: '#512c8c',
    borderRadius: '2px',
},

h4:{
    color: '#512c8c',
    fontSize: 'xx-large',
    fontWeight: 'bold',
    margin: '20px',
},

h5:{
    color: '#4C8076',
    fontSize: '25px',
    fontWeight: 'bolder',
},

/*.name{*/
/*    padding:15px;*/
/*}*/


line:{
    height: '3px',
    backgroundColor: '#512c8c',
},

textInput:{
    backgroundColor: '#af1414',
},

editButton: {
    width: '20%',
    padding: '0.5rem',
    margin: '0.1rem 0',
    backgroundColor: '#512c8c',
    color: '#ffffff',
    fontSize: 'medium',
    fontWeight: 'bold',
    appearance: 'none',
    border: 'solid black 1px',
    borderRadius: '5px',
},

icon: {
    fontSize: "30px",
    color: '#512c8c',
    pointerEvents: "none",
    marginRight: '20px',
},
// editButton:hover:{
//     cursor: pointer,
//     border: solid white 1px,
//     background:  #512c8c,
//     -webkit-box-shadow: inset 0px 0px 5px #c1c1c1,
//     -moz-box-shadow: inset 0px 0px 5px #c1c1c1,
//     box-shadow: inset 0px 0px 5px #c1c1c1,
//     outline: none,
// },
});