import React from "react";
import {createUseStyles} from 'react-jss'


export default createUseStyles({
    fullWidth: {
        width: "100%"
    },
    hBox: {
        display:'flex',
        flexDirection:'column',
        height: "10vh",
        margin: "0",
        textAlign:'center',
        justifyContent:'space-evenly',
    },
    h2: {
        fontSize: '1.5rem',
        fontWeight:'500',
        margin: "0 auto",
        alignSelf: "center",
        textAlign: "center",
        color: "#6D3B9E"
    },
    h3: {
        fontSize:'1.2rem',
        margin: "0 auto",
        alignSelf: "center",
        textAlign: "center",
        color: "#6D3B9E"
    },
    loginFormBox: {
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        margin: "0"
    },
    registerFormBox: {
        display: "flex",
        flexDirection: "column",
        flexGrow: "2",
        margin: "0"
    },
    loginForm: {
        display: "flex",
        padding: "1rem 2rem",
        flexDirection: "column"
    },
    registerForm: {
        display: "flex",
        padding: "1rem 2rem",
        flexDirection: "column"
    },
    aPurple: {
        padding: "0.3rem",
        alignSelf: "end",
        fontWeight: "700",
        fontSize: "0.7rem",
        color: "#512c8c",
        borderRadius: "5px",
        textDecoration: "none",
        '&:hover': {
            color: "#6D3B9E"
        },
    },

    textInput: {
        width: "100%",
        height: "2rem",
        padding: "0.5rem",
        margin: "0.25rem 0",
        backgroundColor: "#C6B1E7",
        display: "block",
        appearance: "none",
        border: "none",
        '&:focus': {
            appearance: "none",
            outline: "none"
        },
        '&:-internal-autofill-selected':{
            WebkitBoxShadow: "0 0 0 50px #C6B1E7 inset",
        },
        // '&:-webkit-autofill':{
        //     WebkitBoxShadow: "0 0 0 50px #C6B1E7 inset",
        //     '&:hover':{
        //         WebkitBoxShadow: "0 0 0 50px #C6B1E7 inset",
        //     },
        //     '&:focus':{
        //         WebkitBoxShadow: "0 0 0 50px #C6B1E7 inset",
        //     },
        //     '&:active':{
        //         WebkitBoxShadow: "0 0 0 50px #C6B1E7 inset",
        //     }
        // },
    },
    submitButton: {
        padding: "0.5rem",
        margin: "0.5rem 0",
        backgroundColor: "#512c8c",
        color: "#ffffff",
        fontWeight: "400",
        appearance: "none",
        border: "none",
        borderRadius: "5px",
        '&:hover':{
            backgroundColor: "#6D3B9E",
            cursor: "pointer"
        },
        '&:active':{
        }
    },
    orLoginWith: {
        width: "100%",
        textAlign: "center",
        borderBottom: "2px solid #512c8c",
        lineHeight: "0.1rem",
        margin: "10px 0 20px",
        '& span':{
            padding: "0 1rem",
            backgroundColor: "#F4F0FA"
        },
    },
    loginWith: {
        padding: "0.5rem",
        margin: "0.5rem 0",
        flexBasis: "48%",
        backgroundColor: "#D9D9D9",
        appearance: "none",
        border: "none",
        borderRadius: "5px",
        '&:hover':{
            cursor: "pointer"
        },
        '&:active':{

        },
    },
    agreementBox: {
        textAlign: "justify",
        '& label':{
            width: "2rem",
            fontSize: "1rem"
        }
    },
    checkboxInput: {
        width: "1rem",
        height: "1rem",
        border: "1px solid #512c8c",
        borderRadius: "2px",
        appearance: "none",
        cursor: "pointer",
        '&::after':{
            content: '\"\\2713\"',
            position: "relative",
            color: "#F4F0FA",
            left: "2px",
            top: "-2px"
        },
        '&:checked':{
            backgroundColor: "#6D3B9E",
        }
    },
    flexRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    flexColumn: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    flexColumnSep: {
        width: "0.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    PasswordStrengthBar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    barPart: {
        content: "\"\"",
        backgroundColor: "#6D3B9E",
        width: "24%",
        height: "3px"
    },
})
